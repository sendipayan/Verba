"use client";

import nav from "./nav.module.css";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ active, setActive, setNow,show,setshow }) {
  const [scrolled, setScrolled] = useState(false);
  const width=window.innerWidth;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Current scroll position
      const viewportHeight = window.innerHeight; // Full viewport height (100vh)

      if (scrollPosition > viewportHeight * 0.9) {
        setScrolled(true);
        setActive(1); // Change background after 90vh scroll
      }
      if (scrollPosition > viewportHeight * 1.9) {
        setActive(2);
        setScrolled(true);
      }

      if (scrollPosition > viewportHeight * 2.9) {
        setActive(3);
        setScrolled(true);
      }

      if (scrollPosition <= viewportHeight * 0.9) {
        setScrolled(false);
        setActive(0); // Reset if scrolling back up
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <div className={`${nav.main} ${scrolled ? nav.scrolled : ""}`}>
      {width>500?<div className={`${nav.options} ${scrolled ? nav.scroll : ""}`}>
        <p
          className={active === 0 ? nav.active : ""}
          onClick={() => {
            setActive(0);
            setNow(0);
          }}
        >
          Home
        </p>
        <p
          className={active === 1 ? nav.active : ""}
          onClick={() => {
            setActive(1);
            setNow(1);
          }}
        >
          What we offer
        </p>
        <p
          className={active === 2 ? nav.active : ""}
          onClick={() => {
            setActive(2);
            setNow(2);
          }}
        >
          About Us
        </p>
        <p
          className={active === 3 ? nav.active : ""}
          onClick={() => {
            setActive(3);
            setNow(3);
          }}
        >
          Contact Us
        </p>
      </div>:<div className={nav.heading}>
        <h1>Verba</h1>
        </div>}
      {width>500?<div className={`${nav.buttons} ${scrolled ? nav.scrl : ""}`}>
        <button onClick={() => signIn("google", { redirectTo: "/dashboard" })}>
          Login
        </button>
        <button onClick={() => signIn("google", { redirectTo: "/dashboard" })}>
          Sign Up
        </button>
      </div>:<div className={nav.icon}>
        {!show?<FontAwesomeIcon icon={faBars}  className={nav.fi} onClick={()=>setshow(1)}/>:
        <FontAwesomeIcon icon={faXmark} className={nav.fi} onClick={()=>setshow(0)}/>}
        </div>}
    </div>
  );
}
