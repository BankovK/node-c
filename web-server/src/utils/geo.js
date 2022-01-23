const request = require('postman-request')

module.exports = {
    geocode(address, callback) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmFua2EiLCJhIjoiY2t5aXdtbmVrMDE5dTJ2dWZteHV3cTh2cyJ9.1Bs3EAoitzUYp3WzZeCBwA&limit=1`
    
        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback(error.message, undefined)
                return
            }
            if (!body.features.length) {
                callback('No results for this address!', undefined)
                return
            }
            const {center: centerData, place_name: location} = body.features[0]
            callback(undefined, {
                latitude: centerData[1],
                longitude: centerData[0],
                location
            }
            )
        })
    }
}