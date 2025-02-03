import React, { useState, useCallback, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import { Slider, Button } from "@mui/material";
import ComponentLoader from "../../ComponentLoader/ComponentLoader.jsx";

export default function GalleryUpdate() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppingIndex, setCroppingIndex] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allimage, setAllImage] = useState();

  const fileInputRef = useRef(null);

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

  useEffect(() => {
    // Fetch the initial set of images when the component mounts
    getAllImage();
  }, []); // Empty dependency array ensures this only runs once

  // useEffect(() => {
  //   const formData = new FormData();
  //   formData.append("gallery_list", "gallery_list");
  //   async function getAllImage() {
  //     const response = await axios.post(
  //       "https://www.gdsons.co.in/draft/sjs/gallery-list",
  //       formData
  //     );
  //     setAllImage(response?.data);
  //   }
  //   getAllImage();
  // }, []);

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

    setLoading(true);

    const formData = new FormData();
    imagePreviews.forEach((preview, index) =>
      formData.append("gallery_image[]", selectedFiles[index])
    );

    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/upload-gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Upload successful:", response.data);
      if (response.data.status == 1) {
        setIsUploaded(true);
        setLoading(false);
        setImagePreviews([]);
        setSelectedFiles([]);
        fileInputRef.current.value = "";
        await getAllImage();
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (imageID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (confirmDelete) {
      try {
        const formData = new FormData();
        formData.append("gallery_nid", imageID);

        const response = await axios.post(
          "https://www.gdsons.co.in/draft/sjs/gallery-delete",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data[0].status == "1") {
          alert("Image deleted successfully!");
          await getAllImage();
        } else {
          alert("Failed to delete the image. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("An error occurred while deleting the image.");
      }
    } else {
      console.log("Deletion canceled");
    }
  };

  const [albumTitle, setAlbumTitle] = useState("")
  const [albumList, setAlbumList] = useState([])
  async function createAlbum(e) {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append('mod', "add_album");
    formData.append('album_title', albumTitle);
    try {
      const response = await axios.post("https://www.gdsons.co.in/draft/sjs/create-album", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      // console.log(response?.data[0]?.status);
      if (response?.data[0]?.status == 1) {
        setLoading(false);
        setAlbumTitle("")
      }
    } catch (error) {
      console.error("Error creating album:", error);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function getAlbum() {
      try {
        const responce = await axios.get("https://www.gdsons.co.in/draft/sjs/get-all-albums");
        setAlbumList(responce?.data)

      } catch (error) {
        console.log(error);
      }
    }
    getAlbum()
  }, [])
  console.log(albumList);
  return (
    <section className="adminMainContent">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="album">
              <h1>Add New Album</h1>
            </div>
            <div className="add-new-event-container">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="title">
                    Album Title <sup>*</sup>{" "}
                  </label>
                  <input
                    value={albumTitle}
                    type="text"
                    placeholder="Album Title"
                    name="albumtitle"
                    id="albumtitle"
                    onChange={(e) => setAlbumTitle(e.target.value)}
                  />

                </div>
                <div className="col-4">
                  <button className="upBtn m-0 mt-4" onClick={createAlbum}>
                    {loading ? <ComponentLoader /> : "Add Album"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mb-5">
            <div className="album">
              <h1>Select Album</h1>
            </div>
            <select name="albums" id="albums" className="mt-3 sel">
              <option value="">Select an album</option>
              {albumList?.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.album_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-12">
            <form onSubmit={handleSubmit} className="upGallery">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
                name="gallery_image[]"
                ref={fileInputRef} // Attach the ref to the file input
              />
              <button className="upBtn" type="submit">
                {loading ? <ComponentLoader /> : "Upload Images"}
              </button>
            </form>

            {selectedFiles?.length > 0 && (
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

          <div className="col-lg-12">
            <div className="all-img">
              <div className="row row-gap-4 ">
                {allimage?.map((value) => (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={value.gallery_id}
                  >
                    <div className="im-container">
                      <img
                        src={value.gallery_file}
                        alt=""
                        key={value.gallery_id}
                        className="im"
                      />
                      <div
                        className="delete-btn"
                        onClick={() => handleDelete(value.gallery_id)}
                      >
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isUploaded && (
        <div className="upload-modal">
          <div className="upload-modal-body">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>

            <p>Uploaded Successfully</p>
            <div
              className="modalCloseBtn"
              onClick={() => {
                setIsUploaded(false);
              }}
            >
              <i className="fa-solid fa-xmark" style={{ color: "white" }}></i>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
