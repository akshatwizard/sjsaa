import React from "react";

export default function AddNewEvent() {
  return (
    <section className="adminMainContent">
      <div className="container">
        <div className="title">
          <h1>Add new Event</h1>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="add-new-event-container">
                <div className="row row-gap-2">
                    <div className="col-6">
                        <label htmlFor="title">Event Title <sup>*</sup> </label>
                        <textarea placeholder="Event Title" name="title" id="title"></textarea>
                    </div>
                    <div className="col-6">
                        <label htmlFor="Description">Event Description <sup>*</sup> </label>
                        <textarea placeholder="Event Description"  name="Description" id="Description"></textarea>
                    </div>
                    <div className="col-6">
                        <label htmlFor="date">Event Date <sup>*</sup> </label>
                        <input type="date" name="date" id="date"></input>
                    </div>
                    <div className="col-6">
                        <label htmlFor="eventImage">Event Image <sup>*</sup> </label>
                        <input type="file" name="eventImage" id="eventImage"></input>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-4" >
                        <button>Add</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
