import React, { useState } from 'react';

import './InvoiceItem.css';

export default function InvoiceItem(props) {
  const [checked, setChecked] = useState(true);

  const ix = props.invoiceItemsFromApp.findIndex(
    (i) => i.CatId === props.billCatFromApp.ID
  );

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };



  return (
    <React.Fragment>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />

      <p className={checked ? '' : 'inActive'}>
        {props.billCatFromApp.cat_name}
      </p>

      <input
        disabled={!checked}
        name={'rate-' + props.billCatFromApp.ID}
        type="number"
        min="9.5"
        step="0.5"
        value={props.invoiceItemsFromApp[ix].rate}
        onChange={props.addInvoiceItemCb}
      />

      <input
        disabled={!checked}
        name={'hours-' + props.billCatFromApp.ID}
        type="number"
        min="0"
        value={props.invoiceItemsFromApp[ix].hours}
        onChange={props.addInvoiceItemCb}
      />

      <p className={checked ? '' : 'inActive'}>
        {props.invoiceItemsFromApp[ix].amount}
      </p>
    </React.Fragment>
  );
}
