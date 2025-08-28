export default function Carousel() {
  return (
    <section className="slider">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img
              src="/images/banner/banner-02.png"
              className=" w-100 bann"
              alt="..."
              loading="lazy"
            />
            <img
              src="/images/banner/mobileBanner-02.png"
              className=" w-100 mobBanner"
              alt="..."
              loading="lazy"
            />
          </div>
          <a href="/images/banner/mjm-letter.jpg" target="_blank" className="carousel-item" data-bs-interval="3000">
            <img
              src="/images/banner/sjsaa-mjm-desktop.jpg"
              className=" w-100 bann"
              alt="St Johns School DLW Alumni Association MJM Tournament"
              loading="lazy"
            />
            <img
              src="/images/banner/sjsaa-mjm-mob.jpg"
              className=" w-100 mobBanner"
              alt="St Johns School DLW Alumni Association MJM Tournament"
              loading="lazy"
            />
          </a>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src="/images/banner/banner-03.jpg"
              className=" w-100 bann"
              alt="..."
              loading="lazy"
            />
            <img
              src="/images/banner/mobileBanner-03.jpg"
              className=" w-100 mobBanner"
              alt="..."
              loading="lazy"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
