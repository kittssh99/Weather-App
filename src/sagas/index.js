import WeatherWatcherSaga from './WeatherSaga'
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        WeatherWatcherSaga()
    ]);

}

