import { put, call, takeEvery } from 'redux-saga/effects'
import { CONSTANTS } from '../utils/Constants'
import { getWeather } from '../api'
import { weatherSuccess, weatherError } from '../actions'
//we have watcher saga -> which will listen to actions -> and it will invoke the worker saga

//worker saga
function* handleWeatherResponse(action) {
    console.log('action', action)
    try {
        const data = yield call(getWeather, action.lat, action.log)
        console.log('dt', data)
        yield put(weatherSuccess(data))
    } catch (error) {
        console.log('dt', error.toString())
        yield put(weatherError(error.toString()))
    }

}

//watcher saga
export default function* WeatherWatcherSaga() {
    yield takeEvery(CONSTANTS.WEATHER, handleWeatherResponse)

}
