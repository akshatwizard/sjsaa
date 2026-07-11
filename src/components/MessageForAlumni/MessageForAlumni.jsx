import { useState } from "react";

const messages = [
  {
    id: "chairman",
    name: "XJ RAJKUMAR AGRAWAL",
    role: "CHAIRMAN",
    image: "/images/managing/chairman.jpg",
    preview:
      "It is with immense gratitude and humility that I accept the responsibility of serving once again as the Chairman of the St. John's School DLW Alumni Association for the next two years. This opportunity has been made possible only because of your love, trust, and unwavering support. I sincerely thank each one of you for the confidence you have reposed in me. Together, we have a shared vision of taking our prestigious Alumni Association to greater heights.",
    paragraphs: [
      "It is with immense gratitude and humility that I accept the responsibility of serving once again as the Chairman of the St. John's School DLW Alumni Association for the next two years. This opportunity has been made possible only because of your love, trust, and unwavering support. I sincerely thank each one of you for the confidence you have reposed in me.",
      "Together, we have a shared vision of taking our prestigious Alumni Association to greater heights. With your active participation and cooperation, we plan to organize meaningful, engaging, and enjoyable programs that will strengthen the bonds of friendship, fellowship, and belonging among our members. Our guiding motto, \u201cBonded Forever,\u201d will continue to inspire all our efforts.",
      "This year marks the Silver Jubilee of the Batch of 2001. I extend my heartfelt congratulations and best wishes to all members of this batch and look forward to their enthusiastic participation and valuable support in the Association's activities.",
      "I warmly invite every member to participate actively in all our events and initiatives. Your involvement, suggestions, and support are the greatest strengths of our Association.",
      "Finally, my heartfelt congratulations to XJ Vivek Mehra, and his entire team. I am confident that, together, we will build a stronger, more vibrant Alumni Association and create many memorable milestones in the years ahead.",
    ],
  },
  {
    id: "president",
    name: "XJ Vivek Mehra",
    role: "PRESIDENT",
    image: "/images/managing/vivek-mehra.jpg",
    preview:
      "It is an absolute honour to address you as your Alumni Association President. Our alma mater gave us the foundation to build our dreams, and today, my vision is to take this incredible association to unprecedented heights. To achieve this, our core mission is simple yet powerful: connection. An alumni association is only as strong as its network. We want to bridge the gap between generations, reconnect with lost friends, and ensure that every single past student feels they have a vibrant, active community to call home.",
    paragraphs: [
      "It is an absolute honour to address you as your Alumni Association President. Our alma mater gave us the foundation to build our dreams, and today, my vision is to take this incredible association to unprecedented heights. To achieve this, our core mission is simple yet powerful: connection.",
      "An alumni association is only as strong as its network. We want to bridge the gap between generations, reconnect with lost friends, and ensure that every single past student feels they have a vibrant, active community to call home.",
      "On behalf of the Batch of 2001, I am thrilled to announce that this year's flagship event is going to be unforgettable. We are throwing a spectacular, high-energy Gala Night that promises to be an absolute blast!",
      "Whether you want to walk down memory lane, dance the night away, or simply raise a toast to the good old days, this is the night to do it. Mark your calendars, spread the word, and get ready for a celebration that will set a new benchmark for our association.",
      "To the students currently passing out of the school: your journey with our school doesn't end at graduation. In fact, a whole new chapter is just beginning. I strongly urge every single one of you to officially join the Alumni Association immediately.",
      "Here is why your membership is your greatest asset: You become part of a massive, lifelong web of professionals across the globe. XJhonians currently hold esteemed posts and leadership positions across diverse industries. By joining, you gain direct access to these industry stalwarts, who are ready to guide, mentor, and help you navigate your career path. No matter where you go in the world, you will always find a fellow XJhonian ready to lend a hand.",
      "Let us come together to make this year historic. Let's connect, grow, and celebrate the shared bond that makes us who we are.",
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
