const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=c99b3806df88c95bd12e17cc7c313547&query='+ lat +','+ long +'&units=m'
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Error with HTTP request')
        } else if (body.error){
            callback(body.error.info)
        } else {
            callback(undefined, 'It is currently '+ body.current.temperature +' degrees out. It feels like '+ body.current.feelslike + ' degrees out.')
        }
    })
}
module.exports = forecast