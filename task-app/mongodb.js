// CRUD

const mongodb = require('mongodb')
const { MongoClient, ObjectId } = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log(error)
        return
    }

    const db = client.db(databaseName)
    
    // db.collection('users').insertOne({
    //     name: 'Name1',
    //     age: 30
    // }, (error, result) => {
    //     if (error) {
    //         console.log(error)
    //         return
    //     }

    //     console.log(result)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Name2',
    //         age: 31
    //     },
    //     {
    //         name: 'Name3',
    //         age: 32
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.log(error)
    //         return
    //     }

    //     console.log(result)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Task1',
    //         completed: true
    //     },
    //     {
    //         description: 'Task2',
    //         completed: false
    //     },
    //     {
    //         description: 'Task3',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.log(error)
    //         return
    //     }

    //     console.log(result)
    // })

    // db.collection('users').find({ age: 30 }).toArray((error, users) => {
    //     if (error) {
    //         console.log(error)
    //         return
    //     }

    //     if (!users.length) {
    //         console.log('Have not found anything!')
    //         return
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 30 }).count((error, count) => {
    //     if (error) {
    //         console.log(error)
    //         return
    //     }

    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectId("61eae0efb6e1b9f25340576d")}, (error, task) => {
    //     if (error) {
    //         console.log(error)
    //         return
    //     }

    //     if (!task) {
    //         console.log('Have not found anything!')
    //         return
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if (error) {
    //         console.log(error)
    //         return
    //     }

    //     if (!tasks.length) {
    //         console.log('Have not found anything!')
    //         return
    //     }

    //     console.log(tasks)
    // })

    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectId('61eac5c99b63dfc1e04981fd')
    //     }, {
    //         $set: {
    //             name: 'NameSetX1'
    //         },
    //         $inc: {
    //             age: 1
    //         }
    //     }
    // ).then((result) => console.log(result)).catch(error => console.log(error))

    // db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }
    // ).then(data => console.log(data)).catch(error => console.log(error))

    // db.collection('users').deleteMany({
    //     age: 32
    // }).then(data => console.log(data)).catch(error => console.log(error))

    db.collection('tasks').deleteOne({
        _id: new ObjectId('61eaccb88630560e9a07e734')
    }).then(data => console.log(data)).catch(error => console.log(error))
})