import React from "react"
import { Link } from "react-router-dom"

import cityIcon from "../assets/Mana_city_icon.png"
import cTempIcon from "../assets/Mana_current_temp_icon.png"
import lTempIcon from "../assets/Mana_lowest_temp_icon.png"
import cloudIcon from "../assets/Mana_cloudy_icon.png"
import rainIcon from "../assets/Mana_raining_icon.png"
import snowIcon from "../assets/Mana_snow_icon.png"
import sunIcon from "../assets/Mana_sun_icon.png"
import humidIcon from "../assets/Mana_humid_icon.png"
import sunriseIcon from "../assets/Mana_sunrise_icon.png"
import sunsetIcon from "../assets/Mana_sunset_icon.png"

export const CityWeather = ({ cityWeatherData, dashboard }) => {
  // console.log('city in card', cityWeatherData)
  const data = cityWeatherData

  console.log(data)

  const renderIcons = () => {
    if (data.description && data.description.includes("Clouds"))
      return <img src={cloudIcon} alt="Cloud Icon" className="weatherIcon" />
    if (data.description && data.description.includes("Rain"))
      return <img src={rainIcon} alt="Rain Icon" className="weatherIcon" />
    if (data.description && data.description.includes("Snow"))
      return <img src={snowIcon} alt="Snow Icon" className="weatherIcon" />
    if (data.description && data.description.includes("Clear"))
      return <img src={sunIcon} alt="Sun Icon" className="weatherIcon" />
  }

  const renderDescription = () => {
    const splitString = data.detailedDescription.split(" ")
    const descriptionWordsFixed = splitString.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    return descriptionWordsFixed.join(" ")
  }

  return (
    <div className="card">
      <h2 className="cityNameHeader">
        <div>{data.city}</div>
        <img src={cityIcon} alt="city" className="cityIcon" />
      </h2>
      {!dashboard ? (
        <p style={{ textAlign: "center" }}>
          <h3>Weather Summary</h3>
          {renderIcons()}
          <h4>{data && renderDescription()}</h4>
          <div className="currentTemp">
            <div>Current Temp</div>
            <img
              src={cTempIcon}
              alt="Current Temp Icon"
              className="currentTempIcon"
            />
            : {data.currentTemp} <br />
          </div>
          <div className="lowTemp">
            <div>Low Temp</div>
            <img
              src={lTempIcon}
              alt="Low Temp Icon"
              className="lowTempIcon"
            />: {data.lowTemp} <br />
          </div>
          <div className="humidity">
            <div>Humidity</div>
            <img src={humidIcon} alt="Humidity Icon" className="humidityIcon" />
            : {data.humidity} <br />
          </div>
          <div className="sunrise">
            <div>Sunrise</div>
            <img src={sunriseIcon} alt="Sunrise Icon" className="sunriseIcon" />
            : {data.sunrise} <br />
          </div>
          <div className="sunset">
            <div>Sunset</div>
            <img
              src={sunsetIcon}
              alt="Sunset Icon"
              className="sunsetIcon"
            />: {data.sunset} <br />
          </div>
        </p>
      ) : (
        <p style={{ textAlign: "center" }}>
          <h3>Weather Summary</h3>
          {renderIcons()}
          <div className="currentTemp">
            <div>Current Temp</div>
            <img
              src={cTempIcon}
              alt="Current Temp Icon"
              className="currentTempIcon"
            />
            : {data.currentTemp} <br />
          </div>
          <div className="lowTemp">
            <div>Low Temp</div>
            <img
              src={lTempIcon}
              alt="Low Temp Icon"
              className="lowTempIcon"
            />: {data.lowTemp} <br />
          </div>
          <div className="humidity">
            <div>Humidity</div>
            <img src={humidIcon} alt="Humidity Icon" className="humidityIcon" />
            : {data.humidity} <br />
          </div>
        </p>
      )}
      {dashboard && (
        <Link to={`/city/${data.id}`} className="weatherDetails">
          View Weather details
        </Link>
      )}
    </div>
  )
}

export default CityWeather
