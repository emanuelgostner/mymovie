import React from "react";
import "./Header.css";
import Slider from "./Slider.js";

const Header = ({userState, logoutUser, toggleDarkmode, changeUsername})=>{
    return(
        <header id={"header"}>
            <a href={"/app"}>
                <div className="logo">
                    <div className="a">my</div>
                    <div className="b">Movie</div>
                </div>
            </a>
            <div className={"headerRightWrapper"}>
                <Slider triggerFunction={toggleDarkmode}/>
                <div className={"userStatus"}>
                    {userState != null
                        ?
                        <div>
                            <span className={"username"}>Welcome back, <span className={"userName"} onClick={changeUsername}>{userState.username}</span> <span className={"emoji"}>😉</span></span>
                            <span onClick={logoutUser}><span className={"headerButton"}>Logout</span></span>
                        </div>
                        :
                        <div>
                            <a href={"/login"}><span className={"headerButton"}>Login</span></a>
                            <a href={"/register"} ><span className={"headerButton"}>Register</span></a>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;