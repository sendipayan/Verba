import prof from "./prof.module.css";
import Image from "next/image";

export default function Profile({photo}) {
  return (<div className={prof.main}>
            <div className={prof.head}>
                <h1>Profile</h1>
            </div>
            <div className={prof.photo}>
                    <Image src={photo} alt="profile" height={100} width={100} style={{borderRadius:"50%"}}/>
                </div>
        </div>);
}
