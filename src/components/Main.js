import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Article from "./Article/Article";

export default function Main () {
    return (
        <div>
            <Header />
            <hr />
            <div class="main-wrapper">
                <Article />
            </div>
            <hr />
            <Footer />
        </div>
    )
}