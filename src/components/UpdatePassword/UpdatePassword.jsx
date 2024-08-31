import React, { useState } from "react";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import Cookies from "js-cookie";
import axios from "axios";

export default function UpdatePassword({ closeBtn }) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const id = await Cookies.get("mnid");
    const formData = new FormData();
    formData.append("mnid", id);
    formData.append("Mod", "updPassword");
    formData.append("password", password);
    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/udpate_password",
        formData
      );
      if (response.data[0].status == 1) {
        closeBtn(false)
        
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <section className="passwordModal">
      <div className="formContainer">
        <div className="passwordTitle">
          <h2>Update Password</h2>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type={"text"}
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              {loading ? <ComponentLoader /> : "Update"}
            </button>
          </form>
        </div>

        <div
          className="modalCloseBtn"
          onClick={() => {
            closeBtn(false);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </section>
  );
}
