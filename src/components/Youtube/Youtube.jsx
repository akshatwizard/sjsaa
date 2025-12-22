import { Link, useLocation } from "react-router-dom";

export default function Youtube() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="title">
          <h1>Glimpse of St. Johns</h1>
        </div>
        <div className="row row-gap-3">
          <div className="col-lg-6 colmd-6 col-12">
            <div className="youtube-video-container">
              <iframe src="https://www.youtube.com/embed/w-cpsm_d2fA?autoplay=1&mute=1&loop=1" title="YouTube video player" referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
          </div>
          <div className="col-lg-6 colmd-6 col-12">
            <div className="youtube-video-container">
              <iframe
                width="100%"
                height="345"
                src="https://www.youtube.com/embed/tlyfXRe18Wk?autoplay=1&mute=1&loop=1"
              ></iframe>
            </div>
          </div>
          {
            currentPath === "/" && (
              <div className="col-lg-12">
                <Link
                  to="https://www.youtube.com/channel/UC-ls3LOsV45juXqXia1uVjQ"
                >
                  <button className="viewMoreBtn mt-4">View More</button>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}
