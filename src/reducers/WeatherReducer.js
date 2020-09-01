import { CONSTANTS } from '../utils/Constants'

const WeatherReducer = (state = '', action) => {
    if (action.type == CONSTANTS.WEATHER_SUCCESS) {
        return action.payload;
    }
    if (action.type == CONSTANTS.WEATHER_FAIL) {
        return action.payload
    }
    return state;
}

export default WeatherReducer;