"use client"; // Required for App Router

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import dash from "./dash.module.css"
import Nav from "./navbar/nav.jsx";
import Loading from "./loading.jsx";
import Side from "./sidebar/side.jsx";
import { useEffect, useState } from "react";



export default function DashboardLayout({children}) {
  const { data: session, status } = useSession();
  const [show,setShow]=useState(0)
 
    
  if(status==="loading")  return(<Loading/>);
  
  return(<div className={dash.main}>
      <Nav name={session.user.name} show={show} setShow={setShow} />
      <Side show={show} setShow={setShow}/>
      <div className={dash.content} onClick={()=>setShow(0)} style={show?{filter:"blur(10px)"}:{}}>
        {children}
      </div>
  </div>);
}