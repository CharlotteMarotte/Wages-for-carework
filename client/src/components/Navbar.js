import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div>
      <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle">
        <i></i>
      </a>
      <aside id="colorlib-aside" role="complementary" class="js-fullheight">
        <nav id="colorlib-main-menu" role="navigation">
          <ul>
            <li class="colorlib-active">
              <a href="#">Home</a>
            </li>
            <li>
              {' '}
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              {' '}
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              {' '}
              <NavLink to="/create">Create Invoice</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Navbar;
