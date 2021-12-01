import React from "react";
import style from "./profileData.module.css";
import photo from "./img/userUnknown.png";
import profileData_top_image from "./img/profile_top_images.jpg";
import Loading from "../../../loading/loading";


class ProfileData extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        editFlag: false,
        status: "test"
    }

    editStatus = () => {
        this.setState({
            editFlag: true
        })
    }

    setStatus = (event) => {
        this.props.setProfileStatus(event.currentTarget.value);
        this.setState({
            editFlag: false
        })
    }

    changeStatus= (event) => {
        this.props.editProfileStatus(event.currentTarget.value)
    }

    render() {

        if (!this.props.state.profile) {

            return (
                <div className={style.wrapper}>
                    <img src={profileData_top_image} alt="" height={180} width={850}/>
                    <div className={style.card}>
                        <Loading />
                    </div>
                </div>
            )
        }

        return (
            <div className={style.wrapper}>
                <img src={profileData_top_image} alt="" height={180} width={850}/>
                <div className={style.card}>
                    <img className={style.image} src={this.props.state.profile.photos.large ? this.props.state.profile.photos.large : photo } alt=""/>
                    {
                        !this.state.editFlag &&
                            <span className={style.status} onDoubleClick={this.editStatus}>{this.props.state.profileStatus}</span>
                    }
                    {
                        this.state.editFlag &&
                            <input className={style.status} autoFocus={true} onBlur={this.setStatus} onChange={this.changeStatus} value={this.props.state.profileStatus} />
                    }

                    <p className={`${style.data} ${style.data_name}`}>
                        {this.props.state.profile.fullName}
                    </p>
                    <p className={`${style.data} ${style.aboutMe}`}>
                        About me: {this.props.state.profile.aboutMe}
                    </p>
                    <p className={`${style.data} ${style.data_city}`}>
                        LookingForAJob: {this.props.state.profile.lookingForAJob ?"Yes" : "Have a job."}
                    </p>
                    <p className={`${style.data} ${style.data_education}`}>
                        Job description: {this.props.state.profile.lookingForAJobDescription}
                    </p>
                    <p className={`${style.data} ${style.data_site}`}>
                        <span className={style.data}> Facebook: {this.props.state.profile.contacts.facebook}; </span>
                        <span className={style.data}> GitHub: {this.props.state.profile.contacts.github}; </span>
                        <span className={style.data}> Instagram: {this.props.state.profile.contacts.instagram}; </span>
                        <span className={style.data}> MainLink: {this.props.state.profile.contacts.mainLink}; </span>
                        <span className={style.data}> Twitter: {this.props.state.profile.contacts.twitter}; </span>
                        <span className={style.data}> Vk: {this.props.state.profile.contacts.vk}; </span>
                        <span className={style.data}> Website: {this.props.state.profile.contacts.facebook}; </span>
                    </p>
                </div>
            </div>
        )
    }
}



/*
const ProfileData = (props) => {

    if (!props.state.profile) {

        return (
            <div className={style.wrapper}>
                <img src={profileData_top_image} alt="" height={180} width={850}/>
                <div className={style.card}>
                    <Loading />
                </div>
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <img src={profileData_top_image} alt="" height={180} width={850}/>
            <div className={style.card}>
                <img className={style.image} src={props.state.profile.photos.large ? props.state.profile.photos.large : photo } alt=""/>
                <p className={`${style.data} ${style.data_name}`}>
                    {props.state.profile.fullName}
                </p>
                <p className={`${style.data} ${style.aboutMe}`}>
                    About me: {props.state.profile.aboutMe}
                </p>
                <p className={`${style.data} ${style.data_city}`}>
                    LookingForAJob: {props.state.profile.lookingForAJob ?"Yes" : "Have a job."}
                </p>
                <p className={`${style.data} ${style.data_education}`}>
                    Job description: {props.state.profile.lookingForAJobDescription}
                </p>
                <p className={`${style.data} ${style.data_site}`}>
                    <span className={style.data}> Facebook: {props.state.profile.contacts.facebook}; </span>
                    <span className={style.data}> GitHub: {props.state.profile.contacts.github}; </span>
                    <span className={style.data}> Instagram: {props.state.profile.contacts.instagram}; </span>
                    <span className={style.data}> MainLink: {props.state.profile.contacts.mainLink}; </span>
                    <span className={style.data}> Twitter: {props.state.profile.contacts.twitter}; </span>
                    <span className={style.data}> Vk: {props.state.profile.contacts.vk}; </span>
                    <span className={style.data}> Website: {props.state.profile.contacts.facebook}; </span>
                </p>
            </div>
        </div>
    );
};
*/

export default ProfileData;