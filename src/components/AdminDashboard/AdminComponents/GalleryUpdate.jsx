import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import { Slider, Button } from "@mui/material";

export default function GalleryUpdate() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppingIndex, setCroppingIndex] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 10) {
      alert("You can only select up to 10 images.");
      return;
    }

    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = useCallback(async (imageSrc, cropPixels) => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = cropPixels.width;
        canvas.height = cropPixels.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          image,
          cropPixels.x,
          cropPixels.y,
          cropPixels.width,
          cropPixels.height,
          0,
          0,
          cropPixels.width,
          cropPixels.height
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          const croppedUrl = window.URL.createObjectURL(blob);
          resolve(croppedUrl);
        }, "image/jpeg");
      };
      image.onerror = reject;
    });
  }, []);

  const showCroppedImage = useCallback(async () => {
    if (croppingIndex === null) return;

    try {
      const croppedImageUrl = await getCroppedImg(
        imagePreviews[croppingIndex],
        croppedAreaPixels
      );
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[croppingIndex] = croppedImageUrl;
      setImagePreviews(updatedPreviews);
      setCroppingIndex(null);
    } catch (e) {
      console.error("Error cropping image", e);
    }
  }, [croppingIndex, imagePreviews, croppedAreaPixels, getCroppedImg]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    imagePreviews.forEach((preview, index) =>
      formData.append("images", selectedFiles[index])
    );

    try {
      const response = await axios.post("YOUR_BACKEND_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <section className="adminMainContent">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit} className="upGallery">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
              />
              <button className="upBtn" type="submit">
                Upload Images
              </button>
            </form>

            {selectedFiles.length > 0 && (
              <div className="image-preview-container">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="image-preview-block"
                    onClick={() => setCroppingIndex(index)}
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {croppingIndex !== null && (
              <div className="crop-container">
                <Cropper
                  image={imagePreviews[croppingIndex]}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
                <Button onClick={showCroppedImage}>Crop</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7485e2666874a327ceada88710b0e16d7e0620b3
