import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import UpdatePassword from "../UpdatePassword/UpdatePassword";

export default function Profile() {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [userData, setUserData] = useState("");
  const { isLogedIn, setIsLogedIn } = useContext(Context);
  const [passwordModal,setPasswordModal] = useState(false)
  const navigator = useNavigate();

  function handleEdit() {
    setIsFormEditable((prevState) => !prevState);
  }

  useEffect(() => {
    if (passwordModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [passwordModal]);

  useEffect(() => {
    if (!isLogedIn) {
      navigator("/");
      return;
    }

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
        setUserData(response.data);
        // console.log(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [isLogedIn, navigator]);

  return (
    <section className="sectionContainer">
      <div className="container">
        {!userData ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            <ComponentLoader />{" "}
          </div>
        ) : (
          <div className="row row-gap-5">
            <div className="col-lg-5">
              <div className="profileContainer">
                <div className="profileImageContainer">
                  <div
                    className="profileBanner"
                    style={{
                      backgroundImage:
                        "url('/images/profile-banner/school.jpg')",
                    }}
                  ></div>
                  <div className="profileImage">
                    <img src={userData?.profile_picture} alt="" />
                  </div>
                  <div className="nameContainer">
                    <h3>{userData?.title}</h3>
                    <p>{userData?.trade_category}</p>
                    <p>{userData?.address}</p>
                    <div className="socialMediaIcons">
                      <i className="fa-brands fa-instagram"></i>
                      <i className="fa-brands fa-x-twitter"></i>
                      <i className="fa-brands fa-facebook-f"></i>
                      <i className="fa-brands fa-linkedin-in"></i>
                    </div>
                    <button onClick={()=>setPasswordModal(true)}>Update Password</button>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "2px",
                      background: "black",
                    }}
                  ></div>
                  <div className="summary">
                    <h6>About Me</h6>
                    <p></p>
                  </div>
                  {/* <div className="buttonContainer">
                  <button>Message</button>
                  <button>Call</button>
                </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="profileEditContainer">
                <div className="profileFormContainer">
                  <div className="editTitle">
                    <h3>Edit Your Profile</h3>
                  </div>

                  <div className="editForm">
                    <div className="row">
                      <div className="col-lg-12">
                        <form>
                          <div className="row row-gap-4">
                            <div className="col-lg-6">
                              <label htmlFor="name">Name</label>
                              <input
                                type="text"
                                placeholder="Name"
                                disabled
                                id="name"
                                value={userData.title}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="batch">Batch</label>
                              <input
                                type="number"
                                placeholder="Batch"
                                disabled={!isFormEditable}
                                id="batch"
                                value={userData.batch}
                              />
                            </div>

                            <div className="col-lg-6">
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                placeholder="Email"
                                disabled
                                id="email"
                                value={userData.email_id}
                              />
                            </div>

                            <div className="col-lg-6">
                              <label htmlFor="contact">Contact No:</label>
                              <input
                                type="tel"
                                placeholder="Contact No"
                                id="contact"
                                value={userData.mobile_number_one}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="contact2">Contact No 2:</label>
                              <input
                                type="tel"
                                placeholder="Alternate Contact no "
                                id="contact2"
                                value={userData?.mobile_number_two || ""}
                                disabled={!isFormEditable}
                              />
                            </div>

                            <div className="col-lg-6">
                              <label htmlFor="dob">DOB</label>
                              <input
                                type="text"
                                placeholder="Date of birth "
                                id="dob"
                                value={userData.birth_date}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="location">Location</label>
                              <input
                                type="text"
                                placeholder="Location"
                                id="location"
                                value={userData.location}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="Joining">Joining Year</label>
                              <input
                                type="text"
                                placeholder="Joining Year"
                                id="Joining"
                                value={userData.joining_year}
                                disabled={!isFormEditable}
                              />
                            </div>

                            <div className="col-lg-6">
                              <label htmlFor="Qualification ">
                                Qualification{" "}
                              </label>
                              <input
                                type="text"
                                placeholder="Qualification "
                                id="Qualification "
                                value={userData.qualification}
                                disabled={!isFormEditable}
                              />
                            </div>

                            <div className="col-lg-6">
                              <label htmlFor="career">
                                Current career/position{" "}
                              </label>
                              <input
                                type="text"
                                placeholder="Current career/position  "
                                id="career "
                                value={userData.trade_category}
                                disabled={!isFormEditable}
                              />
                            </div>

                            <div className="col-lg-6">
                              <label htmlFor="House">House you belonged</label>
                              <input
                                type="text"
                                placeholder="House you belonged"
                                id="House "
                                value={userData.house}
                                disabled={!isFormEditable}
                              />
                            </div>

                            <div className="col-lg-6">
                              <label htmlFor="spouse">Name of spouse</label>
                              <input
                                type="text"
                                placeholder="Name of spouse"
                                id="spouse "
                                value={userData.spouse_name}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="Wedding">Wedding Date </label>
                              <input
                                type="text"
                                placeholder="Wedding Date "
                                id="Wedding "
                                value={userData.anniversary}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="Children">
                                Details of Children
                              </label>
                              <input
                                type="text"
                                placeholder="Details of Children"
                                id="Children "
                                value={userData.children_details}
                                disabled={!isFormEditable}
                              />
                            </div>

                            <div className="col-lg-6">
                              <label htmlFor="Children">Address</label>
                              <input
                                type="text"
                                placeholder="Address"
                                id="Address "
                                value={userData.address}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="About">About Me</label>
                              <input
                                type="text"
                                placeholder="About Me"
                                id="About "
                                // value={userData.address}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="FB">FB Profile</label>
                              <input
                                type="text"
                                placeholder="FB Profile Link"
                                id="FB "
                                // value={userData.address}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="LinkedIn">LinkedIn Profile</label>
                              <input
                                type="text"
                                placeholder="Linked In Profile"
                                id="LinkedIn "
                                // value={userData.address}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="Instagram">
                                Instagram Profile
                              </label>
                              <input
                                type="text"
                                placeholder="Instagram Profile"
                                id="Instagram "
                                // value={userData.address}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="Twitter">Twitter Profile</label>
                              <input
                                type="text"
                                placeholder="Twitter Profile"
                                id="Twitter "
                                // value={userData.address}
                                disabled={!isFormEditable}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="Profile">Profile Picture :</label>
                              <input
                                type="file"
                                id="Profile "
                                // value={userData.address}
                                disabled={!isFormEditable}
                              />
                            </div>

                            <button type="button" onClick={handleEdit}>
                              {isFormEditable ? "Cancel" : "Edit Profile"}
                            </button>
                            {isFormEditable && (
                              <>
                                <button type="submit">Save</button>
                                <button type="reset">Reset</button>
                              </>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {passwordModal && <UpdatePassword closeBtn={setPasswordModal}/>}
    </section>
  );
}
