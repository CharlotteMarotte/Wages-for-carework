import React, { useEffect, useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import InvoiceDoc from '../components/InvoiceDoc';
import { useParams } from 'react-router-dom';
import Api from '../helpers/Api';

export default function InvoiceDocView(props) {
  let { id } = useParams();
  let componentRef = useRef();

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
  if (!props.billCatFromApp.length) {
    return (
      <figure className="figure">
        <img
          src="/images/ErrorPage.jpg"
          className="figure-img img-fluid mb-0"
          alt="An error occurred"
        />
        <figcaption className="figure-caption text-center">
          <a className="link-secondary" href="https://www.vecteezy.com/vector-art/1384282-404-error-concept-for-landing-page-design">
            404 error concept for landing page design Vectors by Vecteezy
          </a>
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="mb-5">
      {/* invoice to be printed */}
      <InvoiceDoc currInvoice={currInvoice} ref={(el) => (componentRef = el)} />

      {/* button to trigger printing of invoice */}
      <ReactToPrint
        pageStyle={`
        @page {
          size: auto;
          margin-top: 50mm;
        }
  
`}
        trigger={() => (
          <button className="col-auto offset-5 btn btn-outline-dark btn-signup text-uppercase mb-5">
            Print invoice
          </button>
        )}
        content={() => componentRef}
      />
    </div>
  );
}
