import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../../articles/Home/Home";
import A20220909 from "../../articles/20220909";
import A20220910 from "../../articles/20220910";
import A20220912 from "../../articles/20220912";
import A20220915 from "../../articles/20220915";
import A20220917 from "../../articles/20220917";
import A20220918 from "../../articles/20220918";
import A20220919 from "../../articles/20220919";
import A20220923 from "../../articles/20220923";
import A20220926 from "../../articles/20220926";
import A20220928 from "../../articles/20220928";
import A20220930 from "../../articles/20220930";
import A20221008 from "../../articles/20221008";

export default function Article() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/articles/20220909" element={<A20220909 />}/>
            <Route path="/articles/20220910" element={<A20220910 />}/>
            <Route path="/articles/20220912" element={<A20220912 />}/>
            <Route path="/articles/20220915" element={<A20220915 />}/>
            <Route path="/articles/20220917" element={<A20220917 />}/>
            <Route path="/articles/20220918" element={<A20220918 />}/>
            <Route path="/articles/20220919" element={<A20220919 />}/>
            <Route path="/articles/20220923" element={<A20220923 />}/>
            <Route path="/articles/20220926" element={<A20220926 />}/>
            <Route path="/articles/20220928" element={<A20220928 />}/>
            <Route path="/articles/20220930" element={<A20220930 />}/>
            <Route path="/articles/20221008" element={<A20221008 />}/>
        </Routes>
    );
}