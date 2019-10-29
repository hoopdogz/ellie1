const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather Application',
    name: 'Benjamin Greger'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Benjamin Greger'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Benjamin Greeger'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Give a address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      })
    })
  })

  
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You have made a grave mistake'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Looks like you could use some help!'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Ooooooooooooooooooooooooooops!'
  })
})

app.listen(3000, () => {
  console.log('I am running on port 3000.')
})