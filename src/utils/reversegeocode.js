const request = require('request')

const reverseGeocode = (latitude, longitude, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${latitude},${longitude}.json?access_token=${process.env.GEOCODE_API_KEY}&limit=1`

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = reverseGeocode