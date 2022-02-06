// io() // That's it! Nothing else is needed for connection!

// This file has access to 'io' because we put
// <script src="/socket.io/socket.io.js"></script>
// before
// <script src="/js/chat.js"></script>


const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormBtn = $messageForm.querySelector('button')

const $messages = document.querySelector('#messages')

const $sendLocationBtn = document.querySelector('#send-location')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationsTemplate = document.querySelector('#message-location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the last message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (data) => {
    console.log('Message: ', data)
    const html = Mustache.render(messageTemplate, {
        message: data.text,
        username: data.username,
        createdAt: moment(data.createdAt).format('DD.MM HH:mm')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage', (data) => {
    console.log(data)
    const html = Mustache.render(locationsTemplate, {
        link: data.url,
        username: data.username,
        createdAt: moment(data.createdAt).format('DD.MM HH:mm')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    $messageFormBtn.setAttribute('disabled', 'disabled')

    socket.emit('newMessage', event.target.elements.message.value, (callbackMessage) => {
        $messageFormBtn.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (callbackMessage) {
            console.log('Error: ', callbackMessage)
            return
        }
        console.log('Message was delivered!')
    })
})

$sendLocationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Geolocation not supported by your browser.')
        return
    }

    $sendLocationBtn.setAttribute('disabled', true)
    
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        const {latitude, longitude} = position.coords
        socket.emit('sendLocation', {latitude, longitude}, (callbackMessage) => {
            console.log(callbackMessage)
            $sendLocationBtn.removeAttribute('disabled')
        })
    })
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

// socket.on('updatedCount', (data) => {
//     console.log('Updated Count: ', data);
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked');
//     socket.emit('incrementCount')
// })