import React from "react"
import { Link } from "react-router-dom"

export const CityWeather = ({ cityWeatherData, dashboard, singleCity }) => {
  // console.log('city in card', cityWeatherData)
  const data = cityWeatherData
  return (
    <div className="card">
      <h2>{cityWeatherData.city}</h2>

      {singleCity ? (
        <p>
          <h3>Weather Summary</h3>
          {data.description} <br />
          Current Temp: {data.currentTemp} <br />
          Low Temp: {data.lowTemp} <br />
          Humidity: {data.humidity} <br />
          Sunrise: {data.sunrise} <br />
          Sunset: {data.sunset} <br />
        </p>
      ) : (
        <p>
          <h3>Weather Summary</h3>
          Current Temp: {data.currentTemp} <br />
          Low Temp: {data.lowTemp} <br />
          Humidity: {data.humidity} <br />
        </p>
      )}
      {dashboard && (
        <Link to={`/city/${cityWeatherData.id}`} className="button">
          View Weather details
        </Link>
      )}
    </div>
  )
}

export default CityWeather
