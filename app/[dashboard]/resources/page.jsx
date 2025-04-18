"use client";

import { useEffect, useState } from "react";
import res from "./resource.module.css";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import Res from "../_components/resouce/res";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Resources() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const [questions, setQuestions] = useState({
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
    Q5: "",
  });
  useEffect(() => {
    showanswer();
  }, []);
  const showanswer = async () => {
    try {
      const res = await fetch("https://verba-dip.vercel.app/api/show-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.email }),
      });
      if (res.ok) {
        const data = await res.json();

        setQuestions({
          Q1: data.Q1,
          Q2: data.Q2,
          Q3: data.Q3,
          Q4: data.Q4,
          Q5: data.Q5,
        });
        setLoading(false);
      } else {
        alert("No questionnaire found for this user.");
        setLoading(false);
      }
    } catch (err) {
      alert("Something went wrong!");
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

    if (loading) return(<Loading/>)

  return (
    <div className={res.main}>
      <div className={res.head}>
            <h1>Your personalized resources</h1>
      </div>
      {current===1 &&(<div className={res.container}>
            <div className={res.conthead}>
                <h2>You are <span>{questions.Q1}</span> with public speaking</h2>
            </div>
            <Res/>
            <Res/>
            <Res/>
      </div>)}
      {current===2 &&(<div className={res.container}>
            <div className={res.conthead}>
                <h2>You <span>{questions.Q2}</span> prepare notes for speech</h2>
            </div>
            <Res/>
            <Res/>
            <Res/>
      </div>)}
      {current===3 &&(<div className={res.container}>
            <div className={res.conthead}>
                <h2>You are <span>{questions.Q3}</span> with unprepared speaking</h2>
            </div>
            <Res/>
            <Res/>
            <Res/>
      </div>)}
      {current===4 &&(<div className={res.container}>
            <div className={res.conthead}>
                <h2>You can speak for <span>{questions.Q4}</span> about a topic </h2>
            </div>
            <Res/>
            <Res/>
            <Res/>
      </div>)}
      {current===5 &&(<div className={res.container}>
            <div className={res.conthead}>
                <h2>You <span>{questions.Q5}</span> practice public speaking</h2>
            </div>
            <Res/>
            <Res/>
            <Res/>
      </div>)}
      <div className={res.slide}>
            <div className={res.icon} >
                {current>1 &&<FontAwesomeIcon icon={faArrowLeft} style={{cursor:"pointer"}} color="#427dca" size={width>500?"2x":"1x"} onClick={() => {if(current>1){setCurrent(current-1)}}}/>}
            </div>
            <div className={res.number}>
                    <p style={current===1?{color:"#427dca"}:{}} onClick={()=>setCurrent(1)}>1</p>
                    <p style={current===2?{color:"#427dca"}:{}} onClick={()=>setCurrent(2)}>2</p>
                    <p style={current===3?{color:"#427dca"}:{}} onClick={()=>setCurrent(3)}>3</p>
                    <p style={current===4?{color:"#427dca"}:{}} onClick={()=>setCurrent(4)}>4</p>
                    <p style={current===5?{color:"#427dca"}:{}} onClick={()=>setCurrent(5)}>5</p>
            </div>
            <div className={res.icon} >
                {current<5 &&<FontAwesomeIcon icon={faArrowRight} style={{cursor:"pointer"}} color="#427dca" size={width>500?"2x":"1x"} onClick={() => {if(current<5){setCurrent(current+1)}}}/>}
            </div>
      </div>
    </div>
  );
}
