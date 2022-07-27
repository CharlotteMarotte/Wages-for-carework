import React from 'react';

export default function ShowAverages(props) {
  if (!props.averageAll) {
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
      {props.general && (
        <>
          {/* only show if shown in general statitics view */}
          <p>Currently {props.countInvoices} invoices have been created!</p>

          <p>
            All users combined have worked {props.totalHours} h for free with a
            monetary value of {props.totalOfAll} €.
          </p>
        </>
      )}
      {props.averageAll.map((a, index) => (
        <section key={index}>
          <h3>{a.catName}</h3>
          <p>On average users spent {a.avgHour}h on this task.</p>
          <p>On average users set their rate to {a.avgRate}€ for this task.</p>
          <p>
            On average the monetary value for this task would have been{' '}
            {a.avgAmount}€.
          </p>
        </section>
      ))}
    </div>
  );
}
