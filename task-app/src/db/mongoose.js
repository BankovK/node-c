const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
    useNewUrlParser: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Invalid email value!')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Invalid password!')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }
// })

// const user1 = new User({
//     name: '   Name1  ',
//     email: '234@gg.com    ',
//     password: '123456            '
// })

// user1.save()
//     .then((data) => {
//         console.log(data)
//     })
//     .catch(error => console.log('ERROR', error))

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task1 = new Task({
//     description: '  This is task2    ', 
//     completed: true
// })

// task1.save()
//     .then((data) => {
//         console.log(data)
//     })
//     .catch(error => {
//         console.log(error)
//     })