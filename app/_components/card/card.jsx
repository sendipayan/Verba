"use client"
import card from "./card.module.css"
import Image from "next/image";

export default function Card({tittle,para,image,ht,wt}){
    const width=window.innerWidth;
    return(<div className={card.main}>
        <div className={card.image}>
            <Image src={image} alt="img" height={width>500?ht:87} width={width>500?wt:250}/>
        </div>
        <div className={card.content}>
            <div className={card.head}>
                <h5>{tittle}</h5>
            </div>
            <div className={card.para}>
                <p>{para}</p>
            </div>
        </div>
    </div>);
}