import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProfileView(props) {
  const [errorMsg, setErrorMsg] = useState('');

  if (!props.user) {
    return <h2>Loading...</h2>;
  }

  return (
    //    Code thanks to https://mdbootstrap.com/docs/standard/extended/profiles/
    <section className="vh-100">
      <div className="container py-5 h-100 mx-auto">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white mt-3 d-flex align-content-md-center flex-wrap"
                  style={{
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                  }}
                >
                  <h5 className="text-dark mx-auto">
                    {props.user.firstname + ' ' + props.user.lastname}
                  </h5>
                </div>

                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-9 mb-1">
                        <h6>Email</h6>
                        <p className="text-muted">{props.user.email}</p>
                      </div>
                      <div className="col-9 mb-1">
                        <h6>Username</h6>
                        <p className="text-secondary">{props.user.username}</p>
                      </div>
                    </div>
                    <div className="col-8 mb-3">
                      <Link
                        to="/edit-profile"
                        className="btn btn-outline-dark text-uppercase d-inline p-2 m-1 justify-content-center"
                      >
                        Edit Profile
                      </Link>
                      <Link
                        to=""
                        className="btn btn-outline-secondary text-uppercase d-inline d-inline p-2 m-1 justify-content-center"
                      >
                        Demographic Data
                      </Link>
                    </div>
                    <h6>Invoices</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row col-10 offset-1">
                      {props.user.invoices ? (
                        props.user.invoices.map((i) => (
                          <div
                            className="card me-auto col-12 p-3 m-1 justify-content-center"
                            key={i.id}
                          >
                            <div className="b-3">
                              <p>TO: {i.nameTo}</p>
                              <p className="text-muted">
                                DATE: {i.invoiceDate.slice(0, 10)}
                              </p>

                              <button
                                className="btn btn-outline-secondary btn-signup text-uppercase me-2"
                                onClick={(e) => props.deleteInvoiceCb(i.id)}
                              >
                                Delete
                              </button>
                              <Link
                                to={`/invoices/${i.id}`}
                                className="btn btn-outline-dark btn-signup text-uppercase me-2"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        ))
                      ) : (
                        <Link
                          to={
                            props.user.demographicData &&
                            Object.keys(props.user.demographicData).length !== 0
                              ? '/create'
                              : '/enter-data'
                          }
                          className="btn btn-outline-dark btn-signup text-uppercase me-2"
                        >
                          Create invoice
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileView;
