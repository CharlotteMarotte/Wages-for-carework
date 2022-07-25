import React, { useState } from 'react';
import {Link } from 'react-router-dom';

function ProfileView(props) {
  const [errorMsg, setErrorMsg] = useState('');

  if (!props.user || !props.user.invoices) {
    return <h2>Loading...</h2>;
  }

  return (
    //    Code thanks to https://mdbootstrap.com/docs/standard/extended/profiles/
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white mt-3"
                  style={{
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                  }}
                >
                  <img
                    src="https://www.medicalcost.com/wp-content/uploads/2012/04/HiRes_WOMAN.png"
                    alt="Avatar"
                    className="img-fluid my-3"
                    style={{ width: '80px' }}
                  />
                  <h5 className="text-dark">{props.user.firstname + ' ' + props.user.lastname}</h5>
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
                    <h6>Invoices</h6>
                    <hr className="mt-0 mb-4" />
                    {props.user.invoices.map((i) => (
                      <div className="row pt-1" key={i.id}>
                        <div className="col-6 mb-3">
                          <h6>{i.nameTo}</h6>
                          <p className="text-muted">{i.invoiceDate.slice(0, 10)}</p>
                          <Link to={`/invoices/${i.id}`} className="btn btn-outline-primary btn-signup text-uppercase">View</Link>

                        </div>
                      </div>
                    ))}
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
