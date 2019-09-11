const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlers bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Frenky Valles @2019'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Frenky Valles @2019'
    })
})

app.get('/help', (rew, res) => {
    res.render('help', {
        title:'Ayuda',
        name: 'Frenky Valles @2019',
        contacto: 'frenky98@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send ({ error })
            }
            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })
    })
})      

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        error: 'Help article not found',
        name:  'Frenky Valles @2019'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else 
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        error: 'The page you are trying to reach is not avalible',
        name:  'Frenky Valles @2019'
    })
})

app.listen(3000, () => {
    console.log('Server is up in port 3000')
})