import React, { useState, useEffect, useContext } from 'react';
// import '../../styleMusic/styleMusic.css';
import { FaTimes } from "react-icons/fa";
import { AudioContext } from '../../router';
import { useNavigate } from 'react-router-dom';

function HeaderIndex({ statusInfor }) {

    const END_POINT = process.env.REACT_APP_END_POINT;
    const { dataValueSearch, setDataValueSearch } = useContext(AudioContext);
    const navigate = useNavigate();
    const [inputDown, setInputDown] = useState(false);
    const [valueInput, setValueInput] = useState('')


    const handleKeySearch = (e) => {
        if (e.keyCode == 13) {
            fetch(END_POINT + `/api/search?keyword=${e.target.value}`)
                .then(response => response.json())
                .then(data => {
                    setDataValueSearch(data.data)

                    navigate(`/search/${data.data.artists[0]?.id}`)

                })
                .catch(error => console.error('Error:', error));
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setValueInput(value);
        setInputDown(value.trim() !== '');
    };

    const handleClearInput = () => {
        setValueInput('');
        setInputDown(false);
    };

   
    return (
        <div className="headPage-music" style={{ width: statusInfor === true ? '78%' : '100%' }}>
            <div className="nav_main-music" style={{ width: statusInfor === true ? '78%' : '100%', paddingLeft: statusInfor === true ? '10px' : '20px', paddingRight: statusInfor === true ? '10px' : '20px' }}>
                <div className="sub_nav" style={{ width: statusInfor === true ? '100%' : '85%' }}>
                    <div className="home_page-music">
                        <div className="name_for-app icon__home-main">SPACE music</div>
                    </div>
                    <label htmlFor="" className="nav__search">
                        <i className="icon__searchnav fa-solid fa-magnifying-glass"></i>
                        <input
                            className="nav__search-input"
                            placeholder="bạn muốn nghe gì?"
                            type="input"
                            // onInput={(e) => {
                            //     if (e.target.value !== '') {
                            //         setValueInput(e.target.value)
                            //         setInputDown(true)
                            //     } else {
                            //         setInputDown(false)

                            //     }
                            //     handleKeySearch(e)
                            // }}
                            value={valueInput}
                            onChange={handleInputChange}
                            onKeyDown={handleKeySearch}

                        ></input>
                        {inputDown === true && <FaTimes onClick={() => { handleClearInput() }} />}

                    </label>
                </div>
            </div>
            <div className="categories_nav nav_tool-music">
                <div className='sub_nav_categories'>
                    <div className="categories">THỂ LOẠI</div>
                    <div className="categories">QUỐC GIA</div>
                    <div className="categories cate_bxh-new">BXH MỚI NHẤT</div>
                    <div className="categories">NGHE GẦN ĐÂY</div>
                    <div className="categories">YÊU THÍCH</div>
                </div>
            </div>

        </div>
    )
}
export default HeaderIndex;