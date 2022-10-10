import React from "react";
import ArticleList from "./ArticleList";
import About from "./About";

export default function Home() {
    return (
        <article>
            <ArticleList />
            <About />
        </article>
    );
}