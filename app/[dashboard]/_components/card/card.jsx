import card from "./card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook,faBookOpen,faHeadSideCough,faUserGroup } from "@fortawesome/free-solid-svg-icons";

export default function Card({color,lightcolor,heading,number,icon}){

    return(<div className={card.main} style={{backgroundColor:lightcolor}}>
            <div className={card.head}>
                <div className={card.icon} style={{backgroundColor:color}}>
                    <FontAwesomeIcon icon={icon} style={{color:"white"}}/>
                </div>
                <div className={card.heading}>
                    <p>{heading}</p>
                </div>
            </div>
            <div className={card.body}>
                    <h4>{number}</h4>
            </div>
            <div className={card.underline}>
                    <div className={card.line} style={{backgroundColor:color}}></div>
            </div>
    </div>)
}