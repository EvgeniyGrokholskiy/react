const addMessageOnWall = "ADD_MESSAGE_ON_WALL";
const changeNewMessageOnWall = "CHANGE_NEW_MESSAGE_ON_WALL";

const initialState = {
    newMessage: "",
    wallMessageArray: [
        {
            message: "How’s your day going, guys?",
            likeCount: 10,
            id: 1
        },
        {
            message: "What did the Dursleys care if Harry lost his place on the House Quidditch team because he hadn’t practiced all summer?",
            likeCount: 20,
            id: 2
        }

    ],
    profileData: [
        {
            firstName: "Evgeniy",
            secondName: "Grokholskiy",
            birthDate: "21.05.1979",
            city: "Chelyabinsk",
            education: "College",
            webSite: "www",
        }
    ],
};

export const profileReducer = (state = initialState, action) => {

    const isEmptyMessage = (message) => (message === '' || message === undefined);

    switch (action.type) {

        case changeNewMessageOnWall: {

            return {
                ...state,
                newMessage: action.message
            };

        }

        case addMessageOnWall: {

            if (isEmptyMessage(state.newMessage)) return state;

            let id = state.wallMessageArray.length + 1;
            let messageObj = {
                message: state.newMessage,
                likeCount: 0,
                id: id,
            };

            return {
                ...state,
                wallMessageArray: [...state.wallMessageArray, messageObj],
                newMessage: ''
            };
        }

        default:
            return state;

    }
};

export const addMessageOnWallActionCreator = () => {
    return {
        type: addMessageOnWall,
    };
}

export const changeNewMessageOnWallActionCreator = (message) => {
    return {
        type: changeNewMessageOnWall,
        message: message,
    }
}