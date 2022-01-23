require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('61ebd6f130e0b9afc534f0b5')
//     .then(task => {
//         console.log(task)
//         return Task.countDocuments({ completed: false })
//     })
//     .then(tasks => {
//         console.log(tasks)
//     })
//     .catch(error => console.log(error))

const deleteTaskAndCount = async (id) => {
    console.log( await Task.findByIdAndDelete(id) )
    const taskCount = await Task.countDocuments({ completed: false })
    return taskCount
}

deleteTaskAndCount('61ec04b65241173f4cfcb645')
    .then(count => console.log(count))
    .catch(error => console.log(error))