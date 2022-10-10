import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from "./components/Main";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
    document.getElementById('main')
)
