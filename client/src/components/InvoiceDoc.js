import React, { } from 'react';
import '../views/InvoiceDocView.css';
import './InvoiceDoc.css';
import InvoiceDocItem from './InvoiceDocItem';

// class component because it was needed for react-to-print
export default class InvoiceDoc extends React.Component {  
 
  render(){
    if (!this.props.currInvoice ) {
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
      <div className="row col-6 offset-3 InvoiceDocView mb-10">
        <div className="col-3 offset-2">
          <h3>FROM:</h3>
        </div>
        <div className="col-3">
          <p>{this.props.currInvoice.firstNameFrom + ' ' + this.props.currInvoice.lastNameFrom}</p>
        </div>
  
        <div className="col-3">
          <p> {this.props.currInvoice.emailFrom}</p>
        </div>
        <div className="col-3 offset-2">
          <h3>TO:</h3>
        </div>
        <div className="col-3">
          <p>{this.props.currInvoice.nameTo}</p>
        </div>
  
        <div className="col-3">
          <p>{this.props.currInvoice.emailTo}</p>
        </div>
        <div className="col-4 Date offset-2">
          <h3>INVOICE DATE:</h3>
        </div>
        <div className="col-4 Date offset-2">
          <p>{this.props.currInvoice.invoiceDate.slice(0, 10)} </p>
        </div>
        <div className="col-12 Date offset-2 mb-3">
          <h3>INVOICE NO: {this.props.currInvoice.id} </h3>
        </div>
        <div className="row row-cols-12 border-top border-bottom border-dark border-3 py-2">
          <h4 className="col-3">Category</h4>
          <h4 className="col-3">Rate</h4>
          <h4 className="col-3">Hours</h4>
          <h4 className="col-3">Amount</h4>
        </div>
        <div className="row row-cols-12 border-bottom border-dark border-3 my-3">
          {/* similar to map function in CreatInvoiceView, maps over all invoiceItems in last invoice to create lines with rate, hours, amount for invoice */}
          {this.props.currInvoice.invoiceItems.map(
            (
              it,
              index // index as second argument because React needs something for key property
            ) => (
              // arrow function, so it doesn't get called immediately but only after a click
              <InvoiceDocItem
                key={index}
                invoiceFromDoc={it}
              />
            )
          )} 
        </div>
        <p className="offset-10">Total: {this.props.currInvoice.total} €</p>
      </div>
    );
  }  
}
