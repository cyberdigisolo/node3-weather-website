const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoieWNoZWV5b3UiLCJhIjoiY2xrZjI2eThjMThmMjNmbzZqZXNkNnN6dSJ9.DpaH1l9K-m_LBbGEDbXqPQ' 

    request({url,json:true} , (error, {body}) =>
        {
            if (error)
            {
                callback('Unable to connect to location service', undefined)
            } 
            else if (body.features.length === 0)
            {
             callback('Unable to find location , try another search', undefined)
            } 
            else 
            {
                callback(undefined, {
                    latitude : body.features[0].center[1],
                    longtitude : body.features[0].center[0],
                    location : body.features[0].place_name
                })
            }

        }
    )
}
module.exports = geocode