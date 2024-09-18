import React, { useContext } from "react";

export default function Sponsor() {
  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="title">
          <h1>Sponsors for Alumni Meet 2024</h1>
        </div>
        <div className="row row-gap-4 justify-content-between">
          <div className="col-lg-3 col-md-4 col-6">
            <div className="sponserImage">
              <img src="/images/sponsors/SMAuto.png" alt="" />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-6">
            <div className="sponserImage">
              <img src="/images/sponsors/WizardsNext.png" alt="" />
              <p>Digital Partner.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
