import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EditProfileView.css';

export default function EditProfileView(props) {
  let DEFAULT_FORM = {
    username: props.user.username,
    firstname: props.user.firstname,
    lastname: props.user.lastname,
    email: props.user.email,
    password: '',
  };

  const [profileData, setProfileData] = useState(DEFAULT_FORM);
  const [image, setImage] = useState(null);

  function handleFileChange(event) {
    setImage(event.target.files[0]);
}

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
    if (profileData.password.length > 0) {
      delete profileData.password; // only send password if it has changed
    }
    profileData.append('clientimage', image, image.name);
    props.updateUserCb(profileData);
    setProfileData(DEFAULT_FORM);
  }

  return (
    <form
      className="container overflow-hidden row col-6 offset-3"
      onSubmit={handleSubmit}
    >
      <div className="g-2 row">
        <label>
          File
          <input type="file" onChange={handleFileChange} required />
        </label>
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
        <label className="form-label col-md-6">
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
          Password
          <input
            onChange={handleInputChange}
            type="password"
            className="form-control myinput"
            name="password"
            autocomplete="on"
            value={profileData.password}
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
