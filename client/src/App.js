import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomeView from './views/Homeview';
import AboutView from './views/AboutView';
import CreateInvoiceView from './views/CreateInvoiceView';
import InvoiceDocView from './views/InvoiceDocView';
import Error404View from './views/Error404View';
import StatisticsView from './views/StatisticsView';
import EnterDataView from './views/EnterDataView';

function App() {
  //
  // Declare state/reactive variables with initial values
  //
  const navigate = useNavigate();
  let [billCats, setBillCats] = useState([]);
  let [invoices, setInvoices] = useState([]);

  //
  // Declare funcs used in this component
  //

  useEffect(() => {
    getBillCats();
    getInvoices();
  }, []);

  async function getInvoices() {
    try {
      let response = await fetch('/invoices'); // does GET by default
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

  async function addInvoice(invoiceData) {
    // Define fetch() options
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    };

    try {
      let response = await fetch('/invoices/new', options); // do POST
      if (response.ok) {
        let invoices = await response.json();
        setInvoices(invoices);
        getInvoices();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getBillCats() {
    try {
      let response = await fetch('/bill-cats'); // does GET by default
      if (response.ok) {
        let categories = await response.json();
        setBillCats(categories);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  function showInvoiceDoc() {
    navigate('/invoices'); // redirect to /users
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView invoicesFromApp={invoices} />} />
        <Route path="about" element={<AboutView />} />
        <Route path="enter-data" element={<EnterDataView />} />
        <Route
          path="create"
          element={
            <CreateInvoiceView
              billCatFromApp={billCats}
              showInvoiceDocCb={showInvoiceDoc}
              addInvoiceCb={addInvoice}
              nextId={invoices.length + 1}
            />
          }
        />
        <Route
          path="invoices"
          element={
            <InvoiceDocView
              billCatFromApp={billCats}
              ix={invoices.length - 1}
              getInvoicesCb={getInvoices}
            />
          }
        />
        <Route
          path="statistics"
          element={
            <StatisticsView
              invoicesFromApp={invoices}
              billCatsFromApp={billCats}
            />
          }
        />
        <Route path="*" element={<Error404View />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}

export default App;
