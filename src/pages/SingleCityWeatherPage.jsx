import React, { useEffect } from "react"
import { connect } from "react-redux"
import CityWeather from "../components/CityWeather"

import { fetchCityWeatherData } from "../reducers/OneCityReducer"

const SingleCityWeatherPage = ({
  match,
  weatherData,
  loading,
  hasErrors,
  dispatch,
}) => {
  useEffect(() => {
    const { id } = match.params
    dispatch(fetchCityWeatherData(id))
  }, [dispatch, match])

  console.log(weatherData)

  const renderSingleCityWeather = () => {
    if (loading) return <p>Loading Weather...</p>
    if (hasErrors) return <p>Unable to display weather</p>
    return (
      <CityWeather
        key={weatherData.id}
        cityWeatherData={weatherData}
        singleCity
      />
    )
  }

  return <div>{renderSingleCityWeather()}</div>
}

const mapStateToProps = (state) => ({
  weatherData: state.weatherForCity.weatherData,
  loading: state.weatherForCity.loading,
  hasErrors: state.weatherForCity.hasErrors,
})

export default connect(mapStateToProps)(SingleCityWeatherPage)
