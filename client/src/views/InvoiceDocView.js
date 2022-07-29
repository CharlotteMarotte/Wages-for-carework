import React from 'react';
import './InvoiceDocView.css';
import InvoiceDoc from '../components/InvoiceDoc';

export default function InvoiceDocView(props) {
  // sometimes a weird bug was occuring where either currInvoice or billCatFromApp was empty, so I tried to catch this error
  if (!props.billCatFromApp.length) {
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
    <div>
      <InvoiceDoc />
    </div>
  );
}
