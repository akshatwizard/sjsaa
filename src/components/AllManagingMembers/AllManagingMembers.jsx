import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AllManagingMembers() {

  const members = useRef();

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
      gsap.from(".firstRow div", {
        opacity: 0,
        duration: 0.7,
        stagger: 0.05
      })
    },
    { scope: members }
  );

  const specialMember = [
    { name: "XJ Rajkumar Agrawal", post: "Chairman", batch: 1982, img: "/images/managing/chairman.jpg" },
    { name: "XJ Puneet Agrawal", post: "Vice-Chairman", batch: 1984, img: "/images/managing-committee/xj-puneet-agrawal.jpg" },
    { name: "XJ Pankaj Agrawal", post: "Vice-Chairman", batch: 1989, img: "/images/managing-committee/xj-pankaj-agrawal.jpg" },
  ];

  const memberInfo = [
    { name: "XJ Digvijay Singh", post: "Immediate Past President", batch: 2000, img: "/images/managing-committee/xj-digvijay-singh.jpg" },
    { name: "XJ Vivek Mehra", post: "President", batch: 2001, img: "/images/managing/vivek-mehra.jpg" },
    { name: "XJ Apurve Mathur", post: "Vice-President", batch: 2002, img: "/images/managing-committee/xj-apurve-mathur.jpg" },
    { name: "XJ Shikha Das", post: "Secretary", batch: 2001, img: "/images/managing-committee/xj-shikha-das.jpg" },
    { name: "XJ Manish Kataria", post: "Treasurer", batch: 1993, img: "/images/managing-committee/xj-manish-kataria.jpg" },
    { name: "XJ Kartikanand Jaiswal", post: "Member", batch: 2001, img: "/images/managing-committee/xj-kartikanand-jaiswal.jpg" },
    { name: "XJ Gaurav Pathak", post: "Member", batch: 2001, img: "/images/managing-committee/xj-gaurav-pathak.jpeg" },
    { name: "XJ Harsh Jhunjhunwala", post: "Member", batch: 2002, img: "/images/managing-committee/xj-harsh-jhunjhunwala.jpg" },
    { name: "XJ Uttam Narayan Singh", post: "Member", batch: 2002, img: "/images/managing-committee/no-photo.png" },
    { name: "XJ Deepansh Agrawal", post: "Member", batch: 2003, img: "/images/managing-committee/xj-deepansh-agrawal.jpg" },
    { name: "XJ Dr. Vivek Gautam", post: "Member", batch: 2003, img: "/images/managing-committee/xj-vivek-gautam.png" },
    { name: "XJ Anshul Gupta", post: "Member", batch: 2002, img: "/images/managing-committee/xj-anshul-gupta.jpg" },
    { name: "XJ Abhishek Mohan", post: "Member", batch: 2004, img: "/images/managing-committee/xj-abhishek-mohan.jpeg" },
    { name: "XJ Dr. Pawan Agarwal", post: "Member (Co-Opted)", batch: 2001, img: "/images/managing-committee/xj-pawan-agarwal.png" },
    { name: "XJ Dr. Vaibhav Jaiswal", post: "Member (Co-Opted)", batch: 2001, img: "/images/managing-committee/xj-vaibhav-jaiswal.jpeg" },
    { name: "XJ Dr. Swaroop Patel", post: "Member (Co-Opted)", batch: 2004, img: "/images/managing-committee/xj-swaroop-patel.jpeg" },
    { name: "XJ CA Vishal Ashar", post: "Member (Co-Opted)", batch: 2004, img: "/images/managing-committee/no-photo.png" },
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
          <h1 className="tl">All Managing Committee Members</h1>
        </div>
        <div className="row row-gap-3 firstRow">

          {
            specialMember?.map((member) => (
              <div className="col-lg-4 col-md-6 col-sm-6 " key={member.name}>
                <div className="committeeContainer">
                  <div className="committeeMemberImage">
                    <img src={member.img} alt={member.name} loading="lazy" />
                  </div>
                  <div className="committeeMemberDetails">
                    <h3>{member.name}</h3>
                    <p>
                      {member.batch} Batch
                      <br />
                      {member.post}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }

          <div className="col-lg-12">
            <div className="row row-gap-3">
              {
                memberInfo?.map((member) => (
                  <div className="col-lg-3 col-md-6  col-md-6" key={member.name}>
                    <div className="committeeContainer">
                      <div className="othersMembersImage">
                        <img src={member.img} alt={member.name} loading="lazy" />
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
                ))
              }
            </div>
          </div>
        </div>

        <div className="title" style={{ marginTop: "60px" }}>
          <h2>Special Invitees</h2>
        </div>
        <div className="row row-gap-3">
          {
            specialInvitees?.map((member) => (
              <div className="col-lg-3 col-md-6 col-md-6" key={member.name}>
                <div className="committeeContainer">
                  <div className="othersMembersImage">
                    <img src={member.img} alt={member.name} loading="lazy" />
                  </div>
                  <div className="committeeMemberDetails">
                    <h6>{member.name}</h6>
                    <p>{member.batch} Batch</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
