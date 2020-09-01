import { create } from 'apisauce'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall?'
const API_KEY = '3076f2470cc437a292f392830425c9dc'

// define the api
const api = create({
    baseURL: BASE_URL,
    headers: { Accept: 'application/vnd.github.v3+json' },

})
//define user Api
const getWeather = async (lat, log) => {
    let endpoint = BASE_URL + 'lat=' + lat + '&lon=' + log + '&exclude=hourly,minutely&appid=' + API_KEY
    console.log('endpoint', endpoint)

    const response = await api.get(endpoint)
    console.log('response', response.data)
    const data = response.data
    if (response.status > 400) {
        throw new Error(data.errors)
    }
    return data;
}
export { getWeather }
