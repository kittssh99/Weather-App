import { CONSTANTS } from '../utils/Constants'


const loadWeather = (lat, log) => ({
    type: CONSTANTS.WEATHER,
    lat,
    log
})

const weatherSuccess = payload => ({
    type: CONSTANTS.WEATHER_SUCCESS,
    payload
})

const weatherError = payload => ({
    type: CONSTANTS.WEATHER_FAIL,
    payload
})


export {
    loadWeather,
    weatherSuccess,
    weatherError,
}