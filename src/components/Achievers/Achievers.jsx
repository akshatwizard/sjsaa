import React, { useEffect, useState } from "react";
import Fancybox from "../ImageZoom/Fancybox";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Achievers() {
  const [allAchievement, setAllAchievement] = useState();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const getAllAchievement = async () => {
      const formData = new FormData();
      formData.append("achievement_list", "achievement_list");

      try {
        const response = await axios.post(
          "https://www.gdsons.co.in/draft/sjs/achievement-listapi",
          formData
        );

        setAllAchievement(response?.data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };
    getAllAchievement();
  }, [])

  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="title">
          <h1>Our Achievers</h1>
        </div>
        <div className="row row-gap-5">
          { 
          (currentPath === '/'? allAchievement?.slice(0, 2) : allAchievement)?.map((achievements) => {
            return (
              <div className="col-lg-12">
                <div className="achieversContainer">
                  <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                      <Fancybox>
                        <div
                          className="achieveImg"
                          data-fancybox="gallery"
                          href={achievements?.achievement_images}
                        >
                          <img
                            src={achievements?.achievement_images}
                            alt=""
                            loading="lazy"
                          />
                        </div>
                      </Fancybox>
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                      <h2>
                        {achievements?.achievement_title}
                      </h2>
                      <p>
                        {achievements?.achievement_details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
