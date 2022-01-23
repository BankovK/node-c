// console.log('Starting')

// setTimeout(() => {
//     console.log('2 Second Timer')
// }, 2000)

// setTimeout(() => {
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stoping')

//-------------------------------------------------

const geoUtils = require('./utils/geo')
const forecastUtils = require('./utils/forecast')
const { argv } = require('process')

const address = argv[2]
if (!address) {
    console.log('Provide an address!')
    return
}
geoUtils.geocode(address, (error, { latitude, longitute, location } = {}) => {
    if (error) {
        console.log(error)
        return
    }
    forecastUtils.forecast(latitude, longitute, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        console.log(location)
        console.log(data)
    })
})
