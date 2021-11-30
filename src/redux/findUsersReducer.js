import {followUnfollowAPI, usersAPI} from "../api/api";

const ToFollow = "TO_FOLLOW";
const ToUnfollow = "TO_UNFOLLOW";
const SetUsers = "SET_USERS";
const ShowPage = "SHOW_PAGE";
const SetTotalUsersCount = "SET_TOTAL_USER_COUNT";
const SetLoader = "SET_LOADER";
const FollowingInProgress = "FOLLOWING_IN_PROGRESS";

const initialState = {

    findUsers: [
        /*{
            id: 1,
            photoURL: "",
            followed: false,
            fullName: "Dmitry",
            status: "Hi",
            location: {city: "Minsk", country: "Belarus"}
        },
        {
            id: 2,
            photoURL: "",
            followed: true,
            fullName: "Dmitry2",
            status: "Hi2",
            location: {city: "Minsk2", country: "Belarus"}
        },
        {
            id: 3,
            photoURL: "",
            followed: false,
            fullName: "Dmitry3",
            status: "Hi3",
            location: {city: "Minsk3", country: "Belarus"}
        },
        {
            id: 4,
            photoURL: "",
            followed: true,
            fullName: "Dmitry4",
            status: "Hi4",
            location: {city: "Minsk4", country: "Belarus"}
        },
        {
            id: 5,
            photoURL: "",
            followed: false,
            fullName: "Dmitry5",
            status: "Hi5",
            location: {city: "Minsk5", country: "Belarus"}
        },*/
    ],
    currentPage: 1,
    totalUsers: 100,
    usersOnPage: 5,
    isFetching: true,
    isFollowingInProgress: []
};

export const findUsersReducer = (state = initialState, action) => {

    switch (action.type) {

        case ToFollow: {
            return {
                ...state,
                findUsers: state.findUsers.map((user) => {
                    if (user.id === action.id) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        }

        case ToUnfollow: {
            return {
                ...state,
                findUsers: state.findUsers.map((user) => {
                    if (user.id === action.id) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        }

        case SetUsers: {
            return {
                ...state,
                findUsers: [...action.users],
                currentPage: action.page
            }
        }

        case ShowPage: {
            return {
                ...state,
                currentPage: action.selectedPage
            }
        }

        case SetTotalUsersCount: {
            return {
                ...state,
                totalUsers: action.totalUsers
            }
        }

        case SetLoader: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case FollowingInProgress: {
            return {
                ...state,
                isFollowingInProgress: action.isInProgress
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
};


export const getUsersThunkCreator = (currentPage, usersOnPage) => {
    return (dispatch) => {
        dispatch(setLoader(true));
        usersAPI.getUsers(currentPage, usersOnPage)
            .then((data) => {
                    dispatch(setUsers(data.items, currentPage));
                    dispatch(setTotalUsersCount(data.totalCount))
                    dispatch(setLoader(false))
                }
            )
            .catch((error) => {
                console.log(error);
            })
    }
}

export const toUnfollowThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgress(true, userId));
        followUnfollowAPI.unFollow(userId).then((data) => {

            if (data.resultCode === 0) {
                dispatch(toUnfollow(userId))
            }
            dispatch(followingInProgress(false, userId))
        })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const toFollowThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgress(true, userId));
        followUnfollowAPI.follow(userId).then((data) => {

            if (data.resultCode === 0) {
                dispatch(toFollow(userId));
            }
            dispatch(followingInProgress(false, userId));

        })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const toFollow = (userID) => {
    return {
        type: ToFollow,
        id: userID
    };
}

export const toUnfollow = (userID) => {
    return {
        type: ToUnfollow,
        id: userID
    };
}

export const setUsers = (users, page = 1) => {
    return {
        type: SetUsers,
        users: users,
        page: page
    };
}

export const showPage = (selectedPage) => {
    return {
        type: ShowPage,
        selectedPage: selectedPage
    };
}

export const setTotalUsersCount = (totalUsers) => {
    return {
        type: SetTotalUsersCount,
        totalUsers: totalUsers
    };
}

export const setLoader = (isFetching) => {
    return {
        type: SetLoader,
        isFetching: isFetching
    };
}

export const followingInProgress = (isInProgress, userId) => {
    return {
        type: FollowingInProgress,
        isInProgress,
        userId
    }
}