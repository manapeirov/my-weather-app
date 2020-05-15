
import { combineReducers } from 'redux'


import MultipleCitiesReducer from './MultipleCitiesReducer'
import OneCityReducer from './OneCityReducer'

const rootReducer = combineReducers({
    weatherForCities: MultipleCitiesReducer,
    weatherForCity: OneCityReducer
})



export default rootReducer