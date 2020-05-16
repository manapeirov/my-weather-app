import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import DashboardPage from "./pages/DashboardPage"
import SingleCityWeatherPage from "./pages/SingleCityWeatherPage"
import NavBar from "./components/NavBar"

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/city/:id" component={SingleCityWeatherPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
