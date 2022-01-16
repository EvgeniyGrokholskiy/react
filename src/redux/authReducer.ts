import {AnyAction} from "redux";
import {authAPI} from "../api/api";
import {Dispatch} from "../types/types";
import {setProfileStatus} from "./profileReducer";


const LOGIN = "MY_APP_/AUTH/LOGIN";
const LOGOUT = "MY_APP_/AUTH/LOGOUT";
const SET_USER_DATA = "MY_APP_/AUTH/SET_USER_DATA";
const SET_ERROR_MESSAGE = "MY_APP_/AUTH/SET_ERROR_MESSAGE";
const GET_CAPTCHA_SUCCESS = "MY_APP_/AUTH/GET_CAPTCHA_SUCCESS";
const ENTERED_RIGHT_CAPTCHA = "MY-APP/AUTH/ENTERED_RIGHT_CAPTCHA"

export type InitialStateType = {
    id: null | number,
    login: null | string,
    email: null | string,
    isAuth: boolean,
    isError: boolean,
    errorMessage: string,
    captcha: null | string,

}

const initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    isError: false,
    errorMessage: "",
    captcha: null,
}

interface LoginData {
    email: string
    password: string
    rememberMe: string
}

export const authReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }

        case LOGIN: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }

        case LOGOUT: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }

        case SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.errorMessage,
                isError: action.isError
            }
        }

        case GET_CAPTCHA_SUCCESS: {
            return {
                ...state,
                captcha: action.captcha,
                errorMessage: action.errorMessage,
            }
        }

        case ENTERED_RIGHT_CAPTCHA: {
            return {
                ...state,
                captcha: action.captcha,
                isError: action.isError
            }
        }

        default: {
            return state;
        }
    }
}


export const authThunkCreator = () => async (dispatch: Dispatch) => {
    let {id, email, login} = await authAPI.authMe()
    if (id !== undefined) {
        sessionStorage.setItem('isAuth', "true");
        dispatch(setUserData(id, login, email, true));
    }
}

export const loginThunkCreator = (loginData: LoginData) => async (dispatch: Dispatch) => {
    let responseData = await authAPI.login(loginData)
    if (responseData.resultCode === 0) {
        dispatch(authThunkCreator());
        dispatch(enteredRightCaptcha());
    } else {
        if (responseData.resultCode === 10) {
            let captchaURL = await authAPI.getCaptcha();
            dispatch(setCaptchaUrl(captchaURL))

        }
        dispatch(setUserData(null, null, null, false));
        dispatch(setErrorMessage(responseData.messages[0]))
    }
}

export const getNewCaptcha = () => async (dispatch: Dispatch) => {
    let newCaptchaURL = await authAPI.getCaptcha();
    dispatch(setCaptchaUrl(newCaptchaURL))
}

export const logoutThunkCreator = () => async (dispatch: Dispatch) => {
    await authAPI.logout();
    sessionStorage.setItem('isAuth', "");
    dispatch(setUserData(null, null, null, false));
    dispatch(setProfileStatus(""));
}

type SetUserDataActionPayloadType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}

type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetUserDataActionPayloadType,
}

export const setUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataActionType => {
    return {
        type: SET_USER_DATA,
        payload: {
            id,
            login,
            email,
            isAuth
        }
    }
}

type LoginType = {
    type: typeof LOGIN,
    isAuth: boolean,
    id: number
}

export const login = (userId: number): LoginType => {
    return {
        type: LOGIN,
        isAuth: true,
        id: userId
    }
}

type LogoutType = {
    type: typeof LOGOUT,
    isAuth: boolean
}

export const logout = (): LogoutType => {
    return {
        type: LOGOUT,
        isAuth: false
    }
}

type SetErrorMessageType = {
    type: typeof SET_ERROR_MESSAGE,
    errorMessage: string,
    isError: boolean
}

export const setErrorMessage = (errorMessage: string): SetErrorMessageType => {
    return {
        type: SET_ERROR_MESSAGE,
        errorMessage,
        isError: true
    }
}

type SetCaptchaUTLType = {
    type: typeof GET_CAPTCHA_SUCCESS,
    captcha: string,
    isError: boolean
}

export const setCaptchaUrl = (captcha: string): SetCaptchaUTLType => {
    return {
        type: GET_CAPTCHA_SUCCESS,
        captcha,
        isError: true
    }
}

type EnteredRightCaptchaType = {
    type: typeof ENTERED_RIGHT_CAPTCHA,
    captcha: string,
    isError: boolean
}

export const enteredRightCaptcha = (): EnteredRightCaptchaType => {
    return {
        type: ENTERED_RIGHT_CAPTCHA,
        captcha: "",
        isError: false
    }
}