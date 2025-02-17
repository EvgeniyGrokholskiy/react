import React, {ChangeEvent} from "react"
import style from "./footer.module.css"
import {NavLink} from "react-router-dom"
import {IFooterProps} from "../../../types/types"
import {ReactComponent as Logo} from "./img/Logo.svg"
import {ReactComponent as Text} from "./img/LinkedIn.svg"
import {ReactComponent as Settings} from "./img/settings.svg"
import {ReactComponent as Question} from "./img/help-circle.svg"


const Footer: React.FC<IFooterProps> = ({languages, changeLanguages}) => {

    const setLanguages = (event: ChangeEvent<HTMLSelectElement>) => {
        changeLanguages(event.target.value)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.logoBlock}>
                <Logo className={style.logo}/>
                <Text className={style.logoText}/>
            </div>
            <div className={style.navigation}>
                <h4 className={style.header}>Navigation</h4>
                <nav>
                    <ul className={style.navList}>
                        <li><NavLink className={style.list_item} to="/users">Find Users</NavLink></li>
                        <li><NavLink className={style.list_item} to="/profile/">Profile</NavLink></li>
                        <li><NavLink className={style.list_item} to="/chat">Messages</NavLink></li>
                        <li><NavLink className={style.list_item} to="/news">News</NavLink></li>
                        <li><NavLink className={style.list_item} to="/music">Music</NavLink></li>
                        <li><NavLink className={style.list_item} to="/settings">Settings</NavLink></li>
                    </ul>
                </nav>
            </div>
            <div className={style.solution}>
                <nav>
                    <ul className={style.navList}>
                        <li><NavLink className={style.list_item} to="//">Talent Solutions</NavLink></li>
                        <li><NavLink className={style.list_item} to="//">Marketing Solutions</NavLink></li>
                        <li><NavLink className={style.list_item} to="//">Sales Solutions</NavLink></li>
                        <li><NavLink className={style.list_item} to="//">Safety Center</NavLink></li>
                    </ul>
                </nav>
            </div>
            <div className={style.utils}>
                <nav>
                    <ul className={style.navList}>
                        <li><NavLink className={style.list_item} to="//">Community Guidelines</NavLink></li>
                        <li><NavLink className={style.list_item} to="//">Privacy & Terms</NavLink></li>
                        <li><NavLink className={style.list_item} to="//">Mobile App</NavLink></li>
                    </ul>
                </nav>
            </div>
            <div className={style.buttons}>
                <h4 className={style.header}>Fast access</h4>
                <nav>
                    <ul className={style.navList}>
                        <li><NavLink className={`${style.list_item} , ${style.button}`}
                                     to="//">QUESTIONS?<Question/></NavLink></li>
                        <li><NavLink className={`${style.list_item} , ${style.button} ${style.whiteButton}`} to="//">SETTINGS<Settings/></NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={style.languages}>
                <h4 className={style.header}>Languages:{(languages === "English") ? " english" : " русский"}</h4>
                <select value={languages} className={style.select} onChange={setLanguages}>
                    <option value={"English"}>English</option>
                    <option value={"Русский"}>Русский</option>
                </select>
            </div>
        </div>
    )
}


export default Footer