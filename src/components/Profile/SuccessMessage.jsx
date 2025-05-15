import React from "react";

export default function SuccessMessage({ status }) {
  return (
    <section className="passwordModal">
      <div className="formContainer text-center">
        <svg viewBox="0 0 76 76"className="success-message__icon icon-checkmark">
          <circle cx="38" cy="38" r="36" />
          <path
            fill="none"
            stroke="#FFFFFF"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            d="M17.7,40.9l10.9,10.9l28.7-28.7"
          />
        </svg>
        <h1 className="success-message__title">Profile updated</h1>
        <div className="success-close-btn">
          <span onClick={() => status(false)}>
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
      </div>
    </section>
  );
}
