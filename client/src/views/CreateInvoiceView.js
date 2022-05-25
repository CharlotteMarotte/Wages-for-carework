import React, { setState, useState } from 'react';
import './CreateInvoiceView.css';
import InvoiceItem from '../components/InvoiceItem';

const EMPTY_FORM = {
  nameSender: '',
  emailSender: '',
  invoiceNumber: 0,
  date: new Date().toJSON().slice(0, 10), //gets current date
  terms: '',
  nameRecipient: '',
  emailRecipient: '',
};

export default function CreateInvoiceView(props) {
  const EMPTY_IT_FORM = props.billCatFromApp.map((c) => ({
    CatId: c.ID,
    rate: 0,
    hours: 0,
    amount: 0,
  }));

  const [contactData, setContactData] = useState(EMPTY_FORM);
  const [invoiceItems, setInvoiceItems] = useState(EMPTY_IT_FORM);
  const [amount, setAmount] = useState(0);

  // Cb for two arguments

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
    calcAmount();
  };

  // gets called every time a key is pressed
  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setContactData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  // gets called when submit gets pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addInvoiceCb(contactData, invoiceItems); // pass data back up to parent using props.addInvoiceCb();
    props.showInvoiceDocCb(); // show created invoice
    // empty form after set
    setContactData(EMPTY_FORM);
  };

  //   need to call this in InvoiceItem
  function calcAmount() {
    let result = invoiceItems.reduce(function (total, currentValue) {
      return total + currentValue.amount;
  }, 0);
    setAmount(result);
  }

  return (
    <div className="CreateInvoiceView">
      {/* add handleSubmit function to onSubmit event */}
      <form onSubmit={handleSubmit}>
        <div>
          <p className="Addressants">FROM</p>
          <label>
            Name
            <input
              name="nameSender"
              type="text"
              value={contactData.nameSender}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <label>
            Email
            <input
              name="emailSender"
              type="text"
              value={contactData.emailSender}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          <p className="Addressants">TO</p>
          <label>
            Name
            <input
              name="nameRecipient"
              type="text"
              value={contactData.nameRecipient}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
        </div>
        <label>
          Email
          <input
            name="emailRecipient"
            type="text"
            value={contactData.emailRecipient}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <p>INVOICE</p>
        <label>
          Invoice Number
          <input
            name="invoiceNumber"
            type="number"
            min="0"
            value={contactData.invoiceNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label>
          Date
          <input
            name="date"
            type="date"
            value={contactData.date}
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
                key={p.ID}
                billCatFromApp={p}
                addInvoiceItemCb={addInvoiceItem}
                invoiceItemsFromApp={invoiceItems}
              />
            ))}
          </div>
          <p>Total: {amount} €</p>

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
