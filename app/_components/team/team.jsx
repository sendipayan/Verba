import team from "./team.module.css"

export default function Team({name,desc,img,ht,wt}){

    return(<div className={team.main}>
        <div className={team.image}>

        </div>
        <div className={team.desc}>
            <div className={team.head}>
                    <h2 style={{color:"#274c77"}}>{name}</h2>
            </div>
            <div className={team.para}>
                <h4 >{desc}</h4>
            </div>
        </div>
    </div>)
}