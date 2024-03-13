import React, { useState, useEffect } from 'react';
import '../styleMusic/styleMusic.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import HeaderIndex from "../../headerIndex";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import HeaderIndex from "./headerIndex";
import FooterIndex from './footerIndex';
import TracksPlay from './trackPlay';

function Homepage() {
    const [contentSearch, setContentSearch] = useState('');
    const [playlistMusicForU, setPlaylistMusicForU] = useState([]);
    const [playlistMusicTab1, setPlaylistMusicTab1] = useState([]);
    const [playlistMusicTab2, setPlaylistMusicTab2] = useState([]);
    const [playlistMusicTab3, setPlaylistMusicTab3] = useState([]);
    const [playlistMusicNewlyLunched, setPlaylistMusicNewlyLunched] = useState([]);
    const [playlistMusicTop, setPlaylistMusicTop] = useState([]);
    const [playlistMusicHot, setPlaylistMusicHot] = useState([]);
    const [typeNation, setTypeNation] = useState(1);
    const [startTracks, setStartTracks] = useState(false);
    const [titleBannerForU, setTitleBannerForU] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        handleRenderMusic();
    }, []);

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
        navigate(`/tracks-playlist/${item.encodeId}`);
    };

    return (
        <>
            <Routes>
                <Route path="/home-page" element={<Homepage />} />
            </Routes>
            <div className="container__mainPage-music">
                <HeaderIndex />
                {/* mainPageMusic */}
                <div id="container">
                    <div className="infor__playlist">
                        {/* slide main when search*/}
                        <div className="container__maincontent">
                            <div className="content">
                                {/* nav-bar */}
                                <div className="nav__main-top">
                                    <div className="nav__tool">
                                        <div className="nav__icon">
                                        <IoIosArrowBack />
                                        <IoIosArrowForward />
                                        </div>
                                    </div>
                                </div>
                                {/* start home page */}
                                <div className="desc__contentmain">
                                    <div className="children__content">
                                        {/* playlist for u */}
                                        <div className="head__content-title head_title-musicForU">
                                            <h2 className="head__title">Dành cho bạn</h2>
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
                                                        <div className="content_music-new" key={index} data-Index={index}>
                                                            <div className="descr_sing-single-search">
                                                                <div className="list__title_sing">
                                                                    <div className="order_number">{index + 1}</div>
                                                                    <div className="play_track-play-main">
                                                                        <i className="fa-solid fa-play icon_play-tracks"></i>
                                                                        <i className="fas fa-pause icon_pause-tracks"></i>
                                                                    </div>
                                                                    <div className="img_title_sing">
                                                                        <img src={item.thumbnailM} alt="" />
                                                                    </div>
                                                                    <div className="list__sing-singgle">
                                                                        <p className="name_sing">{item.title}</p>
                                                                        <p className="name_single">{item.artistsNames}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="list_clock lock_musicNew">
                                                                <i className="fa-solid fa-ellipsis"></i>
                                                            </div>
                                                        </div>
                                                    ))
                                                    : typeNation === 2 ?
                                                        playlistMusicNewlyLunched[0]?.items.vPop.map((item, index) => (
                                                            <div className="content_music-new" key={index} data-Index={index}>
                                                                <div className="descr_sing-single-search">
                                                                    <div className="list__title_sing">
                                                                        <div className="order_number">{index + 1}</div>
                                                                        <div className="play_track-play-main">
                                                                            <i className="fa-solid fa-play icon_play-tracks"></i>
                                                                            <i className="fas fa-pause icon_pause-tracks"></i>
                                                                        </div>
                                                                        <div className="img_title_sing">
                                                                            <img src={item.thumbnailM} alt="" />
                                                                        </div>
                                                                        <div className="list__sing-singgle">
                                                                            <p className="name_sing">{item.title}</p>
                                                                            <p className="name_single">{item.artistsNames}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="list_clock lock_musicNew">
                                                                    <i className="fa-solid fa-ellipsis"></i>
                                                                </div>
                                                            </div>
                                                        ))
                                                        : typeNation === 3 ?
                                                            playlistMusicNewlyLunched[0]?.items.others.map((item, index) => (
                                                                <div className="content_music-new" key={index} data-Index={index}>
                                                                    <div className="descr_sing-single-search">
                                                                        <div className="list__title_sing">
                                                                            <div className="order_number">{index + 1}</div>
                                                                            <div className="play_track-play-main">
                                                                                <i className="fa-solid fa-play icon_play-tracks"></i>
                                                                                <i className="fas fa-pause icon_pause-tracks"></i>
                                                                            </div>
                                                                            <div className="img_title_sing">
                                                                                <img src={item.thumbnailM} alt="" />
                                                                            </div>
                                                                            <div className="list__sing-singgle">
                                                                                <p className="name_sing">{item.title}</p>
                                                                                <p className="name_single">{item.artistsNames}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="list_clock lock_musicNew">
                                                                        <i className="fa-solid fa-ellipsis"></i>
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
                            {/* end all tracks playlist */}
                        </div>
                    </div>
                </div>
                <TracksPlay/>
            </div>
        </>
    );
}

export default Homepage;