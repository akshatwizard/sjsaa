import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

export default function UserProfile() {
  const [memberData, setMemberData] = useState({});
  const { id } = useParams();
  const { isLogedIn } = useContext(Context);

  useEffect(() => {
    async function fetchMember() {
      const formData = new FormData();
      formData.append("mnid", id);
      formData.append("Mod", "getMemberData");
      try {
        const response = await axios.post(
          "https://www.gdsons.co.in/draft/sjs/get-member-details",
          formData
        );
        setMemberData(response?.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMember();
  }, [id]);
  // console.log(memberData.profile_picture);

  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="userProfileContainer">
              <div
                className="profileBannerContainer"
                style={{
                  backgroundImage: "url('/images/profile-banner/school.jpg')",
                }}
              ></div>
              <div className="userProfilePic">
                <img
                  src={
                    memberData?.profile_picture === " " ||
                    !memberData?.profile_picture
                      ? "/images/default-profile.png"
                      : memberData?.profile_picture
                  }
                  alt="Profile"
                />
              </div>
              <div className="userNameContainer">
                <div className="row row-gap-3">
                  <div className="col-lg-6">
                    <h3>{memberData?.title || "Name not available"}</h3>
                    <p>Batch : <strong>{memberData?.batch || "Batch not available"}</strong></p>
                    <p>
                      Alumni Joining Year : <strong>{" "}
                      {memberData?.joining_year === " "
                        ? "Alumni Joining year not available "
                        : memberData?.joining_year}</strong>
                    </p>
                    <p>
                      Currently Working as : <strong>{" "}
                      {memberData?.trade_category === " "
                        ? "Trade not available"
                        : memberData?.trade_category}</strong>
                    </p>
                    <p>
                      Current Location : <strong>{" "}
                      {memberData?.location || "Location not available"}</strong>
                    </p>
                    <div className="socialMediaIcons">
                      {memberData?.facebook?.trim() ? (
                        <a
                          href={memberData.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      ) : (
                        ""
                      )}
                      {memberData?.instagram?.trim() ? (
                        <a
                          href={memberData.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-instagram" style={{color:"red"}}></i>
                        </a>
                      ) : (
                        ""
                      )}
                      {memberData?.twitter?.trim() ? (
                        <a
                          href={memberData.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-x-twitter" style={{color:"black"}}></i>
                        </a>
                      ) : (
                        ""
                      )}
                      {memberData?.linkedin?.trim() ? (
                        <a
                          href={memberData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="summary">
                      <h6>About Me</h6>
                      <p className="preserveLineBreaks">
                        {memberData?.about_me?.trim() ? memberData?.about_me : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {isLogedIn && (
                  <div className="additionalDetails">
                    <h6>Additional Details</h6>
                    <div className="row row-gap-3">
                      <div className="col-lg-6">
                        <p>
                          Email : <strong>{memberData?.email_id?.trim() || "Not available"}</strong>
                        </p>
                        <p>
                          Contact No : <strong>{memberData?.mobile_number_one?.trim() || "Not available"}</strong>
                        </p>
                        {memberData?.mobile_number_two?.trim() ? (
                          <p>
                            Contact No 2 : <strong>{memberData.mobile_number_two}</strong>
                          </p>
                        ) : (
                          ""
                        )}
                        <p>
                          DOB :{" "}
                          <strong>
                            {memberData?.birth_date
                              ? memberData.birth_date.split(" ")[0]
                              : "Not available"}
                          </strong>
                        </p>
                        <p>
                          Qualification : <strong>{memberData?.qualification?.trim() || "Not available"}</strong>
                        </p>
                        <p>
                          House you belonged : <strong>{memberData?.house?.trim() || "Not available"}</strong>
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <p>
                          Address : <strong>{memberData?.address?.trim() || "Not available"}</strong>
                        </p>
                        <p>
                          Name of Spouse : <strong>{memberData?.spouse_name?.trim() || "Not available"}</strong>
                        </p>
                        <p>
                          Wedding Date :{" "}
                          <strong>
                            {memberData?.anniversary
                              ? memberData.anniversary.split(" ")[0]
                              : "Not available"}
                          </strong>
                        </p>
                        <p>
                          Details of Children : <strong>{memberData?.children_details?.trim() || "Not available"}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
