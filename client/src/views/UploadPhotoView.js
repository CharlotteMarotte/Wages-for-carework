import React, { useState } from 'react';

export default function UploadPhotoView(props) {
  const [image, setImage] = useState(null);

  function handleFileChange(event) {
    setImage(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Create FormData obj and append everything to upload
    let imageData = new FormData();
    imageData.append('clientimage', image, image.name);
    imageData.append('userID', props.user.id)

    // Call parent's callback
    props.uploadFileCb(imageData);

    // Reset everything
    setImage(null); // remove imagename of previous image
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="container py-5 h-100 mx-auto">
      <label>
        File
        <input
          className="btn btn-outline-dark btn-signup text-uppercase "
          type="file"
          onChange={handleFileChange}
          required
        />
      </label>

      <button
        className="btn btn-outline-dark btn-signup text-uppercase "
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
