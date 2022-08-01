import React from 'react';

function HomeView() {
  //
  // Home Page, for introductory text
  //

  return (
    <div className="HomeView col-6 offset-3">
      <p>
        This Website was created as a project during a Full Stack Development
        Bootcamp at CodeOp. Building on my research for my{' '}
        <a href="https://books.google.de/books/about/K%C3%BCnstliche_k%C3%BCnstliche_Intelligenz.html?id=bvaGzgEACAAJ&redir_esc=y">
          Bachelor Thesis about Invisible Labor in Artificial Intelligence
        </a>{' '}
        and my studies with Dr. Kimberly George in the{' '}
        <a href="https://www.feminismschool.com/courses/caliban-and-the-witch-in-a-time-of-covid-19-v2">
          Caliban and the Witch in a Time of COVID-19
        </a>
        .
        Feel free to browse along, create an invoice, evaluate the statistics of other invoices created.
      </p>
    </div>
  );
}

export default HomeView;
