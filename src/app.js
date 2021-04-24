const path = require('path')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set location to static files
app.use(express.static(pubDirPath))


app.get('', (req, res) => {
    res.render('index', {
        page_title: 'Home Page',
        title: 'Weather App',
        name: 'Aditya Dash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        page_title: 'About',
        title: 'About Me',
        name: 'Aditya Dash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        page_title: 'Help',
        title: 'Help Page',
        name: 'Aditya Dash',
        helpText: 'Helpful Text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, {summary}) => {
            if(error){
                return res.send({error})
            }

            res.send({
                location, 
                forecast: summary
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        page_title: 'Help Missing',
        title: '404',
        name: 'Aditya Dash',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        page_title: 'Missing page', 
        title: '404',
        name: 'Aditya Dash',
        errorMessage: 'Page not Found.'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})