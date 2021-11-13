import React from "react";
import style from "./chatSideBar.module.css";
import "./chatSidebar.css";
import {ChatHeader} from "./chatHeader/chatHeader";
import {NavLink} from "react-router-dom";

export const ChatSideBar = (props) => {

    let chatsToRender = props.chat.map((chat) => {
        return (
            <NavLink key={chat.id} className={`${style.link} chatLink`} to={`/chat/${chat.id}`}>
                <ChatHeader name={`${chat.name}`} lastMessage={`${chat.lastMessage}`}/>
            </NavLink>
        );
    })

    return (
        <div className={style.wrapper}>
            <p className={style.header}>CHATS</p>

            {chatsToRender}

        </div>
    )
}