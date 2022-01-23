const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

// router.post('/tasks', (req, res) => {
//     const task = new Task(req.body)

//     task.save()
//         .then(() => res.status(201).send(task)) // Works same as data => res.status(201).send(data)
//         .catch(error => res.status(400).send(error))
// })

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task) // Works same as data => res.status(201).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

// router.get('/tasks', (req, res) => {
//     Task.find({})
//         .then(tasks => {
//             res.send(tasks)
//         })
//         .catch(error => res.status(500).send(error))
// })

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

// router.get('/tasks/:id', (req, res) => {
//     Task.findById(req.params.id)
//         .then(task => {
//             if (!task) {
//                 res.status(404).send('Not found such task')
//                 return
//             }
//             res.send(task)
//         })
//         .catch(error => res.status(500).send(error))
// })

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            res.status(404).send('Not found such task')
            return
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdates = updates.every(key => allowedUpdates.includes(key))

    if (!isValidUpdates) {
        res.status(400).send('Invalid updates')
        return
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            res.status(404).send('Not found such task')
            return
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send('Not found such task')
            return
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router