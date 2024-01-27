import React from 'react'
import "./Navbar.css"
import {Link} from 'react-router-dom'
export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <h1>Foodie</h1>
      </div>
      <div className="nav-right">
        <Link to="/orders" style={{ textDecoration: "none" }}>
          <p>Orders</p>
        </Link>

        <Link to="/addfood" style={{ textDecoration: "none" }}>
          <p>Add food</p>
        </Link>
      </div>
    </div>
  );
}
