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
    { name: "XJ Puneet Agrawal", post: "Vice-Chairman", batch: 1984, img: "/images/managing/Vice-Chairman.jpg" },
    { name: "XJ Pankaj Agrawal", post: "Vice-Chairman", batch: 1989, img: "/images/managing/Vice-Chairman-02.png" },
  ]
  const memberInfo = [
    { name: "XJ Abhinav Pandey", post: "Immediate Past President", batch: 1999, img: "/images/managing/President.png" },
    { name: "XJ Digvijay Singh", post: "President", batch: 2000, img: "/images/managing/Vice-President.jpg" },
    { name: "XJ Vivek Mehra", post: "Vice-President", batch: 2001, img: "/images/managing-committee/XJ-vivek-mehra.jpg" },
    { name: "XJ Abhishek Basak", post: "Secretary", batch: 2000, img: "/images/managing-committee/XJ-abhishek-basak.jpg" },
    { name: "XJ Manish Kataria", post: "Treasurer", batch: 1993, img: "/images/managing/Treasurer.png" },
    { name: "XJ Pawan Beri", post: "Member", batch: 2000, img: "/images/managing-committee/XJ-pawan-beri.jpg" },
    { name: "XJ Vaibhav Gupta", post: "Member", batch: 2000, img: "/images/managing-committee/XJ-vaibhav-gupta.jpg" },
    { name: "XJ Dr. Abhinav Agrawal", post: "Member", batch: 2001, img: "/images/managing-committee/XJ-abhinav-agrawal.jpg" },
    { name: "XJ Shikha Das", post: "Member", batch: 2001, img: "/images/managing-committee/XJ-shikha-das.jpg" },
    { name: "XJ Apurve Mathur", post: "Member", batch: 2002, img: "/images/managing-committee/XJ-apurve-mathur.jpg" },
    { name: "XJ Harsh Jhunjhunwala", post: "Member", batch: 2002, img: "/images/managing-committee/XJ-harsh.jpg" },
    { name: "XJ Kartikanand Jaiswal", post: "Member", batch: 2001, img: "/images/managing-committee/XJ-kartikanand.jpg" },
    { name: "XJ Dr. Vipin Singh", post: "Member", batch: 1999, img: "/images/managing-committee/XJ-vipin-singh.jpg" },
    { name: "XJ Manish Gupta", post: "Member Co-Opted", batch: 2000, img: "/images/managing-committee/XJ-manish-gupta.png" },
    { name: "XJ Safal Jaiswal", post: "Member Co-Opted", batch: 2000, img: "/images/managing-committee/XJ-safal-jaiswal.jpg" },
    { name: "XJ Ritesh Tibrewal", post: "Member Co-Opted", batch: 1997, img: "/images/managing-committee/XJ-ritesh-tibrewal.jpg" },
    { name: "XJ Shubhankar Chandra Chowdhary", post: "Member Co-Opted", batch: 1999, img: "/images/managing-committee/XJ-shubhankar.png" },
    { name: "XJ Amit Verma", post: "Member Special Invitee", batch: 1993, img: "/images/managing-committee/XJ-amit-verma.jpg" },
    { name: "XJ Deepansh Agrawal", post: "Member Special Invitee", batch: 2003, img: "/images/managing-committee/XJ-deepansh-agrawal.jpg" },
    { name: "XJ Mohit Mohley", post: "Member Special Invitee", batch: 2003, img: "/images/managing-committee/XJ-mohit-mohley.jpg" },
    { name: "XJ Dr. Vivek Gautam", post: "Member Special Invitee", batch: 2003, img: "/images/managing-committee/XJ-vivek-gautam.png" }
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
      </div>
    </section>
  );
}
