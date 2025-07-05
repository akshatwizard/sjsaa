import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Fancybox from "../ImageZoom/Fancybox";
import { Link, useLocation } from "react-router-dom";
import { scrollToTop } from "../../helper/scroll";
import axios from "axios";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const container = useRef();
  const location = useLocation();
  const [allEvent, setAllEvent] = useState();

  useEffect(() => {
    const getAllEvent = async () => {
      const formData = new FormData();
      formData.append("event_list", "event_list");

      try {
        const response = await axios.post(
          "https://www.gdsons.co.in/draft/sjs/event-listapi",
          formData
        );
        setAllEvent(response?.data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };
    getAllEvent();
  }, []);

  // Access the current path
  const currentPath = location.pathname;
  console.log(currentPath);

  useGSAP(
    () => {
      let ctx = gsap.context(() => {
        const text = document
          .querySelector(".eveTitle h1")
          .textContent.split("")
          .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
          .join("");

        document.querySelector(".eveTitle h1").innerHTML = text;

        gsap.from(".eveTitle h1 span", {
          opacity: 0,
          delay: 0.5,
          duration: 0.5,
          stagger: 0.09,
        });

        gsap.from(".animate", {
          delay: 2,
          opacity: 0,
          y: 100,
          duration: 0.5,
          delay: 0.5,
          stagger: 0.5,
        });
      });
    },
    { scope: container }
  );

  return (
    <section className="sectionContainer" ref={container}>
      <div className="container">
        <div className="title eveTitle">
          <h1>Events</h1>
        </div>

        <div className="row mb-5 animate">

          {
            (currentPath === "/" ? allEvent?.slice(-2).reverse() : allEvent?.reverse())?.map((event) => {
              const eventDate = new Date(event.event_date);
              const month = eventDate.toLocaleString("default", {
                month: "long",
              });
              const day = eventDate.getDate();

              return (
                <div className="col-lg-12" key={event.event_nid}>
                  <div className="add-new-event-container">
                    <div className="eventContainer">
                      <div className="row row-gap-3">
                        <div className="col-lg-2 col-md-2 col-sm-3 text-center py-2">
                          <div className="dateContainer">
                            <p>{month}</p>
                            <h2>{day}</h2>
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-9">
                          <div className="row">
                            <div className="col-lg-9 col-md-9">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="heading">
                                    <a href="#">
                                      <h1>
                                        {event.event_title}
                                        <i className="fa-solid fa-arrow-right "></i>
                                      </h1>
                                    </a>
                                  </div>
                                </div>
                                <div className="col-lg-12 my-2">
                                  <div className="eventDescription">
                                    <p>{currentPath === '/' ? event.event_details.substring(0, 120) + "..." : event.event_details}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                              <Fancybox>
                                <div
                                  className="eventImagesContainer"
                                  data-fancybox="gallery"
                                  href={event.event_images}
                                >
                                  <img
                                    src={event.event_images}
                                    alt={event.event_title}
                                    loading="lazy"
                                  />
                                </div>
                              </Fancybox>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {currentPath === "/event" ? (
          ""
        ) : (
          <Link to={"/event"} onClick={scrollToTop}>
            <button className="viewMoreBtn">View More Events</button>
          </Link>
        )}
      </div>
    </section>
  );
}
