import { createContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Cookies from "js-cookie";
import axios from "axios";

export const Context = createContext();

gsap.registerPlugin(useGSAP);

export default function ContextProvider({ children }) {
  const [loginModal, setLoginModal] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const container = useRef();
  const aboutRef = useRef();
  const [loading, setLoading] = useState(false);
  const [noOfMembers, setNoOfMembers] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [onlyAdmin, setOnlyAdmin] = useState(false);
  const [totalEvents, setTotalEvents] = useState(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      const logoElement = document.querySelector(".logoText");
      if (logoElement) {
        const tl = gsap.timeline();
        const logo = logoElement.textContent
          .split("")
          .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
          .join("");

        logoElement.innerHTML = logo;

        tl.from(".logoText span", {
          opacity: 0,
          delay: 0.25,
          duration: 0.5,
          stagger: 0.09,
        });
        tl.from(".secondLogo", {
          duration: 0.3,
          opacity: 0,
        });
        tl.from(".giftLine", {
          opacity: 0,
          transform: "translateY(20px)",
          duration: 0.5,
        });
      }

      const btnContainer = document.querySelector(".btnContainer");
      if (btnContainer) {
        gsap.from(".btnContainer", {
          delay: 0.6,
          y: -50,
          duration: 0.5,
          opacity: 0,
        });
      }

      const lkns = document.querySelectorAll(".lkns");
      if (lkns.length) {
        gsap.from(".lkns", {
          delay: 0.6,
          y: -50,
          duration: 0.8,
          opacity: 0,
          stagger: 0.1,
        });
      }
    },
    { scope: container }
  );

  useEffect(() => {
    const id = Cookies.get("mnid") || "";

    if (id === "0") {
      setOnlyAdmin(true);
    } else if (parseInt(id) > 0) {
      setIsLogedIn(true);
      setOnlyAdmin(false);
    } else {
      setIsLogedIn(false);
      setOnlyAdmin(false);
    }
  }, []);

  useEffect(() => {
    async function fetchMember() {
      try {
        const response = await axios.get(
          "https://www.gdsons.co.in/draft/sjs/all-members"
        );
        setNoOfMembers(response.data.length);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchMember();
  }, []);

  useEffect(() => {
    const id = Cookies.get("mnid");
    async function adminDetails() {
      if (!id) return;

      const formData = new FormData();
      formData.append("mnid", id);
      formData.append("Mod", "getMemberData");

      try {
        const response = await axios.post(
          `https://www.gdsons.co.in/draft/sjs/get-member-details`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const userData = response?.data;

        if (userData?.userrole === "Webadmin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    }

    adminDetails();
  }, []);

  useEffect(() => {
    async function totalEvents() {
      const formData = new FormData();
      formData.append("event_list", "event_list");
      try {
        const response = await axios.post(
          "https://www.gdsons.co.in/draft/sjs/event-listapi",
          formData
        );
        // console.log(response.data.length);
        setTotalEvents(response.data.length)
      } catch (error) {
        console.log(error.message);
      }
    }
    totalEvents()
  }, []);

  const contextValue = {
    loginModal,
    setLoginModal,
    container,
    loading,
    setLoading,
    isLogedIn,
    setIsLogedIn,
    noOfMembers,
    isAdmin,
    onlyAdmin,
    setOnlyAdmin,
    totalEvents,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
