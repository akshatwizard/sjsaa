import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DownloadPdf() {
  const [memberData, setMemberData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchMember() {
      const formData = new FormData();
      formData.append("mnid", id);
      formData.append("Mod", "getMemberData");
      try {
        const response = await axios.post(
          "https://www.gdsons.co.in/draft/sjs/get-member-details",
          formData
        );
        setMemberData(response?.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMember();
  }, [id]);

  return (
    <section className="pdfPreviewSection">
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8" id="printable-content">
            <div className="pdfContainer">
              <div className="pdfHeader">
                <div className="pdfLogo">
                  <img src="/images/8.png" alt="" />
                </div>
                <div className="schoolName">
                  <h3>ST. JOHN’S SCHOOL, DLW, VARANASI – ALUMNI ASSOCIATION</h3>
                  <h5>
                    (Registered with U.P. Society Registration Act (Amended)
                    1860), Society Registration No. 6716/V32543 Dated –
                    29.04.2006
                  </h5>
                  <h4 className="mt-2">
                    Admin Off: c/o 20, Lajpat Nagar, Maldhaiya Station Road,
                    Varanasi – 221001.
                  </h4>
                  <h6>
                    <span>Email</span> – sjsaadlwvns@gmail.com |{" "}
                    <span>Contact No</span> – 9415268833 / 8808480000/9935039747
                  </h6>
                </div>
              </div>
              <div className="pdfBody">
                <h5 className="text-center">REGISTRATION FOR MEMBERSHIP OF SJSAA 2022- 2023</h5>
                <div className="row ">
                  <div className="col-12">
                    <div className="row row-gap-1">
                      <div className="col-8">
                        <div className="row row-gap-1">
                          <div className="col-12">
                            <div className="datacontainer">
                              <span>Name:-</span>
                              <div>{memberData.title || "not provided"}</div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="datacontainer">
                              <span>Batch:-</span>
                              <div>{memberData.batch || "not provided"}</div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="datacontainer">
                              <span>Email:-</span>
                              <div>{memberData.email_id || "not provided"}</div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="datacontainer">
                              <span>DOB:-</span>
                              <div>
                                {memberData.birth_date || "not provided"}
                              </div>
                            </div>
                          </div>

                          <div className="col-7">
                            <div className="datacontainer">
                              <span>Contact No:-</span>
                              <div>
                                {memberData.mobile_number_one || "not provided"}
                              </div>
                            </div>
                          </div>

                          <div className="col-5">
                            <div className="datacontainer">
                              <span>Location:-</span>
                              <div>{memberData.location || "not provided"}</div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="datacontainer">
                              <span>Qualification:-</span>
                              <div>
                                {memberData.qualification || "not provided"}
                              </div>
                            </div>
                          </div>
                          <div className="col-5">
                            <div className="datacontainer">
                              <span>House:-</span>
                              <div>{memberData.house || "not provided"}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-4">
                        <img
                          src={memberData.profile_picture || "not provided"}
                          alt=""
                          style={{
                            height: "180px",
                            width: "180px",
                            objectFit: "contain",
                          }}
                        />
                      </div>

                      <div className="col-12">
                        <div className="row row-gap-2">
                          <div className="col-12">
                            <div className="datacontainer">
                              <span>About Me:-</span>
                              <div>{memberData.about_me || "not provided"}</div>
                            </div>
                          </div>
                          <div className="col-5">
                            <div className="datacontainer">
                              <span>Alumni Joining Year:-</span>
                              <div>
                                {memberData.joining_year || "not provided"}
                              </div>
                            </div>
                          </div>

                          <div className="col-7">
                            <div className="datacontainer">
                              <span>Current career:-</span>
                              <div>
                                {memberData.trade_category || "not provided"}
                              </div>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="datacontainer">
                              <span>Name of spouse:-</span>
                              <div>
                                {memberData.spouse_name || "not provided"}
                              </div>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="datacontainer">
                              <span>Name of Children:-</span>
                              <div>
                                {memberData.children_details || "not provided"}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="datacontainer">
                              <span>Wedding Date:-</span>
                              <div>
                                {memberData.anniversary || "not provided"}
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="datacontainer">
                              <span>Address:-</span>
                              <div>{memberData.address || "not provided"}</div>
                            </div>
                          </div>

                          <hr />

                          <div className="col-12">
                            <div className="data-content">
                              <span>Membership Fee:-</span>
                              <div>
                                Life Membership Fee - Rs.3000/- ( One Time )
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="data-content">
                              <div className="row">
                                <div className="col-12">
                                  <span>Payment Details:</span>
                                </div>
                                <div className="col-12">
                                  <div>
                                    <p>
                                      <span style={{ fontWeight: "600" }}>
                                        1:- Demand Draft
                                      </span>{" "}
                                      : – Rs.3000/- in favour of “St. John’s
                                      School, DLW Alumni Association” payable at
                                      “VARANASI” to be dispatched of following
                                      address:- To, The Board Members 2022-23,
                                      SJSAA, c/o 20, Lajpat Nagar, Maldhaiya
                                      Station Road, Varanasi – 221001. Contact
                                      No. – 9415268833/ 8808480000
                                    </p>
                                    <p><span style={{ fontWeight: "600" }}>
                                      2:- Cash
                                    </span>{" "}
                                    : To any Authorized Person of Managing
                                    Committee Members 2022 - 23</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <hr />
                            <div className="data-content">
                              <ol type="1">
                                <li>
                                  1:- In case of female, married ex-student
                                  please provide maiden name within brackets
                                </li>
                                <li>
                                  2:- Class last studied in St. John’s School
                                  D.L.W.
                                </li>
                                <li>3:- Final qualification attained</li>
                                <li>
                                  4:- Designation/job/post and/or career held
                                  presently.
                                </li>
                                <li>
                                  5:-Please provide both the dates in dd-mm-yyyy
                                  format. It is not mandatory to provide the
                                  year in DOB.
                                </li>
                                <li>
                                  6:- Please provide gender and date of birth
                                </li>
                                <li>
                                  7:- Please provide country & area code with
                                  all telephone numbers
                                </li>
                                <li>
                                  8:- Please enclose/attach your and your
                                  spouse’s photograph with the form.
                                </li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2 ">
            <button className="btn btn-success" onClick={() => window.print()}>
              Print
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
