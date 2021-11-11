import React from "react";
import style from "./header.module.css";

import {ReactComponent as User} from "./img/User.svg";
import {ReactComponent as Logo} from "./img/Logo.svg";
import {ReactComponent as Messages} from "./img/Message-square.svg";
import {ReactComponent as News} from "./img/News.svg";
import {ReactComponent as Music} from "./img/Music.svg";
import {ReactComponent as Settings} from "./img/Settings.svg";
import {NavLink} from "react-router-dom";


export const Header = (props) => {
    return (
        <header className={style.header}>
            <>
                <div className={style.wrapper}>
                    <Logo />
                </div>
                <nav>
                    <ul className={style.nav}>
                        <li><NavLink className={(navData) => navData.isActive ? `${style.list_item} ${style.selected}`: `${style.list_item}`} activeClassName={style.selected} to = "/">Profile <User /></NavLink></li>
                        <li><NavLink className={(navData) => navData.isActive ? `${style.list_item} ${style.selected}`: `${style.list_item}`} activeClassName={style.selected} to = "/chat">Messages <Messages /></NavLink></li>
                        <li><NavLink className={(navData) => navData.isActive ? `${style.list_item} ${style.selected}`: `${style.list_item}`} activeClassName={style.selected} to = "/news">News <News /></NavLink></li>
                        <li><NavLink className={(navData) => navData.isActive ? `${style.list_item} ${style.selected}`: `${style.list_item}`} activeClassName={style.selected} to = "/music">Music <Music /></NavLink></li>
                        <li><NavLink className={(navData) => navData.isActive ? `${style.list_item} ${style.selected}`: `${style.list_item}`} activeClassName={style.selected} to = "/settings">Settings <Settings /></NavLink></li>
                    </ul>
                </nav>
                <>
                    <input className={style.search} type="text" placeholder={"Search"}/>
                </>
            </>
        </header>
    )
}