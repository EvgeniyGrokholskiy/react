import './App.css';
import {Header} from "./components/header/Header";
import {Profile} from "./components/profile/Profile";
import {Chat} from "./components/chat/chat";
import {News} from "./components/news/news";
import {Music} from "./components/music/music";
import {Settings} from "./components/settings/settings";
import {Route, Routes} from "react-router-dom";
import {sendMessage} from "./redux/state";


function App(props) {

    return (
        <div className="App">
            <Header/>
            <main>
                <Routes>
                    <Route path="/profile/*" element={<Profile state={props.state} addPost={props.addPost}/>}/>
                    <Route path="/chat/*" element={<Chat state={props.state.chatPage} sendMessage={props.sendMessage}/>}/>
                    <Route path="/news/*" element={<News/>}/>
                    <Route path="/music/*" element={<Music/>}/>
                    <Route path="/settings/*" element={<Settings/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;
