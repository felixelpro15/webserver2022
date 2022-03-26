const path = require('path')
const express = require('express')
const { rmSync } = require('fs')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars and views location
const app = express()
const port = process.env.PORT || 3000
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('/about',(req, res)=>{
    res.render('about',{
        
        title: 'About me',
        name: 'Felix Curiel'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Felix Curiel'
    })
})
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Felix Curiel'
    })
})

app.get('/help', (req, res)=>{

    res.send([{
        name:"Andrew"},{
            name:"Felix"
    }])
})

app.get('/about',(req, res)=>{
    res.send('<h1>Acerca de mi</h1>')
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
            }

            geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
                if(error){
                  return console.log(error)
                }
             
              forecast(latitude, longitude, (error, forecastData) => {
               if(error){
                 return console.log(error)
               }
               res.send({ 
                forecast:forecastData,
                location, //location:'Panama City' Se puede escribir asi tambien 
                address: req.query.address
            })
             })
             })
/*
    res.send({ 
        forecast:"It is snowing",
        location:"Philadelphia", //location:'Panama City' Se puede escribir asi tambien 
        address: req.query.address
    })*/
})


app.get('/products', (req, res)=>{
    if(!req.query.search){
return res.send({
    error: 'You must provide a search term'
})
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404Help',
        name:'Felix Curiel',
        error:'Help article not found'
    })
})
app.get('*', (req, res)=>{
res.render('404', {
    title:'404',
    name:'Felix Curiel',
    error:'Page not found'
})
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})//Comando importante para iniciar la aplicacion 
