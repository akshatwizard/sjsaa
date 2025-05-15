import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import ComponentLoader from "../ComponentLoader/ComponentLoader.jsx";
const Dashboard = lazy(() => import("./AdminComponents/Dashboard.jsx"));
const AddMembers = lazy(() => import("./AdminComponents/AddMembers.jsx"));
const GalleryUpdate = lazy(() => import("./AdminComponents/GalleryUpdate.jsx"));
const OurAlumni = lazy(() => import("../OurAlumni/OurAlumni.jsx"));
const AddNewEvent = lazy(() => import("./AdminComponents/AddNewEvent.jsx"));
const AddAchievements = lazy(() =>
  import("./AdminComponents/AddAchievements.jsx")
);
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../Loader/Loader.jsx";
export default function AdminDashboard() {
  const { isLogedIn, setIsLogedIn, onlyAdmin, setOnlyAdmin } =
    useContext(Context);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [adminData, setAdminData] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState("");
  const { noOfMembers, totalEvents } = useContext(Context);
  const navigator = useNavigate();
  let date = new Date().getFullYear();

  function handleClick(event) {
    setSelectedTab(event.currentTarget.id);
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
          setRole(response?.data.userrole);
          if (response?.data.userrole !== "Webadmin") {
            window.location.href = "/";
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
    if (!isLogedIn && !onlyAdmin) {
      window.location.href = "/";
      return;
    }
  }, [isLogedIn, navigator, onlyAdmin]);

  const handleLogOut = () => {
    Cookies.remove("mnid");
    setIsLogedIn(false);
    setOnlyAdmin(false);
    window.location.href = "/";
  };
  // console.log(role);

  return (
    <section className="adminSection">
      <div className={!isMenuOpen ? "leftSection" : "closedLeftSection"}>
        <div className="adminNav">
          <div className="adminLogoContainer">
            <Link to={`${isLogedIn ? "/" : ""}`}>
              <img src="/images/8.png" alt="logo" />
            </Link>
            {isMenuOpen && (
              <i
                onClick={() => setIsMenuOpen(false)}
               className="clbt fa-solid fa-angle-left"
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
              <div className="adminlink">
                <div
                  id="dashboard"
                  className={`${
                    selectedTab === "dashboard" ? "activeTab" : ""
                  }`}
                  onClick={handleClick}
                >
                  <i className="fa-solid fa-house"></i>
                  <span>Dashboard</span>
                </div>
              </div>

              <div className="adminlink">
                <div
                  id="Update"
                  className={`${selectedTab === "Update" ? "activeTab" : ""}`}
                  onClick={handleClick}
                >
                  <i className="fa-regular fa-image"></i>
                  <span>Update Gallery</span>
                </div>
              </div>

              <div className="adminlink">
                <div
                  id="Add"
                  className={`${selectedTab === "Add" ? "activeTab" : ""}`}
                  onClick={handleClick}
                >
                  <i className="fa-solid fa-user"></i>
                  <span>Add Members</span>
                </div>
              </div>

              <div className="adminlink">
                <div
                  id="event"
                  className={`${selectedTab === "event" ? "activeTab" : ""}`}
                  onClick={handleClick} // Move onClick here
                >
                  <i className="fa-solid fa-calendar-days"></i>
                  <span>Add Events</span>
                </div>
              </div>

              <div className="adminlink">
                <div
                  id="achievements"
                  className={`${
                    selectedTab === "achievements" ? "activeTab" : ""
                  }`}
                  onClick={handleClick} // Move onClick here
                >
                  <i className="fa-solid fa-star"></i>
                  <span>Add Achievement</span>
                </div>
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
            {!onlyAdmin && (
              <div className="adminProfile">
                <img src={adminData?.profile_picture} alt="" />
              </div>
            )}
            <div className="logOutbtn">
              <button onClick={handleLogOut}>Logout</button>
            </div>
          </div>
        </div>

        {selectedTab === "dashboard" && (
          <Suspense fallback={<Loader />}>
            <Dashboard
              OurAlumni={OurAlumni}
              noOfMembers={noOfMembers}
              ComponentLoader={ComponentLoader}
              totalEvents={totalEvents}
            />
          </Suspense>
        )}

        {selectedTab === "Update" && (
          <Suspense fallback={<Loader />}>
            <GalleryUpdate />
          </Suspense>
        )}
        {selectedTab === "Add" && (
          <Suspense fallback={<Loader />}>
            <AddMembers />
          </Suspense>
        )}
        {selectedTab === "event" && (
          <Suspense fallback={<Loader />}>
            <AddNewEvent />
          </Suspense>
        )}

        {selectedTab === "achievements" && (
          <Suspense fallback={<Loader />}>
            <AddAchievements />
          </Suspense>
        )}

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
