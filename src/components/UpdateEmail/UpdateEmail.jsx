import React, { useState } from "react";
import axios from "axios";
import ComponentLoader from "../ComponentLoader/ComponentLoader";

export default function UpdateEmail({ closeBtn, userDetails }) {
  const [step, setStep] = useState("enterDetails");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [updateUserEmail, setUpdateUserEmail] = useState({
    email: "",
    mobileNo: userDetails?.mobile_number_one || "",
    memberId: userDetails?.mnid || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateUserEmail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!updateUserEmail.email) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!updateUserEmail.mobileNo) {
      setError("Please enter a valid mobile number.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("email", updateUserEmail.email);
      formData.append("mobileNo", updateUserEmail.mobileNo);
      formData.append("memberId", userDetails?.mnid);
      formData.append("Mod","updateEmail")

      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/user-update-email",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setStep("success");

    } catch (err) {
      console.error(err);
      setError("An error occurred while Updating your email. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const renderForm = () => {
    switch (step) {
      case "enterDetails":
        return (
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userDetails?.membernace || ""}
              readOnly
              disabled
            />
            {!!userDetails?.mobile_number_one ? "": <label>Mobile Number:</label>}
            <input
              type={!!userDetails?.mobile_number_one ? "hidden": "tel"}
              name="mobileNo"
              value={updateUserEmail.mobileNo}
              placeholder="+91 1234567890"
              onChange={handleChange}
            />

            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              placeholder="e.g., xyz@gmail.com"
              value={updateUserEmail.email}
              onChange={handleChange}
              required
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? <ComponentLoader/> : "Update"}
            </button>
          </form>
        );

      case "success":
        return (
          <div className="message">
            <h2>Your email has send for approval.</h2>
            <p>we will get back to you soon.</p>
            <p>Thanks</p>
            <button onClick={closeBtn}>Close</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="updateEmailContainer">
      <div className="formContainer">
        <div className="updateTitle">
          <h1>Update Email</h1>
        </div>
        <div className="form">{renderForm()}</div>
        <div className="modalCloseBtn" onClick={closeBtn}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </section>
  );
}
