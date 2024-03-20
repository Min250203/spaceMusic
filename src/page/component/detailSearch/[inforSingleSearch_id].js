import React, { useState, useEffect, createContext, useRef, useContext } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { AudioContext } from '../../../router';
import InforSingleTrack from '../inforSingleTrack';
import { FaList } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
function InforSingleSearch({ dataValueSearch, albums }) {
    return (
        <>
            <div className="container__mainPage-music" >
                {/* mainPageMusic */}
                <div id="container">
                    <div className="infor__playlist">
                        {/* <!-- slide main when search--> */}
                        <div className="container__maincontent">
                            <div className="content">
                                {/* <!-- tracks when click album or tracks or single --> */}
                                <div className="all__tracks-main active-show">
                                    {/* <!-- showw icon left --> */}
                                    <div className="left_icon-mobile">
                                        <i className="fa-solid fa-angle-left icon__headnav left"></i>

                                    </div>
                                    {/* <!-- start all tracks playlist --> */}
                                    <div className="children__content-playlist">
                                        {/* <!-- header infor playlist --> */}
                                        <div className="playlist_header-infor">
                                            <div class="playlist__header">
                                                <div class="playlist_img">
                                                    <img src={dataValueSearch.artists ? dataValueSearch.artists[0].thumbnailM : ''} alt="" />
                                                </div>
                                                <div class="categories_descr">
                                                    <p class="name_playlist">Nghệ sĩ</p>
                                                    <h1 class="playlist__title-header">{dataValueSearch.artists ? dataValueSearch.artists[0].name : ''}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        {/* icon header playlist */}

                                        {/* <!-- start tracks --> */}
                                        <div className="list__Playlist">
                                            <div className="icon_action">
                                                <div className="icon-action action-left">
                                                    <IoIosPlay className='icon_play-option' />
                                                    <FaRegHeart className='icon-like-option' />
                                                    <IoEllipsisHorizontal className='icon-options' />

                                                </div>
                                                <div className="icon-action action-right">
                                                    <p>Danh sách</p>
                                                    <FaList />
                                                </div>
                                            </div>
                                            <div className="playlist__sings-wrap playlist-wrap">
                                                <div className="title_sing-wrap ">
                                                    <div className="title_sing"># Tiêu đề</div>
                                                    <div className="title_album">Album</div>
                                                    {/* <!-- <div className="title_date">Ngày thêm</div> --> */}
                                                    <FaClock />
                                                </div>
                                                <span className="line_title"></span>
                                                <div className="all_tracks">
                                                    {dataValueSearch.songs?.map((item, index) => {
                                                        let time = Math.floor(item.duration)
                                                        let totalHours = parseInt(time / 3600);
                                                        let totalMinutes = parseInt((time - (totalHours * 3600)) / 60);
                                                        let totalSeconds = Math.floor((time - ((totalHours * 3600) + (totalMinutes * 60))));
                                                        let totalNumberOftotalSeconds = (totalMinutes < 10 ? "0" + totalMinutes : totalMinutes) + ":" + (totalSeconds < 10 ? "0" + totalSeconds : totalSeconds);

                                                        return (
                                                            <div class="sing_wrap">
                                                                <div class="list__title_sing">
                                                                    <div class="play_track-play">
                                                                        <i class="fa-solid fa-play icon_play-tracks"></i>
                                                                        <i class="fas fa-pause icon_pause-tracks"></i>
                                                                    </div>
                                                                    <div class="img_title_sing">
                                                                        <img src={item.thumbnailM} alt="" />
                                                                    </div>
                                                                    <div class="list__sing-search">
                                                                        <p class="name_sing">{item.title}</p>
                                                                        <p class="name_single">{item.artistsNames}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="list_clock">
                                                                    <i class="fa-regular fa-heart"></i>
                                                                    <div class="time-clock">{totalNumberOftotalSeconds}</div>
                                                                    <i class="fa-solid fa-ellipsis"></i>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                </div>
                                                <div class="fan_like-tracks">
                                                    <div class="head_title-like">Fan cũng thích</div>
                                                    <div class="album_fan-wrap">
                                                        {
                                                            albums.filter((item) => item.sectionId === "aReArtist")[0].items.slice(0, 6).map((item, index) => {
                                                                return (
                                                                    <div class="card_box-sing playlist__search playlist_fan-like">
                                                                        <img class="img_singgle" src={item.thumbnailM} alt="" />
                                                                        <p class="title_singgle">{item.name}</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div class="result-album">
                                                    <h2>Album</h2>
                                                    <div class="album_relate-wrap content__infor-albums">
                                                        {
                                                            albums[1]?.items?.slice(0, 6).map((item, index) => {
                                                                let yearAlbum = item.releaseDate.split("/");

                                                                return (
                                                                    <div class="card_box-sing playlist__search" >
                                                                        <img class="img_singgle" src={item.thumbnailM} alt="" />
                                                                        <div class="descr">
                                                                            <p class="title_singgle">{item.title}</p>
                                                                            <p class="desc_Singgle">{yearAlbum[2] + " • " + dataValueSearch.artists[0].name}</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })

                                                        }
                                                    </div>
                                                </div>
                                                {/*  */}
                                                <div class="result-artist">
                                                    <h2>Được xuất hiện trong</h2>
                                                    <div class="artist_box-wrap">
                                                        {albums[5]?.items.map((item, index) => {
                                                            return (
                                                                <div class="card_box-sing playlist__search hot_music-appear slide_banner" >
                                                                    <img class="img_singgle img_slide-banner" src={item.thumbnailM} alt="" />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default InforSingleSearch;