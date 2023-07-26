const request = require('request')


const forecast = ( latitude , longtitude , callback ) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=cccf8690318afccee1878433dc880d2e&query=' + latitude + ',' + longtitude

    request({url , json:true},(error, {body}) => {
 
        if (error) 
        {
            callback('Unable to connect weather forecast',undefined)
        }
        else if (body.error)
        {
            callback('unable to forecast', undefined)
        }
            else
            {
                callback(undefined,'It is currently ' + body.current.temperature + ' degree. There is a ' + body.current.precip + '% chance of rain.')
            }
    
        }
    )
}


module.exports = forecast


