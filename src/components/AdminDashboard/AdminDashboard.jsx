import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleClick(event) {
    setSelectedTab(event.target.id);
  }
  function handleMenuBtnClicked() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <section className="adminSection">
      <div className={!isMenuOpen ? "leftSection" : "closedLeftSection"}>
        <div className="adminNav">
          <div className="adminLogoContainer">
            <Link to={"/"}>
              <img src="/images/8.png" alt="logo" />
            </Link>
          </div>
          <div className="adminLinkContainer">
            <div className="adminLinks">
              <div className="adminlink" onClick={handleClick}>
                <Link
                  to="#"
                  id="dashboard"
                  className={`${
                    selectedTab === "dashboard" ? "activeTab" : ""
                  }`}
                >
                  <i class="fa-solid fa-house"></i>
                  <span>Dashboard</span>
                </Link>
              </div>

              <div className="adminlink" onClick={handleClick}>
                <NavLink
                  to="#"
                  id="Update"
                  className={`${selectedTab === "Update" ? "activeTab" : ""}`}
                >
                  <i class="fa-regular fa-image"></i>
                  <span>Update Gallery</span>
                </NavLink>
              </div>
              <div className="adminlink" onClick={handleClick}>
                <NavLink
                  to="#"
                  id="Add"
                  className={`${selectedTab === "Add" ? "activeTab" : ""}`}
                >
                  <i class="fa-solid fa-user"></i>
                  <span>Add Members</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={!isMenuOpen ? "rightSection" : "closedRightSection"}>
        <div className="rightNav">
          <div className="adminMenuBtn">
            <button
              className={isMenuOpen ? "opened menu" : "menu"}
              aria-label="Main Menu"
              onClick={handleMenuBtnClicked}
            >
              <svg width="50" height="50" viewBox="0 0 100 100">
                <path
                  className="line line1"
                  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                />
                <path className="line line2" d="M 20,50 H 80" />
                <path
                  className="line line3"
                  d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                />
              </svg>
            </button>
          </div>

          <div className="logoName">
            <p>St John's School Alumni Association</p>
          </div>
          <div className="otherContent">
            <div className="adminProfile"></div>
            <div className="logOutbtn">
              <button>Logout</button>
            </div>
          </div>
        </div>

        <div className="adminMainContent">
          <div className="container">
            <div className="row row-gap-4">
              <div className="col-lg-4 col-md-4 col-4">
                <h1>hello</h1>
              </div>
              <div className="col-lg-4 col-md-4 col-4">
                <h1>hello</h1>
              </div>
              <div className="col-lg-4 col-md-4 col-4">
                <h1>hello</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
