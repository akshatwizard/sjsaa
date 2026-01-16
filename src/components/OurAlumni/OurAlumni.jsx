import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  lazy,
  Suspense,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToTop } from "../../helper/scroll.js";
import axios from "axios";
import { Context } from "../../context/Context.jsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Loader from "../Loader/Loader.jsx";
import Fancybox from "../ImageZoom/Fancybox.jsx";
const UpdateEmail = lazy(() => import("../UpdateEmail/UpdateEmail.jsx"));
import * as XLSX from "xlsx";
import ComponentLoader from "../ComponentLoader/ComponentLoader.jsx";

export default function OurAlumni() {
  const { setLoginModal, isAdmin, onlyAdmin, loading, setLoading } = useContext(Context);
  const [memberData, setMemberData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterCategory, setFilterCategory] = useState("membernace");
  const [currentPage, setCurrentPage] = useState(1);
  const [updateEmailModal, setUpdateEmailModal] = useState(false);
  const [updateEmailDetails, setUpdateEmailDetails] = useState(null);
  const rowsPerPage = 20;
  const { isLogedIn, setIsLogedIn } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [memberAllData, setMemberAllData] = useState([]);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentImage, setPaymentImage] = useState(null)
  const [selectedUserId, setSelectedUserId] = useState()

  function handlePaymentImage(e) {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (validImageTypes.includes(fileType)) {
        setPaymentImage(file);
      } else {
        setPaymentImage(null);
      }
    }

  }

  useEffect(() => {
    if (isRegistrationSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isRegistrationSuccess]);

  const hideCol = location.pathname.startsWith("/admin");

  useEffect(() => {
    async function fetchMember() {
      try {
        const response = await axios.get(
          "https://www.gdsons.co.in/draft/sjs/all-members"
        );
        setMemberData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchMember();
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = memberData.filter((product) =>
      product[filterCategory]
        ?.toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );
    return filtered.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [memberData, filterValue, filterCategory, currentPage]);

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(
      memberData.filter((product) =>
        product[filterCategory]
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      ).length / rowsPerPage
    );
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 7; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="ellipsis">...</span>);
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={currentPage === totalPages ? "active" : ""}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage > 4 && currentPage < totalPages - 3) {
        pages.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className={currentPage === 1 ? "active" : ""}
          >
            1
          </button>
        );
        pages.push(<span key="ellipsis1">...</span>);
        for (let i = currentPage - 3; i <= currentPage + 3; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="ellipsis2">...</span>);
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={currentPage === totalPages ? "active" : ""}
          >
            {totalPages}
          </button>
        );
      } else {
        pages.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className={currentPage === 1 ? "active" : ""}
          >
            1
          </button>
        );
        pages.push(<span key="ellipsis">...</span>);
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
      }
    }

    return pages;
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const img = "/images/8.png";
    doc.addImage(img, "PNG", 10, 10, 30, 30);

    doc.setFontSize(25);
    doc.text("St John's School Alumni Association", 50, 25);
    doc.setLineWidth(0.5);
    doc.line(0, 45, 250, 45);

    const tableColumn = [
      "Sr. No.",
      "Name",
      // "Joined Year",
      "Batch",
      "M'Ship Status",
      "Date of Birth",
      "Profession & Working As",
      "Current Location",
    ];

    if (isLogedIn || onlyAdmin) {
      tableColumn.push("Email", "Contact No");
    }

    const tableRows = [];

    const filtered = memberData.filter((product) =>
      product[filterCategory]
        ?.toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );

    filtered.forEach((member, index) => {
      const memberDetails = [
        index + 1,
        member.membernace || "N/A",
        // member.joiningyear || "N/A",
        member.batch || "N/A",
        member.life_member || "N/A",
        member.dob || "N/A",
        member.trade_category || "N/A",
        member.location || "N/A",
      ];

      if (isLogedIn || onlyAdmin) {
        memberDetails.push(
          member?.email || "N/A",
          member?.mobile_number_one || "N/A"
        );
      }

      tableRows.push(memberDetails);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      tableWidth: 210,
      margin: { left: 0 },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 30 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 30 },
        6: { cellWidth: 20 },
        7: { cellWidth: 30 },
        8: { cellWidth: 30 },
      },
      styles: {
        overflow: "linebreak",
      },
    });

    doc.save("filtered_members_list.pdf");
  };

  useEffect(() => {
    async function getMembersFullData() {
      const response = await axios.get("https://gdsons.co.in/draft/sjs/all-members-excel-dnld")
      setMemberAllData(response.data);
    }
    getMembersFullData();
  }, [filterCategory, filterValue]);

  function handleDownloadExcel() {

    const tableData = [];
    const tableColumn = [
      "Sr. No.",
      "Member ID",
      "Name",
      "Batch",
      "Joining Year",
      "Membership Status",
      "Qualification",
      "Date of Birth",
      "Profession / Working As",
      "Current Location",
      "Email",
      "Contact No One",
      "Contact No Two",
      "Address",
      "Business Name",
      "Business Address",
      "Spouse Name",
      "Children Details",
      "House",
      "About Me",
      "Facebook Profile",
      "Twitter Profile",
      "LinkedIn Profile",
      "Instagram Profile",
      "Anniversary"
    ];

    tableData.push(tableColumn);

    const filtered = memberAllData.filter((data) =>
      data[filterCategory]
        ?.toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );

    filtered.forEach((member, index) => {
      const row = [
        index + 1,
        member.memid || "Not Available",
        member.membernace || "Not Available",
        member.batch || "Not Available",
        member.joiningyear || "Not Available",
        member.life_member || "Not Available",
        member.qualification || "Not Available",
        member.dob || "Not Available",
        member.trade_category || "Not Available",
        member.location || "Not Available",
        member.email || "Not Available",
        member.mobile_number_one || "Not Available",
        member.mobile_number_two || "Not Available",
        member.address || "Not Available",
        member.business_name || "Not Available",
        member.business_address || "Not Available",
        member.spousename || "Not Available",
        member.children || "Not Available",
        member.house || "Not Available",
        member.about || "Not Available",
        member.fb || "Not Available",
        member.tw || "Not Available",
        member.li || "Not Available",
        member.insta || "Not Available",
        member.anniversary || "Not Available"
      ];

      tableData.push(row);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Members");

    XLSX.writeFile(workbook, `${`all_members_list_${new Date().toISOString()}.xlsx`}`);
  }

  useEffect(() => {
    if (updateEmailModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [updateEmailModal]);

  function handleUpdateEmail(product) {
    setUpdateEmailModal(true);
    setUpdateEmailDetails(product);
  }
  function handleClose() {
    setUpdateEmailModal(false);
  }

  function handlePrint(userId) {
    const member = memberData.find((user) => user.mnid === userId);
    if (!member) {
      console.error("Member not found");
      return;
    }
    window.open(`/member-preview/${userId}`, "_blank");
  }

  async function changeStatus(status, id) {
    const newStatus = status === "Life" ? "General" : "Life";
    const formData = new FormData();
    formData.append("Mod", "memStatusUpd");
    formData.append("mnid", id);
    formData.append("newStat", newStatus);

    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/update_mem_status",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status) {
        alert(`Status changed to ${newStatus}`);
        setMemberData((prevData) => {
          return prevData.map((member) => {
            if (member.mnid === id) {
              return { ...member, life_member: newStatus };
            }
            return member;
          });
        });
      } else {
        console.error("Status update failed:", response.data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  async function handlePaymentSubmission(event) {
    event.preventDefault();
    if (!selectedUserId) {
      return "Invalid user...!"
    }
    const uploadError = {};
    if (!paymentImage) {
      uploadError.paymentImageError = "Payment Confirmation Image is Required";
      setErrors(uploadError);
      return Object.keys(uploadError).length === 0;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("Mod", "memRegistration");
    formData.append("memnid", selectedUserId);
    formData.append("profilePic", paymentImage);
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    try {
      const response = await axios.post(
        "https://www.gdsons.co.in/draft/sjs/mem-registration",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setIsRegistrationSuccess(false);
      setPaymentImage(null);
      setIsUploaded(true);
      setSelectedUserId(null);
    } catch (error) {
      setLoading(false);
      console.error("There was an error submitting the form:", error);
    }

  }

  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="title">
          <h1>Members Details</h1>
        </div>
        <div className="row row-gap-4">
          <div className="col-lg-12">
            <div className="memberFilter">
              <div className="filterSection">
                <select
                  name="searchCategory"
                  id="searchCategory"
                  value={filterCategory}
                  onChange={handleFilterCategoryChange}
                >
                  <option value="membernace">Name</option>
                  <option value="batch">Batch</option>
                  <option value="location">Current Location</option>
                  <option value="life_member">Membership Status</option>
                  <option value="trade_category">Profession</option>
                </select>
                <input
                  type="text"
                  name="search"
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  placeholder="Search..."
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={handleDownloadPDF}
                style={{ height: "65px", width: "170px" }}
              >
                Download PDF
              </button>
              {onlyAdmin || isAdmin ? <button
                className="btn btn-primary"
                onClick={handleDownloadExcel}
                style={{ height: "65px", width: "170px" }}
              >
                Download Excel
              </button> : ""}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Membership Id</th>
                    <th>Batch</th>
                    {hideCol ? (
                      <th>Membership Status</th>
                    ) : (
                      <th>M'Ship Status</th>
                    )}
                    {hideCol ? "" : <th>Date of Birth</th>}
                    {hideCol ? "" : <th>Profession & Working As</th>}
                    <th>Current Location</th>
                    {(isLogedIn || onlyAdmin || isAdmin) && <th>Contact No</th>}
                    {(isLogedIn || onlyAdmin || isAdmin) && <th>Email</th>}
                    {isLogedIn || onlyAdmin ? "" : <th>Action</th>}
                    {(isAdmin || onlyAdmin) && <th>Print</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td>
                        {product.profile_pic ? (
                          <Fancybox
                            options={{
                              Carousel: {
                                infinite: false,
                              },
                            }}
                          >
                            <div
                              data-fancybox="gallery"
                              src={product?.profile_pic}
                              style={{ display: "inline-block" }}
                            >
                              <img
                                src={product?.profile_pic}
                                alt=""
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  marginRight: "7px",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </Fancybox>
                        ) : (
                          ""
                        )}

                        <Link
                          to={`/user/profile/${product.mnid}`}
                          className="nameLink"
                          onClick={scrollToTop}
                        // target="_blank"
                        >
                          {product.membernace}
                        </Link>
                        {/* <span className="lfm">{`(${product?.life_member ? product.life_member : "General"})`}</span> */}
                      </td>
                      <td>{product.memid}</td>
                      <td>{product?.batch || "not provided"}</td>

                      {hideCol ? (
                        <td>
                          {product.life_member}
                          <div
                            style={{ fontSize: "12px" }}
                            className={
                              product?.life_member === "Life"
                                ? "btn btn-info"
                                : "btn btn-primary"
                            }
                            onClick={(e) =>
                              changeStatus(product?.life_member, product?.mnid)
                            }
                          >
                            {product?.life_member === "Life"
                              ? "Make General"
                              : "Make Life"}
                          </div>
                        </td>
                      ) : (
                        <td>{product.life_member}</td>
                      )}

                      {hideCol ? "" : <td>{product.dob}</td>}
                      {hideCol ? "" : <td>{product.trade_category}</td>}
                      <td>{product?.location || "not provided"}</td>
                      {(isLogedIn || onlyAdmin || isAdmin) && (
                        <td>
                          {product?.mobile_number_one || "Not available"}
                          {product?.mobile_number_two
                            ? ` ${product.mobile_number_two}`
                            : ""}
                        </td>
                      )}
                      {(isLogedIn || onlyAdmin || isAdmin) && (
                        <td>{product.email}</td>
                      )}
                      {isLogedIn || onlyAdmin || isAdmin ? (
                        ""
                      ) : (
                        <td>
                          {product?.life_member === "Life" ?
                            (product?.email ? (
                              <div
                                className="btn btn-primary"
                                onClick={() => setLoginModal(true)}
                              >
                                Login
                              </div>
                            ) : (
                              <div
                                className="btn btn-light"
                                style={{ padding: "5px", fontSize: "15px" }}
                                onClick={() => handleUpdateEmail(product)}
                              >
                                Update Email
                              </div>
                            ))
                            : <div
                              className="btn btn-light"
                              style={{ padding: "5px", fontSize: "15px" }}
                              onClick={() => (setIsRegistrationSuccess(true), setSelectedUserId(product?.mnid))}
                            >
                              Register
                            </div>
                          }
                        </td>
                      )}
                      {(isAdmin || onlyAdmin) && (
                        <td>
                          <div
                            className="btn btn-primary"
                            onClick={() => handlePrint(product.mnid)}
                          >
                            Print
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pagination">{renderPagination()}</div>
      </div>

      <Suspense fallback={<Loader />}>
        {updateEmailModal && (
          <UpdateEmail
            closeBtn={handleClose}
            userDetails={updateEmailDetails}
          />
        )}
      </Suspense>

      {isRegistrationSuccess ? (
        <section className="successMessgaeContainer">
          <div className="successMessage">
            <div className="success-message">
              <h1 className="success-message__title">Thanks</h1>
              <div className="otherMessage">
                <h5 style={{ textAlign: "left" }}>
                  In the meantime, please process the payment of{" "}
                  <span style={{ color: "red", fontWeight: "500" }}>Rs. 4000</span>{" "}
                  for Lifetime Membership of SJSAA on given QR Code and upload the confirmation Image
                </h5>
                <div className="row">
                  <div className="col-lg-5 col-md-6 col-12">
                    <p>Make Payment to the given QR Code</p>
                    <img src="/images/or.jpeg" alt="" />
                  </div>

                  <div className="col-lg-7 col-md-6 col-12">
                    <label htmlFor="profile" style={{ color: "black" }}>
                      Payment ScreenShot <sup>*</sup>
                    </label>
                    <div
                      className="up-ss"
                      style={{
                        border: "1px solid",
                        backgroundImage: paymentImage
                          ? `url(${URL.createObjectURL(paymentImage)})`
                          : "none",
                      }}
                    >
                      <input
                        type="file"
                        name="profile"
                        id="profile"
                        onChange={handlePaymentImage}
                        accept="image/jpeg, image/png, image/jpg"
                        style={{
                          opacity: 0,
                          inset: 0,
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                        }}
                        required
                      />
                    </div>
                    {errors.paymentImageError && <p className="error">{errors.paymentImageError}</p>}

                    <div className="regSubmitBtn">
                      <button onClick={handlePaymentSubmission}>
                        {loading ? <ComponentLoader /> : "Submit Now"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="success-close-btn">
              <span onClick={() => (setIsRegistrationSuccess(false),setSelectedUserId(null),setPaymentImage(null))}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

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

            <p>Payment detail Submitted Successfully You will get an approvel email after few Hours. <br /> Thanks...!</p>
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
