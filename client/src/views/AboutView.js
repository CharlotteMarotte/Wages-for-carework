import React from 'react';

function AboutView(props) {
  return (
    <div className="AboutView col-6 offset-3 ">
      <h2>About</h2>

      <blockquote className="blockquote">
        <p>
          “We, the women of the United States, are fed up. After 200 years of
          American Independence, we are still overworked and underpaid. We are
          still not independent.”
        </p>
      </blockquote>
      <figcaption className="blockquote-footer">
        Wages for Housework Collective{' '}
        <cite title="Source Title">
          Manifesto
        </cite>
      </figcaption>
      <img src="https://cherwell.org/wp-content/uploads/2020/07/Wages-for-Housework-.png" className="img-fluid col-6 offset-3 mb-4"/>
    </div>
  );
}

export default AboutView;
