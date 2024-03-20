import React, { useState, useEffect, createContext, useRef, useContext } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { AudioContext } from '../../../router';
import InforSingleTrack from '../inforSingleTrack';
import { FaList } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";


function TracksPlaylist({ currentIndex, statusBtn }) {

    const [dataMusic, setDataMusic] = useState({});
    let { playlist_id } = useParams();
    // let { playlist_id } = useParams();
    const navigate = useNavigate();
    const [statusPlay, setStatusPlay] = useState(false);
    const [dataInforMusic, setDataInforMusic] = useState([]);
    const [isChoseTracks, setIschoseTracks] = useState(false)

    // context
    const { trackAudio, setTrackAudio } = useContext(AudioContext);
    const { infor, setInfor } = useContext(AudioContext);
    const audioRef = useRef(new Audio());
    const { openInforSingle, setOpenInforSingle } = useContext(AudioContext);
    const{status,setStatus} = useContext(AudioContext);
    const { indexSong, setIndexSong } = useContext(AudioContext);
    const { allTracks, setAllTracks } = useContext(AudioContext);
    const END_POINT = process.env.REACT_APP_END_POINT;


    const handleRenderTracks = async (playlist_id) => {
        console.log("playlist_id",playlist_id)
        const data = await fetch(END_POINT + `/api/detailplaylist?id=${playlist_id}`)
            .then(response => response.json())
            .catch(error => console.error(error))
        setDataMusic(data);

    }

    useEffect(() => {
        handleRenderTracks(playlist_id)
        if (statusBtn === true) {
            handlePlayTrack();
        }
    }, [statusBtn])

    const handleRenderLyric = (title) => {
        let temp = dataMusic.data.song.items.filter((i) => i.title === title);
        navigate(`/lyric/${temp[0].encodeId}`)

    }

    const handlePlayTrack = (index) => {
        if (audioRef.current && statusPlay === false && trackAudio !== null) {
            audioRef.current.pause();
            trackAudio.pause();
        }
        if (index >= 0 || currentIndex >= 0) {
            let inforSong = statusBtn === true ? dataMusic.data.song.items[currentIndex] : dataMusic.data.song.items[index];
            setAllTracks(dataMusic)
            setInfor(inforSong)
            fetch(END_POINT + `/api//song?id=${inforSong.encodeId}`)
                .then(respone => respone.json())
                .then(data => {
                    let track = data["data"]["128"]
                    const newAudio = new Audio(track);
                    audioRef.current = newAudio;
                    audioRef.current.play();
                    setStatusPlay(false);
                    setTrackAudio(audioRef.current)
                    setStatus(false)
                })

        }

    }

    // handleRenderLyric = () => {

    // }

    // handleEnded = () => {

    // }

    return (
        <>
            <div className="container__mainPage-music" style={{ width: openInforSingle === true ? '78%' : '100%' }}>
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
                                                                    setOpenInforSingle(true)
                                                                    setIndexSong(index);
                                                                    setIschoseTracks(true);
                                                                    handlePlayTrack(index)
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
                                                                    <div class="time-clock">{totalNumberOftotalSeconds}</div>
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
                        {/* {statusInfor === true || infor.length>0? 
                            <InforSingleTrack
                            // data = {dataInforMusic}
                            dataInfor = {infor}
                            />
                            : ''
                        } */}
                    </div>
                </div>
            </div>
        </>
    )


}
export default TracksPlaylist;