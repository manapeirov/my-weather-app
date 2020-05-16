import React from "react"
import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/" activeStyle={{ color: "#fbc2eb" }} exact>
        Home
      </NavLink>
      {/* {" | "} */}
    </nav>
  )
}

export default NavBar
