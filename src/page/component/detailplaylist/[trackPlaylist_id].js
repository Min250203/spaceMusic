import React, { useState, useEffect, createContext, useRef, useContext } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AudioContext } from '../../../router';
import InforSingleTrack from '../inforSingleTrack';
import { FaList } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import { IoIosPause } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import PopupNotTrack from '../popupWarning/popupNotTrack';
import TitleShare from '../titleShare';

function TracksPlaylist({ currentIndex, statusBtn }) {
    const [dataMusic, setDataMusic] = useState({});
    let { playlist_id } = useParams();
    // let { playlist_id } = useParams();
    const navigate = useNavigate();
    const [statusPlay, setStatusPlay] = useState(false);
    const [dataInforMusic, setDataInforMusic] = useState([]);
    const [isChoseTracks, setIschoseTracks] = useState(false)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [isTrackPlaying, setIsTrackPlaying] = useState(null)

    // context
    const { trackAudio, setTrackAudio } = useContext(AudioContext);
    const { infor, setInfor } = useContext(AudioContext);
    const { statusControl, setStatusControl } = useContext(AudioContext);
    const audioRef = useRef(new Audio());
    const { openInforSingle, setOpenInforSingle } = useContext(AudioContext);
    const { status, setStatus } = useContext(AudioContext);
    const { indexSong, setIndexSong } = useContext(AudioContext);
    const { isPlaying, setIsPlaying } = useContext(AudioContext);
    const { allTracks, setAllTracks } = useContext(AudioContext);
    const { pauseCurrent, setPauseCurrent } = useContext(AudioContext);
    const [isShowPlaying, setIsShowPlaying] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const END_POINT = process.env.REACT_APP_END_POINT;


    const handleRenderTracks = async (playlist_id) => {
        const data = await fetch(END_POINT + `/api/detailplaylist?id=${playlist_id}`)
            .then(response => response.json())
            .catch(error => console.error(error))
        setDataMusic(data);

    }

    useEffect(() => {
        // clearTimeout(() => {
        //     setIsCopy(false)
        // }, 3000)
        handleRenderTracks(playlist_id)
        if (statusBtn === true) {
            handlePlayTrack();
            let trackPlaying = document.querySelector(`[class*="indexKey=${currentIndex}"]`)
            document.querySelectorAll('.content__sing-wrap').forEach(element => {
                console.log("ua la sao")
                element.classList.remove('click_track');
                element.querySelector(".name_sing").style.color = "#fff";
                element.querySelector(".icon_pause-tracks").style.display = "none";
                element.querySelector(".icon_play-tracks").style.display = "none";
                element.querySelector(".order_number").style.display = "block";

                // element.onmouseover = function (e) {
                //     if (!element.classList.contains('click_track')) {
                //         element.querySelector(".icon_play-tracks").style.display = "block";
                //         element.querySelector(".order_number").style.display = "none";
                //     }

                // }
                // element.onmouseout = function (e) {
                //     if (!element.classList.contains('click_track')) {
                //         element.querySelector(".icon_play-tracks").style.display = "none";
                //         element.querySelector(".order_number").style.display = "block";
                //     }

                // }
            });
            setIsTrackPlaying(trackPlaying)
            trackPlaying.classList.add('click_track')
            trackPlaying.querySelector(".name_sing").style.color = "#1ed760";
            trackPlaying.querySelector(".icon_pause-tracks").style.display = "block";
            trackPlaying.querySelector(".icon_play-tracks").style.display = "none";
            trackPlaying.querySelector(".order_number").style.display = "none";

        }

    }, [statusBtn])

    useEffect(() => {
        if (isTrackPlaying !== null) {
            if (pauseCurrent === true && statusBtn !== true) {
                console.log(pauseCurrent)
                isTrackPlaying.querySelector(".icon_pause-tracks").style.display = "none";
                isTrackPlaying.querySelector(".icon_play-tracks").style.display = "block";
            } else if (pauseCurrent !== true && statusBtn !== true) {
                console.log(2)
                isTrackPlaying.querySelector(".icon_pause-tracks").style.display = "block";
                isTrackPlaying.querySelector(".icon_play-tracks").style.display = "none";
            }
            if (openPopUp !== true && trackAudio === null) {
                console.log(3)
                isTrackPlaying.classList.remove('click_track')
                isTrackPlaying.querySelector(".name_sing").style.color = "#fff";
                isTrackPlaying.querySelector(".icon_pause-tracks").style.display = "none";
                isTrackPlaying.querySelector(".order_number").style.display = "block";
            }
        }
    }, [pauseCurrent, openPopUp]);

    const handleToggle = (type) => {
        if (type === "pause") {
            audioRef.current.pause();
        }
        else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying)
        setPauseCurrent(!pauseCurrent)

    }

    const handleRenderLyric = (title) => {
        let temp = dataMusic.data.song.items.filter((i) => i.title === title);
        navigate(`/lyric/${temp[0].encodeId}`)

    }

    const handlePlayTrack = async (index) => {
        if (audioRef.current && statusPlay === false && trackAudio !== null) {
            audioRef.current.pause();
            trackAudio.pause();
        }
        if (index >= 0 || currentIndex >= 0) {
            let inforSong = statusBtn === true ? dataMusic.data.song.items[currentIndex] : dataMusic.data.song.items[index];
            setAllTracks(dataMusic.data.song.items)
            setInfor(inforSong)
            let data = await fetch(END_POINT + `/api/song?id=${inforSong.encodeId}`)
                .then(respone => respone.json())
            // .then(data => {
            if (data.msg === "Success") {
                let track = data["data"]["128"]
                const newAudio = new Audio(track);
                audioRef.current = newAudio;
                audioRef.current.play();
                setIsShowPlaying(true)
                setStatusPlay(false);
                setTrackAudio(audioRef.current)
                setStatus(false)
                setPauseCurrent(false)
                setStatusControl(0)

            } else {
                document.body.scrollTop = document.documentElement.scrollTop = 300;
                setOpenPopUp(true);
                setTrackAudio(null)
                setStatusControl(1)
            }

            // })

        }

    }


    const togglePopup = () => {
        setOpenPopUp(false);
    }

    setTimeout(() => {
        setIsCopy(false)
    }, 3000)



    return (
        <>
            <div className="container__mainPage-music" style={{ width: openInforSingle === true ? '78%' : '100%' }}>
                {/* mainPageMusic */}
                {/* <div id="container"> */}

                <div className="infor__playlist">
                    {/* <!-- slide main when search--> */}
                    <div className="container__maincontent">
                        <div className="content">
                            {/* <!-- tracks when click album or tracks or single --> */}
                            <div className="all__tracks-main active-show" style={{ opacity: openPopUp === true ? "0.3" : "1" }}>
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
                                                {isPlaying === true && isShowPlaying === true ?
                                                    <IoIosPause className='icon_play-option' onClick={() => {
                                                        let type = "pause"
                                                        handleToggle(type)
                                                    }}
                                                    />
                                                    :
                                                    <IoIosPlay className='icon_play-option' onClick={() => {
                                                        let type = "play"
                                                        handleToggle(type)
                                                    }}
                                                    />

                                                }

                                                {isLike === true ?
                                                    <FaHeart className='icon-like-option' onClick={() => {
                                                        setIsLike(false)
                                                    }} />
                                                    :

                                                    <FaRegHeart className='icon-like-option' onClick={() => {
                                                        setIsLike(true)
                                                    }} />
                                                }
                                                <RiShareForwardLine
                                                    className='icon-options share_option'
                                                    onClick={() => {
                                                        setIsCopy(true)
                                                        const urlToCopy = window.location.href;
                                                        // Copy the URL to the clipboard
                                                        navigator.clipboard.writeText(urlToCopy)
                                                    }}
                                                />
                                                {isCopy === true && <TitleShare />}
                                                <div className='title_share' >copy link để chia sẻ</div>

                                            </div>
                                            <div className="icon-action action-right">
                                                <p>Phát dưới dạng danh sách</p>
                                                <FaList />
                                            </div>
                                        </div>
                                        <div className="playlist__sings-wrap playlist-wrap">
                                            <div className="title_sing-wrap ">
                                                <div className="title_sing"># Tiêu đề</div>
                                                <div className="title_album">Album</div>
                                                {/* <!-- <div className="title_date">Ngày thêm</div> --> */}
                                                <FaClock className='clock_icon' />
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
                                                            class={`content__sing-wrap content-wrap indexKey=${index}`}
                                                            onClick={(e) => {
                                                                setOpenInforSingle(true)
                                                                setIndexSong(index);
                                                                setIschoseTracks(true);
                                                                handlePlayTrack(index);
                                                                document.querySelectorAll('.content__sing-wrap').forEach(element => {
                                                                    console.log(1)
                                                                    element.classList.remove('click_track');
                                                                    element.querySelector(".name_sing").style.color = "#fff";
                                                                    element.querySelector(".icon_pause-tracks").style.display = "none";
                                                                    element.querySelector(".order_number").style.display = "block";

                                                                    element.onmouseover = function (e) {
                                                                        if (!element.classList.contains('click_track')) {
                                                                            element.querySelector(".icon_play-tracks").style.display = "block";
                                                                            element.querySelector(".order_number").style.display = "none";
                                                                        }

                                                                    }
                                                                    element.onmouseout = function (e) {
                                                                        if (!element.classList.contains('click_track')) {
                                                                            element.querySelector(".icon_play-tracks").style.display = "none";
                                                                            element.querySelector(".order_number").style.display = "block";
                                                                        }

                                                                    }
                                                                });
                                                                let trackPlaying = e.currentTarget;
                                                                setIsTrackPlaying(trackPlaying)
                                                                trackPlaying.classList.add('click_track')
                                                                trackPlaying.querySelector(".name_sing").style.color = "#1ed760";
                                                                trackPlaying.querySelector(".icon_pause-tracks").style.display = "block";
                                                                trackPlaying.querySelector(".icon_play-tracks").style.display = "none";
                                                                console.log(2)
                                                                trackPlaying.querySelector(".order_number").style.display = "none";
                                                            }}


                                                        >
                                                            <div class="descr_sing-single">
                                                                <div class="list__title_sing">
                                                                    <div className='total_header'>
                                                                        <div className="order_number">{index + 1}</div>
                                                                        <IoIosPlay className='icon_play-tracks' />
                                                                        <IoIosPause className='icon_pause-tracks' />
                                                                        <div className="img_title_sing">
                                                                            <img src={item.thumbnailM} alt="" />
                                                                        </div>
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
                            {openPopUp === true && <PopupNotTrack isOpen={openPopUp} onClose={togglePopup} />}

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
                {/* </div> */}
            </div>
        </>
    )


}
export default TracksPlaylist;