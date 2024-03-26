import React, { useState, useEffect, createContext, useRef, useContext } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { AudioContext } from '../../../router';
import InforSingleTrack from '../inforSingleTrack';
import TitleShare from '../titleShare';
import { FaList } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import { IoIosPause } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import PopupNotTrack from '../popupWarning/popupNotTrack';
function InforSingleSearch({ dataValueSearch, albums, currentIndex, statusBtn }) {
    console.log(albums)
    const { openInforSingle, setOpenInforSingle } = useContext(AudioContext);
    const [statusPlay, setStatusPlay] = useState(false);
    const { trackAudio, setTrackAudio } = useContext(AudioContext);
    const { infor, setInfor } = useContext(AudioContext);
    const { indexSong, setIndexSong } = useContext(AudioContext);
    const { pauseCurrent, setPauseCurrent } = useContext(AudioContext);
    const audioRef = useRef(new Audio());
    const { status, setStatus } = useContext(AudioContext);
    const { isPlaying, setIsPlaying } = useContext(AudioContext);
    const { statusControl, setStatusControl } = useContext(AudioContext);
    const { allTracks, setAllTracks } = useContext(AudioContext);
    const [isCopy, setIsCopy] = useState(false);
    const [isTrackPlaying, setIsTrackPlaying] = useState(null);
    const [isLike, setIsLike] = useState(false)
    const [isShowPlaying, setIsShowPlaying] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false)
    const END_POINT = process.env.REACT_APP_END_POINT;
    const navigate = useNavigate();



    const handlePlayTrack = (index) => {
        if (audioRef.current && statusPlay === false && trackAudio !== null) {
            audioRef.current.pause();
            trackAudio.pause();
        }
        if (index >= 0 || currentIndex >= 0) {
            let inforSong = statusBtn === true ? dataValueSearch.songs[currentIndex] : dataValueSearch.songs[index];
            setAllTracks(dataValueSearch.songs)
            setInfor(inforSong)
            fetch(END_POINT + `/api/song?id=${inforSong.encodeId}`)
                .then(respone => respone.json())
                .then(data => {
                    if (data.msg === "Success") {
                        let track = data["data"]["128"]
                        const newAudio = new Audio(track);
                        audioRef.current = newAudio;
                        audioRef.current.play();
                        setStatusPlay(false);
                        setIsShowPlaying(true)
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
                })

        }

    }

    const handleRenderLyric = (title) => {
        let temp = dataValueSearch.songs.filter((i) => i.title === title);
        navigate(`/lyric/${temp[0].encodeId}`)

    }

    useEffect(() => {
        if (statusBtn === true) {
            handlePlayTrack();
            let trackPlaying = document.querySelector(`[class*="indexKey=${currentIndex}"]`)
            document.querySelectorAll('.sing_wrap').forEach(element => {
                console.log(1)
                element.classList.remove('click_track');
                element.querySelector(".icon_play-tracks").style.display = "none";
                element.querySelector(".name_sing").style.color = "#fff";
                element.querySelector(".icon_pause-tracks").style.display = "none";
                element.querySelector(".order_number-new").style.display = "block";
            });

            setIsTrackPlaying(trackPlaying)
            trackPlaying.classList.add('click_track')
            trackPlaying.querySelector(".name_sing").style.color = "#1ed760";
            trackPlaying.querySelector(".icon_pause-tracks").style.display = "block";
            trackPlaying.querySelector(".order_number-new").style.display = "none";

        }
    }, [statusBtn])

    useEffect(() => {
        if (isTrackPlaying !== null) {
            if (pauseCurrent === true && statusBtn !== true) {
                console.log(pauseCurrent)
                isTrackPlaying.querySelector(".icon_pause-tracks").style.display = "none";
                isTrackPlaying.querySelector(".icon_play-tracks").style.display = "block";
            } else if(pauseCurrent !== true && statusBtn !== true) {
                console.log(2)
                isTrackPlaying.querySelector(".icon_pause-tracks").style.display = "block";
                isTrackPlaying.querySelector(".icon_play-tracks").style.display = "none";
            }
            if (openPopUp !== true && trackAudio === null) {
                console.log("wwiaf")
                isTrackPlaying.classList.remove('click_track')
                isTrackPlaying.querySelector(".name_sing").style.color = "#fff";
                isTrackPlaying.querySelector(".icon_pause-tracks").style.display = "none";
                isTrackPlaying.querySelector(".order_number-new").style.display = "block";
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

    const togglePopup = () => {
        setOpenPopUp(false);
    }
    setTimeout(() => {
        console.log(1)
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
                                                        <div
                                                            class={`sing_wrap indexKey=${index}`}
                                                            onClick={(e) => {
                                                                setOpenInforSingle(true)
                                                                setIndexSong(index);
                                                                handlePlayTrack(index);
                                                                document.querySelectorAll('.content__sing-wrap').forEach(element => {
                                                                    element.classList.remove('click_track');
                                                                    element.querySelector(".name_sing").style.color = "#fff";
                                                                    element.querySelector(".icon_pause-tracks").style.display = "none";
                                                                    element.querySelector(".order_number-new").style.display = "block";

                                                                    element.onmouseover = function (e) {
                                                                        if (!element.classList.contains('click_track')) {
                                                                            element.querySelector(".icon_play-tracks").style.display = "block";
                                                                            element.querySelector(".order_number-new").style.display = "none";
                                                                        }

                                                                    }
                                                                    element.onmouseout = function (e) {
                                                                        if (!element.classList.contains('click_track')) {
                                                                            element.querySelector(".icon_play-tracks").style.display = "none";
                                                                            element.querySelector(".order_number-new").style.display = "block";
                                                                        }

                                                                    }
                                                                });
                                                                let trackPlaying = e.currentTarget;
                                                                setIsTrackPlaying(trackPlaying)
                                                                trackPlaying.classList.add('click_track')
                                                                trackPlaying.querySelector(".name_sing").style.color = "#1ed760";
                                                                trackPlaying.querySelector(".icon_pause-tracks").style.display = "block";
                                                                trackPlaying.querySelector(".icon_play-tracks").style.display = "none";
                                                                trackPlaying.querySelector(".order_number-new").style.display = "none";

                                                            }}


                                                        >
                                                            <div class="list__title_sing">
                                                                <div className='total_header'>
                                                                    <div className="order_number-new">{index + 1}</div>
                                                                    <IoIosPlay className='icon_play-tracks' />
                                                                    <IoIosPause className='icon_pause-tracks' />
                                                                    <div className="img_title_sing">
                                                                        <img src={item.thumbnailM} alt="" />
                                                                    </div>
                                                                </div>
                                                                <div class="list__sing-search">
                                                                    <p class="name_sing"
                                                                        onClick={(e) => {
                                                                            setStatusPlay(true)
                                                                            e.stopPropagation();
                                                                            handleRenderLyric(e.target.innerText);
                                                                        }}
                                                                    >{item.title}</p>
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
                                                        albums.length > 0 ?
                                                            albums.filter((item) => item.sectionId === "aReArtist")[0].items.slice(0, 6).map((item, index) => {
                                                                return (
                                                                    <div class="card_box-sing playlist__search playlist_fan-like">
                                                                        <img class="img_singgle" src={item.thumbnailM} alt="" />
                                                                        <p class="title_singgle">{item.name}</p>
                                                                    </div>
                                                                )
                                                            })
                                                            : ''
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
                            {openPopUp === true && <PopupNotTrack isOpen={openPopUp} onClose={togglePopup} />}

                        </div>
                    </div>

                </div>
                {/* </div> */}
            </div>
        </>
    )
}
export default InforSingleSearch;