import React from 'react'
import ReactDom from 'react-dom'
import "@core/base.scss";
import LeInput from "./demo/inputDemo.js";
import LeButton from "./demo/buttonDemo.js";

ReactDom.render(
    <div>
        <LeInput />
        <LeButton />
    </div>,
    document.getElementById("app")
);