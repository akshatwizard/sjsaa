import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import ComponentLoader from "../ComponentLoader/ComponentLoader.jsx";
import { Link } from "react-router-dom";

export default function RegistrationForm() {
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState({});
  const [paymentImage, setPaymentImage] = useState(null)
  const [isUploaded, setIsUploaded] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    batch: "",
    email: "",
    contactNo: "",
    dob: "",
    location: "",
    qualification: "",
    house: "",
    career: "",
    spouse: "",
    children: "",
    wedding: "",
    address: "",
    Mod: "addMember",
    joiningYear: new Date().toISOString().slice(0, 10),
  });
  const { loading, setLoading } = useContext(Context);

  useEffect(() => {
    if (isRegistrationSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isRegistrationSuccess]);

  // useEffect(() => {
  //   // const currentYear = new Date().get
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     // joiningYear: currentYear,
  //   }));
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (validImageTypes.includes(fileType)) {
        setProfilePic(file);
      } else {
        setProfilePic(null);
        setErrors({
          ...errors,
          profilePic: "Only JPEG and PNG images are allowed.",
        });
      }
    }
  };

  function handlePaymentImage(e) {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (validImageTypes.includes(fileType)) {
        setPaymentImage(file);
      } else {
        setPaymentImage(null);
      }
    }

  }

  const validateForm = () => {
    const newErrors = {};

    if (!userData.name) newErrors.name = "Name is required";
    if (!userData.batch) newErrors.batch = "Batch is required";
    if (!userData.email) newErrors.email = "Email is required";
    if (!userData.contactNo) newErrors.contactNo = "Contact number is required";
    if (!userData.dob) newErrors.dob = "Date of birth is required";
    if (!userData.location) newErrors.location = "Location is required";
    if (!profilePic) newErrors.profilePic = "Profile picture is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleUploadPaymentSS() {
    if (!validateForm()) {
      return;
    }

    setIsRegistrationSuccess(true);
  }

  const handleSubmitBtn = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const uploadError = {};
    if (!paymentImage) {
      uploadError.paymentImageError = "Payment Confirmation Image is Required";
      setErrors(uploadError);
      return Object.keys(uploadError).length === 0;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    formData.append("paymentscreen", paymentImage);
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/get-members-data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setIsRegistrationSuccess(false)
      setUserData({
        name: "",
        batch: "",
        email: "",
        contactNo: "",
        dob: "",
        location: "",
        qualification: "",
        house: "",
        career: "",
        spouse: "",
        children: "",
        wedding: "",
        address: "",
        joiningYear: new Date().toISOString().slice(0, 10),
      })
      setProfilePic(null);
      setPaymentImage(null)
      setIsUploaded(true)
    } catch (error) {
      setLoading(false);
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="title">
          <h1>New Member Registration Form</h1>
        </div>
        <div className="row row-gap-4 ">
          <div className="col-lg-12">
            <div className="regFormContainer">
              <div className="row">
                <div className="col-lg-9">
                  <div className="row row-gap-4">
                    <div className="col-lg-6">
                      <label htmlFor="name">
                        Name<sup>*</sup>{" "}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <input
                      type="hidden"
                      id="Mod"
                      name="Mod"
                      placeholder="Full Name"
                      value={userData.Mod}
                    />

                    <div className="col-lg-6">
                      <label htmlFor="batch">
                        Batch<sup>*</sup>{" "}
                      </label>
                      <input
                        type="number"
                        id="batch"
                        name="batch"
                        placeholder="1998"
                        value={userData.batch}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.batch && <p className="error">{errors.batch}</p>}
                    </div>

                    <div className="col-lg-6">
                      <label htmlFor="email">
                        Email<sup>*</sup>{" "}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="col-lg-6">
                      <label htmlFor="contactNo">
                        Contact No<sup>*</sup>{" "}
                      </label>
                      <input
                        type="text"
                        id="contactNo"
                        name="contactNo"
                        placeholder="+91 1234567890"
                        value={userData.contactNo}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.contactNo && (
                        <p className="error">{errors.contactNo}</p>
                      )}
                    </div>

                    <div className="col-lg-6">
                      <label htmlFor="dob">
                        DOB<sup>*</sup>{" "}
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={userData.dob}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.dob && <p className="error">{errors.dob}</p>}
                    </div>

                    <div className="col-lg-6">
                      <label htmlFor="location">
                        Location<sup>*</sup>{" "}
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Your Location"
                        value={userData.location}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.location && (
                        <p className="error">{errors.location}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-3">
                  <label htmlFor="profile">
                    Profile Pic<sup>*</sup>
                  </label>
                  <div
                    className="reg-profile-pic"
                    style={{
                      backgroundImage: profilePic
                        ? `url(${URL.createObjectURL(profilePic)})`
                        : "none",
                    }}
                  >
                    <input
                      type="file"
                      name="profile"
                      id="profile"
                      onChange={handleFileChange}
                      accept="image/jpeg, image/png, image/jpg"
                      style={{
                        opacity: 0,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      required
                    />
                  </div>
                  <span>245w X 250h</span>
                  {errors.profilePic && (
                    <p className="error">{errors.profilePic}</p>
                  )}
                </div>

                {/* Additional Form Fields */}
                <div className="col-lg-4 mt-5">
                  <label htmlFor="joiningYear">Alumni Joining Year</label>
                  <input
                    type="text"
                    id="joiningYear"
                    name="joiningYear"
                    placeholder="Your Joining Year"
                    value={userData.joiningYear}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>

                <div className="col-lg-4 mt-5">
                  <label htmlFor="qualification">Qualification</label>
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    placeholder="Your Qualification"
                    value={userData.qualification}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-lg-4 mt-5">
                  <label htmlFor="career">Current career/position</label>
                  <input
                    type="text"
                    id="career"
                    name="career"
                    placeholder="Current career/position"
                    value={userData.career}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-lg-4 mt-3">
                  <label htmlFor="house">House you belonged</label>
                  <select
                    name="house"
                    id="house"
                    value={userData.house}
                    onChange={handleInputChange}
                  >
                    <option value="">---Select House---</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                  </select>
                </div>

                <div className="col-lg-4 mt-3">
                  <label htmlFor="spouse">Name of spouse</label>
                  <input
                    type="text"
                    id="spouse"
                    name="spouse"
                    placeholder="Name of spouse"
                    value={userData.spouse}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-lg-4 mt-3">
                  <label htmlFor="children">Name of Children</label>
                  <input
                    type="text"
                    id="children"
                    name="children"
                    placeholder="Name of Children"
                    value={userData.children}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-lg-4 mt-3">
                  <label htmlFor="wedding">Wedding Date</label>
                  <input
                    type="date"
                    id="wedding"
                    name="wedding"
                    placeholder="Wedding Date"
                    value={userData.wedding}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-lg-8 mt-3">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="regSubmitBtn">
                <button onClick={handleUploadPaymentSS}>
                  {loading ? <ComponentLoader /> : "Submit Now"}
                </button>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Link
                to="/payment-page"
                style={{ color: "var(--third-color)", textDecoration: "none" }}
              >
                Click Here for registration process
              </Link>
            </div>
          </div>
        </div>
      </div>


      {isRegistrationSuccess ? (
        <section className="successMessgaeContainer">
          <div className="successMessage">
            <div className="success-message">
              <h1 className="success-message__title">Thanks</h1>
              <div className="otherMessage">
                <h5 style={{ textAlign: "left" }}>
                  In the meantime, please process the payment of{" "}
                  <span style={{ color: "red", fontWeight: "500" }}>Rs. 4000</span>{" "}
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
                        border: "1px solid",
                        backgroundImage: paymentImage
                          ? `url(${URL.createObjectURL(paymentImage)})`
                          : "none",
                      }}
                    >
                      <input
                        type="file"
                        name="profile"
                        id="profile"
                        onChange={handlePaymentImage}
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
                    {errors.paymentImageError && <p className="error">{errors.paymentImageError}</p>}

                    <div className="regSubmitBtn">
                      <button onClick={handleSubmitBtn}>
                        {loading ? <ComponentLoader /> : "Submit Now"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="success-close-btn">
              <span onClick={() => setIsRegistrationSuccess(false)}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      {isUploaded && (
        <div className="upload-modal">
          <div className="upload-modal-body">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>

            <p>Registration Form Submitted Successfully You will get an approvel email after few Hours. <br /> Thanks...!</p>
            <div
              className="modalCloseBtn"
              onClick={() => {
                setIsUploaded(false);
              }}
            >
              <i className="fa-solid fa-xmark" style={{ color: "white" }}></i>
            </div>
          </div>
        </div>
      )}


    </section>
  );
}
