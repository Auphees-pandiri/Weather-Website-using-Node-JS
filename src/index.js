const express=require('express')
const path=require('path')
const hbs=require('hbs')

//importing the 2 files for making api calls
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
const port= process.env.PORT || 3000;

//Path for Views of template engine and partials of template of engines
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

//path for static folder
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'aphees'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'aphees'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:"I can help you",
        name:"aphees"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide a correct address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude,longitude,(error,result)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location:location,
                forecast:result,
                address:req.query.address
            })
        })
    })

    
})


app.get('*',(req,res)=>{
    res.render('error')
})

app.listen(port,()=>{
    console.log('server starts on port',port)
})