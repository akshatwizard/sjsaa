import React from "react";

export default function SuccessMessage({ status }) {
  return (
    <section className="successMessgaeContainer">
      <div className="successMessage">
        <div className = "success-message">
          <svg viewBox="0 0 76 76" className = "success-message__icon icon-checkmark">
            <circle cx="38" cy="38" r="36" />
            <path
              fill="none"
              stroke="#FFFFFF"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              d="M17.7,40.9l10.9,10.9l28.7-28.7"
            />
          </svg>
          <h1 className = "success-message__title">Thanks for your Registration!</h1>
          <div className = "success-message__content">
            <p>
              We have received your data and will get back to you in 24-48
              Hours.
            </p>
          </div>
          <div className="otherMessage">
            <h5>
              In the meantime, please process the payment of{" "}
              <span style={{ color: "red", fontWeight: "500" }}>Rs. 3000</span>{" "}
              for Lifetime Membership of SJSAA.
            </h5>
            <p>You can make the payment through following 2 options :</p>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <p>Transfer Rs. 3000 to the following Bank Account </p>
                <h6>
                  Bank Account Details.
                </h6>
                <ul>
                  <li>Account name :- <span>ST.JOHNS SCHOOL (DLW) ALUMNI ASSOCIATION</span></li>
                  <li>Account number :- <span>30537291315</span></li>
                  <li>IFSC Code :- <span>SBIN0002552</span></li>
                  <li>Bank :- <span>STATE bank of india, industrial estate, VARANASI</span></li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <p>Make Payment to the given QR Code</p>
                <img src="/images/or.jpeg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="success-close-btn">
          <span onClick={() => status(false)}>
            <i className = "fa-solid fa-xmark"></i>
          </span>
        </div>
      </div>
    </section>
  );
}
