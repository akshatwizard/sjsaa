import React, { useEffect, useRef, useState } from "react";
import Fancybox from "../ImageZoom/Fancybox";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MovieGallery() {
  const [allimage, setAllImage] = useState();
  const { albumId } = useParams();
  const [imgData, setImgData] = useState()
  // const dt = Object.values(allimage)
  // console.log(dt);

  useEffect(() => {
    const getAllImage = async () => {
      const formData = new FormData();
      formData.append("gallery_list", "gallery_list");
      formData.append("albumnid", albumId)

      try {
        const response = await axios.post(
          "https://www.gdsons.co.in/draft/sjs/gallery-list",
          formData
        );
        setAllImage(response?.data);
        setImgData(Object.values(response?.data).filter(item => item.gallery_id))
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };
    getAllImage();
  }, [])
  // console.log(imgData);
  return (
    <section className="sectionContainer" >
      <div className="container">
        <div className="title">
          <h1>{allimage?.gallery_title}</h1>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="galleryAllImageContainer">
              <div className="row">
                {imgData?.map((image) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
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
                        <img src={image.gallery_file} loading="lazy" />
                      </div>
                    </Fancybox>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
