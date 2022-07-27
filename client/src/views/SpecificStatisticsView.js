import React, { useState } from 'react';
import StatsParams from '../components/StatsParams';
import ShowAverages from '../components/ShowAverages';

const EMPTY_FORM = {
  amt_HouseholdMem: { Min: 0, Max: 100 },
  amt_flatmates: { Min: 0, Max: 100 },
  amt_partners: { Min: 0, Max: 100 },
  amt_children0_6: { Min: 0, Max: 100 },
  amt_children7_18: { Min: 0, Max: 100 },
  amt_otherCaringResp: { Min: 0, Max: 100 },
  partner_sexualOrient: {
    Heterosexual: false,
    Queer: false,
    Other: false,
    None: false
  },
  partner_relStyle: {
    Monogamous: false,
    Polyamorous: false,
    Other: false,
    None: false,
  },
  employment_status: {
    'Full-time wage job': false,
    'Part-time wage job': false,
    'No wage job': false,
  },
  domesticHelp: {
    Yes: false,
    No: false,
  },
};

export default function SpecificStatisticsView(props) {
  const [statParams, setStatParams] = useState(EMPTY_FORM);
  const [averagesInvoicesFiltered, setAveragesInvoicesFiltered] = useState([]);

  const handleInputNumberChange = (event) => {
    let { name, value } = event.target;
    let statsCat = name.split('.')[0];
    let property = name.split('.')[1];

    setStatParams((current) => {
      // using spread syntax (...)
      return {
        ...current,
        [statsCat]: {
          ...current[statsCat],
          // override value for nested property
          [property]: Number(value),
        },
      };
    });
  };

  const handleInputBooleanChange = (event) => {
    let { name, checked } = event.target;
    let statsCat = name.split('.')[0];
    let property = name.split('.')[1];

    setStatParams((current) => {
      // using spread syntax (...)
      return {
        ...current,
        [statsCat]: {
          ...current[statsCat],
          // override value for nested property
          [property]: Boolean(checked),
        },
      };
    });
  };

  // gets called when submit gets pressed
  async function handleSubmit(e) {
    e.preventDefault();
    // should only send those keys that got checked (are true)
    // BUG FIX: if queryStringTrues only has one element sth else needs to happen because MySQL IN expects more than one argument
    let queryStringTrues = Object.keys(statParams)
      .filter((k) => statParams[k])
      .map((e) => `partner_sexualOrient=${e}`) // property needs to be a string with partner_sexualOrient= infront
      .join('&'); // all keys should be joined with &
    console.log('ibq', queryStringTrues);
    console.log('ssv', queryStringTrues);
    await getSpecialData(queryStringTrues);
    // empty form after set
    setStatParams(EMPTY_FORM);
  }

  async function getSpecialData(querystring) {
    try {
      // URL should look something like this
      // /invoices/specify/?partner_sexualOrient=heterosexual&partner_sexualOrient=queer
      let response = await fetch(`/invoices/specify/?${querystring}`); // does GET by default
      if (response.ok) {
        let data = await response.json();
        setAveragesInvoicesFiltered(data);
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
        handleInputBooleanChangeCb={handleInputBooleanChange}
        handleInputNumberChangeCb={handleInputNumberChange}
      />
      <div className="row row-cols-12 mb-3">
        <ShowAverages averageAll={averagesInvoicesFiltered} />
      </div>
    </div>
  );
}
