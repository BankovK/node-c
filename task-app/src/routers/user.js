const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const authMiddleware = require('../middleware/auth')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')

const router = new express.Router()

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.send({ user: user.getPublicProfile(), token })
        res.send({ user, token })
    } catch (error) {
        res.status(404).send()
    }
})

// router.post('/users', (req, res) => {
//     const user = new User(req.body)
    
//     user.save()
//         .then(data => res.status(201).send(data))
//         .catch(error => res.status(400).send(error))
// })

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        const data = await user.save()
        // sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user: data, token})

        // await user.save()
        // res.status(201).send(user)
    } catch(error) {
        res.status(400).send(error)
    }
})

// router.get('/users', (req, res) => {
//     User.find({})
//         .then(users => res.send(users))
//         .catch(error => res.status(500).send(error))
// })

router.get('/users/me', authMiddleware, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', (req, res) => {
//     User.findById(req.params.id)
//         .then(user => {
//             if (!user) {
//                 res.status(404).send('User with this id not found!')
//                 return
//             }
//             res.send(user)
//         })
//         .catch(error => res.status(500).send(error))
// })

// router.get('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) {
//             res.status(404).send('User with this id not found!')
//             return
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

router.patch('/users/me', authMiddleware, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(key => allowedUpdates.includes(key))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
        return
    }

    try {
        // const user = await User.findByIdAndUpdate(
        //     req.params.id,
        //     req.body,
        //     {
        //         new: true,
        //         runValidators: true
        //     }
        // )

        // To make middleware run on save
        // const user = await User.findById(req.params.id)
        // updates.forEach(key => user[key] = req.body[key])
        // await user.save()

        updates.forEach(key => req.user[key] = req.body[key])
        await req.user.save()

        if (!req.user) {
            res.status(404).send('User with this id not found!')
            return
        }
        
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/me', authMiddleware, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     res.status(404).send('User with this id not found!')
        //     return
        // }

        await req.user.remove()
        // sendCancellationEmail(req.user.email)
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logout', authMiddleware, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', authMiddleware, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// const multer = require('multer')
const upload = multer({
    // dest: 'avatars', // To save in the filesystem
    limits: {
        fileSize: 1000000, // 1MB restriction (provided in bytes)
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Only images allowed'))
            return
        }
        cb(undefined, true)

        // cb(new Error('File must be a PDF')) // error
        // cb(undefined, true) // success
        // cb(undefined, false) // outright reject the upload
    }
})

router.post('/users/me/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    // req.user.avatar = req.file.buffer

    const buffer =
        await sharp(req.file.buffer)
            .resize({ width: 250, height: 250 })
            .png().toBuffer()
    req.user.avatar = buffer
    try {
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', authMiddleware, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router