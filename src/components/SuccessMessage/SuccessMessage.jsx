import React from "react";

export default function SuccessMessage({ status }) {
  return (
    <section className="successMessgaeContainer">
      <div className="successMessage">
        <div className="success-message">
          <h1 className="success-message__title">Thanks for your Pesence!</h1>
          <div className="otherMessage">
            <h5 style={{ textAlign: "left" }}>
              In the meantime, please process the payment of{" "}
              <span style={{ color: "red", fontWeight: "500" }}>Rs. 3000</span>{" "}
              for Lifetime Membership of SJSAA on given QR Code and upload the confirmation Image
            </h5>
            <div className="row">
              <div className="col-lg-5 col-md-6 col-12">
                <p>Make Payment to the given QR Code</p>
                <img src="/images/or.jpeg" alt="" />
              </div>

              <div className="col-lg-7 col-md-6 col-12">
                <label htmlFor="profile" style={{ color: "black" }}>
                  Payment ScreenShot <sup>*</sup>
                </label>
                <div
                  className="up-ss"
                  style={{
                    border: "1px solid"
                    // backgroundImage: profilePic
                    //   ? `url(${URL.createObjectURL(profilePic)})`
                    //   : "none",
                  }}
                >
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    // onChange={handleFileChange}
                    accept="image/jpeg, image/png, image/jpg"
                    style={{
                      opacity: 0,
                      inset: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    required
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="success-close-btn">
          <span onClick={() => status(false)}>
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
      </div>
    </section>
  );
}
