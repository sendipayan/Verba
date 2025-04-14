"use client";

import Image from "next/image";
import styles from "./page.module.css";
import background from "./assets/bg.png";
import Navbar from "./_components/navbar/nav.jsx";
import { useRef, useEffect, useState } from "react";
import Card from "./_components/card/card.jsx";
import img1 from "./assets/imgage1.png";
import img2 from "./assets/image2.webp";
import img3 from "./assets/image3.png";
import img4 from "./assets/image 4.webp";
import img5 from "./assets/image5.jpg";
import img6 from "./assets/image6.jpg";
import Team from "./_components/team/team.jsx";
import emailjs from "@emailjs/browser";
import { signIn } from "next-auth/react";
import { set } from "mongoose";

export default function Home() {
  const page1 = useRef(null);
  const page2 = useRef(null);
  const page3 = useRef(null);
  const page4 = useRef(null);
  const [active, setActive] = useState(0);
  const [now, setNow] = useState(0);
  const [show, setShow] = useState(0);
  

  useEffect(() => {
    if (now === 0) {
      setActive(0);
      page1.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (now === 1) {
      setActive(1);
      page2.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (now === 2) {
      setActive(2);
      page3.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (now === 3) {
      setActive(3);
      page4.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [now]);

  const form = useRef();
  const name = useRef(null);
  const email = useRef(null);
  const messg = useRef(null);

  
  const sendEmail = (e) => {
    e.preventDefault();
    if(name.current.value === "" || email.current.value === "" || messg.current.value === "") {
      window.alert("Please fill all the fields");
      return;
    }
    emailjs
      .sendForm("service_e3xqb6r", "template_toqx5o1", form.current, {
        publicKey: "EkAIvkchIqmjdwZxP",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          name.current.value = "";
          email.current.value = "";
          messg.current.value = "";
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <Navbar
        active={active}
        setActive={setActive}
        setNow={setNow}
        show={show}
        setshow={setShow}
      />
      {!show ? (
        <>
          <div className={styles.main1} ref={page1}>
            <div className={styles.text}>
              <h2>Speak with confidence, inspire with clarity!</h2>
            </div>
          </div>
          <div className={styles.main2} ref={page2}>
            <div className={styles.head1}>
              <h1>What We offer</h1>
            </div>
            <div className={styles.content}>
              <div className={styles.part}>
                <Card
                  image={img1}
                  ht={150}
                  wt={300}
                  tittle="Personalized Training"
                  para="You will start with a short questionnaire to assess your speaking confidence. Based on your responses, you'll receive a customized learning plan tailored to your improvement needs."
                />
                <Card
                  image={img2}
                  ht={175}
                  wt={350}
                  tittle="AI Speech Analysis"
                  para="Practice your speeches with real-time AI feedback. You'll get insights on your speech pace, clarity, filler words, and vocal modulation to refine your delivery."
                />
                <Card
                  image={img3}
                  ht={150}
                  wt={350}
                  tittle="Speech Practice Tools"
                  para="A built-in speech timer and virtual audience simulation help users practice speeches in a realistic setting, improving their timing, delivery, and ability to engage audiences."
                />
              </div>
              <div className={styles.part}>
                <Card
                  image={img4}
                  ht={162.5}
                  wt={296}
                  tittle="Community Support"
                  para="Join a community of learners where you can share experiences, get peer feedback, and participate in group coaching sessions for continuous growth and encouragement."
                />
                <Card
                  image={img5}
                  ht={150}
                  wt={300}
                  tittle="Learning Resources"
                  para="Access expert-written guides, blogs, and video tutorials to help you overcome stage fright, structure effective speeches, engage audiences, and master impromptu speaking."
                />
                <Card
                  image={img6}
                  ht={150}
                  wt={300}
                  tittle="Progress Tracking"
                  para="Track your improvement with recorded sessions, performance analytics, and personalized reports. You'll see measurable growth in your confidence and public speaking skills over time."
                />
              </div>
            </div>
          </div>
          <div className={styles.main3} ref={page3}>
            <div className={styles.content2}>
              <div className={styles.head2}>
                <h1>This is our Team</h1>
              </div>
              <div className={styles.team}>
                <Team name="Dipayan Sen" desc="Fullstack Developer" />
                <Team name="Akash Santra" />
                <Team name="Avishikta Sengupta" />
                <Team name="Anuska Adak" />
                <Team name="Aryan Singh" />
              </div>
            </div>
          </div>
          <div className={styles.main4} ref={page4}>
            <div className={styles.query} id={styles.small}>
              <div className={styles.talk}>
                <div className={styles.head3}>
                  <h1>Contact Us</h1>
                </div>
                <div className={styles.para1}>
                  <p>
                    Have questions or need support on your public speaking
                    journey? We're here to help! Whether you need technical
                    assistance, have feedback, or want expert guidance, feel
                    free to reach out. Connect with us through email or our
                    community forum. Let&apos;s work together to build your
                    confidence and improve your public speaking skills!{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.query} id={styles.big}>
              <form ref={form} onSubmit={sendEmail}>
                <input
                  ref={name}
                  type="text"
                  name="user_name"
                  placeholder="Name"
                />

                <input
                  ref={email}
                  type="email"
                  name="user_email"
                  placeholder="Email"
                />

                <textarea ref={messg} name="message" placeholder="Message" />
                <input
                  type="submit"
                  className={styles.button}
                  
                  value="Send"
                  placeholder="message"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.newmain}>
          <div className={styles.newbuttons}>
            <button
              style={{ backgroundColor: "#427dca", color: "white" }}
              onClick={() => signIn("google", { redirectTo: "/dashboard" })}
            >
              Login
            </button>
            <button
              style={{ backgroundColor: "#3f44ca", color: "white" }}
              onClick={() => signIn("google", { redirectTo: "/dashboard" })}
            >
              Sign In
            </button>
          </div>
          <ul className={styles.newoptions}>
              <li onClick={()=>{setActive(0);setNow(0);setShow(0)}} id={active===0?styles.active:""}>Home</li>
              <li onClick={()=>{setActive(1);setNow(1);setShow(0)}} id={active===1?styles.active:""}>What we offer</li>
              <li onClick={()=>{setActive(2);setNow(2);setShow(0)}} id={active===2?styles.active:""}>About us</li>
              <li onClick={()=>{setActive(3);setNow(3);setShow(0)}} id={active===3?styles.active:""}> Contact us</li>
          </ul>
        </div>
      )}
    </>
  );
}
