import React, { useEffect, useState } from "react";
import axios from "axios";
import ComponentLoader from "../../ComponentLoader/ComponentLoader.jsx";
import Fancybox from "../../ImageZoom/Fancybox";

export default function AddNewEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    eventImage: null,
  });
  const [additionalImg, setAdditionalImg] = useState([])
  const [selectedOption, setSelectedOption] = useState("")
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allEvent, setAllEvent] = useState();
  const [albumList, setAlbumList] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)

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

  useEffect(() => {
    getAllEvent();
  }, []);

  const handleDelete = async (eventID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Event ?"
    );

    if (confirmDelete) {
      try {
        const formData = new FormData();
        formData.append("mod", "delete_event");
        formData.append("event_nid", eventID);

        const response = await axios.post(
          "https://www.gdsons.co.in/draft/sjs/manage-event",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data[0].status == "1") {
          alert("Event deleted successfully!");
          await getAllEvent();
        } else {
          alert("Failed to delete the Event. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Event:", error);
        alert("An error occurred while deleting the Event.");
      }
    } else {
      console.log("Deletion canceled");
    }
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

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.eventImage
    ) {
      alert("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("mod", "add_event");
    data.append("event_title", formData.title);
    data.append("event_description", formData.description);
    data.append("event_date", formData.date);
    data.append("event_image", formData.eventImage);
    additionalImg.forEach((img) => {
      data.append("event_more_images[]", img);
    });
    data.append("album", selectedOption === "yes" ? "true" : selectedAlbum);

    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/manage-event",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      

      // if (response.data[0].status == "1") {
      //   setIsUploaded(true);
      //   setFormData({
      //     title: "",
      //     description: "",
      //     date: "",
      //     eventImage: null,
      //   });
      //   setLoading(false);
      //   getAllEvent();
      // } else {
      //   alert("Failed to add the event. Please try again.");
      //   setLoading(false);
      // }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event.");
      setLoading(false);
    }
  };

  return (
    <section className="adminMainContent">
      <div className="container">
        <div className="title">
          <h1>Add New Event</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row row-gap-2">
            <div className="col-lg-12">
              <div className="add-new-event-container">
                <div className="row row-gap-2">
                  <div className="col-6">
                    <label htmlFor="title">
                      Event Title <sup>*</sup>{" "}
                    </label>
                    <textarea
                      placeholder="Event Title"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="col-6">
                    <label htmlFor="description">
                      Event Description <sup>*</sup>{" "}
                    </label>
                    <textarea
                      placeholder="Event Description"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="col-6">
                    <label htmlFor="date">
                      Event Date <sup>*</sup>{" "}
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                  <div className="col-6">
                    <label htmlFor="eventImage">
                      Event Main Image <sup>*</sup>{" "}
                    </label>
                    <input
                      type="file"
                      name="eventImage"
                      id="eventImage"
                      onChange={handleImageChange}
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


                  <div className="col-6">
                    <label htmlFor="eventImage">
                      Additional Event Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      max={10}
                      name="eventImage"
                      id="eventImage"
                      onChange={handleAdditionImage}
                    ></input>
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-4">
                    <button type="submit">
                      {loading ? <ComponentLoader /> : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {allEvent?.map((event) => {
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
                        <div
                          className="event-delete-btn"
                          onClick={() => handleDelete(event.event_nid)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </div>
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
                                    <p>{event.event_details}</p>
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
        </form>
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
      )}
    </section>
  );
}
