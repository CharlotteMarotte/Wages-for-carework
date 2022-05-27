import React, { setState, useState } from 'react';
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
      invoiceItems
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
  if (!invoiceItems.length || !props.billCatFromApp.length || !contactData ) {
    // if (!currInvoice.length || !props.billCatFromApp.length) {
    return <div>Waiting for data to load...</div>;
  }

  return (
    <div className="CreateInvoiceView">
      {/* add handleSubmit function to onSubmit event */}
      <form onSubmit={handleSubmit}>
        <div>
          <p className="Addressants">FROM</p>
          <label className="form-label">
            Name
            <input
              name="nameFrom"
              className="form-control"
              aria-describedby="emailHelp" 
              type="text"
              value={contactData.nameFrom}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <label className="form-label">
            Email
            <input
              name="emailFrom"
              className="form-control"
              aria-describedby="emailHelp" 
              type="text"
              value={contactData.emailFrom}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <p className="Addressants">TO</p>
          <label className="form-label">
            Name
            <input
              name="nameTo"
              className="form-control"
              aria-describedby="emailHelp" 
              type="text"
              value={contactData.nameTo}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
        </div>
        <label className="form-label">
          Email
          <input
            name="emailTo"
            className="form-control"
            aria-describedby="emailHelp" 
            type="text"
            value={contactData.emailTo}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <p>INVOICE</p>
        <label className="form-label">
          Date
          <input
            name="invoiceDate"
            className="form-control"
            aria-describedby="emailHelp" 
            type="date"
            value={contactData.invoiceDate}
            onChange={(e) => handleInputChange(e)}
          />
        </label>

        <div className="InvoiceInput">
          <div className="InvoiceGrid">
            <p> </p>
            <p>Description</p>
            <p>Rate</p>
            <p>Hours</p>
            <p>Amount</p>
          </div>
          <div className="seperator"></div>

          <div className="InvoiceItem">
            {props.billCatFromApp.map((p, index) => (
              // arrow function, so it doesn't get called immediately but only after a click
              <InvoiceItem
                key={p.id}
                billCatFromApp={p}
                addInvoiceItemCb={addInvoiceItem}
                invoiceItemsFromCreate={invoiceItems}
                setInputToZeroCb={setInputToZero}
              />
            ))}
          </div>
          <p>Total: {total} €</p>

          <button type="submit" className="btn btn-primary me-2">Submit</button>
        </div>
      </form>
    </div>
  );
}
