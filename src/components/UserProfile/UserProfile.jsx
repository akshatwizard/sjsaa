import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const [memberData, setMemberData] = useState({});
  const { id } = useParams();

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

  // console.log("Fetched Member Data:", memberData);

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
                    memberData?.profile_picture
                      ? memberData?.profile_picture
                      : "/images/8.png"
                  }
                  alt="Profile"
                />
              </div>
              <div className="userNameContainer">
                <div className="row row-gap-3">
                  <div className="col-lg-6">
                    <h3>{memberData?.title || "Name not available"}</h3>
                    <p>Batch:- {memberData?.batch || "Trade not available"}</p>
                    <p>
                      Joining Year:-{" "}
                      {memberData?.joining_year || "Trade not available"}
                    </p>
                    <p>
                      Currently Working as:-{" "}
                      {memberData?.trade_category || "Trade not available"}
                    </p>
                    <p>
                      Current Location:-{" "}
                      {memberData?.location || "Location not available"}
                    </p>
                    <div className="socialMediaIcons">
                      <a href={memberData?.facebook} target="_blank">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                      <a href={memberData?.instagram} target="_blank">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a href={memberData?.twitter} target="_blank">
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                      <a href={memberData?.linkedin} target="_blank">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    </div>
                    {/* <div className="buttonContainer">
                      <button>Message</button>
                      <button>Call</button>
                    </div> */}
                  </div>
                  <div className="col-lg-6">
                    <div className="summary">
                      <h6>About Me</h6>
                      <p>
                        {memberData?.about_me ||
                          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque amet aliquid quis modi nulla saepe debitis illo ad laborum possimus necessitatibus tempore eaque tempora sapiente enim ipsam beatae pariatur tenetur, nemo aut aperiam maxime assumenda. Atque mollitia molestias earum quia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sunt cupiditate alias deserunt, distinctio voluptas animi a error optio amet."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
