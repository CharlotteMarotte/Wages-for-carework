import React, { useState } from 'react';
import StatsParams from '../components/StatsParams';

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

    // gets pressed after each key change
    setStatParams((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: Boolean(checked), // updates key [name] with new value
    }));
  };

  // gets called when submit gets pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    let trueOnes = Object.keys(statParams)
      .filter((k) => statParams[k])
      .map((e) => `"${e}"`)
      .join(', ');
    getSpecialData(trueOnes);
    console.log(trueOnes);
    // empty form after set
    setStatParams(EMPTY_FORM);
  };

  async function getSpecialData(data) {
    // Define fetch() options


    try {
      let response = await fetch('/statistics/specify'); // does GET by default
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
    <div>
      <StatsParams
        statParams={statParams}
        handleSubmitCb={handleSubmit}
        handleInputChangeCb={handleInputChange}
      />
    </div>
  );
}
