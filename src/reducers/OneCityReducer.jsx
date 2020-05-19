import moment from "moment"

export const initialState = {
  weatherData: {
    description: "clear sky",
    city: "London",
    currentTemp: "25°C",
    lowTemp: "7°C",
    humidity: "43%",
    Sunrise: "5:15",
    Sunset: "20:45",
  },
  loading: true,
  hasErrors: false,
}

const OneCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CITY_WEATHER":
      return { ...state, loading: true }
    case "GET_CITY_WEATHER_SUCCESS":
      // console.log(action.payload)
      return { weatherData: action.payload, loading: false, hasErrors: false }
    case "GET_CITY_WEATHER_FAILURE":
      return { ...state, hasErros: true, loading: false }
    default:
      return state
  }
}

export default OneCityReducer

export function fetchCityWeatherData(cityID) {
  return async (dispatch) => {
    dispatch({ type: "GET_CITY_WEATHER" })

    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=555fb79c6e515cbe4270109ac03e2ffb`
      )
      const data = await response.json()

      console.log(`data fetched`, data)

      const payload = {
        detailedDescription: data.weather[0].description,
        description: data.weather[0].main,
        city: data.name,
        currentTemp: `${(data.main.temp / 10).toFixed(1)} °C`,
        lowTemp: `${(data.main.temp_min / 10).toFixed(1)} °C`,
        humidity: `${data.main.humidity} %`,
        sunrise: moment(data.sys.sunrise * 1000).format("HH:mm"),
        sunset: moment(data.sys.sunset * 1000).format("HH:mm"),
      }

      dispatch({ type: "GET_CITY_WEATHER_SUCCESS", payload })
    } catch (error) {
      dispatch({ type: "GET_CITY_WEATHER_FAILURE" })
    }
  }
}
