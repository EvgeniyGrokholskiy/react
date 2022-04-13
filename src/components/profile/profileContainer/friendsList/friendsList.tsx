import React from "react"
import style from "./friendsList.module.css"
import FriendCard from "./friendCard/friendCard"
import {IFriendsListProps} from "../../../../types/types"
import {IFriendsArrayItem} from "../../../../redux/friendsListReducer"


const FriendsList: React.FC<IFriendsListProps> = ({friends}) => {

    const friendsListToRender = friends.map((friend: IFriendsArrayItem) => {
        return <FriendCard key={friend.id} name={friend.name} job={friend.job}/>;
    })

    return (
        <div className={style.container}>
            <div className={style.header}>
                <span className={style.headerText}>FRIENDS</span>
                <span className={style.headerLink}>VIEW ALL</span>
            </div>
            <div className={style.friendsList}>
                {friendsListToRender}
            </div>
        </div>
    );
}

export default FriendsList;