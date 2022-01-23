require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('61ebd56e1191855a0b55d138', { age: 1 })
//     .then(user => {
//         console.log(user)
//         return User.countDocuments({ age: 1 })
//     })
//     .then(users => {
//         console.log(users)
//     })
//     .catch(error => console.log(error))

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    console.log(user)
    const usersCount = await User.countDocuments({ age })
    return usersCount
}

updateAgeAndCount('61ec00c01bb5237eb5a36e2b', 3)
    .then(count => console.log(count))
    .catch(error => console.log(error))