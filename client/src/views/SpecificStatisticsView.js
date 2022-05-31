import React, { useState } from 'react';
import StatsParams from '../components/StatsParams';
import InvoiceDocItem from '../components/InvoiceDocItem';

const EMPTY_FORM = {
  Heterosexual: false,
  Queer: false,
  Other: false,
  None: false,
};

export default function SpecificStatisticsView(props) {
  const [statParams, setStatParams] = useState(EMPTY_FORM);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  const handleInputChange = (event) => {
    let { name, checked } = event.target;

    // gets pressed after each change of checkboxes
    setStatParams((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: Boolean(checked), // updates key [name] with new value, value is String, must get parsed to Boolean
    }));
  };

  // gets called when submit gets pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    // should only send those keys that got checked (are true)
    // BUG FIX: if queryStringTrues only has one element sth else needs to happen because MySQL IN expects more than one argument
    let queryStringTrues = Object.keys(statParams)
      .filter((k) => statParams[k])
      .map((e) => `partner_sexualOrient=${e}`) // property needs to be a string with partner_sexualOrient= infront
      .join('&'); // all keys should be joined with &
    getSpecialData(queryStringTrues);
    // empty form after set
    setStatParams(EMPTY_FORM);
  };


  async function getSpecialData(querystring) {
    try {
      // URL should look something like this 
      // /invoices/specify/?partner_sexualOrient=heterosexual&partner_sexualOrient=queer
      let response = await fetch(`/invoices/specify/?${querystring}`); // does GET by default
      if (response.ok) {
        let data = await response.json();
        setFilteredInvoices(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div className="col-6 offset-3">
      <StatsParams
        statParams={statParams}
        handleSubmitCb={handleSubmit}
        handleInputChangeCb={handleInputChange}
      />
      {filteredInvoices.length !== 0 && (
        <div className="row row-cols-12 mb-3">
          {filteredInvoices.map((i) => (
            // empty root element because React needs one parent root element
            <> 
              <p style={{fontWeight: "bold", fontSize: "25px"}} className="border-bottom border-dark border-3 col-10">TO: {i.nameTo}</p>{' '}
              {i.invoiceItems.map((it, index) => (
                // arrow function, so it doesn't get called immediately but only after a click
                <InvoiceDocItem
                  key={index} //BUGFIX: somehow it doesn't work to give the index as a key?
                  billCatFromApp={props.billCatFromApp}
                  invoiceFromDoc={it}
                />
              ))}
            </>
          ))}
        </div>
      )}
    </div>
  );
}
