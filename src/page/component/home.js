import React, { useState, useEffect, useContext, useRef } from 'react';
import '../../styleMusic/styleMusic.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
// import HeaderIndex from "../../headerIndex";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MdOutlineChevronRight } from "react-icons/md";
import { AudioContext } from '../../router';
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";
import Popup from "reactjs-popup";
import PopupNotTrack from './popupWarning/popupNotTrack';
import { useLocation } from 'react-router-dom';

function Homepage({ statusInfor, currentIndex, statusBtn }) {
    const [contentSearch, setContentSearch] = useState('');
    const [playlistMusicForU, setPlaylistMusicForU] = useState([]);
    const [playlistMusicTab1, setPlaylistMusicTab1] = useState([]);
    const [playlistMusicTab2, setPlaylistMusicTab2] = useState([]);
    const [playlistMusicTab3, setPlaylistMusicTab3] = useState([]);
    const [playlistMusicNewlyLunched, setPlaylistMusicNewlyLunched] = useState([]);
    const [playlistMusicTop, setPlaylistMusicTop] = useState([]);
    const [playlistMusicHot, setPlaylistMusicHot] = useState([]);
    const [typeNation, setTypeNation] = useState(1);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [startTracks, setStartTracks] = useState(false);
    const [titleBannerForU, setTitleBannerForU] = useState('');
    const navigate = useNavigate();
    const [dataMusic, setDataMusic] = useState({})
    const [statusPlay, setStatusPlay] = useState(false);
    const { trackAudio, setTrackAudio } = useContext(AudioContext);
    const { infor, setInfor } = useContext(AudioContext);
    const { openInforSingle, setOpenInforSingle } = useContext(AudioContext);
    const { indexSong, setIndexSong } = useContext(AudioContext);
    const { pauseCurrent, setPauseCurrent } = useContext(AudioContext);
    const { status, setStatus } = useContext(AudioContext);
    const audioRef = useRef(new Audio());
    const { allTracks, setAllTracks } = useContext(AudioContext);
    const { typeListSong, setTypeListSong } = useContext(AudioContext);
    const { valueInput, setValueInput } = useContext(AudioContext);
    const { statusControl, setStatusControl } = useContext(AudioContext);
    const location = useLocation();
    const [isTrackPlaying, setIsTrackPlaying] = useState(null)


    const { typePlaylist, setTypePlaylist } = useContext(AudioContext)
    const END_POINT = process.env.REACT_APP_END_POINT;
    // const { trackAudio, setTrackAudio } = useContext(AudioContext);

    useEffect(() => {
        handleRenderMusic();
        if (location.pathname === "/") {
            localStorage.setItem('inputValue', '')
        }
        setValueInput('');

        if (statusBtn === true) {
            handlePlayTrack();
        }
    }, [statusBtn]);


    const handleRenderMusic = () => {
        fetch('http://localhost:3000/api/home?page=1')
            .then(response => response.json())
            .then(data => {
                setPlaylistMusicForU(data.data.items.filter((item) => item.sectionId === "hSlider"));
                setPlaylistMusicNewlyLunched(data.data.items.filter((item) => item.sectionType === "new-release"));
                setPlaylistMusicTab1(data.data.items[3 + 1]);
                setPlaylistMusicTab2(data.data.items[4 + 1]);
                setPlaylistMusicTab3(data.data.items[5 + 1]);
                setPlaylistMusicTop(data.data.items.filter((item) => item.sectionId === "h100"));
                setPlaylistMusicHot(data.data.items.filter((item) => item.sectionId === "hAlbum"));
            })
            .catch(error => console.error("e", error));

    };

    const handleRenderTracksPlaylist = (item) => {
        navigate(`/playlist/${item.encodeId}`);
    };


    const handlePlayTrack = (index) => {
        if (audioRef.current && statusPlay === false && trackAudio !== null) {
            audioRef.current.pause();
            trackAudio.pause();
        }
        if (index >= 0 || currentIndex >= 0) {
            if (typeNation === 1) {
                let inforSong = statusBtn === true ? playlistMusicNewlyLunched[0]?.items.all[currentIndex] : playlistMusicNewlyLunched[0]?.items.all[index];
                setAllTracks(playlistMusicNewlyLunched[0]?.items.all)
                setInfor(inforSong)
                fetch(END_POINT + `/api//song?id=${inforSong.encodeId}`)
                    .then(respone => respone.json())
                    .then(data => {
                        if (data.msg === "Success") {
                            let track = data["data"]["128"]
                            const newAudio = new Audio(track);
                            audioRef.current = newAudio;
                            audioRef.current.play();
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
                    })
            } else if (typeNation === 2) {
                let inforSong = statusBtn === true ? playlistMusicNewlyLunched[0]?.items.vPop[currentIndex] : playlistMusicNewlyLunched[0]?.items.vPop[index];
                setAllTracks(playlistMusicNewlyLunched[0]?.items.vPop)
                setInfor(inforSong)
                fetch(END_POINT + `/api//song?id=${inforSong.encodeId}`)
                    .then(respone => respone.json())
                    .then(data => {
                        if (data.msg === "Success") {
                            let track = data["data"]["128"]
                            const newAudio = new Audio(track);
                            audioRef.current = newAudio;
                            audioRef.current.play();
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
                    })
            } else if (typeNation === 3) {
                let inforSong = statusBtn === true ? playlistMusicNewlyLunched[0]?.items.others[currentIndex] : playlistMusicNewlyLunched[0]?.items.others[index];
                setAllTracks(playlistMusicNewlyLunched[0]?.items.others)
                setInfor(inforSong)
                fetch(END_POINT + `/api//song?id=${inforSong.encodeId}`)
                    .then(respone => respone.json())
                    .then(data => {
                        if (data.msg === "Success") {
                            let track = data["data"]["128"]
                            const newAudio = new Audio(track);
                            audioRef.current = newAudio;
                            audioRef.current.play();
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
                    })
            }

        }

    }

    const togglePopup = () => {
        setOpenPopUp(false);
    }

    useEffect(() => {
        if (isTrackPlaying !== null) {
            if (pauseCurrent) {
                isTrackPlaying.querySelector(".icon_pause-tracks").style.display = "none";
                isTrackPlaying.querySelector(".icon_play-tracks").style.display = "block";
            } else {
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
    return (
        <>
            <Routes>
                <Route path="/home-page" element={<Homepage />} />
            </Routes>
            <div className="container__mainPage-music" style={{ width: statusInfor === true ? '78%' : '100%' }}>
                <div className="infor__playlist">
                    <div className="container__maincontent">
                        <div className="content">
                            {/* start home page */}
                            <div className="desc__contentmain" style={{ opacity: openPopUp === true ? "0.3" : "1" }}>
                                <div className="children__content" >
                                    {/* playlist for u */}
                                    <div className="head__content-title head_title-musicForU">
                                        <h2 className="head__title">Dành cho bạn</h2>
                                        {/* <MdChevronLeft className='iconLeft' />
                                            <MdChevronRight className='iconRight'/> */}

                                        <div className="list__musicForU">

                                            {playlistMusicForU[0]?.items.map((item, index) => (
                                                <div
                                                    className="card_box-sing playlist__render slide_banner"
                                                    key={index}
                                                    data-Index={index}
                                                    onClick={(e) => {
                                                        handleRenderTracksPlaylist(item)
                                                    }
                                                    }
                                                >

                                                    <img className="img_singgle img_slide-banner" src={item.banner} alt="" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* newly lunched */}
                                    <div className="head__content-title head_title-musicNewlyLunched">
                                        <h2 className="head__title">Mới phát hành</h2>
                                        <div className="option_music">
                                            <button
                                                className={`all_music-new btn_music-new ${typeNation === 1 ? "active-option" : ""}`}
                                                onClick={() => setTypeNation(1)}
                                            >Tất cả
                                            </button>
                                            <button
                                                className={`VN_music btn_music-new ${typeNation === 2 ? "active-option" : ""}`}
                                                onClick={() => setTypeNation(2)}
                                            >Việt Nam
                                            </button>
                                            <button
                                                className={`QT_music btn_music-new ${typeNation === 3 ? "active-option" : ""}`}
                                                onClick={() => setTypeNation(3)}
                                            >Quốc tế
                                            </button>
                                        </div>
                                        <div className="list_musicNewly">
                                            {typeNation === 1 ?
                                                playlistMusicNewlyLunched[0]?.items.all.map((item, index) => (
                                                    <div
                                                        className={`content_music-new indexKey${index}`}
                                                        key={index}
                                                        onClick={(e) => {
                                                            setTypeListSong(true)
                                                            handlePlayTrack(index)
                                                            document.querySelectorAll('.content_music-new').forEach(element => {
                                                                element.classList.remove('click_track');
                                                                element.querySelector(".name_sing").style.color = "#fff";
                                                                element.querySelector(".icon_pause-tracks").style.display = "none";
                                                                element.querySelector(".order_number-new").style.display = "block";
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
                                                        <div className="descr_sing-single-search">
                                                            <div className="list__title_sing">
                                                                <div className='total_header-new'>
                                                                    <div className="order_number-new">{index + 1}</div>
                                                                    <IoIosPlay className='icon_play-tracks' />
                                                                    <IoIosPause className='icon_pause-tracks' />
                                                                    <div className="img_title_sing">
                                                                        <img src={item.thumbnailM} alt="" />
                                                                    </div>
                                                                </div>
                                                                <div className="list__sing-singgle">
                                                                    <p className="name_sing">{item.title}</p>
                                                                    <p className="name_single">{item.artistsNames}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="list_clock lock_musicNew">
                                                            <IoEllipsisHorizontal className='icon-options-home' />
                                                        </div>
                                                    </div>
                                                ))
                                                : typeNation === 2 ?
                                                    playlistMusicNewlyLunched[0]?.items.vPop.map((item, index) => (
                                                        <div
                                                            className={`content_music-new indexKey${index}`}
                                                            key={index}
                                                            onClick={(e) => {
                                                                setTypeListSong(true)
                                                                handlePlayTrack(index)
                                                                document.querySelectorAll('.content_music-new').forEach(element => {
                                                                    element.classList.remove('click_track');
                                                                    element.querySelector(".name_sing").style.color = "#fff";
                                                                    element.querySelector(".icon_pause-tracks").style.display = "none";
                                                                    element.querySelector(".order_number-new").style.display = "block";
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
                                                            <div className="descr_sing-single-search">
                                                                <div className="list__title_sing">
                                                                    <div className='total_header-new'>
                                                                        <div className="order_number-new">{index + 1}</div>
                                                                        <IoIosPlay className='icon_play-tracks' />
                                                                        <IoIosPause className='icon_pause-tracks' />
                                                                        <div className="img_title_sing">
                                                                            <img src={item.thumbnailM} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="list__sing-singgle">
                                                                        <p className="name_sing">{item.title}</p>
                                                                        <p className="name_single">{item.artistsNames}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="list_clock lock_musicNew">
                                                                <IoEllipsisHorizontal className='icon-options-home' />
                                                            </div>
                                                        </div>
                                                    ))
                                                    : typeNation === 3 ?
                                                        playlistMusicNewlyLunched[0]?.items.others.map((item, index) => (
                                                            <div
                                                                className={`content_music-new indexKey${index}`}
                                                                key={index}
                                                                onClick={(e) => {
                                                                    setTypeListSong(true)
                                                                    handlePlayTrack(index)
                                                                    document.querySelectorAll('.content_music-new').forEach(element => {
                                                                        element.classList.remove('click_track');
                                                                        element.querySelector(".name_sing").style.color = "#fff";
                                                                        element.querySelector(".icon_pause-tracks").style.display = "none";
                                                                        element.querySelector(".order_number-new").style.display = "block";
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
                                                                <div className="descr_sing-single-search">
                                                                    <div className="list__title_sing">
                                                                        <div className='total_header-new'>
                                                                            <div className="order_number-new">{index + 1}</div>
                                                                            <IoIosPlay className='icon_play-tracks' />
                                                                            <IoIosPause className='icon_pause-tracks' />
                                                                            <div className="img_title_sing">
                                                                                <img src={item.thumbnailM} alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="list__sing-singgle">
                                                                            <p className="name_sing">{item.title}</p>
                                                                            <p className="name_single">{item.artistsNames}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="list_clock lock_musicNew">
                                                                    <IoEllipsisHorizontal className='icon-options-home' />
                                                                </div>
                                                            </div>
                                                        ))
                                                        : ''
                                            }
                                        </div>

                                    </div>
                                </div>
                                {/* playlist tab1 */}
                                <div className="head__content-title head_title-musicMood">
                                    <div className="head__title-tab1">
                                        <h2 className="title-tab">{playlistMusicTab1.title}</h2>
                                    </div>
                                    <div className="list__musicTab1">
                                        {playlistMusicTab1?.items?.map((item, index) => (
                                            <div
                                                className="card_box-sing playlist__render"
                                                key={index}
                                                data-Index={index}
                                                onClick={(e) => {
                                                    handleRenderTracksPlaylist(item)
                                                }
                                                }
                                            >
                                                <img className="img_singgle" src={item.thumbnailM} alt="" />
                                                <p className="title_singgle">{item.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* playlist tab12 */}
                                <div className="head__content-title head_title-musicMood">
                                    <div className="head__title-tab2">
                                        <h2 className="title-tab">{playlistMusicTab2.title}</h2>
                                    </div>
                                    <div className="list__musicTab2">
                                        {playlistMusicTab2?.items?.map((item, index) => (
                                            <div
                                                className="card_box-sing playlist__render"
                                                key={index}
                                                data-Index={index}
                                                onClick={(e) => {
                                                    handleRenderTracksPlaylist(item)
                                                }
                                                }
                                            >
                                                <img className="img_singgle" src={item.thumbnailM} alt="" />
                                                <p className="title_singgle">{item.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* playlist tab3 */}
                                <div className="head__content-title head_title-musicMood">
                                    <div className="head__title-tab3">
                                        <h2 className="title-tab">{playlistMusicTab3.title}</h2>
                                    </div>
                                    <div className="list__musicTab3">
                                        {playlistMusicTab3.items?.map((item, index) => (
                                            <div
                                                className="card_box-sing playlist__render"
                                                key={index}
                                                data-Index={index}
                                                onClick={(e) => {
                                                    handleRenderTracksPlaylist(item)
                                                }
                                                }
                                            >
                                                <img className="img_singgle" src={item.thumbnailM} alt="" />
                                                <p className="title_singgle">{item.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Top 100 */}
                                <div className="head__content-title head_title-musicTop">
                                    <div className="head__title-tab4">
                                        <h2 className="title-tab">{playlistMusicTop[0]?.title}</h2>
                                    </div>
                                    <div className="list__musicTop">
                                        {playlistMusicTop[0]?.items?.map((item, index) => (
                                            <div
                                                className="card_box-sing 
                                                playlist__render"
                                                key={index}
                                                data-Index={index}
                                                onClick={(e) => {
                                                    handleRenderTracksPlaylist(item)
                                                }
                                                }
                                            >
                                                <img className="img_singgle" src={item.thumbnailM} alt="" />
                                                <p className="title_singgle">{item.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Album hot */}
                                <div className="head__content-title head_title-musicHot">
                                    <div className="head__title-tab5">
                                        <h2 className="title-tab">{playlistMusicHot[0]?.title}</h2>
                                    </div>
                                    <div className="list__musicHot">
                                        {playlistMusicHot[0]?.items?.map((item, index) => (
                                            <div
                                                className="card_box-sing 
                                                playlist__render"
                                                key={index}
                                                data-Index={index}
                                                onClick={(e) => {
                                                    handleRenderTracksPlaylist(item)
                                                }
                                                }
                                            >
                                                <img className="img_singgle" src={item.thumbnailM} alt="" />
                                                <p className="title_singgle">{item.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* end home page */}
                             </div>
                    </div>
                </div>
            </div>
            {openPopUp === true && <PopupNotTrack isOpen={openPopUp} onClose={togglePopup} />}
        </>
    );
}

export default Homepage;