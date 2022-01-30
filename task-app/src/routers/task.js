const express = require('express')
const Task = require('../models/task')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', authMiddleware, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task) // Works same as data => res.status(201).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /tasks?completed=false
// GET /tasks?limit=20&skip=20
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks', authMiddleware, async (req, res) => {
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    const options = {}
    if (req.query.limit) {
        options.limit = parseInt(req.query.limit)
    }
    if (req.query.skip) {
        options.skip = parseInt(req.query.skip)
    }
    if (req.query.sortBy) {
        options.sort = {}
        const sortByParts = req.query.sortBy.split('_')
        options.sort[sortByParts[0]] = sortByParts[1] === 'desc' ? -1 : 1
    }

    try {
        // await req.user.populate({
        //     path: 'tasks',
        //     match,
        //     options
        // })
        // res.send(req.user.tasks)
        // OR
        const tasks = await Task.find({ owner: req.user._id, ...match }, null, options)
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            res.status(404).send('Not found such task')
            return
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', authMiddleware, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdates = updates.every(key => allowedUpdates.includes(key))

    if (!isValidUpdates) {
        res.status(400).send('Invalid updates')
        return
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send('Not found such task')
            return
        }

        updates.forEach(key => task[key] = req.body[key])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

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