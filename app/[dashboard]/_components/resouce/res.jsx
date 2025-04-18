"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import res from "./res.module.css";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Res(){
    const [width, setWidth] = useState(null);
    
      useEffect(() => {
        setWidth(window.innerWidth);
      }, []);

    return(
        <div className={res.main}>
            <div className={res.first}>
            <div className={res.icon}>
                <FontAwesomeIcon icon={faVideo} size={width>500?"2x":"1x"} color="#fff"/>
            </div>
            </div>
           
            <div className={res.content}>
                <h3>Your resource</h3>
            </div>
        </div>
    )
}