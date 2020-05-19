import React, { useState } from "react"
import { connect } from "react-redux"
import { fetchCityAddedWeatherData } from "../reducers/MultipleCitiesReducer"

const AddCityForm = ({
  loading,
  hasErrors,
  weatherData,
  dispatch,
  success,
}) => {
  const [city, setCity] = useState({ name: "" })
  const [previousCity, setPreviousCity] = useState({ name: "" })
  const [displayResult, setDisplayResult] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)

  const handleFieldChange = (event) => {
    setCity({ name: event.target.value })
    setPreviousCity({ name: event.target.value })
    setDisplayResult(false)
    setIsDuplicate(false)
    // console.log(city)
  }

  const keyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  const handleSubmit = (event) => {
    if (
      weatherData.filter(
        (entry) => entry.city.toLowerCase() === city.name.toLowerCase()
      ).length === 0
    ) {
      dispatch(fetchCityAddedWeatherData(city.name))
      setDisplayResult(true)
    } else {
      setIsDuplicate(true)
    }
    setCity({ name: "" })
    // console.log(weatherData)
  }

  const renderResults = () => {
    if (loading)
      return (
        <section>
          <p className="searchResults">Searching...</p>
        </section>
      )
    if (hasErrors && displayResult)
      return (
        <section>
          <p className="searchResults">
            Unable to find the city '{previousCity.name}', please try again.
          </p>
        </section>
      )
    if (isDuplicate) {
      return (
        <section>
          <p className="searchResults">
            {previousCity.name.charAt(0).toUpperCase() +
              previousCity.name.slice(1)}{" "}
            is already on the list!
          </p>
        </section>
      )
    }
    if (success && displayResult)
      return (
        <section>
          <p className="searchResults">{weatherData[0].city} has been added.</p>
        </section>
      )
  }

  return (
    <section>
      <form
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <label>City</label>
        <input
          type="text"
          name="city"
          value={city.name}
          placeholder="Enter City Name"
          onChange={handleFieldChange}
          onKeyDown={keyDown}
        />
        <input
          type="button"
          value="Submit"
          onClick={handleSubmit}
          className="submitCity"
        />
      </form>
      {renderResults()}
    </section>
  )
}

const mapStateToProps = (state) => ({
  weatherData: state.weatherForCities.weatherData,
  loading: state.weatherForCities.loadingUserCity,
  hasErrors: state.weatherForCities.userCityHasErrors,
  success: state.weatherForCities.success,
})

export default connect(mapStateToProps)(AddCityForm)
