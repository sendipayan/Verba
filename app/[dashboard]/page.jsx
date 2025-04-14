"use client";
import dash from "./dash.module.css";
import Card from "./_components/card/card";
import {
  faBook,
  faBookOpen,
  faHeadSideCough,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import SpeechAnalysisChart from "../_components/graphs/barchart";
import UserEngagementChart from "../_components/graphs/piechart";

export default function Dashboard() {
  const width=window.innerWidth;
  return (
    <div className={dash.maincontent}>
      <div className={dash.head}>
        <div className={dash.heading}>
          <h1>Overview</h1>
        </div>
      </div>
      <div className={dash.cards}>
        <Card
          color={"#EC6869"}
          lightcolor={"#ec686895"}
          heading={"Course Completed"}
          number={12}
          icon={faBook}
        />
        <Card
          color={"#1DBFC6"}
          lightcolor={"#1dc0c67c"}
          heading={"Course Ongoing"}
          number={2}
          icon={faBookOpen}
        />
        
        <Card
          color={"#F9D50A"}
          lightcolor={"#f9d50a5a"}
          heading={"Speeches Practiced"}
          number={21}
          icon={faHeadSideCough}
        />
        <Card
          color={"#3f44ca"}
          lightcolor={"#3f44ca7c"}
          heading={"Community joined"}
          number={5}
          icon={faUserGroup}
        />
      </div>
      <div className={dash.charts}>
        <div className={dash.chart} id={dash.show} >
          <SpeechAnalysisChart />
        </div>
        <div className={dash.chart} id={dash.not} >
          <UserEngagementChart />
        </div>
      </div>
      <div className={dash.footer}>
            <h2>"Confidence in speaking comes not from perfection, but from the courage to share your voice."</h2>
      </div>
    </div>
  );
}
