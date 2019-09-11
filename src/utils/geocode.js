const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnJlbmt5OTgiLCJhIjoiY2swY2tzd3k0MTZkYTNicGM1ejJxcW4wNiJ9.NZCUwnF2WwZWI0lQhYF_oQ&limit=1'
    request ({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connecto to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find the Location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode