const request = require('request')
const forecast = (latitude,longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=0c58ee14187fe2e08d7bc9d0ea02638c&query='+latitude+','+longitude+'&units=f'
    request({url:url, json:true}, (error, response)=>{
    if(error){
        callback('Unable to connect to location services!', undefined)
    }else if(response.body.error){
    callback('Unable to find location. Try another search.', undefined)
    }else{
        callback(undefined, response.body.current.weather_descriptions[0]+'. It is currently '+ response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike+ 'The humidity is '+ response.body.current.humidity + '%')
    
    }
    })
    }
    
     module.exports = forecast