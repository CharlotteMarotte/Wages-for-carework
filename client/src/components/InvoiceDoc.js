import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './InvoiceDoc.css';
import InvoiceDocItem from './InvoiceDocItem';
import Api from '../helpers/Api';


export default function InvoiceDoc(props) {
  //
  // View to show created invoice after data got submitted
  //

  let { id } = useParams();

  let [currInvoice, setCurrInvoice] = useState(null); // holds last invoice that got posted to DB

  // to get on rendering all invoices, the last invoice and the total amount of the last invoice
  useEffect(() => {
    getInvoice(id);
  }, []);

  async function getInvoice(id) {
    let response = await Api.getInvoice(id);
    try {
      if (response.ok) {
        let invoice = response.data;
        setCurrInvoice(invoice); // set billCats state with all categories, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // sometimes a weird bug was occuring where either currInvoice or billCatFromApp was empty, so I tried to catch this error
  if (!currInvoice || !props.billCatFromApp.length) {
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
    <div className="row col-6 offset-3 InvoiceDocView">
      <div className="col-3 offset-2">
        <h3>FROM:</h3>
      </div>
      <div className="col-3">
        <p>{currInvoice.firstNameFrom + ' ' + currInvoice.lastNameFrom}</p>
      </div>

      <div className="col-3">
        <p> {currInvoice.emailFrom}</p>
      </div>
      <div className="col-3 offset-2">
        <h3>TO:</h3>
      </div>
      <div className="col-3">
        <p>{currInvoice.nameTo}</p>
      </div>

      <div className="col-3">
        <p>{currInvoice.emailTo}</p>
      </div>
      <div className="col-4 Date offset-2">
        <h3>INVOICE DATE:</h3>
      </div>
      <div className="col-4 Date offset-2">
        <p>{currInvoice.invoiceDate.slice(0, 10)} </p>
      </div>
      <div className="col-12 Date offset-2 mb-3">
        <h3>INVOICE NO: {currInvoice.id} </h3>
      </div>
      <div className="row row-cols-12 border-top border-bottom border-dark border-3 py-2">
        <h4 className="col-3">Category</h4>
        <h4 className="col-3">Rate</h4>
        <h4 className="col-3">Hours</h4>
        <h4 className="col-3">Amount</h4>
      </div>
      <div className="row row-cols-12 border-bottom border-dark border-3 my-3">
        {/* similar to map function in CreatInvoiceView, maps over all invoiceItems in last invoice to create lines with rate, hours, amount for invoice */}
        {currInvoice.invoiceItems.map(
          (
            it,
            index // index as second argument because React needs something for key property
          ) => (
            // arrow function, so it doesn't get called immediately but only after a click
            <InvoiceDocItem
              key={index}
              billCatFromApp={props.billCatFromApp}
              invoiceFromDoc={it}
            />
          )
        )} 
      </div>
      <p className="offset-10">Total: {currInvoice.total} €</p>
    </div>
  );
}
