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

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Fernando Torrado'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Abaout Me',
        name: 'Fernando Torrado'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpfull text.',
        title: 'Help',
        name: 'Fernando Torrado'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address term.'
        })
    }

    
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })

            }
            
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
        
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found!',
        title: '404',
        name: 'Fernando Torrado'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found!',
        title: '404',
        name: 'Fernando Torrado'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
    
})