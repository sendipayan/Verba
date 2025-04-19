"use client";

import speech from "./speech.module.css";
import robo from "../assets/robo.png";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Markdown from "react-markdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCopy,
  faDownload,
  faDownLong,
  faMicrophone,
  faMicrophoneSlash,
  faPaperPlane,
  faRepeat,
  faUser,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Loading from "../loading";

export default function Speech() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [send, isSend] = useState(false);
  const [iscamera, setIsCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [display, setDisplay] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const text =
    "Public speaking is a skill, not a talent—one that grows stronger with consistent practice. This space is designed to help you refine your delivery, improve your confidence, and master the art of effective communication. Whether youre rehearsing for a presentation, preparing for an important speech, or simply looking to enhance your speaking skills, our tools and guided exercises will support your journey. Speak boldly, refine your style, an watch your confidence soar!";
  const words = text.split("");
  const [displayedWords, setDisplayedWords] = useState([]);
  const [feedback,setFeedback] = useState("");
  const [loading,setLoading]=useState(true);

  const displayText = () => {
    if (display) return;

    setDisplayedWords([]);

    words.forEach((word, index) => {
      setTimeout(() => {
        setDisplayedWords((prev) => [...prev, word]);
      }, index * 20);
    });
  };

  if (!browserSupportsSpeechRecognition)
    window.alert("Browser does not support speech recognition");

  useEffect(() => {
    if (isRecording) {
      if(!iscamera)
        window.alert("Switch on the camera first")
      else{
        SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
        setDisplay(true);
        
        startCameraStream().then(() => {
          startRecording();
        });
      }
    } else {
      SpeechRecognition.stopListening();
      stopRecording();
      
      setIsCamera(false);
    }
  }, [isRecording]);

  useEffect(() => {
    if (iscamera) {
      startCameraStream();
    }

    return () => {
      if (!isRecording && streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [iscamera]);

  useEffect(() => {
    if (!display) {
      setIsRecording(false);
    }
  }, [display]);

  const resetmic = () => {
    setDisplay(false);
    resetTranscript();
    isSend(false);
    setIsRecording(false);
    setIsCamera(false);
  };

  const sendMessage = () => {
    if (transcript.length > 0) {
      isSend(true);
      setIsRecording(false);
    }
  };

  useEffect(()=>{
    if(send)
      response();
  },[send]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      window.alert("Text copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const startCameraStream = async () => {
    if (!streamRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = stream;
        const videoElement = document.querySelector("video");
        if (videoElement) videoElement.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  const startRecording = () => {
    if (streamRef.current) {
      const mediaRecorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (videoUrl) {
          URL.revokeObjectURL(videoUrl);
        }
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        chunksRef.current = [];
      };

      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
      streamRef.current = null;
    }
  };

  const response = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://verba-dip.vercel.app/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      if (res.ok) {
        const data = await res.json();
        
        setFeedback((data.feedback || "").replace(/\n{2,}/g, "\n\n").trim());
      
        setLoading(false);
      } else {
        alert("Failed to get response.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error in response:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className={speech.main}>
      <div className={speech.container}>
        {!display ? (
          <div className={speech.first}>
            <div className={speech.robo} onClick={displayText}>
              <Image src={robo} alt="robot" width={200} height={220} />
            </div>
            <div className={speech.text}>
              <p>{displayedWords.join("")}</p>
            </div>
          </div>
        ) : (
          <div className={speech.second}>
            {iscamera && (
              <div className={speech.player}>
                <video
                  autoPlay
                  playsInline
                  ref={(video) => video && (video.srcObject = streamRef?.current)}
                  style={{ width: "100%", height: "100%" }}
                ></video>
              </div>
            )}
            <div className={speech.user}>
              <div className={speech.text1}>
                <p>{transcript}</p>
              </div>
              <div className={speech.icons} style={{ backgroundColor: "#ddd" }}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
            <div className={speech.options}>
              <div className={speech.option} onClick={copyToClipboard}>
                <FontAwesomeIcon
                  icon={faCopy}
                  color="#fff"
                  style={{ fontSize: "1.5rem" }}
                />
              </div>
              <div className={speech.option} onClick={resetmic}>
                <FontAwesomeIcon
                  icon={faRepeat}
                  color="#fff"
                  style={{ fontSize: "1.5rem" }}
                />
              </div>
              <div className={speech.option} onClick={sendMessage}>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  color="#fff"
                  style={{ fontSize: "1.5rem" }}
                />
              </div>
              {videoUrl && !isRecording && (
                <a
                  href={videoUrl}
                  download={`recording-${new Date().toISOString()}.webm`}
                  className={speech.option}
                  style={{ textDecoration: "none" }}
                >
                  <FontAwesomeIcon
                    icon={faDownload}
                    color="#fff"
                    style={{ fontSize: "1.5rem" }}
                  />
                </a>
              )}
            </div>
            {send ? (
              <div className={speech.reply}>
                <div
                  className={speech.icons}
                  style={{ overflow: "hidden", backgroundColor: "#427dca" }}
                >
                  <Image src={robo} alt="robot" width={30} height={30} />
                </div>
                {loading ? <Loading /> : <div className={speech.text2}>
                  <Markdown>{feedback}</Markdown>
                </div>}
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>

      <div className={speech.footer}>
        <div className={speech.mic}>
          <FontAwesomeIcon
            icon={faCircle}
            size={isRecording ? "2x" : "3x"}
            color="#fff"
            onClick={() => { if (iscamera) setIsRecording(!isRecording) }}
          />
        </div>
        <div className={speech.mic} style={{ marginLeft: "1rem" }}>
          <FontAwesomeIcon
            icon={iscamera ? faVideo : faVideoSlash}
            size="2x"
            color="#fff"
            onClick={() => {
              if (!isRecording) setIsCamera(!iscamera);
            }}
          />
        </div>
      </div>
    </div>
  );
}
