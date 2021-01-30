const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Gaz'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Gaz'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        message: 'Help message',
        title: 'help title',
        name: 'Gaz'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'Help article not found.',
        title:'Help page 404',
        name:'Gaz'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        message:'Page not found.',
        name:'Gaz'
    })
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})