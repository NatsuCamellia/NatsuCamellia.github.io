import React from 'react'
import {Link} from "react-router-dom";
import "./Header.css"

function Header() {
    return (
        <header>
            <h1>NatsuCamellia</h1>
            <div className="link">
                <Link to="/">← Home</Link>
            </div>
            <p className="motto">I'm a slow walker, but I never walk backwards.</p>
        </header>
    );
}

export default Header;