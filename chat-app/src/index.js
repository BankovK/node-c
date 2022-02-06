const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
} = require('./utils/users')

const app = express()
const server = http.createServer(app) // To allow using sockets alongside express
const io = socketio(server) // Configuring socketio

const port = process.env.PORT || 3000

const options = {
    extensions: ['htm', 'html']
}
app.use(express.static('public', options)) // Setup static directory to serve

// let count = 0

io.on('connection', (socket) => {
    console.log('New websocket connected!')

    // socket.emit('message', generateMessage('Welcome!'))
    // // Sends the event to all connected sockets exept this socket
    // socket.broadcast.emit('message', generateMessage('New user has joined!'))

    socket.on('join', ({username, room} = {}, callback) => {
        const { user, error } = addUser({ id: socket.id, username, room})

        if (error) {
            callback(error)
            return
        }

        socket.join(user.room)

        // io.to(room).emit() // Emits to everyone in this room
        // socket.broadcast.to(room).emit() // Emits to everyone in this room exept the one sending it 
        socket.emit('message', generateMessage('System', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('System', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('newMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            callback('Inappropriate message!')
            return
        }

        const user = getUser(socket.id)
        if (!user) {
            callback('User not joined!')
            return
        }
        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    // socket.emit('updatedCount', count)

    // socket.on('incrementCount', () => {
    //     count++
    //     // socket.emit('updatedCount', count)
    //     io.emit('updatedCount', count)
    // })
    // // What's the difference between socket.emit and io.emit?
    // // Answer:
    // // Socket sends the event to that specific socket connection
    // // io typically sends the event to all connected sockets.

    socket.on('sendLocation', ({latitude, longitude} = {}, callback) => {
        const user = getUser(socket.id)
        if (!user) {
            callback('User not joined!')
            return
        }
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${latitude},${longitude}`))
        callback('Location acknowledged!')
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('System', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port, () => {
    console.log(`Running on port ${port}`)
})