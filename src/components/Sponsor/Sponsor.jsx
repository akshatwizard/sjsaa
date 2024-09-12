import React, { useContext } from "react";

export default function Sponsor() {
  return (
    <section className="sectionContainer">
      <div className="container" >
        <div className="title aboutTitle text-center">
          <h1>Sponsors for 2024 Alumni Meet</h1>
        </div>
        <div className="row justify-content-md-center">
          
          <div className="col-lg-2">
            <div className="aboutContainer_2">
              <div className="row row-gap-2">
                
                <div className="col-lg-12">
                    <div className="aboutImageContainer">
                        <img src="/images/sponsors/SMAuto.png" loading="lazy"/>
                        {/* <h4 className="text-center mt-3 sponsor-h">Sm Auto</h4> */}
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="aboutContainer_2">
              <div className="row row-gap-2">
                <div className="col-lg-12">
                    <div className="aboutImageContainer">
                        <img src="/images/sponsors/WizardsNext.png" loading="lazy"/>
                        {/* <h4 className="text-center mt-3 sponsor-h">Wizards Next</h4> */}
                    </div>
                </div>
                
              </div>
            </div>
          </div>
          {/* <div className="col-lg-5">
            <div className="eventsContainer">
              <div className="eventTitle">
                <h4>Upcoming Events</h4>
              </div>
              <div className="eventDetails">
                <div className="eventDetailsBox">
                  <div className="dateContainer">
                    <p>DEC</p>
                    <h2>19</h2>
                  </div>
                  <div style={{width:"2px",minHeight:"70px",background:"#f08a5d",margin:"0 5px"}}></div>
                  <div className="titleContainer">
                    <Link to={"/event"}>
                      Meet & Greet.<i className="fa-solid fa-arrow-right "></i>
                    </Link>
                  </div>
                </div>
                
                <div className="eventDetailsBox">
                  <div className="dateContainer">
                    <p>DEC</p>
                    <h2>20</h2>
                  </div>
                  <div style={{width:"2px",minHeight:"70px",background:"#f08a5d",margin:"0 5px"}}></div>
                  <div className="titleContainer">
                    <Link to={"/event"}>
                      Memories Events & Grand Party for '99' Batch.
                      <i className="fa-solid fa-arrow-right "></i>
                    </Link>
                  </div>
                </div>
                <div className="eventDetailsBox">
                  <div className="dateContainer">
                    <p>DEC</p>
                    <h2>21</h2>
                  </div>
                  <div style={{width:"2px",minHeight:"70px",background:"#f08a5d",margin:"0 5px"}}></div>
                  <div className="titleContainer">
                    <Link to={"/event"}>
                      School Functions All Day Long Followed By Gala Dinner At
                      Night.<i className="fa-solid fa-arrow-right "></i>
                    </Link>
                  </div>
                </div>
              </div>
              <button className="viewMoreBtn">View More Events</button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
