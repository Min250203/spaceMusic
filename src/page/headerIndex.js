import React, { useState, useEffect } from 'react';
// import '../../styleMusic/styleMusic.css';

function HeaderIndex() {
    return (
        <div className="headPage-music">
            <div className="nav_main-music">
                <div className="home_page-music">
                    <div className="name_for-app icon__home-main">SPACE music</div>
                </div>
                <label htmlFor="" className="nav__search">
                    <i className="icon__searchnav fa-solid fa-magnifying-glass"></i>
                    <input className="nav__search-input" placeholder="bạn muốn nghe gì?" type="input"></input>
                    <i className="fa-solid fa-xmark icon__closeSearch"></i>
                </label>
            </div>
            <div className="categories_nav nav_tool-music">
                <div className="categories">THỂ LOẠI</div>
                <div className="categories">QUỐC GIA</div>
                <div className="categories cate_bxh-new">BXH MỚI NHẤT</div>
                <div className="categories">NGHE GẦN ĐÂY</div>
                <div className="categories">YÊU THÍCH</div>
            </div>
        </div>
    )
}
export default HeaderIndex;