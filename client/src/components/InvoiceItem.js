import React, { useEffect, useState } from 'react';

import './InvoiceItem.css';

export default function InvoiceItem(props) {
  const [checked, setChecked] = useState(true); // holds state if checkbox is checked or not
  const [index, setIndex] = useState(0);
  const [invoiceItems, setInvoiceItems] = useState({
    rate: 0,
    hours: 0,
    amount: 0,
  });

  useEffect(() => {
    findIndex();
    setInvoiceItems(props.invoiceItemsFromCreate);
  }, [props.invoiceItemsFromCreate, props.billCatFromApp]);

  // find index in invoiceItems that matches the categoryID of this item
  function findIndex() {
    let resultIx = props.invoiceItemsFromCreate.findIndex(
      (i) => i.catId === props.billCatFromApp.categoryID
    );
    setIndex(resultIx);
  }

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    props.setInputToZeroCb(index); // if checkbox is checked all values (except rate) should be set to 0
  };

  // making sure that all states are defined, so reading .rate etc does not produce an error
  if (invoiceItems && index && invoiceItems[index]) {
    return (
      <div className="row row-cols-12 my-3">
        <div className="col-1">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            className="form-check"
            value=""
            id="gridCheck"
          />
        </div>
        <div className="col">
          {/* apply style only if checkbox is checked */}
          <p className={checked ? '' : 'inActive'}>
            {props.billCatFromApp.cat_name}
          </p>
        </div>
        <div className="col-2">
          <input
            required
            disabled={!checked}
            className="form-control"
            name={'rate-' + props.billCatFromApp.categoryID}
            type="number"
            min="9.5"
            step="0.5"
            value={invoiceItems[index].rate}
            onChange={props.addInvoiceItemCb}
          />
        </div>
        <div className="col-2">
          <input
            required
            disabled={!checked}
            className="form-control"
            name={'hours-' + props.billCatFromApp.categoryID}
            type="number"
            min="0"
            value={invoiceItems[index].hours}
            onChange={props.addInvoiceItemCb}
          />
        </div>
        <div className="col-2">
          <p className={checked ? '' : 'inActive'}>
            {invoiceItems[index].amount + ' €'}
          </p>
        </div>
      </div>
    );
  }
}
