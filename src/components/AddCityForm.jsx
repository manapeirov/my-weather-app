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

  const handleFieldChange = (event) => {
    setCity({ name: event.target.value })
    setPreviousCity({ name: event.target.value })
    setDisplayResult(false)
    // console.log(city)
  }

  const keyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  const handleSubmit = (event) => {
    dispatch(fetchCityAddedWeatherData(city.name))
    setCity({ name: "" })
    setDisplayResult(true)
    // console.log(weatherData)
  }

  const renderResults = () => {
    if (loading)
      return (
        <section>
          <p style={{ textAlign: "center", marginTop: "2rem" }}>Searching...</p>
        </section>
      )
    if (hasErrors)
      return (
        <section>
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            Unable to find city, please try again
          </p>
        </section>
      )
    if (success && displayResult)
      return (
        <section>
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            {previousCity.name} has been added
          </p>
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
          className="button"
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
