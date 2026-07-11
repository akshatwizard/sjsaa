import { Link } from "react-router-dom";
import { scrollToTop } from "../../helper/scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function ManagingCommittee() {
  const members = useRef();
  const [showSpecialInvitees, setShowSpecialInvitees] = useState(false);

  useGSAP(
    () => {
      const txt = document
        .querySelector(".tl")
        .textContent.split("")
        .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
        .join("");

      document.querySelector(".tl").innerHTML = txt;
      gsap.from(".tl span", {
        opacity: 0,
        delay: 0.5,
        duration: 0.5,
        stagger: 0.09,
      });
    },
    { scope: members }
  );

  const specialMember = [
    { name: "XJ RAJKUMAR AGRAWAL", post: "CHAIRMAN", batch: 1982, img: "/images/managing/chairman.jpg" },
    { name: "XJ PUNEET AGRAWAL", post: "VICE-CHAIRMAN", batch: 1984, img: "/images/managing-committee/xj-puneet-agrawal.jpg" },
    { name: "XJ PANKAJ AGRAWAL", post: "VICE-CHAIRMAN", batch: 1989, img: "/images/managing-committee/xj-pankaj-agrawal.jpg" },
  ];

  const featuredMembers = [
    { name: "XJ VIVEK MEHRA", post: "PRESIDENT", batch: 2001, img: "/images/managing/vivek-mehra.jpg" },
    { name: "XJ APURVE MATHUR", post: "VICE-PRESIDENT", batch: 2002, img: "/images/managing-committee/xj-apurve-mathur.jpg" },
    { name: "XJ SHIKHA DAS", post: "SECRETARY", batch: 2001, img: "/images/managing-committee/xj-shikha-das.jpg" },
    { name: "XJ MANISH KATARIA", post: "TREASURER", batch: 1993, img: "/images/managing-committee/xj-manish-kataria.jpg" },
  ];

    const specialInvitees = [
    { name: "XJ Sanjeev Jaipuria", post: "Member (Special Invitee)", batch: 1984, img: "/images/managing-committee/xj-sanjeev-jaipuria.jpeg" },
    { name: "XJ Rajeev Chawla", post: "Member (Special Invitee)", batch: 1984, img: "/images/managing-committee/xj-rajeev-chawla.jpeg" },
    { name: "XJ Sanjay Banerjee", post: "Member (Special Invitee)", batch: 1988, img: "/images/managing-committee/xj-sanjay-banerjee.jpeg" },
    { name: "XJ Amit Verma", post: "Member (Special Invitee)", batch: 1993, img: "/images/managing-committee/xj-amit-verma.jpg" },
    { name: "XJ Jaideep Singh", post: "Member (Special Invitee)", batch: 1993, img: "/images/managing-committee/xj-jaideep-singh.jpg" },
    { name: "XJ Ritesh Tibrewal", post: "Member (Special Invitee)", batch: 1997, img: "/images/managing-committee/xj-ritesh-tibrewal.jpg" },
    { name: "XJ Manu Dhawan", post: "Member (Special Invitee)", batch: 1998, img: "/images/managing-committee/xj-manu-dhawan.jpeg" },
    { name: "XJ Abhinav Pandey", post: "Member (Special Invitee)", batch: 1999, img: "/images/managing-committee/xj-abhinav-pandey.jpg" },
    { name: "XJ Shubhankar Chandra Chowdhary", post: "Member (Special Invitee)", batch: 1999, img: "/images/managing-committee/xj-shubhankar-chandra-chowdhary.png" },
    { name: "XJ Abhishek Basak", post: "Member (Special Invitee)", batch: 2000, img: "/images/managing-committee/xj-abhishek-basak.jpg" },
    { name: "XJ Ravi Pradwani", post: "Member (Special Invitee)", batch: 2001, img: "/images/managing-committee/xj-ravi-pradwani.jpeg" },
    { name: "XJ Atul Rai", post: "Member (Special Invitee)", batch: 2001, img: "/images/managing-committee/xj-atul-rai.png" },
    { name: "XJ Preeti Singh", post: "Member (Special Invitee)", batch: 2001, img: "/images/managing-committee/xj-preeti-singh.jpg" },
    { name: "XJ Dr. Shubhra Bharadwaj", post: "Member (Special Invitee)", batch: 2001, img: "/images/managing-committee/xj-shubhra-bharadwaj.jpg" },
    { name: "XJ Mohit Mohley", post: "Member (Special Invitee)", batch: 2003, img: "/images/managing-committee/xj-mohit-mohley.jpg" },
    { name: "XJ Dr. Yashasvi Singh", post: "Member (Special Invitee)", batch: 2003, img: "/images/managing-committee/xj-yashasvi-singh.jpeg" },
    { name: "XJ Swaetabh Pandey", post: "Member (Special Invitee)", batch: 2003, img: "/images/managing-committee/xj-swaetabh-pandey.jpg" },
  ];

  return (
    <section className="sectionContainer" ref={members}>
      <div className="container">
        <div className="title">
          <h1 className="tl">Managing Committee</h1>
        </div>
        <div className="row row-gap-3">
          {specialMember.map((member) => (
            <div className="col-lg-4 col-md-6 col-sm-6 " key={member.name}>
              <div className="committeeContainer">
                <div className="committeeMemberImage">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="committeeMemberDetails">
                  <h3>{member.name}</h3>
                  <p>
                    {member.batch} Batch
                    <br /> {member.post}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="col-lg-12">
            <div className="row row-gap-3">
              {featuredMembers.map((member) => (
                <div className="col-lg-3 col-md-6  col-md-6" key={member.name}>
                  <div className="committeeContainer">
                    <div className="othersMembersImage">
                      <img src={member.img} alt={member.name} />
                    </div>
                    <div className="committeeMemberDetails">
                      <h6>{member.name}</h6>
                      <p>
                        {member.batch} Batch
                        <br />
                        {member.post}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "50px" }}>
          <Link to={"/managing-committee-members"} onClick={scrollToTop}>
            <button className="viewMoreBtn">View More Members</button>
          </Link>
          <button
            type="button"
            className="viewMoreBtn"
            onClick={() => setShowSpecialInvitees(true)}
          >
            Special Invitees
          </button>
        </div>
      </div>

      {showSpecialInvitees && (
        <div className="messageDetailModal">
          <div className="formContainer specialInviteesModal">
            <div
              className="modalCloseBtn"
              onClick={() => setShowSpecialInvitees(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
            <div className="name" style={{ marginBottom: "20px" }}>
              <h5>Special Invitees</h5>
            </div>
            <div className="row row-gap-3">
              {specialInvitees.map((member) => (
                <div className="col-lg-4 col-md-6 col-sm-6" key={member.name}>
                  <div className="specialInviteeCard">
                    <div className="specialInviteeImage">
                      <img src={member.img} alt={member.name} loading="lazy" />
                    </div>
                    <h6>{member.name}</h6>
                    <p>{member.batch} Batch</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
