import React, { useContext } from "react";

export default function Sponsor() {
  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="title">
          <h2 >Sponsors for Alumni Meet 2024</h2>
        </div>
        <div className="row row-gap-4">
          <div className="col-lg-9 col-md-8 col-12">
            <div className="row row-gap-4">
              <div className="col-lg-4 col-md-4 col-6">
                <div className="sponserImage">
                  <img src="/images/sponsors/SMAuto.png" alt="" />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-6">
                <div className="sponserImage">
                  <img src="/images/sponsors/kartik-steels.jpeg" alt="" style={{height:"150px",objectFit:"contain"}} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-12">
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
