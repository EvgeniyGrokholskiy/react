import {authThunkCreator} from "./authReducer";
import {AnyAction} from "redux";
import {Dispatch} from "../types/types";

const INIT_APP: "MY_APP/APP/INIT_APP" = "MY_APP/APP/INIT_APP";

export type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

export const appReducer = (state = initialState, action: AnyAction):InitialStateType => {

    switch (action.type) {

        case INIT_APP: {

            return {
                ...state,
                initialized: true
            }
        }

        default:
            return state
    }
}

export const initializeApp = () => {
    return (dispatch: Dispatch) => {
        let promise = dispatch(authThunkCreator())
        promise.then(
            dispatch(initApp())
        )
    }
}

type actionType =  { type: typeof INIT_APP }

const initApp = (): actionType => {
    return {
        type: INIT_APP,
    }
}