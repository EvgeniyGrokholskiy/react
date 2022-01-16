import React from "react";
import Photo from "./img/photo.png"
import style from "./incomingMessage.module.css";


const IncomingMessage = ({data,message}) => {

    return (
        <div className={style.container}>
            <span className={style.messageText}>{message}</span>
            <span className={style.data}>{data}</span>
            <img className={style.photo} src={Photo} alt="" height={46} width={46}/>
        </div>
    )
};

export default IncomingMessage;