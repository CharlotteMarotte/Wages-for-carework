import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HomeView from './views/Homeview';
import AboutView from './views/AboutView';
import CreateInvoiceView from './views/CreateInvoiceView';
import InvoiceDocView from './views/InvoiceDocView';
import Error404View from './views/Error404View';

const BILL_CATEGORIES = [
  {
    id: 1,
    name: 'Child care',
  },
  { id: 2, name: 'Cooking' },
  { id: 3, name: 'Cleaning' },
  { id: 4, name: 'Shopping' },
  { id: 5, name: 'Transport' },
  { id: 6, name: 'Care (other)' },
  { id: 7, name: 'Emotional labor' },
];

const INVOICE_Data = [{}];

function App() {
  //
  // Declare state/reactive variables with initial values
  //
  const navigate = useNavigate();

  //
  // Declare funcs used in this component
  //
  function showInvoiceDoc() {
    navigate('/invoice'); // redirect to /users
  }

  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="about" element={<AboutView />} />
        <Route
          path="create"
          element={
            <CreateInvoiceView
              billCatFromApp={BILL_CATEGORIES}
              showInvoiceDocCb={showInvoiceDoc}
            />
          }
        />
        <Route
          path="invoice"
          element={<InvoiceDocView billCatFromApp={BILL_CATEGORIES} />}
        />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}

export default App;
