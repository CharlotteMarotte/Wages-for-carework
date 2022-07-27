import React from 'react';

export default function StatsParams(props) {
  if (!props.statParams) {
    return (
      <figure className="figure">
        <img
          src="/images/ErrorPage.jpg"
          className="figure-img img-fluid mb-0"
          alt="An error occurred"
        />
        <figcaption className="figure-caption text-center">
          <a href="https://www.vecteezy.com/vector-art/1384282-404-error-concept-for-landing-page-design">
            404 error concept for landing page design Vectors by Vecteezy
          </a>
        </figcaption>
      </figure>
    );
  }

  return (
    <form onSubmit={props.handleSubmitCb}>
      <div
        className="accordion"
        id="accordionPanelsStayOpenExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingParent">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseParent"
              aria-expanded="false"
              aria-controls="collapseParent"
            >
              Specify parameters you're interested in{' '}
            </button>
          </h2>
          <div
            id="collapseParent"
            className="accordion-collapse collapse"
            aria-labelledby="headingParent"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Amount Household Members{' '}
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body row">
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        name="amt_HouseholdMem.Min"
                        value={props.statParams.amt_HouseholdMem.Min}
                        onChange={props.handleInputNumberChangeCb}
                        className="form-control"
                      />

                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Min{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        value={props.statParams.amt_HouseholdMem.Max}
                        id="typeNumber"
                        name="amt_HouseholdMem.Max"
                        className="form-control"
                        onChange={props.handleInputNumberChangeCb}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Max{' '}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    Amount Flatmates{' '}
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body row">
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        name="amt_flatmates.Min"
                        value={props.statParams.amt_flatmates.Min}
                        onChange={props.handleInputNumberChangeCb}
                        className="form-control"
                      />

                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Min{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        value={props.statParams.amt_flatmates.Max}
                        onChange={props.handleInputNumberChangeCb}
                        name="amt_flatmates.Max"
                        className="form-control"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Max{' '}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSeven">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSeven"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    Amount (Domestic) Partners{' '}
                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body row">
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        value={props.statParams.amt_partners.Min}
                        onChange={props.handleInputNumberChangeCb}
                        name="amt_partners.Min"
                        className="form-control"
                      />

                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Min{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        value={props.statParams.amt_partners.Max}
                        onChange={props.handleInputNumberChangeCb}
                        name="amt_partners.Max"
                        className="form-control"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Max{' '}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingEight">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseEight"
                    aria-expanded="false"
                    aria-controls="collapseEight"
                  >
                    Amount Children (0-6 years){' '}
                  </button>
                </h2>
                <div
                  id="collapseEight"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingEight"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body row">
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        value={props.statParams.amt_children0_6.Min}
                        onChange={props.handleInputNumberChangeCb}
                        name="amt_children0_6.Min"
                        className="form-control"
                      />

                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Min{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        value={props.statParams.amt_children0_6.Max}
                        onChange={props.handleInputNumberChangeCb}
                        name="amt_children0_6.Max"
                        className="form-control"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Max{' '}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingNine">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseNine"
                    aria-expanded="false"
                    aria-controls="collapseNine"
                  >
                    Amount Children (7-18 years){' '}
                  </button>
                </h2>
                <div
                  id="collapseNine"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingNine"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body row">
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        value={props.statParams.amt_children7_18.Min}
                        onChange={props.handleInputNumberChangeCb}
                        name="amt_children7_18.Min"
                        className="form-control"
                      />

                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Min{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        value={props.statParams.amt_children7_18.Max}
                        onChange={props.handleInputNumberChangeCb}
                        name="amt_children7_18.Max"
                        className="form-control"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Max{' '}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Amount Caring resposibilities (other){' '}
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body row">
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        value={props.statParams.amt_otherCaringResp.Min}
                        onChange={props.handleInputNumberChangeCb}
                        name="amt_otherCaringResp.Min"
                        className="form-control"
                      />

                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Min{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        type="number"
                        id="typeNumber"
                        value={props.statParams.amt_otherCaringResp.Max}
                        onChange={props.handleInputNumberChangeCb}
                        name="amt_otherCaringResp.Max"
                        className="form-control"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Max{' '}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    Domestic Partner(s) sex. Orientation:{' '}
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="panelsStayOpen-headingOne"
                >
                  <div className="accordion-body row">
                    <div className="form-check offset-1 col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="partner_sexualOrient.Heterosexual"
                        value={
                          props.statParams.partner_sexualOrient.Heterosexual
                        }
                        id="flexCheckDefault"
                        onChange={props.handleInputBooleanChangeCb}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Heterosexual{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="partner_sexualOrient.Queer"
                        value={props.statParams.partner_sexualOrient.Queer}
                        id="flexCheckChecked"
                        onChange={props.handleInputBooleanChangeCb}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Queer{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={props.statParams.partner_sexualOrient.Other}
                        name="partner_sexualOrient.Other"
                        id="flexCheckChecked"
                        onChange={props.handleInputBooleanChangeCb} //change gets handled in parent component
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Other{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={props.statParams.partner_sexualOrient.None}
                        name="partner_sexualOrient.None"
                        onChange={props.handleInputBooleanChangeCb}
                        id="flexCheckChecked"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        None{' '}
                      </label>
                    </div>{' '}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id="panelsStayOpen-headingFour"
                >
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseFour"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseFour"
                  >
                    Domestic partner(s) relationship style:{' '}
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingFour"
                >
                  <div className="accordion-body row">
                    <div className="form-check offset-1 col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={props.statParams.partner_relStyle.Monogamous}
                        name="partner_relStyle.Monogamous"
                        onChange={props.handleInputBooleanChangeCb}
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Monogamous{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="partner_relStyle.Polyamorous"
                        value={props.statParams.partner_relStyle.Polyamorous}
                        id="flexCheckChecked"
                        onChange={props.handleInputBooleanChangeCb}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Polyamorous{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={props.statParams.partner_relStyle.Other}
                        name="partner_relStyle.Other"
                        onChange={props.handleInputBooleanChangeCb}
                        id="flexCheckChecked"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Other{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={props.statParams.partner_relStyle.None}
                        name="partner_relStyle.None"
                        onChange={props.handleInputBooleanChangeCb}
                        id="flexCheckChecked"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        None{' '}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id="panelsStayOpen-headingThree"
                >
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    Employment status:{' '}
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingThree"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="form-check offset-1 col-auto">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={
                            props.statParams.employment_status[
                              'Full-time wage job'
                            ]
                          }
                          name="employment_status.Full-time wage job"
                          onChange={props.handleInputBooleanChangeCb}
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Full-time wage job{' '}
                        </label>
                      </div>
                      <div className="form-check col-auto">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={
                            props.statParams.employment_status[
                              'Part-time wage job'
                            ]
                          }
                          name="employment_status.Part-time wage job"
                          onChange={props.handleInputBooleanChangeCb}
                          id="flexCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          Part-time wage job{' '}
                        </label>
                      </div>
                      <div className="form-check col-auto">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={
                            props.statParams.employment_status['No wage job']
                          }
                          name="employment_status.No wage job"
                          onChange={props.handleInputBooleanChangeCb}
                          id="flexCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          No wage job{' '}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Domestic Help{' '}
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body row">
                    <div className="form-check col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="domesticHelp.Yes"
                        value={props.statParams.domesticHelp.Yes}
                        onChange={props.handleInputBooleanChangeCb}
                        id="flexCheckChecked"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Yes{' '}
                      </label>
                    </div>
                    <div className="form-check col-auto">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="domesticHelp.No"
                        value={props.statParams.domesticHelp.No}
                        onChange={props.handleInputBooleanChangeCb}
                        id="flexCheckChecked"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        No{' '}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-outline-dark m-2 btn-block btn-signup text-uppercase offset-4 mb-5"
        type="submit"
      >
        Filter
      </button>
    </form>
  );
}
