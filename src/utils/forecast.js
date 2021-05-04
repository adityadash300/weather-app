const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.FORECAST_API_KEY}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=yes`

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        } else if (body.error){
            callback(body.error.message, undefined)
        } else {
            callback(undefined, {
                summary: `${body.forecast.forecastday[0].day.condition.text}. It is currently ${body.current.temp_c} degress out today. The temperature can vary between ${body.forecast.forecastday[0].day.mintemp_c} to ${body.forecast.forecastday[0].day.maxtemp_c}. The chances of precipitation is ${body.forecast.forecastday[0].day.daily_chance_of_rain}% and chances of snow is ${body.forecast.forecastday[0].day.daily_chance_of_snow}%.`,
                alerts: body.alerts.alert,
                imageSource: body.forecast.forecastday[0].day.condition.icon,
                chanceOfSnow: body.forecast.forecastday[0].day.daily_chance_of_snow
            })
        }
    })
}


module.exports = forecast