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
        <p className={checked ? '' : 'inActive'}>
          {props.billCatFromApp.cat_name}
        </p>
      </div>
      <div className="col-2">
        <input
          required
          disabled={!checked}
          className="form-control"
          name={'rate-' + props.billCatFromApp.id}
          type="number"
          min="9.5"
          step="0.5"
          value={props.invoiceItemsFromCreate[index].rate}
          onChange={props.addInvoiceItemCb}
        />
      </div>
      <div className="col-2">
        <input
          required
          disabled={!checked}
          className="form-control"
          name={'hours-' + props.billCatFromApp.id}
          type="number"
          min="0"
          value={props.invoiceItemsFromCreate[index].hours}
          onChange={props.addInvoiceItemCb}
        />
      </div>
      <div className="col-2">
        <p className={checked ? '' : 'inActive'}>
          {props.invoiceItemsFromCreate[index].amount + ' €'}
        </p>
      </div>
    </div>
  );
}
