import React, { useState } from 'react';

import './InvoiceDocItem.css';

export default function InvoiceDocItem(props) {
  return (
    <>
      <p>{props.invoiceFromDoc.category}</p>
      <p>{props.invoiceFromDoc.rate}</p>
      <p>{props.invoiceFromDoc.hours}</p>
      <p>{props.invoiceFromDoc.amount}</p>
    </>
  );
}
