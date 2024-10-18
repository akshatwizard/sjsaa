import axios from "axios";
import React, { useEffect, useState } from "react";

export default function WishMe() {
  const [birthdayData, setBirthdayData] = useState(null);
  const [anniversaryData, setAnniversaryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("mod", "bod_list");
      try {
        const response = await axios.post(
          "https://gdsons.co.in/draft/sjs/birthday-list-api",
          formData
        );
        // console.log(response.data);

        setBirthdayData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchNewData = async () => {
      const formData = new FormData();
      formData.append("mod", "bod_list");
      try {
        const response = await axios.post(
          "https://gdsons.co.in/draft/sjs/anniversary-list-api",
          formData
        );
        // console.log(response.data);
        setAnniversaryData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNewData();
  }, []);
  return (
    <section className="sectionContainer">
      {/* <img src="images/events/3.png" className="flg" /> */}
      <div className="container">
        <div className="title">
          <h3 className="wish-tagline">Wish Me.....</h3>
        </div>
        <div className="row row-gap-3">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wish-me-container">
              <div
                className="wish-me-header"
                style={{
                  backgroundImage: "url('images/events/birthday-img.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right bottom",
                  backgroundSize: "90px",
                }}
              >
                <h1>Birthday</h1>
              </div>

              <div className="wish-me-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table style={{ width: "100%" }}>
                        <tr>
                          <th className="thead">Name</th>
                          <th className="thead">Batch</th>
                          <th className="thead">DOB</th>
                        </tr>
                        {birthdayData?.map((data) => (
                          <tr key={data.gallery_id}>
                            <td className="tbody">{data.memname}</td>
                            <td className="tbody">{data.batch}</td>
                            <td className="tbody">{data.dob}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="wish-me-container">
              <div
                className="wish-me-header"
                style={{
                  backgroundImage: "url('images/events/man.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right bottom",
                  backgroundSize: "120px",
                }}
              >
                <h1 style={{ color: "rgb(246 200 56)" }}>Anniversary</h1>
              </div>
              <div className="wish-me-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table style={{ width: "100%" }}>
                        <tr>
                          <th className="athead">Name</th>
                          <th className="athead">Batch</th>
                          <th className="athead">Anniversary</th>
                        </tr>
                        {anniversaryData?.map((data) => (
                          <tr key={data.gallery_id}>
                            <td className="atbody">{data.memname}</td>
                            <td className="atbody">{data.batch}</td>
                            <td className="atbody">{data.dob}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
