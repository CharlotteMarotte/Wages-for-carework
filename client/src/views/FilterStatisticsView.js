import React, { useState } from 'react';
import StatsParams from '../components/StatsParams';
import { Link } from 'react-router-dom';

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
    None: false,
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

export default function FilterStatisticsView(props) {
  const [statParams, setStatParams] = useState(EMPTY_FORM);

  function handleInputNumberChange(event) {
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
  }

  function handleInputBooleanChange(event) {
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
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let queryStringArr = [];
    let statCategories = Object.keys(statParams);

    for (let category of statCategories) {
      let properties = Object.keys(statParams[category]);
      if (/^amt/.test(category)) {
        let condition = properties
          .map((p) => `${category}=${statParams[category][p]}`)
          .join('&'); // result should look like this: partner_relStyle=true&partner_relStyle=true
        queryStringArr.push(condition);
      } else {
        // if category is not an amount
        let conditions = properties
          .filter((p) => statParams[category][p])
          .map((p) => `${category}=${p}`);
        if (conditions.length > 0) {
          // check if conditions array is empty after filter, otherwise too many & at end of string
          conditions = conditions.join('&');
          queryStringArr.push(conditions);
        }
      }
    }
    let queryString = queryStringArr.join('&'); // join all conditions with &
    props.getFilteredStatisticsCb(queryString); // call Cb function in parent component
    setStatParams(EMPTY_FORM); // empty form after set
  }

  return (
    <div className="col-6 offset-3">
      <Link
        className="btn btn-outline-dark btn-signup text-uppercase mb-3"
        to="/general-statistics"
      >
        General statistics
      </Link>
      <StatsParams
        statParams={statParams}
        handleSubmitCb={handleSubmit}
        handleInputBooleanChangeCb={handleInputBooleanChange}
        handleInputNumberChangeCb={handleInputNumberChange}
      />
    </div>
  );
}
