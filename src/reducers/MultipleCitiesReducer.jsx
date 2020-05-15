export const initialState = {
    
    weatherData: [
        {
            city: 'London',
            currentTemp: '25°C',
            lowTemp: '7°C',
            humidity: '43%'
        },
        {
            city: 'York',
            currentTemp: '50°C',
            lowTemp: '34°C',
            humidity: '80%'
        },
        {
            city: 'Sheffiled',
            currentTemp: '17°C',
            lowTemp: '-6°C',
            humidity: '2%'
        },
        {
            city: 'Newcastle',
            currentTemp: '100°C',
            lowTemp: '90°C',
            humidity: '100%'
        },
        {
            city: 'Nottingham',
            currentTemp: '5°C',
            lowTemp: '0°C',
            humidity: '5%'
        },
        {
            city: 'Leeds',
            currentTemp: '22°C',
            lowTemp: '15°C',
            humidity: '45%'
        },

    ],

    oneCityWeatherData: {},

    loading: false,
    hasErrors: false,
    dashboard: true,
    loadingUserCity: false,
    userCityHasErrors: false
}

// export default function MultipleCitiesReducer (state = initialState , action) {
//     return state
    
// }

export default function MultipleCitiesReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_CITIES_WEATHER':
            return { ...state, loading: true }
        case 'GET_CITIES_WEATHER_SUCCESS':
            return { weatherData: action.payload, loading: false, hasErrors: false}
        case 'GET_CITIES_WEATHER_FAILURE':
            return { ...state, loading: false, hasErrors: true }
        case 'GET_USER_CITY':
            return { ...state, loadingUserCity: true }
        case 'GET_USER_CITY_SUCCESS': 
            return { ...state, weatherData: [action.payload, ...state.weatherData], loadingUserCity: false }
        case 'GET_USER_CITY_FAILURE':
            return { ...state, loadingUserCity: false, userCityHasErrors: true }
        default: 
            return state
    }
}

export const fetchCitiesWeatherData = () => {
    return async dispatch => {
        dispatch({ type: 'GET_CITIES_WEATHER' })
        try {
            const response = await 
                // fetch (`http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=555fb79c6e515cbe4270109ac03e2ffb`)
                fetch(`http://api.openweathermap.org/data/2.5/box/city?bbox=-4,50,1,55,7&appid=555fb79c6e515cbe4270109ac03e2ffb`)
            const data = await response.json()

            // console.log('fetch', data)
            const payload = data.list.map(d => ({
                id: d.id,
                city: d.name,
                currentTemp: `${(d.main.temp / 10).toFixed(1)} °C`,
                lowTemp:  `${( d.main.temp_min/ 10).toFixed(1)} °C`,
                humidity: `${d.main.humidity} %`
            }))

            dispatch({ type: 'GET_CITIES_WEATHER_SUCCESS', payload})

        } catch (error) {
            dispatch({ type: 'GET_CITIES_WEATHER_FAILURE' })
        }
    }
}


export const fetchCityAddedWeatherData = cityName => {
    return async dispatch => {
        dispatch({ type: 'GET_USER_CITY'})

        try {

            const response = await 
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=555fb79c6e515cbe4270109ac03e2ffb`)
            const data = await response.json()

            console.log('fetch user city weather', data)

            const payload = {
                id: data.id,
                city: `${data.name}`,
                currentTemp: `${(data.main.temp / 10).toFixed(1)} °C`,
                lowTemp:  `${( data.main.temp_min/ 10).toFixed(1)} °C`,
                humidity: `${data.main.humidity} %`,
            }

            console.log('user city payload', payload)

            dispatch({ type: 'GET_USER_CITY_SUCCESS', payload})
        } catch (error) {
            dispatch({ type: 'GET_USER_CITY_FAILURE' })
        }
    }
}


