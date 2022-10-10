import React from "react";
import {Link} from "react-router-dom";

export default function ArticleList() {
    return (
        <div>
            <h2>札記</h2>
            <ul>
                <li><Link to="/articles/20220909">2022/09/09 誠品書店</Link></li>
                <li><Link to="/articles/20220910">2022/09/10 大安森林公園、光華三創</Link></li>
                <li><Link to="/articles/20220912">2022/09/12 被遺忘的課程</Link></li>
                <li><Link to="/articles/20220915">2022/09/15 校園阿伯奇遇記</Link></li>
                <li><Link to="/articles/20220917">2022/09/17 從現代到古典，吉他社</Link></li>
                <li><Link to="/articles/20220918">2022/09/18 安利美特</Link></li>
                <li><Link to="/articles/20220919">2022/09/19 計程破台、回家！</Link></li>
                <li><Link to="/articles/20220923">2022/09/23 重整旗鼓、社團迎新</Link></li>
                <li><Link to="/articles/20220926">2022/09/26 微積分小考</Link></li>
                <li><Link to="/articles/20220928">2022/09/28 愛現大會</Link></li>
                <li><Link to="/articles/20220930">2022/09/30 課輔志工行前訓練</Link></li>
                <li><Link to="/articles/20221008">2022/10/08 國慶同學會</Link></li>
            </ul>
        </div>
    );
}