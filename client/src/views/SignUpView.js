import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginView from './LoginView';


const EMPTY_FORM = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

function SignUpView(props) {
  const [newUserdata, setNewUserdata] = useState(EMPTY_FORM);

  function handleChange(e) {
    let { name, value } = e.target;
    setNewUserdata((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.addUserCb(newUserdata);
  }

  return (
    <form className="body-background" onSubmit={handleSubmit}>
      {props.registerError && (
        <div className="alert alert-warning text-center">
          {props.registerError}
        </div>
      )}
      <div className="container-fluid d-flex justify-content-center align-items-center h-100">
        <div className="card p-3 text-center py-4">
          <h4>Create account</h4>
          <div>
            <span>Already have an account?</span>{' '}
            <NavLink to="/login">Sign in</NavLink>{' '}
          </div>

          <div className="mt-3 px-3">
            <input
              required
              className="form-control"
              name="username"
              placeholder="Username"
              value={newUserdata.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-group px-3 mt-3">
            <input
              required
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstname"
              value={newUserdata.firstname}
              aria-label="Firstname"
              onChange={handleChange}
            />
            <span></span>
            <input
              required
              type="text"
              className="form-control"
              name="lastname"
              placeholder="Last Name"
              value={newUserdata.lastname}
              aria-label="Lastname"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3 px-3">
            <input
              required
              className="form-control"
              type="email"
              name="email"
              value={newUserdata.email}
              placeholder="E-mail"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3 px-3">
            <input
              required
              className="form-control"
              name="password"
              value={newUserdata.password}
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div className="mt-3 d-grid px-3">
            <button className="btn btn-dark btn-block btn-signup text-uppercase">
              <span>Signup</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUpView;
