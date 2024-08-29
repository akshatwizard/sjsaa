import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import SuccessMessage from "./SuccessMessage";

export default function Profile() {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [userData, setUserData] = useState("");
  const { isLogedIn, setIsLogedIn } = useContext(Context);
  const [passwordModal, setPasswordModal] = useState(false);
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullUserData, setFullUserData] = useState({
    name: "",
    email: "",
    batch: "",
    contactNo: "",
    contactNo2: "",
    dob: "",
    location: "",
    joiningYear: "",
    qualification: "",
    career: "",
    house: "",
    spouse: "",
    wedding: "",
    children: "",
    address: "",
    aboutMe: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  

  const [profilePic, setProfilePic] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFullUserData((prevValue) => {
      return {
        ...prevValue,
        [id]: value,
      };
    });
  };
  // console.log(userData);

  const handleProfilePictureChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  function handleEdit() {
    setIsFormEditable((prevState) => !prevState);
  }

  useEffect(() => {
    if (passwordModal || showSuccessMessage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [passwordModal,showSuccessMessage]);

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

        const data = response.data;
        setUserData(data);
        setFullUserData({
          name: data?.title || "",
          email: data?.email_id || "",
          batch: data?.batch || "",
          contactNo: data?.mobile_number_one || "",
          contactNo2: data?.mobile_number_two || "",
          dob: data?.birth_date ? data.birth_date.split(" ")[0] : "",
          location: data?.location || "",
          joiningYear: data?.joining_year || "",
          qualification: data?.qualification || "",
          career: data?.trade_category || "",
          house: data?.house || "",
          spouse: data?.spouse_name || "",
          wedding: data?.anniversary ? data.anniversary.split(" ")[0] : "",
          children: data?.children_details || "",
          address: data?.address || "",
          aboutMe: data?.about_me || "",
          facebook: data?.facebook || "",
          linkedin: data?.linkedin || "",
          instagram:data?.instagram || "",
          twitter: data?.twitter || "",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [isLogedIn, navigator,]);

  async function handleDataSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const id = await Cookies.get("mnid");

    const formData = new FormData();
    formData.append("profilePic", profilePic);
    formData.append("Mod" ,"updateMemberData")
    formData.append("mnid" ,id)
    Object.keys(fullUserData).forEach((key) => {
      formData.append(key, fullUserData[key]);
    });

    try {
      const response = await axios.post("https://www.gdsons.co.in/draft/sjs/update-members-data",formData)
      // console.log(response.data[0].message);

      if (response.data[0].message === 'Updated') {
        setShowSuccessMessage(true)
        setIsFormEditable(false)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      setShowSuccessMessage(false)
    }


  }

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
                    <button onClick={() => setPasswordModal(true)}>
                      Update Password
                    </button>
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
                        <form onSubmit={handleDataSubmit}>
                          <div className="row row-gap-4">
                            <div className="row row-gap-4">
                              <div className="col-lg-6">
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  placeholder="Name"
                                  disabled
                                  id="name"
                                  value={fullUserData.name}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="batch">Batch</label>
                                <input
                                  type="number"
                                  placeholder="Batch"
                                  disabled={!isFormEditable}
                                  id="batch"
                                  value={fullUserData.batch}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  placeholder="Email"
                                  disabled
                                  id="email"
                                  value={fullUserData.email}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="contactNo">
                                  Contact No:
                                </label>
                                <input
                                  type="tel"
                                  placeholder="Contact No"
                                  id="contactNo"
                                  value={fullUserData.contactNo}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="contactNo2">
                                  Contact No 2:
                                </label>
                                <input
                                  type="tel"
                                  placeholder="Alternate Contact No"
                                  id="contactNo2"
                                  value={fullUserData.contactNo2}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="dob">DOB</label>
                                <input
                                  type="text"
                                  placeholder="Date of Birth"
                                  id="dob"
                                  value={fullUserData.dob}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="location">Location</label>
                                <input
                                  type="text"
                                  placeholder="Location"
                                  id="location"
                                  value={fullUserData.location}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="joiningYear">
                                  Joining Year
                                </label>
                                <input
                                  type="text"
                                  placeholder="Joining Year"
                                  id="joiningYear"
                                  value={fullUserData.joiningYear}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="qualification">
                                  Qualification
                                </label>
                                <input
                                  type="text"
                                  placeholder="Qualification"
                                  id="qualification"
                                  value={fullUserData.qualification}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="career">
                                  Current career/position
                                </label>
                                <input
                                  type="text"
                                  placeholder="Current career/position"
                                  id="career"
                                  value={fullUserData.career}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="house">
                                  House you belonged
                                </label>
                                <input
                                  type="text"
                                  placeholder="House you belonged"
                                  id="house"
                                  value={fullUserData.house}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="spouse">
                                  Name of Spouse
                                </label>
                                <input
                                  type="text"
                                  placeholder="Name of Spouse"
                                  id="spouse"
                                  value={fullUserData.spouse}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="wedding">
                                  Wedding Date
                                </label>
                                <input
                                  type="text"
                                  placeholder="Wedding Date"
                                  id="wedding"
                                  value={fullUserData.wedding}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="children">
                                  Details of Children
                                </label>
                                <input
                                  type="text"
                                  placeholder="Details of Children"
                                  id="children"
                                  value={fullUserData.children}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="address">Address</label>
                                <input
                                  type="text"
                                  placeholder="Address"
                                  id="address"
                                  value={fullUserData.address}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="aboutMe">About Me</label>
                                <textarea
                                  type="text"
                                  placeholder="About Me"
                                  id="aboutMe"
                                  value={fullUserData.aboutMe}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                ></textarea>
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="facebook">FB Profile</label>
                                <input
                                  type="text"
                                  placeholder="FB Profile Link"
                                  id="facebook"
                                  value={fullUserData.facebook}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="linkedin">
                                  LinkedIn Profile
                                </label>
                                <input
                                  type="text"
                                  placeholder="LinkedIn Profile"
                                  id="linkedin"
                                  value={fullUserData.linkedin}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="instagram">
                                  Instagram Profile
                                </label>
                                <input
                                  type="text"
                                  placeholder="Instagram Profile"
                                  id="instagram"
                                  value={fullUserData.instagram}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="twitter">
                                  Twitter Profile
                                </label>
                                <input
                                  type="text"
                                  placeholder="Twitter Profile"
                                  id="twitter"
                                  value={fullUserData.twitter}
                                  disabled={!isFormEditable}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-lg-6">
                                <label htmlFor="profilePic">
                                  Profile Picture:
                                </label>
                                <input
                                  type="file"
                                  id="profilePic"
                                  onChange={handleProfilePictureChange}
                                  disabled={!isFormEditable}
                                />
                              </div>
                            </div>

                            <button type="button" onClick={handleEdit}>
                              {isFormEditable ? "Cancel" : "Edit Profile"}
                            </button>
                            {isFormEditable && (
                              <>
                                <button type="submit">{loading ? <ComponentLoader /> : "Save"}</button>
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
      {passwordModal && <UpdatePassword closeBtn={setPasswordModal} />}
      {showSuccessMessage && <SuccessMessage status={()=>setShowSuccessMessage(false)}/>}
    </section>
  );
}
