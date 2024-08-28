import React, { useState } from "react";
import ComponentLoader from "../ComponentLoader/ComponentLoader";

export default function UpdatePassword({ closeBtn }) {
    const [loading,setLoading] = useState(false)
    const [password,setPassword] = useState("")
  return (
    <section className="passwordModal">
      <div className="formContainer">
        <div className="passwordTitle">
          <h2>Update Password</h2>
        </div>
        <div className="form">
          <form>
          <input
                type={"text"}
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
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
