import React, { useEffect, useState } from 'react';
import './InvoiceDocView.css';
import InvoiceDocItem from '../components/InvoiceDocItem';

export default function InvoiceDocView(props) {
  let [invoices, setInvoices] = useState([]);
  let [invoiceItems, setInvoiceItems] = useState([]);

  useEffect(() => {
    getInvoices();
    getInvoiceItems();
  }, []);

  async function getInvoices() {
    try {
      let response = await fetch('/invoice'); // does GET by default
      if (response.ok) {
        let invoiceData = await response.json();
        setInvoices(invoiceData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getInvoiceItems() {
    try {
      let response = await fetch('/invoice-items'); // does GET by default
      if (response.ok) {
        let invoiceItms = await response.json();
        setInvoiceItems(invoiceItms);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  if (!invoices.length || !invoiceItems.length ) {
    return <div>Waiting...</div>;
  }
  return (
    <div>
      <div className="InvoiceDocView">
        <div className="seperatorDoc"></div>
        <p>
          FROM: {invoices[0].NameFrom} {invoices[0].EmailFrom}
        </p>
        <p>
          TO: {invoices[0].NameTo} {invoices[0].EmailTo}
        </p>
        <p>INVOICE DATE: {invoices[0].InvoiceDate} </p>
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
              <li key={c.ID}>{c.cat_name}</li>
            ))}
          </ul>
          <p> {invoiceItems[0].rate}</p>
        </div>
        <div className="seperatorDoc"></div>
        <p>Total: 0.0 €</p>
      </div>
    </div>
  );
}
