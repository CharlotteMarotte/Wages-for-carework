import React, { useState } from 'react';

const EMPTY_FORM = {
    Heterosexual: false,
    Queer: false,
    Other: false,
    None: false,
  };
  

export default function StatsParams(props) {
  return (
    <form onSubmit={props.handleSubmitCb}>
      <div className="row">
        <h3>Domestic Partner(s) sex. Orientation:</h3>
        <div className="row">
          <div className="form-check offset-1 col-auto">
            <input
              className="form-check-input"
              type="checkbox"
              name="heterosexual"
              value={props.statParams.Heterosexual}
              id="flexCheckDefault"
              onChange={props.handleInputChangeCb}
            />
            <label className="form-check-label"htmlFor="flexCheckDefault">
              Heterosexual{' '}
            </label>
          </div>
          <div className="form-check col-auto">
            <input
              className="form-check-input"
              type="checkbox"
              name="queer"
              value={props.statParams.Queer}
              id="flexCheckChecked"
              onChange={props.handleInputChangeCb}
            />
            <label className="form-check-label"htmlFor="flexCheckChecked">
              Queer{' '}
            </label>
          </div>
          <div className="form-check col-auto">
            <input
              className="form-check-input"
              type="checkbox"
              value={props.statParams.Other}
              name="other"
              id="flexCheckChecked"
              onChange={props.handleInputChangeCb}
            />
            <label className="form-check-label"htmlFor="flexCheckChecked">
              Other{' '}
            </label>
          </div>
          <div className="form-check col-auto">
            <input
              className="form-check-input"
              type="checkbox"
              value={props.statParams.None}
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
