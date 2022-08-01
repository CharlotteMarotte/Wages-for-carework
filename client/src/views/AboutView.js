import React from 'react';
import './AboutView.css';

function AboutView(props) {
  //
  // For About text about website
  //

  const books = [
    {
      title: 'Caliban and the witch',
      src: 'https://m.media-amazon.com/images/I/41bF7lJgilL.jpg',
      info: 'Inspiration for this website, thorough analysis by the historian Silvia Federici about the conncetion of the beginning of capitalism, the witch hunts and the coloniazation of the Americas.',
    },
    { src: 'https://m.media-amazon.com/images/I/51QsYeo5BUL.jpg', info: '' },
    {
      src: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545502475l/41962923._SY475_.jpg',
      info: '',
    },
    {
      src: 'https://images-na.ssl-images-amazon.com/images/I/71CQtQt3rqL.jpg',
      info: '',
    },
    {
      src: 'https://images-na.ssl-images-amazon.com/images/I/51wxQFVaUTL._SX336_BO1,204,203,200_.jpg',
      info: '',
    },
    {
      src: 'https://images-na.ssl-images-amazon.com/images/I/417Hrk6NXrL.jpg',
      info: '',
    },
  ];

  if (!books) {
    return (
      <figure className="figure">
        <img
          src="/images/ErrorPage.jpg"
          className="figure-img img-fluid mb-0"
          alt="An error occurred"
        />
        <figcaption className="figure-caption text-center">
          <a href="https://www.vecteezy.com/vector-art/1384282-404-error-concept-for-landing-page-design">
            404 error concept for landing page design Vectors by Vecteezy
          </a>
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="AboutView col-6 offset-3 mb-5">
      <h2>About</h2>

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

      <h3>Book Recomenndations</h3>
      <div class="container text-center">
        <div class="row">
          {books.map((e) => (
            <div class="col-12 col-sm-6 col-lg-4">
              <img src={e.src} alt="Avatar" className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutView;
