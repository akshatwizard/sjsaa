import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import ComponentLoader from "../ComponentLoader/ComponentLoader.jsx";
import Dashboard from "./AdminComponents/Dashboard.jsx";
import GalleryUpdate from "./AdminComponents/GalleryUpdate.jsx";
import AddMembers from "./AdminComponents/AddMembers.jsx";
const OurAlumni = lazy(() => import("../OurAlumni/OurAlumni.jsx"));
import Cookies from "js-cookie";
import axios from "axios";
export default function AdminDashboard() {
  const { isLogedIn,setIsLogedIn } = useContext(Context);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [adminData, setAdminData] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { noOfMembers } = useContext(Context);
  const navigator = useNavigate();
  let date = new Date().getFullYear();
  function handleClick(event) {
    setSelectedTab(event.target.id);
  }
  function handleMenuBtnClicked() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    if (isLogedIn) {
      const id = Cookies.get("mnid");
      
      const fetchUserDetails = async () => {
        const formData = new FormData();
        formData.append("mnid", id);
        formData.append("Mod", "getMemberData");
        
        try {
          const response = await axios.post(
            `https://www.gdsons.co.in/draft/sjs/get-member-details`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setAdminData(response?.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
      // console.log(adminData);
      
    }
    if (!isLogedIn) {
      navigator("/");
      return;
    }

  }, [isLogedIn, navigator]);

  const handleLogOut = () => {
    Cookies.remove("mnid");
    setIsLogedIn(false);
  };


  return (
    <section className="adminSection">
      <div className={!isMenuOpen ? "leftSection" : "closedLeftSection"}>
        <div className="adminNav">
          <div className="adminLogoContainer">
            <Link to={"/"}>
              <img src="/images/8.png" alt="logo" />
            </Link>
            {isMenuOpen && (
              <i
                onClick={() => setIsMenuOpen(false)}
                class="clbt fa-solid fa-angle-left"
                style={{
                  color: "var(--text-color)",
                  fontSize: "27px",
                  position: "absolute",
                  right: "20px",
                  top: "15px",
                  display: "flex",
                  width: "47px",
                  height: "47px",
                  border: "2px solid white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}
              ></i>
            )}
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
              <div className="adminlink" onClick={handleClick}>
                <NavLink
                  to="#"
                  id="event"
                  className={`${selectedTab === "event" ? "activeTab" : ""}`}
                >
                  <i class="fa-solid fa-calendar-days"></i>
                  <span>Add Events</span>
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
            <div className="adminProfile">
              <img src={adminData?.profile_picture} alt="" />
            </div>
            <div className="logOutbtn">
              <button onClick={handleLogOut}>Logout</button>
            </div>
          </div>
        </div>

        {selectedTab === "dashboard" && (
          <Dashboard
            OurAlumni={OurAlumni}
            noOfMembers={noOfMembers}
            ComponentLoader={ComponentLoader}
          />
        )}

        {selectedTab === "Update" && <GalleryUpdate />}
        {selectedTab === "Add" && <AddMembers />}

        <div className="col-lg-12">
          <div className="endSection">
            <p>
              {" "}
              Copyright @ {date}{" "}
              <span>St. John&apos;s School Alumni Association</span> | Made With{" "}
              <i className="fa-solid fa-heart" style={{ color: "#C40C0C" }}></i>{" "}
              By{" "}
              <Link to="https://wizards.co.in/" target="_blank">
                <span>Wizards.</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
