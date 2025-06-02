import React from 'react'

export default function PaymentPage() {
  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="title">
          <h1>Process the payment</h1>
        </div>
        <p
          style={{
            color: "var(--text-color)",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          After registration, please process the payment of{" "}
          <span style={{ color: "red", fontWeight: "500" }}>Rs. 4000</span> for
          Lifetime Membership of SJSAA.
        </p>
        <div className="row row-gap-4">
          <div className="col-lg-6">
            <div className="paymentContainer">
              <div className="title">
                <h1>Bank Details</h1>
              </div>
              <div className="bankDetails">
                <ul>
                  <li>
                    Account name :-{" "}
                    <span>ST.JOHNS SCHOOL (DLW) ALUMNI ASSOCIATION</span>
                  </li>
                  <li>
                    Account number :- <span>30537291315</span>
                  </li>
                  <li>
                    IFSC Code :- <span>SBIN0002552</span>
                  </li>
                  <li>
                    Bank :-{" "}
                    <span>
                      STATE bank of india, industrial estate, VARANASI
                    </span>
                  </li>
                </ul>
              </div>
              <hr style={{ color: "white", height: "3px" }} />
              <h5>
                After making the payment, send the receipt/copy/pic of payment
                to our E-Mail ID : sjsaa.info@gmail.com && sjsaa.info@gmail.com
              </h5>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="paymentContainer">
              <div className="title">
                <h1>QR Code</h1>
              </div>
              <div className="bankDetails text-center">
                <img src="/images/or.jpeg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
