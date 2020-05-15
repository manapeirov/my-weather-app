import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchCityAddedWeatherData } from '../reducers/MultipleCitiesReducer'



const AddCityForm = ({ loading, hasErrors, weatherData, dispatch, setShowButton, setShowForm }) => {


    const [city, setCity] = useState({name: ''})

    const handleFieldChange = event => {
        setCity({ name: event.target.value })
        console.log(city)
    }

       
    const handleSubmit = (event) => {
            dispatch(fetchCityAddedWeatherData(city.name))
            setCity({name: ''})
            console.log(weatherData)
            // setShowButton(true)
            // setShowForm(false)
       }
       

    // const handleSubmit = (event, { dispatch }) => {
        
    //     event.preventDefault()
    //     dispatch(fetchCityAddedWeatherData(city))

    //     setShowForm(false)

    //     setShowButton(true)

    //     if (loading) return <p>Validating city name...</p>  

    //     if (hasErrors) return <p>Unable to add city, check the city name entered and try again.</p>

    //     return <p>City successfully added</p>
        

    //     // onAddCity(weather)

    // }

    const renderResults = () => {
        if(loading) return <p>Searching...</p>
        if(hasErrors) return <p>Unable to find city, please try again</p>
        if(city.name) return <p>{city.name} has been added</p>
    }

    return (
        <section>
            <form >
                    <label>City</label>
                    <input type='text' name='city' value={city.name} onChange={handleFieldChange}/>
                <input
                    type="button"
                    value="Submit"
                    onClick={handleSubmit}
                    className='button'/>
            </form>
            {renderResults()}
        </section>

    )

}


const mapStateToProps = state => ({
    weatherData: state.weatherForCities.weatherData,
    loading: state.weatherForCities.loadingUserCity,
    hasErrors: state.weatherForCities.userCityHasErrors
})



export default connect(mapStateToProps)(AddCityForm)




