import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AudioContext } from "../../../router";

function MainSearch({ dataValueSearch }) {
    let { search_id } = useParams();
    const { albums, setAlbums } = useContext(AudioContext);
    const [appearSingle, setAppearSingle] = useState([]);
    const [typeSearch, setTypeSearch] = useState('all');
    const navigate = useNavigate();

    const { typePlaylist, setTypePlaylist } = useContext(AudioContext)
    const END_POINT = process.env.REACT_APP_END_POINT;


    const handleRenderInforSearch = async (dataValueSearch) => {
        // data Single for album and artist when search
        const dataAlubms = await fetch(END_POINT + `/api//artist?name=${dataValueSearch.artists[0]?.alias}`)
            .then(response => response.json())
        setAlbums(dataAlubms.data.sections)
        // .catch(error => console.error('Error:', error));

        // data Single for appear single when search
        const dataAppearSingle = await fetch(END_POINT + `/api//artistsong?id=${search_id}&page=1&count=10`)
            .then(response => response.json())
        setAppearSingle(dataAppearSingle.data.items)
    }

    useEffect(() => {
        if (Object.keys(dataValueSearch).length > 0) {
            handleRenderInforSearch(dataValueSearch)
        }
    }, [dataValueSearch])

    const handleInforSingle = () => {
        navigate(`/artist/${search_id}`)
    }

    const handleRenderAppearSingle = (item) => {
        navigate(`/playlist/${item.album.encodeId}`)

    }

    const handleRenderAppearIn = (item) => {
        console.log(item.encodeId)
        navigate(`/playlist/${item.encodeId}`)

    }

    const handleRenderAlbum = (item) => {
        console.log(item)
        navigate(`/playlist/${item.encodeId}`)

    }

    const handleRenderPlaylist = (item) => {

        if (typePlaylist === "appear") {
            navigate(`/playlist/${item.album.encodeId}`)
        } else {
            navigate(`/playlist/${item.encodeId}`)

        }
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
                                <div class="content_search">
                                    {/* <!-- headerSearch --> */}
                                    <div class="categories_search">
                                        {/* className={`all_music-new btn_music-new ${typeNation === 1 ? "active-option" : ""}`} */}

                                        <button class={`all_search btn_search ${typeSearch === "all" ? "active-option" : ""}`} onClick={() => {
                                            setTypeSearch("all")
                                        }}>Tất cả</button>
                                        <button class={`sing_search btn_search ${typeSearch === "sing" ? "active-option" : ""}`} onClick={() => {

                                            setTypeSearch("sing")
                                        }}>Bài hát</button>
                                        <button class={`playlist_search btn_search ${typeSearch === "playlist" ? "active-option" : ""}`} onClick={() => {

                                            setTypeSearch("playlist")
                                        }}>Playlist</button>
                                        <button class={`album_search btn_search ${typeSearch === "album" ? "active-option" : ""}`} onClick={() => {

                                            setTypeSearch("album")
                                        }}>Album</button>
                                    </div>
                                    {/* <!-- all search--> */}
                                    <div class="content__infor-all">
                                        {typeSearch === "all" ?
                                            <div class="all-wrap-search">
                                                {/* <!-- header --> */}
                                                <div class="header__infor-allsearch">
                                                    <div class="result-single">
                                                        <h2>Kết quả hàng đầu</h2>
                                                        <div class="single_wrap-search head_wrap">
                                                            <div class="single-wrap head__infor-search" onClick={() => {
                                                                handleInforSingle();
                                                            }}>
                                                                <div class="img_single-search">
                                                                    <img src={Object.keys(dataValueSearch).length > 0 ? dataValueSearch.artists[0]?.thumbnailM : ''} alt="" />
                                                                </div>
                                                                <p class="single-search">{Object.keys(dataValueSearch).length > 0 ? dataValueSearch.artists[0]?.name : ''}</p>
                                                                <p class="artist-search">Nghệ sĩ</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="result-tracks">
                                                        <h2>Bài hát</h2>
                                                        <div class="sing_wrap-search head_wrap">
                                                            {Object.keys(dataValueSearch).length > 0 ?
                                                                dataValueSearch.songs?.slice(0, 4).map((item, index) => {
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

                                                                })
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- relate Search --> */}
                                                <div class="relate__single-search">
                                                    <div class="title_appear-single">
                                                        <h2>Có sự xuất hiện của {dataValueSearch.songs ? dataValueSearch.artists[0].name : ''}</h2>
                                                    </div>
                                                    <div class="appear_single-wrap">
                                                        {appearSingle?.slice(0, 6).map((item, index) => {
                                                            return (
                                                                <div class="card_box-sing playlist__search appear_single" onClick={(e) => {
                                                                    setTypePlaylist("appear")
                                                                    handleRenderAppearSingle(item);
                                                                }}>
                                                                    <img class="img_singgle" src={item.thumbnailM} alt="" />
                                                                    <div class="descr">
                                                                        <p class="title_singgle">{item.title}</p>
                                                                        <p class="desc_Singgle">{item.artistsNames}</p>
                                                                    </div>
                                                                </div>

                                                            )

                                                        })}
                                                    </div>
                                                </div>
                                                {/* <!-- artist --> */}
                                                <div class="result-artist">
                                                    <h2>Được xuất hiện trong</h2>
                                                    <div class="artist_box-wrap">
                                                        {albums[5]?.items.map((item, index) => {
                                                            return (
                                                                <div class="card_box-sing playlist__search hot_music-appear slide_banner" onClick={() => {
                                                                    setTypePlaylist("appearIn")
                                                                    handleRenderAppearIn(item);
                                                                }}
                                                                >
                                                                    <img class="img_singgle img_slide-banner" src={item.thumbnailM} alt="" />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                {/* <!-- album --> */}
                                                <div class="result-album">
                                                    <h2>Album</h2>
                                                    <div class="album_relate-wrap content__infor-albums">
                                                        {
                                                            albums[1]?.items?.slice(0, 6).map((item, index) => {
                                                                let yearAlbum = item.releaseDate.split("/");

                                                                return (
                                                                    <div class="card_box-sing playlist__search" onClick={() => {
                                                                        setTypePlaylist("album")
                                                                        handleRenderAlbum(item);
                                                                    }}>
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
                                                {/* <!-- playlist --> */}
                                                <div class="playlists-search">
                                                    <h2>Playlist</h2>
                                                    <div class="playlist_box-wrap">
                                                        {dataValueSearch.playlists?.slice(0, 6).map((item, index) => {
                                                            return (
                                                                <div class="card_box-sing playlist__search" onClick={() => {
                                                                    setTypePlaylist("playlist")
                                                                    handleRenderPlaylist(item);
                                                                }}>
                                                                    <img class="img_singgle" src={item.thumbnailM} alt="" />
                                                                    <div class="descr">
                                                                        <p class="title_singgle">{item.title}</p>
                                                                        <p class="desc_Singgle">{item.artistsNames}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            : typeSearch === "sing" ?
                                                <div class="content__infor-tracks">
                                                    <div class="playlist-wrap-search">
                                                        <div class="title_sing-wrap-search ">
                                                            <div class="title_sing"># Tiêu đề</div>
                                                            <div class="title_album">Album</div>
                                                            <i class="fa-regular fa-clock icon_clock"></i>
                                                        </div>
                                                        <span class="line_title"></span>

                                                    </div>
                                                    <div class="tracks-search">
                                                        {albums[0].items?.map((item, index) => {
                                                            let time = Math.floor(item.duration)
                                                            let totalHours = parseInt(time / 3600);
                                                            let totalMinutes = parseInt((time - (totalHours * 3600)) / 60);
                                                            let totalSeconds = Math.floor((time - ((totalHours * 3600) + (totalMinutes * 60))));
                                                            let totalNumberOftotalSeconds = (totalMinutes < 10 ? "0" + totalMinutes : totalMinutes) + ":" + (totalSeconds < 10 ? "0" + totalSeconds : totalSeconds);

                                                            return (
                                                                <div class="content__sing-wrap-search" >
                                                                    <div class="descr_sing-single-search">
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
                                                                                <p class="name_sing">{item.title}</p>
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
                                                        })}
                                                    </div>
                                                </div>
                                                : typeSearch === "playlist" ?
                                                    <div class="content__infor-playlist">
                                                        {dataValueSearch.playlists?.map((item, index) => {
                                                            return (
                                                                <div class="card_box-sing playlist__search" onClick={() => {
                                                                    setTypePlaylist("playlist")
                                                                    handleRenderPlaylist(item);
                                                                }}>
                                                                    <img class="img_singgle" src={item.thumbnailM} alt="" />
                                                                    <div class="descr">
                                                                        <p class="title_singgle">{item.title}</p>
                                                                        <p class="desc_Singgle">{item.artistsNames}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    : typeSearch === "album" ?
                                                        <div class="album_relate-wrap content__infor-albums">
                                                            {
                                                                albums[1]?.items?.slice(0, 6).map((item, index) => {
                                                                    let yearAlbum = item.releaseDate.split("/");

                                                                    return (
                                                                        <div class="card_box-sing playlist__search" onClick={() => {
                                                                            setTypePlaylist("album")
                                                                            handleRenderPlaylist(item);
                                                                        }}>
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
                                                        : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}
export default MainSearch;