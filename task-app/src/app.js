const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('./db/mongoose')

const app = express()

// ----------------------------------
// express middleware
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     if (req.method === 'GET') {
//         res.send('GET requests disabled')
//         return
//     }
//     next()
// })

// app.use((req, res, next) => {
//     res.status(503).send('Maintenance! Please stand by')
// })
// ----------------------------------

// ----------------------------------
// upload files
// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })

// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware')
// }

// app.post(
//     '/upload',
//     // upload.single('upload'),
//     errorMiddleware,
//     (req, res) => {
//     res.send()
//     }, (error, req, res, next) => {
//         res.status(400).send({ error: error.message })
//     }
// )
// ----------------------------------

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

// Without routers:

// app.post('/users', (req, res) => {
//     const user = new User(req.body)
    
//     user.save()
//         .then(data => res.status(201).send(data))
//         .catch(error => res.status(400).send(error))
// })

module.exports = app