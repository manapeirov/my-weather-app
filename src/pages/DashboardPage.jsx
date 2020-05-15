// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import CityWeather from '../components/CityWeather'



// const DashboardPage = ({ weatherData, dashboard }) => {

//     const renderWeather = () => {
//         return (
//             <div className='container'>
//                     {weatherData.map(cityWeather => 
//                     <CityWeather key={cityWeather.city} cityWeatherData={cityWeather} dashboard={dashboard}/>
//                 )}  
//             </div>
//         )
//     }
//     return (
//         <div>
//             <h1>Weather</h1>
//             {renderWeather()}
//         </div>
//     )
// }

// const mapStateToProps = state => ({
//     weatherData: state.weatherForCities.weatherData,
//     dashboard: state.weatherForCities.dashboard
// })


// export default connect(mapStateToProps)(DashboardPage)


import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import CityWeather from '../components/CityWeather'


import { fetchCitiesWeatherData } from '../reducers/MultipleCitiesReducer'
import AddCityForm from '../components/AddCityForm'


const DashboardPage = ({ weatherData, dashboard, dispatch, loading, hasErrors }) => {

    const [showForm, setShowForm] = useState(false)
    const [showButton, setShowButton] = useState(true)

    useEffect(() => {
        dispatch(fetchCitiesWeatherData())
    }, [dispatch])

    const renderWeather = () => {
        if (loading) return <p>Loading Cities...</p>
        if(hasErrors) return <p>Unable to display weather</p>
        console.log('All cities on Dashboard page', weatherData)
        return (
            <div className='container'>
                {weatherData && weatherData.map(cityWeather =>
                    <CityWeather key={cityWeather.id} cityWeatherData={cityWeather} dashboard />
                )}
            </div>
        )
    }


    const handleClick = () => {
        setShowButton(false)
        setShowForm(true)
    }

    return (
        <div>
            <h1>UK Weather App</h1>
            {showButton &&
            <section>
                <button className='addCity' onClick={handleClick}>
                Add City</button>
            </section>
            }
            {showForm && 
                <AddCityForm setShowButton={(p) => setShowButton(p)} setShowForm={(p) => setShowForm(p)} />
            }
            {renderWeather()}
        </div>
    )

    
}

const mapStateToProps = state => ({
    weatherData: state.weatherForCities.weatherData,
    dashboard: state.weatherForCities.dashboard,
    loading: state.weatherForCities.loading,
    hasErrors: state.weatherForCities.hasErrors
})


export default connect(mapStateToProps)(DashboardPage)

// import { fetchCitiesWeatherData } from '../reducers/MultipleCitiesReducer'


// const DashboardPage = ({ dispatch, loading, weatherData, hasErrors }) => {


//     useEffect(() => {
//         dispatch(fetchCitiesWeatherData())
//     }, [dispatch])

//     const renderWeather = () => {
//         if (loading) return <p>Loading posts...</p>
//         if(hasErrors) return <p>Unable to display weather</p>
//         return (
//             <div className='container'>
//                 {weatherData.map(cityWeather => 
//                     <CityWeather key={cityWeather.id} cityWeatherData={cityWeather} />
//                 )}
//             </div>
//         )  
//     }
//     return (
//         <section>
//             <h1>Weather</h1>
//             {renderWeather()}
//         </section>
//     )
// }

// const mapStateToProps = state => ({
//     loading: state.weatherForCities.loading,
//     weatherData: state.weatherForCities.weatherData,
//     hasErrors: state.weatherForCitities.hasErrors
// })



// export default connect(mapStateToProps)(DashboardPage)




{/* <button className='addCity' onClick={() => { return (
    setShowForm(!showForm), setShowButton(!showButton))}}>
    Add City
</button> */}