const request = require('postman-request')

module.exports = {
    forecast(latitude, longitude, callback) {
        const url = `http://api.weatherstack.com/current?access_key=db722e9283b9deed0d4073c7c76bef93&query=${latitude},${longitude}&units=m`
        request({ url, json: true }, (error, response) => {
            if (error) {
                callback(error.message, undefined)
                return
            }
            if (response.body.error) {
                callback(response.body.error.info, undefined)
                return 
            }
            const { temperature, humidity } = response.body.current
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It's currently ${temperature} degrees. Humidity is ${humidity}%`)
        })
    }
}