import React from 'react';

function HomeView(props) {
  return (
    <div className="HomeView col-6 offset-3">
      <blockquote className="blockquote">
        <p>
          “[A] woman, working fulltime in the home or outside of it as well,
          married or single, has to put hours of labor into reproducing her own
          labor power, and women well know the tyranny of this task, for a
          pretty dress and hairdo are conditions for their getting the job,
          whether on the marriage market or on the wage labor market.”
        </p>
      </blockquote>
      <figcaption className="blockquote-footer">
        Silvia Federici{' '}
        <cite title="Source Title">
          Revolution at Point Zero: Housework, Reproduction, and Feminist
          Struggle
        </cite>
      </figcaption>
    </div>
  );
}

export default HomeView;
