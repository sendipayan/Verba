"use client";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ques from "./quest.module.css";
import { set } from "mongoose";
import Loading from "../loading";

export default function Questionnaire() {

    const { data: session } = useSession();
    const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [loading, setLoading] = useState(true);
 
  const questions = [
    "Q1. How confident are you when speaking in public?",
    "Q2. How often do you prepare notes before a speech or presentation?",
    "Q3. How comfortable are you with impromptu (unprepared) speaking?",
    "Q4. How long can you speak on a topic confidently?",
    "Q5. Do you currently practice public speaking?",
  ];

  const options = [
    ["Very Confident", "Confident", "Moderate Confident", "Not Confident"],
    ["Always", "Often", "Sometimes", "Never"],
    ["Very Comfortable", "Comfortable", "Neutral", "Uncomfortable"],
    ["More than 15 minutes", "10-15 minutes", "5-10 minutes", "Less than 5 minutes"],
    ["Regularly", "Often", "Sometimes", "Never"],
  ];

  const handleChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (answers.some(answer => answer === "")) {
        window.alert("Please answer all the questions before submitting.");
        return;
      }
    console.log("Answers submitted:", answers);
    console.log("User ID:", session.user.email); 
    
    const data = {
        Q1: answers[0],
        Q2: answers[1],
        Q3: answers[2],
        Q4: answers[3],
        Q5: answers[4],
        userId: session.user.email, 
      };
      try {
        const res = await fetch("https://verba-dip.vercel.app/api/submit-answers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        
        if (res.ok) {
          alert("Questionnaire submitted successfully!");
          setIsSubmitted(true);
          
        } else {
          alert("Failed to submit questionnaire.");
        }
      } catch (err) {
        alert("Something went wrong!");
        console.error(err);
      }
  };

  
  useEffect(() => {
    if (session?.user?.email) {
      finduser();
    }
  }, []);
  
   const finduser=async()=>{

    try{
        const res = await fetch("https://verba-dip.vercel.app/api/finduser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: session.user.email }),
          });
          if (res.ok){
            setIsSubmitted(true);
            setLoading(false);
          }
             else {
            setIsSubmitted(false);
            setLoading(false);
          }
    }catch(err){
        alert("Something went wrong!");
        console.error(err);
        setLoading(false);
    }
  }

  if(loading) return <Loading/>

  return (
    <div className={ques.main}>
      <div className={ques.heading}>
        <h1>Questionnaire</h1>
      </div>
      {!isSubmitted?<form className={ques.content} onSubmit={handleSubmit}>
        <div className={ques.question}>
          <h2>{questions[currentQuestion]}</h2>
        </div>

        <div className={ques.options}>
          {options[currentQuestion].map((option, index) => (
            <div className={ques.option} key={index}>
              <input
                type="radio"
                name={`question_${currentQuestion}`}
                id={`q${currentQuestion}_${index}`}
                value={option}
                onChange={handleChange}
                checked={answers[currentQuestion] === option}
              />
              <label htmlFor={`q${currentQuestion}_${index}`}>{option}</label>
            </div>
          ))}
        </div>

        <div className={ques.control}>
          {currentQuestion > 0 && (
            <div className={ques.prev} onClick={() => setCurrentQuestion(currentQuestion - 1)}>
              <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </div>
          )}
          {currentQuestion < questions.length - 1 ? (
            <div className={ques.next} onClick={() => setCurrentQuestion(currentQuestion + 1)}>
              <FontAwesomeIcon icon={faArrowRight} size="2x" />
            </div>
          ) : (
            <div className={ques.submit}>
              <button type="submit" >Submit</button>
            </div>
          )}
        </div>
      </form>:<div>Already Submitted</div>}
    </div>
  );
}
