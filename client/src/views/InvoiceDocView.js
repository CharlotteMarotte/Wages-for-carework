import React, { useEffect, useState } from 'react';
import './InvoiceDocView.css';
import InvoiceDocItem from '../components/InvoiceDocItem';

export default function InvoiceDocView(props) {
  let [currInvoice, setCurrInvoice] = useState(null);
  let [total, setTotal] = useState(props.ix);

  useEffect(() => {
    props.getInvoicesCb();
    getLastInvoice();
    getTotalAmount(1);
  }, []);

  async function getLastInvoice() {
    try {
      let response = await fetch('/invoices/last-invoice'); // does GET by default
      if (response.ok) {
        let invoiceData = await response.json();
        setCurrInvoice(invoiceData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getTotalAmount(id) {
    try {
      let response = await fetch(`/invoices/${id}/total`); // does GET by default
      if (response.ok) {
        let calcTotal = await response.json();
        setTotal(calcTotal);
      } else {
        // function calls goes into this else condition
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  if (!currInvoice || !props.billCatFromApp.length) {
      return <div>Waiting for data to load...</div>;
    }
  return (
    <div>
      <div className="InvoiceDocView">
        <div className="seperatorDoc"></div>
        <p>
          {/* FROM: {props.invoicesFromApp.nameFrom}{' '}
          {props.invoicesFromApp.emailFrom} */}
          FROM: {currInvoice.nameFrom}{' '}
          {currInvoice.emailFrom}
        </p>
        <p>
          {/* TO: {props.invoicesFromApp.nameTo} {props.invoicesFromApp.emailTo} */}
          TO: {currInvoice.nameTo}{' '}
          {currInvoice.emailTo}
        </p>
        {/* <p>INVOICE DATE: {props.invoicesFromApp.invoiceDate.slice(0, 10)} </p> */}
        <p>INVOICE DATE: {currInvoice.invoiceDate} </p>
        <div className="InvoiceDocView"></div>
        <div className="InvoiceDocGrid">
          <p>Description</p>
          <p>Rate</p>
          <p>Quantity</p>
          <p>Amount</p>
        </div>
        <div className="InvoiceDocItems">
          {currInvoice.invoiceItems.map((i) => (
            // arrow function, so it doesn't get called immediately but only after a click
            <InvoiceDocItem
              key={i.id}
              billCatFromApp={props.billCatFromApp}
              invoiceFromDoc={i}
            />
          ))}
        </div>
        <div className="seperatorDoc"></div>
        <p>Total: {total} €</p>
      </div>
    </div>
  );
}
