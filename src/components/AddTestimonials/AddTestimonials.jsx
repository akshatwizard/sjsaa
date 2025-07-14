import { useState } from "react";
import ComponentLoader from "../ComponentLoader/ComponentLoader";

export default function AddTestimonials() {
    const [formData, setFormData] = useState({
        username: "",
        testimonial: "",
    });
    const [loading, setLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <section className="adminMainContent">
            <div className="container">
                <div className="title">
                    <h1>Add New Testimonials</h1>
                </div>
                <form>
                    <div className="row row-gap-2">
                        <div className="col-lg-12">
                            <div className="add-new-event-container">
                                <div className="row row-gap-2">
                                    <div className="col-6">
                                        <label htmlFor="username">
                                            User Name <sup>*</sup>{" "}
                                        </label>
                                        <input
                                            placeholder="User Name"
                                            name="username"
                                            id="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="testimonial">
                                            User Testimonial <sup>*</sup>{" "}
                                        </label>
                                        <textarea
                                            placeholder="User Testimonial"
                                            name="testimonial"
                                            id="testimonial"
                                            value={formData.testimonial}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center mt-4">
                                        <button type="submit">
                                            {loading ? <ComponentLoader /> : "Add"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    )
}
