import React from 'react';

function HomeView() {
  //
  // Home Page, for introductory text
  //

  return (
    <>
      <p className="h4 col-10 offset-1">
        Welcome to Wages for carework - your handy invoice tool for invisible
        labor!
      </p>

      <div className="HomeView col-4 offset-4">
        <figure className="figure">
          <img
            src="/images/Shouting.jpg"
            className="figure-img img-fluid mb-0"
            alt="An error occurred"
          />
          <figcaption className="figure-caption text-center">
            <a
              className="link-secondary"
              href="https://www.freepik.com/vectors/bullhorn"
            >
              Bullhorn vector created by iwat1929 - www.freepik.com
            </a>
          </figcaption>
        </figure>
      </div>
    </>
  );
}

export default HomeView;
