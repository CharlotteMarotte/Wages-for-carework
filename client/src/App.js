import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomeView from './views/Homeview';
import AboutView from './views/AboutView';
import CreateInvoiceView from './views/CreateInvoiceView';
import InvoiceDocView from './views/InvoiceDocView';
import Error404View from './views/Error404View';

function App() {
  //
  // Declare state/reactive variables with initial values
  //
  const navigate = useNavigate();
  let [billCats, setBillCats] = useState([]);


  //
  // Declare funcs used in this component
  //

  useEffect(() => {
    getBillCats();
  }, []);

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

  function addInvoice(invoice, invoiceItemsArr){
    console.log("Submit from Form made it to the App");
  }


  function showInvoiceDoc() {
    navigate('/invoice'); // redirect to /users
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView billCatFromApp={billCats} />} />
        <Route path="about" element={<AboutView />} />
        <Route
          path="create"
          element={
            <CreateInvoiceView
              billCatFromApp={billCats}
              showInvoiceDocCb={showInvoiceDoc}
              addInvoiceCb={addInvoice}
            />
          }
        />
        <Route
          path="invoice"
          element={
            <InvoiceDocView
              billCatFromApp={billCats}
    
            />
          }
        />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}

export default App;
