import { useEffect, useRef, useState } from "react";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import axios from "axios";
import Fancybox from "../ImageZoom/Fancybox";

export default function AddTestimonials() {
    const [formData, setFormData] = useState({
        testimonial_msg: "",
        testimonial_img: null
    });
    const [loading, setLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [allTestimonials, setallTestimonials] = useState();
    const fileInputRef = useRef(null);
    const [clickedTestimonial, setClickedTestimonial] = useState(null);
    const [openClickedTestimonial, setOpenClickedTestimonial] = useState(false);

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
            testimonial_img: e.target.files[0],
        }));
    };
    const getallTestimonials = async () => {
        try {
            const response = await axios.get("https://www.gdsons.co.in/draft/sjs/list-testimonial");
            setallTestimonials(response?.data);
        } catch (error) {
            console.error("Error fetching gallery images:", error);
        }
    };
    useEffect(() => {
        getallTestimonials();
    }, []);

    async function handleClick(e) {
        e.preventDefault();
        setLoading(true);

        if (formData.testimonial_msg === '' || formData.testimonial_img === null) {
            alert("Please fill all the fields...!");
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.append("Mod", "addTestimonial");
        data.append("testimonial_msg", formData.testimonial_msg);
        data.append("testimonial_img", formData.testimonial_img);

        try {
            const response = await axios.post(
                "https://www.gdsons.co.in/draft/sjs/add-testimonial", data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            if (response?.data[0]?.status == "1") {
                setIsUploaded(true);
                setFormData({
                    testimonial_msg: "",
                    testimonial_img: null
                });
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setLoading(false);
                getallTestimonials();
            } else {
                alert("Failed to add the event. Please try again.");
                setLoading(false);
            }

        } catch (error) {
            console.error("Error adding event:", error);
            alert("An error occurred while adding the event.");
            setLoading(false);
        }
    }

    return (
        <section className="adminMainContent">
            <div className="container">
                <div className="title">
                    <h1>Add New Testimonial</h1>
                </div>
                <form>
                    <div className="row row-gap-2">
                        <div className="col-lg-12">
                            <div className="add-new-event-container">
                                <div className="row row-gap-2">
                                    <div className="col-6">
                                        <label htmlFor="testimonial_img">
                                            Testimonial Image <sup>*</sup>{" "}
                                        </label>
                                        <input
                                            type="file"
                                            name="testimonial_img"
                                            id="testimonial_img"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="testimonial_msg">
                                            Testimonial Message<sup>*</sup>{" "}
                                        </label>
                                        <textarea
                                            placeholder="Testimonial Message"
                                            name="testimonial_msg"
                                            id="testimonial_msg"
                                            value={formData.testimonial_msg}
                                            onChange={handleInputChange}
                                            rows={5}
                                        ></textarea>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center mt-4">
                                        <button type="submit" onClick={handleClick}>
                                            {loading ? <ComponentLoader /> : "Add"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 px-3">
                            <div className="row row-gap-2">
                                {allTestimonials?.map((testimonial, idx) => {
                                    const trimText = (text, maxLength = 300) => {
                                        if (!text) return { text: '', isTrimmed: false };
                                        if (text.length <= maxLength) return { text, isTrimmed: false };
                                        return {
                                            text: text.substring(0, maxLength).trim() + '...',
                                            isTrimmed: true
                                        };
                                    };
                                    const { text: trimmedText, isTrimmed } = trimText(testimonial?.testmsg, 300);

                                    return (
                                        <div className="col-6 px-1" key={idx}>
                                            <div className="testimonialsContainer h-full w-full" style={{ margin: 0 }}>
                                                <div className="image-box">
                                                    <Fancybox>
                                                        <div
                                                            data-fancybox="gallery"
                                                            href={testimonial.testimg_large}
                                                        >
                                                            <img
                                                                src={testimonial.testimg_small}
                                                                className="userProfile"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </Fancybox>
                                                    <img
                                                        src="https://uiparadox.co.uk/templates/teach-me/assets/media/icons/quotes.png"
                                                        className="qt"
                                                        alt=""
                                                    />
                                                </div>
                                                <hr style={{ color: "#919191ff" }} />
                                                <div className="testimonialsDetails">
                                                    <p>
                                                        {trimmedText}
                                                    </p>
                                                    {isTrimmed && (
                                                        <span className="testimonials-rdmor"
                                                            onClick={() => {
                                                                setOpenClickedTestimonial(true);
                                                                setClickedTestimonial(testimonial)
                                                            }}>
                                                            Read more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
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
            )}

            {clickedTestimonial !== null && openClickedTestimonial && (
                <div className="full-testimonials-container">
                    <div className="full-testimonials-wraper">
                        <div className="full-testimonials-box">
                            <div
                                className="testimonials-box-close-btn"
                                onClick={() => {
                                    setOpenClickedTestimonial(false);
                                    setClickedTestimonial(null);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                            <div className="box-testimonials-image">
                                <img
                                    src={clickedTestimonial?.testimg_small}
                                    alt="Testimonial"
                                    className="modal-testimonial-image"
                                />
                            </div>
                            <p>
                                {clickedTestimonial?.testmsg || 'No testimonial text available'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </section >
    )
}
