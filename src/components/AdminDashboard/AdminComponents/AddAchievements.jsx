import React, { useEffect, useState } from "react";
import ComponentLoader from "../../ComponentLoader/ComponentLoader.jsx";
import axios from "axios";
import Fancybox from "../../ImageZoom/Fancybox.jsx";

export default function AddAchievements() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventImage: null,
  });
  const [albumList, setAlbumList] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [additionalImg, setAdditionalImg] = useState([])
  const [selectedOption, setSelectedOption] = useState("")
  const [allAchievement, setAllAchievement] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      eventImage: e.target.files[0],
    }));
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
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
    getAllAchievement()
  }, [])

  function handleAdditionImage(event) {
    const files = Array.from(event.target.files);
    if (files.length > 10) {
      alert("You can only select up to 10 images.");
      return;
    }
    setAdditionalImg(files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.description || !formData.eventImage) {
      alert("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("mod", "add_achievement");
    data.append("achievement_title", formData.title);
    data.append("achievement_description", formData.description);
    data.append("achievement_image", formData.eventImage);
    additionalImg.forEach((img) => {
      data.append("event_more_images[]", img);
    });
    data.append("album", selectedOption === "yes" ? "true" : selectedAlbum);

    // for (const [key, value] of data.entries()) {
    //   console.log(key, value);
    // }

    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/manage-achievement",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.data[0].status == "1") {
        setIsUploaded(true);
        setFormData({
          title: "",
          description: "",
          eventImage: null,
        });
        setFormData((prevData) => ({
          ...prevData,
          eventImage: null,
        }));
        setAdditionalImg(null);
        setSelectedOption("")
        setSelectedAlbum(null)
        setLoading(false);
        getAllAchievement();
      } else {
        alert("Failed to add the event. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event.");
      setLoading(false);
    }
  };

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

  return (
    <section className="adminMainContent">
      <div className="container">
        <div className="title">
          <h1>Add New Achievements</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row row-gap-2">
            <div className="col-lg-12">
              <div className="add-new-event-container">
                <div className="row row-gap-2">
                  <div className="col-6">
                    <label htmlFor="title">
                      Achievement Title <sup>*</sup>{" "}
                    </label>
                    <textarea
                      placeholder="Achievement Title"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="col-6">
                    <label htmlFor="description">
                      Achievement Description <sup>*</sup>{" "}
                    </label>
                    <textarea
                      placeholder="Achievement Description"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="col-6">
                    <label htmlFor="eventImage">
                      Achievement Main Image <sup>*</sup>{" "}
                    </label>
                    <input
                      type="file"
                      name="eventImage"
                      id="eventImage"
                      onChange={handleImageChange}
                    ></input>
                  </div>

                  <div className="col-6">
                    <label htmlFor="moreEventImage">
                      Additional Event Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      max={10}
                      name="eventImage"
                      id="moreEventImage"
                      onChange={handleAdditionImage}
                    ></input>
                  </div>

                  <div className="col-6" >
                    <div className="additional-image-field-container">
                      <div className="rdo-container">
                        Create New Album
                        <input
                          type="radio"
                          className="additional-image-Field"
                          name="newAlbum"
                          checked={selectedOption === "yes"}
                          value="yes"
                          onChange={handleOptionChange}
                        />
                      </div>
                      <div className="rdo-container">
                        Select Existing Album
                        <input
                          type="radio"
                          className="additional-image-Field"
                          name="newAlbum"
                          checked={selectedOption === "no"}
                          value="no"
                          onChange={handleOptionChange}
                        />
                      </div>

                      <select disabled={selectedOption === "yes" || selectedOption === ""}
                        name="albums" id="albums" className="mt-3 sel"
                        style={{ opacity: `${selectedOption === "yes" || selectedOption === "" ? '0.5' : '1'}` }}
                        value={selectedAlbum}
                        onChange={(e) => setSelectedAlbum(e.target.value)}>
                        <option value=''>Select an album</option>
                        {albumList?.map((album) => (
                          <option key={album.album_id} value={album.album_id}>
                            {album.album_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 d-flex justify-content-center mt-4">
                    <button type="submit">
                      {loading ? <ComponentLoader /> : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* {allAchievement?.map((achievements) => {
              return (
                <div className="col-lg-12">
                  <div className="achieversContainer">
                    <div className="row">
                      <div className="col-lg-3 col-md-4 col-12">
                        <Fancybox>
                          <div
                            className="achieveImg"
                            data-fancybox="gallery"
                            href="/images/achievers/SashwatSharma.png"
                          >
                            <img
                              src="/images/achievers/SashwatSharma.png"
                              alt=""
                              loading="lazy"
                            />
                          </div>
                        </Fancybox>
                      </div>
                      <div className="col-lg-9 col-md-8 col-12">
                        <h2>
                          Bharti Airtel named COO Shashwat Sharma (batch 1999) as MD &
                          CEO.
                        </h2>
                        <p>
                          A Very Proud moment for us XJs as
                          Telecom Major Bharti Airtel, on October 28, said Shashwat
                          Sharma, currently Chief Operating Officer, will be appointed
                          MD & CEO on Januray 1, 2026. In preparation to this role, he
                          is being appointed CEO designate of the Company and will be
                          mentored and groomed by current MD & CEO Gopal Vittal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })} */}
          </div>
        </form>
      </div >
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

            <p>Added Successfully</p>
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
      )
      }
    </section >
  );
}
