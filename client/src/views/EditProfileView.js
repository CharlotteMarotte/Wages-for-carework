import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EditProfileView.css';

export default function EditProfileView(props) {
  let DEFAULT_FORM = {
    username: props.user.username,
    firstname: props.user.firstname,
    lastname: props.user.lastname,
    email: props.user.email,
    currentpassword: '',
    newpassword: '',
  };

  const [profileData, setProfileData] = useState(DEFAULT_FORM);

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setProfileData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    props.updateUserCb(profileData);
    setProfileData(DEFAULT_FORM);
  }

  return (
    <form
      className="container overflow-hidden row col-6 offset-3"
      onSubmit={handleSubmit}
    >
      {props.updateUserErrorMsg && (
        <div className="alert alert-warning text-center">
          {props.updateUserErrorMsg}
        </div>
      )}

      <div className="g-2 row">
        <label className="form-label col-md-6">
          First name
          <input
            onChange={handleInputChange}
            type="text"
            className="form-control myinput"
            name="firstname"
            value={profileData.firstname}
          />
        </label>
        <label className="form-label col-md-6">
          Last name
          <input
            onChange={handleInputChange}
            type="text"
            className="form-control myinput"
            name="lastname"
            value={profileData.lastname}
          />
        </label>
      </div>
      <div className="g-2 row">
        <label className="form-label col-md-12">
          Email
          <input
            onChange={handleInputChange}
            type="text"
            className="form-control myinput"
            value={profileData.email}
            name="email"
          />
        </label>
      </div>
      <div className="g-2 row">
        <label className="form-label col-md-12">
          Username
          <input
            onChange={handleInputChange}
            type="text"
            className="form-control myinput"
            name="username"
            value={profileData.username}
          />
        </label>
        <label className="form-label col-md-6">
          Current Password
          <input
            onChange={handleInputChange}
            type="password"
            className="form-control myinput"
            name="currentpassword"
            autoComplete="on"
            value={profileData.currentpassword}
          />
        </label>
        <label className="form-label col-md-6">
          New Password
          <input
            onChange={handleInputChange}
            type="password"
            className="form-control myinput"
            name="newpassword"
            autoComplete="on"
            value={profileData.newpassword}
          />
        </label>
      </div>
      <div className="g-2 row">
        <Link to="profile" className="btn btn-outline-secondary col-3 m-1">
          Cancel
        </Link>
        <button type="submit" className="btn btn-outline-dark col-3 m-1">
          Save
        </button>
      </div>
    </form>
  );
}
