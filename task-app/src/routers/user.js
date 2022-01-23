const express = require('express')
const User = require('../models/user')

const router = new express.Router()

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
        res.status(201).send(data)

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

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
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

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).send('User with this id not found!')
            return
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(key => allowedUpdates.includes(key))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
        return
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if (!user) {
            res.status(404).send('User with this id not found!')
            return
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send('User with this id not found!')
            return
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router