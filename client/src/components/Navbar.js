import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {
  return (
    <div>
      <nav className="mynavbar navbar navbar-expand-lg navbar-light sticky-top col-8 offset-2">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <img
              id="MDB-logo"
              src="https://2thepoint.in/wp-content/uploads/2021/01/288eb597-8203-426f-aff1-72d2cf358736.jpeg"
              alt="Wages for housework logo"
              draggable="false"
              height="130"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse px-"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 px-5">
              <li className="nav-item px-3">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink className="nav-link active" to="/filter-statistics">
                  Statistics
                </NavLink>
              </li>

              {props.user ? (
                <ul className="navbar-nav">
                  <li className="nav-item px-3">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      // if user is logged in and has already entered their demographic data go directly to CreateInvoiceView
                      to={
                        props.user && props.user.demographicData &&
                        Object.keys(props.user.demographicData).length !== 0
                          ? '/create'
                          : '/enter-data'
                      }
                    >
                      Create 
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={`/profile`}>
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    {/* Log out user. Then go to home page. */}
                    <NavLink
                      className="nav-link"
                      to="/"
                      onClick={props.logoutCb}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
