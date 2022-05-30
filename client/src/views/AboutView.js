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
    </div>
  );
}

export default AboutView;
