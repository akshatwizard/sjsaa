import { Link } from "react-router-dom";
import { scrollToTop } from "../../helper/scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function ManagingCommittee() {
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
        <Link to={"/managing-committee-members"} onClick={scrollToTop}>
          <button className="viewMoreBtn" style={{ marginTop: "50px" }}>
            View More Members
          </button>
        </Link>
      </div>
    </section>
  );
}
