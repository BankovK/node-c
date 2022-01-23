const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geoUtils = require('./utils/geo')
const forecastUtils = require('./utils/forecast')

const app = express()
const post = process.env.PORT || 3000


// Sets file extension fallbacks: If a file is not found, 
// search for files with the specified extensions and 
// serve the first one found.
const options = {
    extensions: ['htm', 'html']
}

// const publicDirPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirPath))
// OR simply
app.use(express.static('public', options)) // Setup static directory to serve

// Setup handlebars engine
app.set('view engine', 'hbs')

// Setup views location (otherwise it would look for .hbs files in web-server/views folder)
app.set('views', 'templates/views')
// OR set full path:
// app.set('views', path.join(__dirname, '../templates/views'))

hbs.registerPartials('templates/partials')

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Name1'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Name1'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Message text',
        name: 'Name1'
    })
})

// this will never run because of app.use(express.static('public')) with occupies '' route
// app.get('', (req, res) => {
//     res.send('<h1>WeatherApp</h1>')
// })

// !!!
// This would have been necessary if we didn't pass options in app.use(express.static('public', options)) 
//
// app.get('/help', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/help.html'))
// })

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/about.html'))
// })

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        res.send({
            error: '"address" param not set'
        })
        return
    }

    geoUtils.geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({ error })
            return
        }

        forecastUtils.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
                return
            }

            res.send({
                address,
                forecast: forecastData,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    if (!req.query.search) {
        res.send({
            error: '"search" param not set'
        })
        return
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: 'NOT FOUND',
        message: 'Help article not found',
        name: 'Name1'
    })
})

// 404 handling (should be defined last because it looks for path match from top to bottom)
app.get('*', (req, res) => {
    res.render('not-found', {
        title: 'NOT FOUND',
        message: 'Page not found.',
        name: 'Name1'
    })
})

app.listen(post, () => {
    console.log(`Server started on port ${post}!`)
})
