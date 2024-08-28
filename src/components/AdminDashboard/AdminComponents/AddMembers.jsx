import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../../context/Context";
import ComponentLoader from "../../ComponentLoader/ComponentLoader";

export default function AddMembers() {
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState({});
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
    joiningYear: "",
  });
  const { loading, setLoading } = useContext(Context);

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
    console.log(file);
  };

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

  const handleSubmitBtn = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("profilePic", profilePic);
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

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
      setIsRegistrationSuccess(true);
    } catch (error) {
      setLoading(false);
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="title">
          <h1>Add New Member</h1>
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
                        type="text"
                        id="batch"
                        name="batch"
                        placeholder="Batch Ex :- 1998"
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
                  <label htmlFor="qualification">Joining Year</label>
                  <input
                    type="text"
                    id="joiningYear"
                    name="joiningYear"
                    placeholder="Your Joining Year"
                    value={userData.joiningYear}
                    onChange={handleInputChange}
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
                <button onClick={handleSubmitBtn}>
                  {loading ? <ComponentLoader /> : "Add Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
