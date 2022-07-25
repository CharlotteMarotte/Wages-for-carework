import React, { useState, useEffect } from 'react';
import './CreateInvoiceView.css';
import InvoiceItem from '../components/InvoiceItem';

export default function CreateInvoiceView(props) {
  //
  // Form to enter data for the invoice
  //

  const EMPTY_FORM = {
    nameFrom: props.user
      ? props.user.firstname + ' ' + props.user.lastname
      : '',
    emailFrom: props.user ? props.user.email : '',
    nameTo: 'BFSFJ', // default value German ministery for families
    emailTo: 'info@bmfsfjservice.bund.de', // default value German ministery for families
    invoiceDate: new Date().toISOString().slice(0, 10), //gets current date, cuts timestamp off
  };

  const [contactData, setContactData] = useState(EMPTY_FORM); // holds contact data
  const [invoiceItems, setInvoiceItems] = useState([]); // holds invoice items data
  const [total, setTotal] = useState(0); // holds total of all amounts of invoice

  useEffect(() => {
    createInvoiceItems();
  }, [props.billCatFromApp]);

  function createInvoiceItems() {
    let resultArr = props.billCatFromApp.map((c) => ({
      catId: c.categoryID,
      rate: 9.5,
      hours: 0,
      amount: 0,
    }));
    setInvoiceItems(resultArr);
  }

  // gets called every time number input field is updated
  const addInvoiceItem = (event) => {
    // returns rate or hour (property name and category ID are seperated by a - , see InvoiceItem component implementation)
    let name = event.target.name.split('-')[0];
    // split method returns array of strings so need to transform into Num
    let value = Number(event.target.value);

    // looks for index of element in invoiceItems array where the category ID matches the one it got data from the InvoiceItem from
    let newArray = [...invoiceItems];
    let ix = newArray.findIndex(
      (i) => i.catId === Number(event.target.name.split('-')[1]) // on right side of - is category number
    );

    newArray[ix][name] = value;
    newArray[ix].amount = newArray[ix].rate * newArray[ix].hours; // calculates amount on every change of number input field
    setInvoiceItems((state) => newArray); // updates invoice items state
    calcTotal();
  };

  // gets called every time an input field is changed
  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setContactData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
      invoiceItems, // when one field of contact data is first updated invoice items array is added (and again every time contact data gets updated), so it can get passed together on submit
    }));
  };

  // sets hours and amount to 0 when checkbox in invoice items line is unchecked but not rate because that would screw the averages
  const setInputToZero = (index) => {
    let newArray = [...invoiceItems];
    newArray[index].hours = 0;
    newArray[index].amount = 0;
    setInvoiceItems((state) => newArray);
    calcTotal();
  };

  // gets called when submit gets pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    contactData.total = total;
    contactData.fk_userID = props.user.id; // adds user id of user logged in
    props.addInvoiceCb(contactData); // pass data back up to parent using props.addInvoiceCb();
    props.showInvoiceDocCb(); // show created invoice
    // empty form after set
    setContactData(EMPTY_FORM);
  };

  // need to call this in InvoiceItem
  function calcTotal() {
    // calculates total of all amounts of invoice items
    let result = invoiceItems.reduce(function (total, currentValue) {
      return total + currentValue.amount;
    }, 0);
    setTotal(result);
  }

  return (
    <div className="createInvoiceView col-6 offset-3 mb-10">
      {/* add handleSubmit function to onSubmit event */}
      <form className="offset-1 row g-3 col-10 pb-10" onSubmit={handleSubmit}>
        <h3>FROM</h3>
        <div className="col-md-6">
          <label htmlFor="inputNameFrom" className="form-label">
            Name
          </label>
          <input
            readOnly={props.user ? true : false}
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
            readOnly={props.user ? true : false}
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
            value={props.nextNo}
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
          {/* sometimes there is a weird bug and it says invoiceItems is empty, so this should catch the error, try reload if it happens */}
          {invoiceItems ? (
            // maps over all categories and creates an invoice item input line for it
            props.billCatFromApp.map((c) => (
              // arrow function, so it doesn't get called immediately but only after a click
              <InvoiceItem
                key={c.categoryID}
                billCatFromApp={c}
                addInvoiceItemCb={addInvoiceItem}
                invoiceItemsFromCreate={invoiceItems}
                setInputToZeroCb={setInputToZero}
              />
            ))
          ) : (
            <p>A problem occured.</p>
          )}
        </div>
        <p className="offset-10">Total: {total} €</p>
        <div className="offset-5">
          <button
            type="submit"
            className="btn btn-outline-danger outline-2 pmd-ripple-effect"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
