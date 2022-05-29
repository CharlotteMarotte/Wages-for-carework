import React, { useState } from 'react';

const EMPTY_FORM = {
  amtHouseholdMem: 0,
  amt_children0_6: 0,
  amt_children7_18: 0,
  otherCaringResp: 0,
  amt_flatmates: 0,
  amt_partners: 0,
  partner_sexualOrient: '',
  partner_relStyle: '',
  employment_status: '',
  domesticHelp: false,
};

export default function EnterDataView() {
  const [statData, setStatData] = useState(EMPTY_FORM);

  // gets called every time a key is pressed
  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setStatData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  // gets called when submit gets pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handled stat submit', statData);
    // props.addInvoiceCb(statData); // pass data back up to parent using props.addInvoiceCb();
    // props.showInvoiceDocCb(); // show created invoice
    // empty form after set
    setStatData(EMPTY_FORM);
  };

  return (
    <div>
      <form className="offset-1 row g-3 col-10" onSubmit={handleSubmit}>
        <h3>DEMOGRAPHIC DATA</h3>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Household members (Total)
          </label>
          <input
            required
            className="form-control"
            name={'amtHouseholdMem'}
            value={statData.amtHouseholdMem}
            type="number"
            min="0"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Flatmates (Amt)
          </label>
          <input
            required
            className="form-control"
            name={'amt_flatmates'}
            value={statData.amt_flatmates}
            type="number"
            min="0"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Partners (Amt)
          </label>
          <input
            required
            className="form-control"
            name={'amt_partners'}
            value={statData.amt_partners}
            type="number"
            min="0"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Children 0-6 years (Amt)
          </label>
          <input
            required
            className="form-control"
            name={'amt_children0_6'}
            value={statData.amt_children0_6}
            type="number"
            min="0"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Children 7-18 years (Amt)
          </label>
          <input
            required
            className="form-control"
            name={'amt_children7_18'}
            value={statData.amt_children7_18}
            type="number"
            min="0"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputNameFrom" className="form-label">
            Other caring respon. (Amt)
          </label>
          <input
            required
            className="form-control"
            name={'otherCaringResp'}
            value={statData.otherCaringResp}
            type="number"
            min="0"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-12">
          Partner(s) sex. Orientation{' '}
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="heterosexual"
              name="partner_sexualOrient"
              value="Heterosexual"
              onChange={handleInputChange}
            />
            Heterosexual
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
        </div>
        <div className="col-md-12">
          Relationship Style{' '}
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
        </div>
        <div className="col-md-12">
          Employment status{' '}
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
          Employed domestic help{' '}
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="true"
              name="domesticHelp"
              value="true"
              onChange={handleInputChange}
            />
            Yes
            <label className="form-check-label" htmlFor="true"></label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="false"
              name="domesticHelp"
              value="false"
              onChange={handleInputChange}
            />
            No <label className="form-check-label" htmlFor="false"></label>
          </div>
        </div>
        <div className="offset-5">
          <button
            type="submit"
            className="btn btn-outline-danger outline-2 pmd-ripple-effect"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
