import React, { useState } from 'react';
import './App.css';
import InvoiceForm from './components/InvoiceForm';
import InvoiceDoc from './components/InvoiceDoc';

const BILL_CATEGORIES = [
  {
    id: 1,
    name: 'Child care',
  },
  { id: 2,
    name: 'Cooking' },
  { id: 3,
    name: 'Cleaning' },
  { id: 4,
    name: 'Shopping' },
  { id: 5,
    name: 'Transport' },
  { id: 6,
    name: 'Care (other)' },
  { id: 7,
    name: 'Emotional labor' },
];

const INVOICE_Data = [{}];

function App() {
  //
  // Declare state/reactive variables with initial values
  //
  const [submitted, setSubmitted] = useState(false);
  const [createClicked, setCreateClicked] = useState(true);

  //
  // Declare funcs used in this component
  //

  const showInvoiceForm = () => {
    setCreateClicked(true);
  };

  const showHome = () => {
    setCreateClicked(false);
    setSubmitted(false);
  };

  const showInvoiceDoc = () => {
    setSubmitted(true);
  };

  return (
    <div className="App">
      <nav onClick={showHome}>HOME</nav>
      {!createClicked && (
        <button type="button" onClick={showInvoiceForm} id="createButton">
          CREATE INVOICE
        </button>
      )}
      {createClicked && !submitted && (
        <InvoiceForm
          billCatFromApp={BILL_CATEGORIES}
          showInvoiceDocCb={showInvoiceDoc}
        />
      )}
      {submitted && (
        <InvoiceDoc
          billCatFromApp={BILL_CATEGORIES}
          showInvoiceDocCb={showInvoiceDoc}
        />
      )}
    </div>
  );
}

export default App;
