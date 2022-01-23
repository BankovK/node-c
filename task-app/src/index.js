const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

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

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})