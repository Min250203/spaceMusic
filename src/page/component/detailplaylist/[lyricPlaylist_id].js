import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function LyricPlaylist() {
    let { lyric_id } = useParams();
    const [lyric, setLyric] = useState({});
    const [inforSong, setInforSong] = useState({});
    const [fullLyric, setFullLyric] = useState({});
    const [yearAlbum, setYearAlbum] = useState('');
    const [inforArtist, setInforArtist] = useState({});

    const END_POINT = process.env.REACT_APP_END_POINT;


    const handleRenderLyric = async (lyric_id) => {
        const dataLyric = await fetch(END_POINT + `/api/lyric?id=${lyric_id}`)
            .then(response => response.json())
            .catch(error => console.error(error))
        setLyric(dataLyric.data.sentences);

        // render lyric
        dataLyric?.data?.sentences?.map((sentence) => {
            const words = sentence.words;
            let key;
            let lyric = "";

            words.map((word, index) => {
                if (index === 0) {
                    key = Math.floor(word.startTime / 1000);
                }
                lyric += `${word.data} `
            })

            fullLyric[key] = lyric;
            setFullLyric(fullLyric)
        })


        const dataSong = await fetch(END_POINT + `/api/infosong?id=${lyric_id}`)
            .then(response => response.json())
            .catch(error => console.error(error))
        let year = dataSong.data.album.releaseDate.split("/");
        setYearAlbum(year);
        setInforSong(dataSong)

        const dataArtist = await fetch(END_POINT + `/api/artist?name=${dataSong?.data?.artists[0]?.alias}`)
            .then(respone => respone.json())
            .catch(error => console.error(error))
        setInforArtist(dataArtist.data);

    }

    useEffect(() => {
        handleRenderLyric(lyric_id);
    }, [])

    return (
        // <h1>hi</h1>
        <>
            <div className="container__mainPage-music">
                {/* mainPageMusic */}
                {/* <div id="container"> */}
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
                                                    <img src={inforSong?.data?.thumbnailM} alt="" />
                                                </div>
                                                <div class="categories_descr">
                                                    <p class="name_playlist">Bài Hát</p>
                                                    <h1 class="playlist__title-header">{inforSong?.data?.title}</h1>
                                                    {/* <p class="playlist_descr"> {inforSong?.data?.description}</p> */}
                                                    <p class="playlist_descr"> {inforSong?.data?.artistsNames + " • " + inforSong?.data?.album.title + " • " + yearAlbum[2]}</p>

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

                                            </div>
                                            <div class="content__lyric">
                                                <div class="infor__lyric">
                                                    <h2 class="description_lyric">Lời bài hát</h2>
                                                    <div class="render_lyric">
                                                        {
                                                            lyric.length > 0 ?
                                                                Object.entries(fullLyric).map(([key, item]) => (
                                                                    <p key={key} className={`lyric_${key}`}>{item}</p>
                                                                ))
                                                                : ''
                                                        }
                                                    </div>
                                                </div>
                                                <div class="infor__artist_lyric-wrap">
                                                    <div class="infor__artist_lyric">
                                                        <div class="img__artist_lyric">
                                                            <img class="img__artist_" src={inforArtist.thumbnailM} alt="" />
                                                        </div>
                                                        <div class="title__artist_lyric">
                                                            <div class="header__artist_lyric">Nghệ sĩ</div>
                                                            <div class="name__artist_lyric">{inforArtist.name}</div>
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
                {/* </div> */}
            </div>
        </>

    )
}

export default LyricPlaylist;
