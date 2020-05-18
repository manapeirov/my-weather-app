import React from "react"
import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <nav>
      <section>
        <NavLink to="/" activeStyle={{ color: "#fbc2eb" }} exact>
          Home
        </NavLink>
        {/* {" | "} */}
      </section>
    </nav>
  )
}

export default NavBar
