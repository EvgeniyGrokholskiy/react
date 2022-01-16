import {connect} from "react-redux";
import ChatContent from "./chatContent";
import {getActiveChanNameState, getChatMessageArrayState} from "../../../../redux/selectors";


const mapStateToProps = (state) => {

    return {
        chatMessage: getChatMessageArrayState(state),
        chatName: getActiveChanNameState(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};


const ChatContentContainer = connect(mapStateToProps, mapDispatchToProps)(ChatContent)

export default ChatContentContainer;