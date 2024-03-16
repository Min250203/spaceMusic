import React, { useState, useEffect, createContext, useRef, useContext } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import HeaderIndex from "../headerIndex";
import TracksPlay from '../trackPlay';
import FooterIndex from '../footerIndex';
import ListPlaylist from '../listPlaylist';
import LyricPlaylist from './[lyricPlaylist_id]';
import { AudioContext } from '../../../router';

function TracksPlaylist({ handle }) {

    const [dataMusic, setDataMusic] = useState({});
    let { trackPlaylist_id } = useParams();
    const navigate = useNavigate();
    const [statusPlay, setStatusPlay] = useState(false);
    const [dataSong, setDataSong] = useState([]);

    // context
    const { trackAudio, setTrackAudio } = useContext(AudioContext);
    const audioRef = useRef(new Audio());
    const [track, setTrack] = useState(null)
    const END_POINT = process.env.REACT_APP_END_POINT;

    const handleRenderTracks = async (trackPlaylist_id) => {
        const data = await fetch(END_POINT + `/api/detailplaylist?id=${trackPlaylist_id}`)
            .then(response => response.json())
            .catch(error => console.error(error))
        setDataMusic(data);

    }

    useEffect(() => {
        handleRenderTracks(trackPlaylist_id)
    }, [])

    const handleRenderLyric = (title) => {
        let temp = dataMusic.data.song.items.filter((i) => i.title === title);
        navigate(`/lyric-playlist/${temp[0].encodeId}`)

    }

    const handlePlayTrack = (item) => {
        console.log(statusPlay)
        if (audioRef.current && statusPlay === false && trackAudio !== null) {
            audioRef.current.pause();
            trackAudio.pause();
            console.log(trackAudio)
            console.log("LLLLLLLLLLLLLLLLLLLLLL")
            // setStatusPlay(false);

        }
        let elements = item.split('\n');
        let inforSong = dataMusic.data.song.items.filter((i) => i.title === elements[2]);
        // get song
        fetch(END_POINT + `/api//song?id=${inforSong[0]?.encodeId}`)
            .then(respone => respone.json())
            .then(data => {
                let track = data["data"]["128"]
                const newAudio = new Audio(track);
                audioRef.current = newAudio;
                audioRef.current.play();
                setStatusPlay(false);

                // setStatusPlay(true)
                // setTrack(audioRef.current)
                // if (statusPlay === true) {
                setTrackAudio(audioRef.current)
                // }


            })
    }

    return (
        <>
            <div className="container__mainPage-music">
                {/* mainPageMusic */}
                <div id="container">
                    <div className="infor__playlist">
                        {/* <!-- slide main when search--> */}
                        <div className="container__maincontent">
                            <div className="content">
                                {/* <!-- nav-bar --> */}
                                <div className="nav__main-top">
                                    <div className="nav__tool">
                                        <div className="nav__icon">
                                            <i className="fa-solid fa-angle-left icon__headnav left"></i>
                                            <i className="fa-solid fa-angle-right icon__headnav right"></i>
                                        </div>
                                    </div>
                                </div>

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
                                                    <img src={dataMusic?.data?.thumbnailM} alt="" />
                                                </div>
                                                <div class="categories_descr">
                                                    <p class="name_playlist">{dataMusic?.data?.textType}</p>
                                                    <h1 class="playlist__title-header">{dataMusic?.data?.title}</h1>
                                                    <p class="playlist_descr"> {dataMusic?.data?.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* icon header playlist */}

                                        {/* <!-- start tracks --> */}
                                        <div className="list__Playlist">
                                            <div className="icon_action">
                                                <div className="icon-action action-left">
                                                    <i className="fa-solid fa-play icon_play-option"></i>
                                                    <i className="fa-regular fa-heart icon-like-option"></i>
                                                    <i className="fa-solid fa-ellipsis icon-options"></i>
                                                </div>
                                                <div className="icon-action action-right">
                                                    <p>Danh sách</p>
                                                    <i className="fa-solid fa-list icon-list"></i>
                                                </div>
                                            </div>
                                            <div className="playlist__sings-wrap playlist-wrap">
                                                <div className="title_sing-wrap ">
                                                    <div className="title_sing"># Tiêu đề</div>
                                                    <div className="title_album">Album</div>
                                                    {/* <!-- <div className="title_date">Ngày thêm</div> --> */}
                                                    <i className="fa-regular fa-clock icon_clock"></i>
                                                </div>
                                                <div className="title_sing-search">
                                                    <div className="title_sing"># Tiêu đề</div>
                                                    <i className="fa-regular fa-clock icon_clock"></i>
                                                </div>
                                                <span className="line_title"></span>
                                                <div className="all_tracks">
                                                    {dataMusic?.data?.song.items.map((item, index) => {
                                                        let time = Math.floor(item.duration)
                                                        let totalHours = parseInt(time / 3600);
                                                        let totalMinutes = parseInt((time - (totalHours * 3600)) / 60);
                                                        let totalSeconds = Math.floor((time - ((totalHours * 3600) + (totalMinutes * 60))));
                                                        let totalNumberOftotalSeconds = (totalMinutes < 10 ? "0" + totalMinutes : totalMinutes) + ":" + (totalSeconds < 10 ? "0" + totalSeconds : totalSeconds);

                                                        return (
                                                            <div
                                                                class="content__sing-wrap content-wrap"
                                                                data-Index={index}
                                                                onClick={(e) => {
                                                                    console.log("11111111111111111111")
                                                                    handlePlayTrack(e.target.innerText)
                                                                }}

                                                            >
                                                                <div class="descr_sing-single">
                                                                    <div class="list__title_sing">
                                                                        <div class="order_number">{index + 1}</div>
                                                                        <div class="play_track-play-main">
                                                                            <i class="fa-solid fa-play icon_play-tracks"></i>
                                                                            <i class="fas fa-pause icon_pause-tracks"></i>
                                                                        </div>
                                                                        <div class="img_title_sing">
                                                                            <img src={item.thumbnailM} alt="" />
                                                                        </div>
                                                                        <div class="list__sing-singgle">
                                                                            <p
                                                                                class="name_sing"
                                                                                onClick={(e) => {
                                                                                    console.log("2222222222222222222222")
                                                                                    setStatusPlay(true)
                                                                                    e.stopPropagation();
                                                                                    handleRenderLyric(e.target.innerText);
                                                                                }}
                                                                            >{item.title}</p>
                                                                            <p class="name_single">{item.artistsNames}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="list_album">
                                                                    <div class="name_album">{item?.album ? item.album.title : "Album chưa được cập nhật..."}</div>
                                                                </div>
                                                                <div class="list_clock">
                                                                    <div class="icon_like-mobile">
                                                                        <i class="fa-regular fa-heart icon_like-mobile"></i>
                                                                    </div>
                                                                    <div class="time-clock">{totalNumberOftotalSeconds}</div>
                                                                    <i class="fa-solid fa-ellipsis"></i>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    )}
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
export default TracksPlaylist;