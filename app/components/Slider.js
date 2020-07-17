import React from "react";
import "./Slider.css";

const Slider = ({triggerFunction})=> {
    return (
        <label className="switch">
            <input type="checkbox" onChange={triggerFunction} defaultChecked={localStorage.getItem("themeDarkmode") == "true"} />
            <span className="slider round"></span>
        </label>
    )
}

export default Slider;