const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0cd10f4a503e67e489d41491b7d94ca0/' + longitude + ',' + latitude + '?units=si&lang=es'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to get the forecast')
        } else if (body.error) {
            callback('Unable to get coordinates')
        } else {
            callback(undefined, body.daily.data[0].summary + ' Actualmente estamos a  ' + body.currently.temperature + ' grados. Con una probabilidad de ' + body.currently.precipProbability + ' % de llover.' + ' Con un Ozono de '+ body.currently.ozone)
        }              
    })
}

module.exports = forecast