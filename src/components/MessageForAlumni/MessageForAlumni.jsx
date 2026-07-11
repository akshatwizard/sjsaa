import { useState } from "react";

const messages = [
  {
    id: "chairman",
    name: "XJ RAJKUMAR AGRAWAL",
    role: "CHAIRMAN",
    image: "/images/managing/chairman.jpg",
    preview:
      "As we celebrate 40 years of the St. John's School, BLW, Varanasi Alumni Association, I am filled with immense pride and gratitude. Founded with a vision to connect and support our diverse alumni family, the association has grown into a vibrant community. Our journey over these decades reflects our collective achievements and the enduring spirit of St. John's. Together, we have built lasting friendships, supported one another, and contributed to society. As we look to the future, let's continue to uphold the values instilled in us and strengthen the bonds that unite us.",
    paragraphs: [
      "As we celebrate 40 years of the St. John's School, BLW, Varanasi Alumni Association, I am filled with immense pride and gratitude. Founded with a vision to connect and support our diverse alumni family, the association has grown into a vibrant community. Our journey over these decades reflects our collective achievements and the enduring spirit of St. John's. Together, we have built lasting friendships, supported one another, and contributed to society. As we look to the future, let's continue to uphold the values instilled in us and strengthen the bonds that unite us.",
    ],
  },
  {
    id: "president",
    name: "XJ Digvijay Singh",
    role: "PRESIDENT",
    image: "/images/managing/new-president.jpg",
    preview:
      "It is with great pride and heartfelt emotion that I welcome you all to this milestone celebration. As President of the St. John\u2019s Alumni Association, it is both an honor and a joy to witness the 25th anniversary of the Class of 2000. This class continues to embody the very spirit of our beloved school. Founded to connect hearts beyond the classrooms, our association has grown into a diverse and united family, bonded by the values we all hold dear discipline, integrity, humility, and service.",
    paragraphs: [
      "It is with great pride and heartfelt emotion that I welcome you all to this milestone celebration. As President of the St. John\u2019s Alumni Association, it is both an honor and a joy to witness the 25th anniversary of the Class of 2000. This class continues to embody the very spirit of our beloved school.",
      "Founded to connect hearts beyond the classrooms, our association has grown into a diverse and united family, bonded by the values we all hold dear discipline, integrity, humility, and service. These values, instilled in us within the walls of St. John\u2019s, have not only stood the test of time but have guided our lives in both seen and unseen ways. Today is more than a reunion it\u2019s a return. After decades, we walk again through the corridors where our stories began. The buildings may have changed, but the spirit of St. John\u2019s remains timeless. This is a homecoming of the heart. To my classmates from 2000, what a journey it has been from our school uniforms to our lives today. Let us take this moment to reflect, reconnect, and recommit. Let\u2019s give back, stay engaged, and be proud torchbearers of the legacy we were gifted.",
      "May future generations inherit a school and a living tradition of excellence, character, and unity.",
    ],
  },
  {
    id: "principal",
    name: "Fr. Guru Santharaj",
    role: "PRINCIPAL",
    image: "/images/principals/Fr.GuruSantharaj_2022-.png",
    preview:
      "It is with immense pride and warmth that I write to you today. Every corridor of our school still echoes with the footsteps of those who walked these halls before \u2014 your laughter, your dreams, your first triumphs and lessons learned. You are, in every sense, the living legacy of St. John's School. As Principal, I often find myself reflecting on how the true measure of an institution is not just in the students it teaches, but in the individuals they become.",
    paragraphs: [
      "It is with immense pride and warmth that I write to you today. Every corridor of our school still echoes with the footsteps of those who walked these halls before \u2014 your laughter, your dreams, your first triumphs and lessons learned. You are, in every sense, the living legacy of St. John's School.",
      "As Principal, I often find myself reflecting on how the true measure of an institution is not just in the students it teaches, but in the individuals they become. Looking at where each of you now stands \u2014 as leaders, innovators, healers, educators, and changemakers \u2014 I am reminded that the values we instilled together continue to ripple outward, touching lives far beyond our campus.",
      "The bond between St. John's and its alumni is not one that fades with time; it grows richer. Your journeys inspire our current students to dream bigger, and your continued involvement \u2014 whether through mentorship, contributions, or simply staying connected \u2014 strengthens the very foundation this institution stands on.",
      "I warmly invite each of you to remain close to your alma mater. Visit us, share your stories, guide our young learners, and be part of the milestones still to come. Together, past and present, we carry forward the spirit of St. John's \u2014 one of excellence, integrity, and community.",
    ],
  },
];

export default function MessageForAlumni() {
  const [activePerson, setActivePerson] = useState(null);

  return (
    <section className="sectionContainer">
      <div className="container">
        <div className="title">
          <h1>Message For ALUMNI</h1>
        </div>
        <div className="row row-gap-5">
          {messages.map((person) => (
            <div className="col-lg-4 col-md-6 colsm-12" key={person.id}>
              <div className="messageContainer">
                <div className="messageImgContainer">
                  <div className="profilePic shine">
                    <img src={person.image} alt="" loading="lazy" />
                  </div>
                </div>
                <div className="name">
                  <h5>{person.name}</h5>
                  <p>{person.role}</p>
                </div>
                <div className="theirMessage">
                  <p className="clampedText">{person.preview}</p>
                  <button
                    type="button"
                    className="readMoreBtn"
                    onClick={() => setActivePerson(person)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activePerson && (
        <div className="messageDetailModal">
          <div className="formContainer">
            <div
              className="modalCloseBtn"
              onClick={() => setActivePerson(null)}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
            <div className="messageImgContainer">
              <div className="profilePic shine">
                <img src={activePerson.image} alt="" loading="lazy" />
              </div>
            </div>
            <div className="name">
              <h5>{activePerson.name}</h5>
              <p>{activePerson.role}</p>
            </div>
            <div className="fullMessage">
              {activePerson.paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
