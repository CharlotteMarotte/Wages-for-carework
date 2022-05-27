import React, { useState } from 'react';

import './InvoiceItem.css';

export default function InvoiceItem(props) {
  const [checked, setChecked] = useState(true);

  const index = props.invoiceItemsFromCreate.findIndex(
    (i) => i.CatId === props.billCatFromApp.id
  );

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    props.setInputToZeroCb(index);
  };

  return (
    <React.Fragment>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        class="form-check-input"
        value=""
        id="flexCheckDefault"
      />

      <p className={checked ? '' : 'inActive'}>
        {props.billCatFromApp.cat_name}
      </p>

      <input
        disabled={!checked}
        className="form-control"
        name={'rate-' + props.billCatFromApp.id}
        aria-describedby="emailHelp"
        type="number"
        min="9.5"
        step="0.5"
        value={props.invoiceItemsFromCreate[index].rate}
        onChange={props.addInvoiceItemCb}
      />

      <input
        disabled={!checked}
        className="form-control"
        aria-describedby="emailHelp"
        name={'hours-' + props.billCatFromApp.id}
        type="number"
        min="0"
        value={props.invoiceItemsFromCreate[index].hours}
        onChange={props.addInvoiceItemCb}
      />

      <p className={checked ? '' : 'inActive'}>
        {props.invoiceItemsFromCreate[index].amount + ' €'}
      </p>
    </React.Fragment>
  );
}
