import React, { useState, useEffect, useContext } from 'react';
import { FaTimes } from "react-icons/fa";
import { AudioContext } from '../../router';


function InforSingleTrack({ dataInfor }) {
    console.log(dataInfor)
    const [inforArtist, setInforAtist] = useState({});
    const { openInforSingle, setOpenInforSingle } = useContext(AudioContext);
    const END_POINT = process.env.REACT_APP_END_POINT;

    const handleInforArtist = (data) => {
        fetch(END_POINT + `/api/artist?name=${dataInfor?.artists[0].alias}`)
            .then(respone => respone.json())
            .then(data => {
                setInforAtist(data.data);
            })
    }

    useEffect(() => {
        handleInforArtist(dataInfor);
    }, [dataInfor])
    return (
        <>
            <div class="container__infor_tracks-playing" style={{ display: openInforSingle === false ? "none" : "block" }}>
                <div class="content__infor_tracks-playing">
                    <div class="infor__tracks_single-playing">
                        <div class="headtitle__tracks-playing">
                            <div class="name__album_tracks-playing">{dataInfor?.album.title}</div>
                            <FaTimes onClick={() => { setOpenInforSingle(false) }} />
                        </div>

                        <div class="img__album_tracks-playing">
                            <img class="img__album-playing" src={dataInfor?.thumbnailM} alt="" />
                        </div>
                        <div class="tool__tracks-playing">
                            <div class="title__tracks-playing">
                                <div class="name__sing_tracks-playing">{dataInfor?.title}</div>
                                <div class="name__artist-tracks-playing">{dataInfor?.artistsNames}</div>
                            </div>

                        </div>
                    </div>
                    <div class="infor__single-playing">
                        <div class="infor__artist-playing">
                            <div class="description__artist-playing">Giới thiệu về nghệ sĩ</div>
                            <div class="img__infor_artist-playing">
                                <img class="img__artist-playing" src={inforArtist.thumbnailM} alt="" />
                            </div>
                            <div class="title__artist-playing">
                                <div class="name__artist-playing">
                                    <div class="name__artist-playing">{dataInfor?.artistsNames}</div>

                                </div>
                                <div class="btn__follow">
                                    <button class="btn__follow_artist-playing">Theo dõi</button>
                                </div>
                            </div>
                            <div class="name__album_artist-playing">{dataInfor?.album.title}</div>
                        </div>
                    </div>
                    <div class="infor__participant-playing">
                        <div class="participant__for-playing">
                            <div class="head__for_paticipant">
                                <div class="participant">Tiếp theo trong danh sách</div>
                                <div class="show__participant">hiện tất cả</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default InforSingleTrack;