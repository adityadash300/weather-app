const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherapi.com/v1/forecast.json?key=ec19d1b2522d47b6b6442401212304&q=${latitude},${longitude}&days=1&aqi=yes&alerts=yes`

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        } else if (body.error){
            callback(body.error.message, undefined)
        } else {
            callback(undefined, {
                summary: `${body.forecast.forecastday[0].day.condition.text}. It is currently ${body.current.temp_c} degress out today. The temperature can vary between ${body.forecast.forecastday[0].day.maxtemp_c} to ${body.forecast.forecastday[0].day.mintemp_c}.`,
                
                alerts: body.alerts.alert
            })
        }
    })
}


module.exports = forecast