import React, { useState } from 'react';

const EMPTY_FORM = {
  amt_HouseholdMem: 1,
  amt_children0_6: 0,
  amt_children7_18: 0,
  otherCaringResp: 0,
  amt_flatmates: 0,
  amt_partners: 0,
  partner_sexualOrient: 'None',
  partner_relStyle: 'None',
  employment_status: 'No wage job',
  domesticHelp: false,
};

export default function EnterDataView(props) {
  //
  // Form to enter demographic data
  //

  const [statData, setStatData] = useState(EMPTY_FORM);

  // gets called every time a radio button element is selected
  const handleInputChange = (event) => {
    let { name, value } = event.target;

    setStatData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  // to handle input of number fields because value must be parsed to Number(value)
  const handleIntInputChange = (event) => {
    let name = event.target.name;
    let value = Number(event.target.value); // otherwise value would be a String

    // gets called after each interaction with error or insertion with keyboard
    setStatData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  // gets called when submit gets pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    props.continueFromStatisticsCb(statData); // passes data back up to parent using props.addInvoiceCb(); - doesn't submit yet but instead saves it in a state in the app
    // empty form after set
    setStatData(EMPTY_FORM);
  };

  return (
    <div>
      <form className="row g-3 col-6 offset-3" onSubmit={handleSubmit}>
        <h3>DEMOGRAPHIC DATA</h3>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Household members (AMT)
          </label>
          <input
            required // makes error message appear if user didn't choose an option, didn't find a way to give default checked to radio button
            className="form-control"
            name={'amt_HouseholdMem'}
            value={statData.amt_HouseholdMem}
            type="number"
            min="0"
            onChange={handleIntInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Flatmates (AMT)
          </label>
          <input
            required
            className="form-control"
            name={'amt_flatmates'}
            value={statData.amt_flatmates}
            type="number"
            min="0"
            onChange={handleIntInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Partners (AMT)
          </label>
          <input
            required
            className="form-control"
            name={'amt_partners'}
            value={statData.amt_partners}
            type="number"
            min="0"
            onChange={handleIntInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Children 0-6 y. (AMT)
          </label>
          <input
            required
            className="form-control"
            name={'amt_children0_6'}
            value={statData.amt_children0_6}
            type="number"
            min="0"
            onChange={handleIntInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Children 7-18 y. (AMT)
          </label>
          <input
            required
            className="form-control"
            name={'amt_children7_18'}
            value={statData.amt_children7_18}
            type="number"
            min="0"
            onChange={handleIntInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Caring (other) (AMT)
          </label>
          <input
            required
            className="form-control"
            name={'otherCaringResp'}
            value={statData.otherCaringResp}
            type="number"
            min="0"
            onChange={handleIntInputChange}
          />
        </div>
        <div className="col-md-12">
          Domestic Partner(s) sex. Orientation:{' '}
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="heterosexual"
              name="partner_sexualOrient"
              value="Heterosexual"
              onChange={handleInputChange}
            />
            Hetero
            <label className="form-check-label" htmlFor="heterosexual"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="queer"
              name="partner_sexualOrient"
              value="Queer"
              onChange={handleInputChange}
            />
            Queer<label className="form-check-label" htmlFor="queer"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="other"
              name="partner_sexualOrient"
              value="Other"
              onChange={handleInputChange}
            />
            Other<label className="form-check-label" htmlFor="other"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              required
              type="radio"
              className="form-check-input"
              id="none"
              name="partner_sexualOrient"
              value="None"
              onChange={handleInputChange}
            />
            None<label className="form-check-label" htmlFor="none"></label>
          </div>
        </div>
        <div className="col-md-12">
          Relationship Style:{' '}
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="monogamous"
              name="partner_relStyle"
              value="Monogamous"
              onChange={handleInputChange}
            />
            Monogamous
            <label className="form-check-label" htmlFor="monogamous"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="poly"
              name="partner_relStyle"
              value="Polyamorous"
              onChange={handleInputChange}
            />
            Polyamorous
            <label className="form-check-label" htmlFor="poly"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="other"
              name="partner_relStyle"
              value="Other"
              onChange={handleInputChange}
            />
            Other<label className="form-check-label" htmlFor="other"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              required
              type="radio"
              className="form-check-input"
              id="none"
              name="partner_relStyle"
              value="None"
              onChange={handleInputChange}
            />
            None<label className="form-check-label" htmlFor="none"></label>
          </div>
        </div>
        <div className="col-md-12">
          Employment status:{' '}
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="fulltime"
              name="employment_status"
              value="Full-time wage job"
              onChange={handleInputChange}
            />
            Full-time wage job
            <label className="form-check-label" htmlFor="fulltime"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="parttime"
              name="employment_status"
              value="Part-time wage job"
              onChange={handleInputChange}
            />
            Part-time wage job
            <label className="form-check-label" htmlFor="parttime"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              required
              type="radio"
              className="form-check-input"
              id="no"
              name="employment_status"
              value="No wage job"
              onChange={handleInputChange}
            />
            No wage job<label className="form-check-label" htmlFor="no"></label>
          </div>
        </div>
        <div className="col-md-12">
          Employed domestic help:{' '}
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="true"
              name="domesticHelp"
              value="1"
              onChange={handleIntInputChange}
            />
            Yes
            <label className="form-check-label" htmlFor="true"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              required
              type="radio"
              className="form-check-input"
              id="false"
              name="domesticHelp"
              value="0"
              onChange={handleIntInputChange}
            />
            No <label className="form-check-label" htmlFor="false"></label>
          </div>
        </div>
        <div className="offset-5">
          <button
            type="submit"
            className="btn btn-outline-dark outline-2 pmd-ripple-effect"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
