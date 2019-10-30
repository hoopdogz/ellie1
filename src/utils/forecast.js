const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/ce22d7ac707de0cdc6b25015fcd673b4/${long}, ${lat}`

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location',undefined)
    } else {
      callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + (body.currently.precipProbability)*100 + '% chance of ' + body.currently.precipType + '. The high for today is ' + body.daily.data[0].temperatureMax + ' degrees and the low is ' + body.daily.data[0].temperatureMin + ' degrees.')
    }
  })
}

module.exports = forecast