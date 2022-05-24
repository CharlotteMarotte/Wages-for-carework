import React from 'react';
import './InvoiceDocView.css';
import InvoiceDocItem from '../components/InvoiceDocItem';

export default function InvoiceDocView(props) {
  return (
    <div class="InvoiceDocView">
      <div className="seperatorDoc"></div>
      <h1>INVOICE DATE: </h1>
      <h2>BILL TO: THE PATRIARCHY</h2>
      <div className="InvoiceDocView"></div>
      <div className="InvoiceDocGrid">
        <p>Description</p>
        <p>Rate</p>
        <p>Quantity</p>
        <p>Amount</p>
      </div>
      <div className="InvoiceDocItems">
        <ul>
          {props.billCatFromApp.map((p) => (
            // arrow function, so it doesn't get called immediately but only after a click
            <p>{p.name}</p>
          ))}
        </ul>
      </div>
      <div className="seperatorDoc"></div>
      <p>Total: 0.0 €</p>
    </div>
  );
}
