import React, { useState } from 'react';
import './CreateInvoiceView.css';
import InvoiceItem from '../components/InvoiceItem';

const EMPTY_FORM = {
  nameFrom: '',
  emailFrom: '',
  nameTo: '',
  emailTo: '',
  invoiceDate: new Date().toISOString().slice(0, 10), //gets current date
};

export default function CreateInvoiceView(props) {
  const EMPTY_IT_FORM = props.billCatFromApp.map((c) => ({
    CatId: c.id,
    rate: 9.5,
    hours: 0,
    amount: 0,
  }));

  const [contactData, setContactData] = useState(EMPTY_FORM);
  const [invoiceItems, setInvoiceItems] = useState(EMPTY_IT_FORM);
  const [total, setTotal] = useState(0);

  // gets called every time number input field is updated
  const addInvoiceItem = (event) => {
    // returns rate or hour, split method returns array of strings so need to transform into Num
    let name = event.target.name.split('-')[0];
    let value = Number(event.target.value);

    let newArray = [...invoiceItems];
    let ix = newArray.findIndex(
      (i) => i.CatId === Number(event.target.name.split('-')[1])
    );
    newArray[ix][name] = value;
    newArray[ix].amount = newArray[ix].rate * newArray[ix].hours;
    setInvoiceItems((state) => newArray);
    calcTotal();
  };

  // gets called every time a key is pressed
  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setContactData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
      // MAKE IT THAT MY KEY APPEARS HERE
      fk_statisticsID: 1,
      invoiceItems,
    }));
  };

  const setInputToZero = (index) => {
    let newArray = [...invoiceItems];
    newArray[index].hours = 0;
    newArray[index].rate = 0;
    newArray[index].amount = 0;
    setInvoiceItems((state) => newArray);
    calcTotal();
  };

  // gets called when submit gets pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addInvoiceCb(contactData); // pass data back up to parent using props.addInvoiceCb();
    props.showInvoiceDocCb(); // show created invoice
    // empty form after set
    setContactData(EMPTY_FORM);
  };

  //   need to call this in InvoiceItem
  function calcTotal() {
    let result = invoiceItems.reduce(function (total, currentValue) {
      return total + currentValue.amount;
    }, 0);
    setTotal(result);
  }

  // || !contactData.length if this gets added it doesn't show form
  // if (!invoiceItems.length || !props.billCatFromApp.length || !contactData) {
  //   // if (!currInvoice.length || !props.billCatFromApp.length) {
  //   return <div>Waiting for data to load...</div>;
  // }

  return (
    // add handleSubmit function to onSubmit event
    <div className="createInvoiceView">
    <form className="offset-1 row g-3 col-10" onSubmit={handleSubmit}>
      <h3>FROM</h3>
      <div className="col-md-6">
        <label htmlFor="inputNameFrom" className="form-label">
          Name
        </label>
        <input
          required
          type="text"
          name="nameFrom"
          value={contactData.nameFrom}
          onChange={(e) => handleInputChange(e)}
          className="form-control"
          id="inputNameFrom"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputEmailFrom" className="form-label">
          Email
        </label>
        <input
          required
          type="email"
          className="form-control"
          id="inputEmailFrom"
          name="emailFrom"
          value={contactData.emailFrom}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <h3>TO</h3>
      <div className="col-md-6">
        <label htmlFor="inputNameTo" className="form-label">
          Name
        </label>
        <input
          required
          type="text"
          className="form-control"
          id="inputNameTo"
          name="nameTo"
          value={contactData.nameTo}
          onChange={(e) => handleInputChange(e)}
        />
        {/* <select
          id="inputNameTo"
          className="form-select"
          name="nameTo"
          value={contactData.nameTo}
          onChange={(e) => handleInputChange(e)}
        >
          <option selected>Choose...</option>
          <option>...</option>
        </select> */}
      </div>
      <div className="col-md-6">
        <label htmlFor="inputEmailTo" className="form-label">
          Email
        </label>
        <input
          required
          type="email"
          className="form-control"
          id="inputEmailTo"
          name="emailTo"
          value={contactData.emailTo}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <h3>INVOICE</h3>
      <div className="col-md-8">
        <label htmlFor="inputInvoiceDate" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="inputInvoiceDate"
          name="invoiceDate"
          value={contactData.invoiceDate}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className="offset-2 col-md-2">
        <label htmlFor="inputInvoiceNumber" className="form-label">
          Number
        </label>
        <input
          value={props.nextId}
          type="number"
          className="form-control"
          id="inputInvoiceNumber"
          readOnly
        />
      </div>

      <div className="container col-12 border-bottom border-danger border-3 ">
        <div className="row row-cols-12 border-bottom border-danger border-3">
          <div className="col-1"> </div>
          <h4 className="col">Description</h4>
          <h4 className="col-2">Rate</h4>
          <h4 className="col-2">Hours</h4>
          <h4 className="col-2">Amount</h4>
        </div>
        {invoiceItems ? 
          props.billCatFromApp.map((p) => (
            // arrow function, so it doesn't get called immediately but only after a click
            <InvoiceItem
              key={p.id}
              billCatFromApp={p}
              addInvoiceItemCb={addInvoiceItem}
              invoiceItemsFromCreate={invoiceItems}
              setInputToZeroCb={setInputToZero}
            />
          )) : <p>A problem occured.</p>}
      </div>
      <p className="offset-10">Total: {total} €</p>
      <div className="offset-5">
        <button type="submit" className="btn btn-outline-danger outline-2 pmd-ripple-effect">
          Submit
        </button>
      </div>
    </form>
    </div>
  );
}
