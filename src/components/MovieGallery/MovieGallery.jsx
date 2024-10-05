import React, { useEffect, useRef, useState } from "react";
import Fancybox from "../ImageZoom/Fancybox";
import axios from "axios";

export default function MovieGallery() {
  const [allimage, setAllImage] = useState();

 useEffect(()=>{
  const getAllImage = async () => {
    const formData = new FormData();
    formData.append("gallery_list", "gallery_list");

    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/gallery-list",
        formData
      );
      setAllImage(response?.data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };
  getAllImage();
 },[])
 
  return (
    <section className="sectionContainer" >
      <div className="container">
        <div className="title">
          <h1>Images From Auron Mein Kahan Dum Tha Movie.</h1>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="galleryAllImageContainer">
              {allimage?.map((image) => (
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: false,
                    },
                  }}
                >
                  <div
                    className="imageGrid"
                    key={image.gallery_id}
                    data-fancybox="gallery"
                    href={image.gallery_file}
                  >
                    <img src={image.gallery_file} loading="lazy"/>
                  </div>
                </Fancybox>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
