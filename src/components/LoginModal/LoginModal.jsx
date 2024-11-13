import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  const [step, setStep] = useState("enterPassword");
  const { setLoginModal } = useContext(Context);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [formData, setFormData] = useState({
    loginid: "",
    password: "",
    Mod: "loginMember",
  });
  const navigator = useNavigate();
  const [error, setError] = useState(false);

  const [otpData, setOtpData] = useState({
    emailid: "",
    otp: "",
    Mod: "generateOTP",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [otpButtonClicked, setOtpButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState("");
  const { isLogedIn, setIsLogedIn } = useContext(Context);
  const [wrongOTP, setWrongOTP] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleOtpChange(event) {
    const { name, value } = event.target;
    setOtpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/user-verification-login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.login === "success") {
        Cookies.set("mnid", response.data.mnid, { expires: 7 });
        setLoading(false);
        setLoginModal(false);
        setIsLogedIn(true);
        window.location.href = "/profile";
        if (response.data.role === "Webadmin") {
          window.location.href = "/admin/dashboard";
        }
      }
      else if (response.data.login === "notLifeMember") {
        setLoading(false);
        setIsLogedIn(false);
        setLoginModal(false);
        alert("Login is not allowed for non-Life Members.")
      }
      else {
        setLoading(false);
        setIsLogedIn(false);
        setError(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      setIsLogedIn(false);
    }
  }

  function handleOtpBtnClicked() {
    setOtpButtonClicked(true);
    setStep("enterOtp");
  }

  async function sendOtp(event) {
    event.preventDefault();
    if (!otpData.emailid) {
      console.error("Email ID is required to send OTP.");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
      return;
    }
    const formData = new FormData();
    formData.append("emailid", otpData.emailid);
    formData.append("Mod", otpData.Mod);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/user-generate-otp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      setIsOtpSend(true);
      setOtpSentMessage("OTP sent successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setLoading(false);
      setOtpSentMessage("Failed to send OTP. Please try again.");
      setIsLogedIn(false);
    }
  }

  async function handleOptLogin(event) {
    event.preventDefault();
    if (!otpData.emailid) {
      console.error("Email ID is required to send OTP.");
      return;
    }
    const formData = new FormData();
    formData.append("loginid", otpData.emailid);
    formData.append("Mod", "verifyOTP");
    formData.append("otp", otpData.otp);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/user-verify-otp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      if (response.data.login === "success") {
        Cookies.set("mnid", response.data.mnid, { expires: 7 });
        setLoading(false);
        setLoginModal(false);
        setIsLogedIn(true);
        navigator("/profile");
        setWrongOTP(false);
      } else {
        setLoading(false);
        setWrongOTP(true);
        setIsLogedIn(false);
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setLoading(false);
      setOtpSentMessage("Failed to send OTP. Please try again.");
    }
  }

  function renderForm() {
    switch (step) {
      case "enterPassword":
        return (
          <div className="form">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="loginid"
                value={formData.loginid}
                placeholder="Eg: xyz@gmail.com"
                onChange={handleChange}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                // style={{marginBottom:"10px"}}
              />
              {showPassword ? (
                <img
                  src="/images/eye-closed.svg"
                  alt="Show Password"
                  className="eyes"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <img
                  src="/images/eye-open.svg"
                  alt="Hide Password"
                  className="eyes"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              {error && (
                <p
                  style={{
                    margin: "0 0 20px 0",
                    width: "100%",
                    textAlign: "end",
                    color: "red",
                  }}
                >
                  please check your credentials and try again
                </p>
              )}
              {!otpButtonClicked && (
                <>
                  <button type="submit">
                    {loading ? <ComponentLoader /> : "Login"}
                  </button>
                  <p style={{ color: "yellow", margin: "0", marginTop: "4px" }}>
                    or
                  </p>
                  <button type="button" onClick={handleOtpBtnClicked}>
                    Login Through OTP
                  </button>
                </>
              )}
            </form>
          </div>
        );

      case "enterOtp":
        return (
          <div className="form">
            <form>
              {error && (
                <span style={{ color: "red" }}>
                  Please provide your Email ID to send OTP.
                </span>
              )}
              <input
                type="email"
                name="emailid"
                value={otpData.emailid}
                placeholder="Eg: xyz@gmail.com"
                onChange={handleOtpChange}
                disabled={isOtpSend}
              />

              <input
                type={!isOtpSend ? "hidden" : "text"}
                name="otp"
                placeholder="Enter OTP"
                value={otpData.otp}
                onChange={handleOtpChange}
                disabled={!isOtpSend}
              />
              {!isOtpSend ? (
                <button type="submit" onClick={sendOtp}>
                  {loading ? <ComponentLoader /> : "Send OTP"}
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleOptLogin}
                  disabled={!isOtpSend}
                >
                  {loading ? <ComponentLoader /> : "Verify OTP"}
                </button>
              )}
              <p
                style={{
                  color: isOtpSend ? "lightgreen" : "white",
                  margin: "0",
                  textAlign: "right",
                  width: "100%",
                }}
              >
                {isOtpSend ? otpSentMessage : ""}
              </p>
              <p
                style={{
                  color: "red",
                  margin: "0",
                  textAlign: "right",
                  width: "100%",
                }}
              >
                {wrongOTP ? "Wrong OTP enter. Please try again." : ""}
              </p>
            </form>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <section className="loginModalContainer">
      <div className="formContainer">
        <div className="LoginTitle">
          <h1>Login</h1>
        </div>
        {renderForm()}
        <div
          className="modalCloseBtn"
          onClick={() => {
            setLoginModal(false);
            setOtpButtonClicked(false);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </section>
  );
}
