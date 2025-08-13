import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Fancybox from "../ImageZoom/Fancybox";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 200 },
    items: 1,
    slidesToSlide: 1,
  },
};
export default function Testimonials() {
  const [allTestimonials, setallTestimonials] = useState([]);
  const [clickedTestimonial, setClickedTestimonial] = useState(null);
  const [openClickedTestimonial, setOpenClickedTestimonial] = useState(false);
  const getallTestimonials = async () => {
    try {
      const response = await axios.get("https://www.gdsons.co.in/draft/sjs/list-testimonial");
      setallTestimonials(response?.data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };
  useEffect(() => {
    getallTestimonials();
  }, []);

  return (
    <>
      {
        allTestimonials && (
          <section className="sectionContainer">
            <div className="container">
              <div className="title">
                <h1>Testimonials</h1>
              </div>
              <div className="row row-gap-3">
                <div className="col-lg-12">
                  <div className="row">
                    <Carousel
                      responsive={responsive}
                      autoPlay={true}
                      swipeable={true}
                      draggable={true}
                      showDots={true}
                      infinite={true}
                      partialVisible={false}
                      dotListClass="custom-dot-list-style"
                    >

                      {allTestimonials?.map((testimonial, idx) => {
                        const trimText = (text, maxLength = 300) => {
                          if (!text) return { text: '', isTrimmed: false };
                          if (text?.length <= maxLength) return { text, isTrimmed: false };
                          return {
                            text: text.substring(0, maxLength).trim() + '...',
                            isTrimmed: true
                          };
                        };
                        const { text: trimmedText, isTrimmed } = trimText(testimonial?.testmsg, 200);

                        return (
                          <div key={idx}>
                            <div className="testimonialsContainer">
                              <div className="image-box">
                                <Fancybox style={{ height: '200px' }}>
                                  <div
                                    style={{ height: '200px' }}
                                    data-fancybox="gallery"
                                    href={testimonial.testimg_large}
                                  >
                                    <img
                                      src={testimonial.testimg_small}
                                      className="userProfile"
                                      alt=""
                                    />
                                  </div>
                                </Fancybox>
                                <img
                                  src="https://uiparadox.co.uk/templates/teach-me/assets/media/icons/quotes.png"
                                  className="qt"
                                  alt=""
                                />
                              </div>
                              <hr style={{ color: "#919191ff" }} />
                              <div className="testimonialsDetails">
                                <p>
                                  {trimmedText}
                                </p>
                                {isTrimmed && (
                                  <span className="testimonials-rdmor"
                                    onClick={() => {
                                      setOpenClickedTestimonial(true);
                                      setClickedTestimonial(testimonial)
                                    }}>
                                    Read more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
            {clickedTestimonial !== null && openClickedTestimonial && (
              <div className="full-testimonials-container">
                <div className="full-testimonials-wraper">
                  <div className="full-testimonials-box">
                    <div
                      className="testimonials-box-close-btn"
                      onClick={() => {
                        setOpenClickedTestimonial(false);
                        setClickedTestimonial(null);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="box-testimonials-image">
                      <img
                        src={clickedTestimonial?.testimg_small}
                        alt="Testimonial"
                        className="modal-testimonial-image"
                      />
                    </div>
                    <p>
                      {clickedTestimonial?.testmsg || 'No testimonial text available'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )
      }
    </>
  );
}
