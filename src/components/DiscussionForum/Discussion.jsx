import React, { useEffect, useState } from "react";

export default function Discussion() {
  const [writePostContainer, setWritePostContainer] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // Sample post data
  const postData = {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum non soluta vero odit recusandae provident, odio dolorum eveniet aliquam, repellendus ab natus deserunt ad nemo accusantium aperiam perferendis quam Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptas sint eius id hic animi, quas mollitia, dolore consequuntur numquam voluptatibus laudantium at culpa esse ullam exercitationem incidunt deserunt. Tenetur corrupti recusandae ad, ex veniam delectus ratione excepturi qui dicta voluptatum adipisci, eum id officia. Veniam, vero voluptate! Iste, atque.",
    imageUrl: "/images/banner/banner-01.jpg",
    author: "Priyesh Rai",
    role: "A full stack Developer",
  };

  useEffect(() => {
    if (writePostContainer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [writePostContainer]);

  async function handleClick(event) {
    console.log(event.target);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
  };

  return (
    <div>
      <section className="sectionContainer">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-0"></div>
            <div className="col-lg-8 col-md-12 col-12">
              <div className="post-container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="post-information">
                      <div className="row row-gap-1">
                        <div className="col-lg-2 col-3">
                          <div className="user-image-container">
                            <div className="user-img">
                              <img src="/images/userDefault.png" alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-9">
                          <div className="user-textbox-container">
                            <input
                              type="text"
                              placeholder="Start your post"
                              readOnly
                              onClick={()=>setWritePostContainer(true)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-5 row-gap-5">
                  <div className="col-lg-12">
                    <div className="user-post-container">
                      <div className="post-header">
                        <div className="user-img">
                          <img src="/images/userDefault.png" alt="" />
                        </div>
                        <div className="user-name">
                          <p>{postData.author}</p>
                          <span>{postData.role}</span>
                        </div>
                      </div>
                      <hr />

                      <div className="post-body">
                        <PostContent
                          text={postData.text}
                          imageUrl={postData.imageUrl}
                        />
                      </div>

                      <div className="post-footer">
                        <div className="icon-container">
                          <i className="fa-regular fa-heart"></i>
                        </div>
                        <div className="icon-container">
                          <i className="fa-solid fa-message"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2  col-0"></div>
          </div>
        </div>

        {writePostContainer && (
          <div className="write-post-container">
            <div className="write-post-wraper">
              <div className="write-post-header">
                <div className="writer-image-container">
                  <img src="/images/userDefault.png" alt="" />
                </div>
                <div className="writer-name-container">
                  <p>Priyesh Rai</p>
                  <span>Full Stack Developer</span>
                </div>
                <div className="write-post-close-btn" onClick={()=>setWritePostContainer(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>

              <div className="write-post-body">
                <textarea
                  name="postdata"
                  id="postData"
                  rows="10"
                  placeholder="Start writing your post"
                ></textarea>

                <div className="write-post-image-preview">
                  {imagePreviewUrl && (
                    <div className="preview-container">
                      <img src={imagePreviewUrl} alt="Selected" />
                      <i
                        className="fa-solid fa-xmark"
                        onClick={handleDeleteImage}
                      ></i>
                    </div>
                  )}
                </div>
              </div>

              <div className="write-post-footer">
                <div
                  className="image-selector"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <i className="fa-solid fa-image"></i>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>

                <div className="post-btn">
                  <button>Post</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function PostContent({ text, imageUrl }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(" ");
  const shouldTruncate = words.length > 30;
  const truncatedText = shouldTruncate
    ? words.slice(0, 30).join(" ") + "..."
    : text;

  return (
    <div>
      <div className="post-text">
        <p>
          {isExpanded ? text : truncatedText}{" "}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="read-more-btn"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>
      </div>
      {imageUrl && (
        <div className="post-image">
          <img src={imageUrl} alt="Post content" />
        </div>
      )}
    </div>
  );
}
