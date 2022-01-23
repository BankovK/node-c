console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle')
    .then(response => {
        response.json()
            .then(data => {
                console.log(data)
            })
    })

const addressForm = document.querySelector('form')
const addressInput = document.querySelector('input')

const firstMessage = document.querySelector('#first-message')
const secondMessage = document.querySelector('#second-message')

addressForm.addEventListener('submit', (event) => {
    event.preventDefault()

    firstMessage.textContent = ''
    secondMessage.textContent = 'Loading...'
    
    const address = addressInput.value

    fetch(`/weather?address=${encodeURIComponent(address)}`).then(response => {
        response.json().then(({error, ...data}) => {
            if (error) {
                secondMessage.textContent = error
                return
            }

            console.log(data)
            const {location, forecast} = data
            firstMessage.textContent = location
            secondMessage.textContent = forecast
        })
    })
})