import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <button
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-12 d-flex justify-content-center mb-3">
            <NavLink to="/" className="navbar-brand">
              <img
                id="MDB-logo"
                src="https://2thepoint.in/wp-content/uploads/2021/01/288eb597-8203-426f-aff1-72d2cf358736.jpeg"
                alt="Wages for housework logo"
                draggable="false"
                height="130"
              />
            </NavLink>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav align-items-center mx-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link mx-2">
                    <i className="fas fa-plus-circle pe-2"></i>Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link mx-2">
                    <i className="fas fa-plus-circle pe-2"></i>About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/enter-data" className="nav-link mx-2">
                    <i className="fas fa-plus-circle pe-2"></i>Demographic Data
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/create" className="nav-link mx-2">
                    <i className="fas fa-plus-circle pe-2"></i>Create Invoice
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/statistics" className="nav-link mx-2">
                    <i className="fas fa-plus-circle pe-2"></i>Statistics
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
