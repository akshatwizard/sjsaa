import { createContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Cookies from "js-cookie";

export const Context = createContext();

gsap.registerPlugin(useGSAP);

export default function ContextProvider({ children }) {
  const [loginModal, setLoginModal] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const container = useRef();
  const aboutRef = useRef();
  const [loading, setLoading] = useState(false);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
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
  }, { scope: container });

  useEffect(() => {
    const id = Cookies.get("mnid") || '';

    if (id) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
  }, []);

  const contextValue = {
    loginModal,
    setLoginModal,
    container,
    loading,
    setLoading,
    isLogedIn,
    setIsLogedIn,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
