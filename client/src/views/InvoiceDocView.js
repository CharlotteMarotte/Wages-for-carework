import React, { useEffect, useState } from 'react';
import './InvoiceDocView.css';
import InvoiceDocItem from '../components/InvoiceDocItem';

export default function InvoiceDocView(props) {
//  let currInvoiceId = props.invoicesFromApp[3].id;

  useEffect(() => {
    props.getInvoicesCb();
    console.log(props.invoicesFromApp);
  }, []);



  if (!props.invoicesFromApp.length || !props.invoicesFromApp.length ) {
    return <div>Waiting...</div>;
  }
  return (
    <div>
      <div className="InvoiceDocView">
        <div className="seperatorDoc"></div>
        <p>
          FROM: {props.invoicesFromApp[0].NameFrom} {props.invoicesFromApp[0].EmailFrom}
        </p>
        <p>
          TO: {props.invoicesFromApp[0].NameTo} {props.invoicesFromApp[0].EmailTo}
        </p>
        <p>INVOICE DATE: {props.invoicesFromApp[0].invoiceDate} </p>
        <div className="InvoiceDocView"></div>
        <div className="InvoiceDocGrid">
          <p>Description</p>
          <p>Rate</p>
          <p>Quantity</p>
          <p>Amount</p>
        </div>
        <div className="InvoiceDocItems">
          <ul>
            {props.billCatFromApp.map((c) => (
              // arrow function, so it doesn't get called immediately but only after a click
              <li key={c.id}>{c.cat_name}</li>
            ))}
          </ul>
          <p> {props.invoicesFromApp[0].rate}</p>
        </div>
        <div className="seperatorDoc"></div>
        <p>Total: 0.0 €</p>
      </div>
    </div>
  );
}
