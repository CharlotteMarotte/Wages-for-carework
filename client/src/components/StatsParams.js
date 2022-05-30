import React, { useState } from 'react';

const EMPTY_FORM = {
    heterosexual: false,
    queer: false,
    other: false,
    none: false,
  };
  

export default function StatsParams(props) {
  return (
    <form onSubmit={props.handleSubmitCb}>
      <div className="col-6 offset-3 row">
        <h3>Domestic Partner(s) sex. Orientation:</h3>
        <div className="row">
          <div className="form-check col-2 offset-1">
            <input
              className="form-check-input"
              type="checkbox"
              name="heterosexual"
              value={props.statParams.heterosexual}
              id="flexCheckDefault"
              onChange={props.handleInputChangeCb}
            />
            <label className="form-check-label"htmlFor="flexCheckDefault">
              Heterosexual{' '}
            </label>
          </div>
          <div className="form-check col-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="queer"
              value={props.statParams.queer}
              id="flexCheckChecked"
              onChange={props.handleInputChangeCb}
            />
            <label className="form-check-label"htmlFor="flexCheckChecked">
              Queer{' '}
            </label>
          </div>
          <div className="form-check col-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={props.statParams.other}
              name="other"
              id="flexCheckChecked"
              onChange={props.handleInputChangeCb}
            />
            <label className="form-check-label"htmlFor="flexCheckChecked">
              Other{' '}
            </label>
          </div>
          <div className="form-check col-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={props.statParams.none}
              name="none"
              id="flexCheckChecked"
              onChange={props.handleInputChangeCb}
            />
            <label className="form-check-label"htmlFor="flexCheckChecked">
              None{' '}
            </label>
          </div>
        </div>
      </div>
      <div className="offset-5 mt-3">
        <button type="submit" className="btn btn-outline-danger outline-2 pmd-ripple-effect">
          Show
        </button>
      </div>
    </form>
  )
}
