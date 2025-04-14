"use client";

import side from "./side.module.css";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeMed,
  faClipboardQuestion,
  faBriefcase,
  faUserGroup,
  faHeadSideCough,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

export default function Side({show}) {
  
  const [active, setActive] = useState(0);
  const sidebar=useRef(null);
  const router = useRouter();
  const width=window.innerWidth;

  const handleKey = (e) => {
    if (e.key == "ArrowDown" && active < 4) {
      setActive((prev) => prev + 1);
    }
    if (e.key == "ArrowUp" && active > 0) {
      setActive((prev) => prev - 1);
    }
  };

  useEffect(() => {
    switch (active) {
      case 0:
        router.push("/dashboard");
        break;
      case 1:
        router.push("/dashboard/questionnaire");
        break;
      case 2:
        router.push("/dashboard/resources");
        break;
      case 3:
        router.push("/dashboard/community");
        break;
      case 4:
        router.push("/dashboard/speech-practice");
        break;
    }
  }, [active]);

  useEffect(()=>{
    if(show){
      sidebar.current.style.display="flex";
    }
    if(!show && width<500){
      sidebar.current.style.display="none";
    }
  },[show])

  
  

  return (
    <div
      className={side.main}
      tabIndex={0}
      ref={sidebar}
      onKeyDown={(e) => {
        handleKey(e);
      }}
    >
      <div className={side.head}>
        <h1>Verba</h1>
        
      </div>
      <div className={side.options}>
        <ul
          className={side.feature}
          id={active === 0 ? side.active : ""}
          onClick={() => setActive(0)}
        >
          <FontAwesomeIcon
            icon={faGaugeMed}
            style={{ marginRight: "5%", marginLeft: "7.5%" }}
          />
          <p>Dashboard</p>
        </ul>
        <ul
          className={side.feature}
          id={active === 1 ? side.active : ""}
          onClick={() => setActive(1)}
        >
          <FontAwesomeIcon
            icon={faClipboardQuestion}
            style={{ marginRight: "5%", marginLeft: "7.5%" }}
          />
          <p>Questionnaire</p>
        </ul>
        <ul
          className={side.feature}
          id={active === 2 ? side.active : ""}
          onClick={() => setActive(2)}
        >
          <FontAwesomeIcon
            icon={faBriefcase}
            style={{ marginRight: "5%", marginLeft: "7.5%" }}
          />
          <p>Resources</p>
        </ul>
        <ul
          className={side.feature}
          id={active === 3 ? side.active : ""}
          onClick={() => setActive(3)}
        >
          <FontAwesomeIcon
            icon={faUserGroup}
            style={{ marginRight: "5%", marginLeft: "7.5%" }}
          />
          <p>Community</p>
        </ul>
        <ul
          className={side.feature}
          id={active === 4 ? side.active : ""}
          onClick={() => setActive(4)}
        >
          <FontAwesomeIcon
            icon={faHeadSideCough}
            style={{ marginRight: "5%", marginLeft: "7.5%" }}
          />
          <p>Speech practice</p>
        </ul>
      </div>
      <div className={side.buttons}>
        <button onClick={()=>{signOut("google",redirect("/"))}}>Sign Out</button>
      </div>
    </div>
  );
}
