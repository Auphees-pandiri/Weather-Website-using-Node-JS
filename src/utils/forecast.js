const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/4656c75fc74826d4da41f2cf540585f3/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service.Check your internet connection.',undefined)
        }
        else if(body.error){
            callback('unable to find location.',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary +' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain')
        }
    })
}

module.exports=forecast