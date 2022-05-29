import React, { useState } from 'react';

import './InvoiceDocItem.css';

export default function InvoiceDocItem(props) {
  return (
    <>
      <div className="col-3">
        <p>{props.invoiceFromDoc.category}</p>
      </div>
      <div className="col-3">
        <p>{props.invoiceFromDoc.rate + ' €/h'}</p>
      </div>
      <div className="col-3">
        <p>{props.invoiceFromDoc.hours}</p>
      </div>
      <div className="col-3">
        <p>{props.invoiceFromDoc.amount + ' €'}</p>
      </div>
    </>
  );
}
