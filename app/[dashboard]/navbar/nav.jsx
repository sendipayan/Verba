"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import nav from "./nav.module.css"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";

export default function Nav({name,show,setShow}){
    
    const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
    

    return(<div className={nav.main} style={show?{filter:"blur(10px)"}:{}}>
        {width<500?<div className={nav.logo}>
                <FontAwesomeIcon icon={faBars} onClick={()=>{if(width<500)setShow(1)}} color="#427dca"/>
                <h1>Verba</h1>
        </div>:<></>}
            <div className={nav.details}>
                    <div className={nav.part} id="part1" >
                        <h4>Hello, {name} </h4>
                    </div>
                    <div className={nav.part} id="part2" >
                        <p>Let's upgrade your speaking skills</p>
                    </div>
            </div>
            <div className={nav.search}>
                    <input type="text" placeholder="Search..."/>
            </div>
            
    </div>)
}