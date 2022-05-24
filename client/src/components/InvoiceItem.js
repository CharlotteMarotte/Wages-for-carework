import React, { useState } from 'react';

import './InvoiceItem.css';

const EMPTY_FORM = {
  rate: 0,
  quantity: 0,
};

export default function InvoiceItem(props) {
  const [invoiceData, setInvoiceData] = useState(EMPTY_FORM);

  // gets called every time a key is pressed
  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setInvoiceData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  // gets called when submit gets pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form button clicked!');
    // pass data back up to parent using props.addProject();
    //   props.addProject(project);
    // empty form after set
    setInvoiceData(EMPTY_FORM);
  };

  return (
    <React.Fragment>
      <input type="checkbox" />

      <p>{props.billCatFromApp.name}</p>

      <input
        name="rate"
        type="number"
        min="0"
        step="0.5"
        value={invoiceData.rate}
        onChange={(e) => handleInputChange(e)}
      />

      <input
        name="quantity"
        type="number"
        min="0"
        value={invoiceData.quantity}
        onChange={(e) => handleInputChange(e)}
      />

      <p>{invoiceData.rate * invoiceData.quantity}</p>
    </React.Fragment>
  );
}
