import React from 'react'

export default function StatisticItem() {
  return (
    <>
    <div className="col-3">
      <p>{props.invoice.category}</p>
    </div>
    <div className="col-3">
      <p>{props.invoice.rate + ' €/h'}</p>
    </div>
    <div className="col-3">
      <p>{props.invoice.hours}</p>
    </div>
    <div className="col-3">
      <p>{props.invoiceFromDoc.amount + ' €'}</p>
    </div>
  </>
  )
}
