const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c2b671a837855289978e4c0e712be303&query=' + latitude + ',' + longitude
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const { weather_descriptions, temperature, feelslike, humidity } = body.current
            const strForecast = `${weather_descriptions[0]}. Its is currently ${temperature} degress out. It feels like ${feelslike} degress out. The humidity is ${humidity}%.`
            callback(undefined, strForecast)
        }
    })
}

module.exports = forecast