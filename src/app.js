const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000


const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname , '../public') 
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join (__dirname , '../templates/partials')

//Setup handlebars engine and views location
app.set('views' , viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title : "Weather",
        name : "Chee You"
    })
}
)
app.get('/about',(req,res) =>{
    res.render('about',{
        title : "About",
        name : "Chee You"
    })
})

app.get('/help',(req,res) =>{
    res.render('help', {
        title : "Help",
        name : "Chee You",
        helpText : "This is some helpful text"

    })
})

app.get('/weather',(req, res) => {
    console.log(req.query)
    if (!req.query.address)
    {
        return res.send(
            {
                error: 'You must provide an address'
            }
        )

    }
    geocode(req.query.address,(error,{latitude,longtitude,location} = {} ) =>
    {
        if (error)
        {
            return res.send (
            {
                error
            }
            )
        }
        forecast ( latitude , longtitude , (error , forecastData) =>
        {
            if (error)
            {
                return res.send(
                    {
                        error
                    }
                )
            }
            res.send( 
                { forecast: forecastData ,
                  location: location,
                  address: req.query.address   
                }
            )
        }   
        )
    }
    )
    // res.send(
    //     {
    //         forecast : 'Is is snowing',
    //         location : 'Chicago',
    //         address  : req.query.address

    //     }
    // )
    
})



app.get('*' , (req , res) =>
 res.render('404', {
    title : '404',
    name : 'Chee You',
    ErrorMessage : 'Page cannot be found'
 })
)

app.listen(port, () => 
{
    console.log('server is up on port :'  + port)
}
)