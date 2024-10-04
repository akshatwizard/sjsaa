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
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allEvent, setAllEvent] = useState();

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
      return;
    }

    const data = new FormData();
    data.append("mod", "add_event");
    data.append("event_title", formData.title);
    data.append("event_description", formData.description);
    data.append("event_date", formData.date);
    data.append("event_image", formData.eventImage);

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

      if (response.data[0].status == "1") {
        setIsUploaded(true);
        setFormData({
          title: "",
          description: "",
          date: "",
          eventImage: null,
        });
        setLoading(false);
        getAllEvent();
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

  const getAllEvent = async () => {
    const formData = new FormData();
    formData.append("event_list", "event_list");

    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/event-listapi",
        formData
      );

      setAllEvent(response?.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  useEffect(() => {
    getAllEvent();
  }, []);

  const handleDelete = async (eventID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
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
          alert("Image deleted successfully!");
          await getAllEvent();
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
                      Event Image <sup>*</sup>{" "}
                    </label>
                    <input
                      type="file"
                      name="eventImage"
                      id="eventImage"
                      onChange={handleImageChange}
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
                          <i class="fa-solid fa-xmark"></i>
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
