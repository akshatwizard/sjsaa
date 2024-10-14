import React from "react";

export default function WishMe() {
  return (
    <section className="sectionContainer">
      <img src="images/events/3.png" className="flg" />
      <div className="container">
        <div className="title">
          <h3 className="wish-tagline">Wish Me.....</h3>
        </div>
        <div className="row row-gap-3">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wish-me-container">
              <div
                className="wish-me-header"
                style={{
                  backgroundImage: "url('images/events/birthday-img.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right top",
                  backgroundSize: "contain",
                }}
              >
                <img src="images/events/cake.png" alt="" className="cake" />
                <h1>Birthday</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wish-me-container">
              <div
                className="wish-me-header"
                style={{
                  backgroundImage: "url('images/events/man.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right top",
                  backgroundSize: "contain",
                }}
              >
                <h1 style={{ color: "rgb(246 200 56)"}}>Anniversary</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
