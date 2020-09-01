import { combineReducers } from 'redux'
import WeatherReducer from './WeatherReducer'
const rootReducers = combineReducers({
    weatherResponse: WeatherReducer
})

export default rootReducers;
