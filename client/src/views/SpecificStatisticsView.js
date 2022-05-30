import React from 'react';
import InvoiceDocItem from '../components/InvoiceDocItem';

export default function SpecificStatisticsView(props) {
  return (
    <div>
        
        
        <div className="row row-cols-12 border-bottom border-danger border-3 my-3">
    {props.invoicesFromApp.map((i) =>
      i.invoiceItems.map((it, index) => (
        // arrow function, so it doesn't get called immediately but only after a click
        <InvoiceDocItem
          key={index}
          billCatFromApp={props.billCatFromApp}
          invoiceFromDoc={it}
        />
      ))
    )}
  </div></div>
  )
}
