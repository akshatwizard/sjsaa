import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
  return (
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
                <div className=" ">
                  <div className="testimonialsContainer">
                    <div className="image-box">
                      <img
                        src="/images/testimonials/01.png"
                        className="userProfile"
                        alt=""
                      />
                      <div className="user-name">
                        <h4>Jhone Hue</h4>
                        <p>Alumni</p>
                      </div>
                      <img
                        src="https://uiparadox.co.uk/templates/teach-me/assets/media/icons/quotes.png"
                        className="qt"
                        alt=""
                      />
                    </div>
                    <hr style={{ color: "#919191ff" }} />
                    <div className="testimonialsDetails">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Pariatur sit dolore quia libero non doloribus recusandae
                        aperiam, qui nostrum illo. Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" ">
                  <div className="testimonialsContainer">
                    <div className="image-box">
                      <img
                        src="/images/testimonials/02.png"
                        className="userProfile"
                        alt=""
                      />
                      <div className="user-name">
                        <h4>Beka charles</h4>
                        <p>Alumni</p>
                      </div>
                      <img
                        src="https://uiparadox.co.uk/templates/teach-me/assets/media/icons/quotes.png"
                        className="qt"
                        alt=""
                      />
                    </div>
                    <hr style={{ color: "#919191ff" }} />
                    <div className="testimonialsDetails">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Pariatur sit dolore quia libero non doloribus recusandae
                        aperiam, qui nostrum illo. Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" ">
                  <div className="testimonialsContainer">
                    <div className="image-box">
                      <img
                        src="/images/testimonials/03.png"
                        className="userProfile"
                        alt=""
                      />
                      <div className="user-name">
                        <h4>Anney taylor</h4>
                        <p>Alumni</p>
                      </div>
                      <img
                        src="https://uiparadox.co.uk/templates/teach-me/assets/media/icons/quotes.png"
                        className="qt"
                        alt=""
                      />
                    </div>
                    <hr style={{ color: "#919191ff" }} />
                    <div className="testimonialsDetails">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Pariatur sit dolore quia libero non doloribus recusandae
                        aperiam, qui nostrum illo. Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
