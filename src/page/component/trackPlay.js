import React, { useState, useEffect, useRef, useContext } from 'react';

import { IoIosPause } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";
import { IoIosSkipBackward } from "react-icons/io";
import { IoIosSkipForward } from "react-icons/io";
import { IoIosSync } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { IoMdShuffle } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { AudioContext } from '../../router';

function TracksPlay({ value, dataInfor, currentIndex }) {
    const END_POINT = process.env.REACT_APP_END_POINT;
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCheck, setIsCheck] = useState(true);
    const [trackUrl, setTrackUrl] = useState('');
    const location = useLocation();
    const [isRandom, setIsRandom] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0)

    const [totalOfCurentTime, setTotalOfCurentTime] = useState('')
    const [totalOfTotalTime, setTotalOfTotalTime] = useState('')
    const audioRef = useRef(new Audio());

    const user = useContext(AudioContext);
    const { indexSong, setIndexSong } = useContext(AudioContext)


    const handleToggle = ({ value, type }) => {
        const audioElement = document.getElementById('audio');
        // if (isCheck === true && audioRef.current) {
        // audioRef.current.play();
        if (type === "pause" || type==="next" || type==="prev" ) {
            value.pause();
        } else {
            value.play();
        }
        setIsPlaying(!isPlaying)

    }

    useEffect(() => {
        if (value !== null) {
            setIsPlaying(true)
            handlePlayTrack(value)
        }

    }, [value])

    const handlePlayTrack = (audio) => {
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                setProgressPercent(progressPercent);

                // current Time
                let timeCurrent = Math.floor(audio.currentTime)
                let currentHours = Math.floor(timeCurrent / 3600);
                let currentMinutes = Math.floor((timeCurrent - (currentHours * 3600)) / 60);
                let currentSeconds = Math.floor(timeCurrent - (currentHours * 3600) - (currentMinutes * 60));
                let totalNumberOfCurentSeconds = (currentMinutes < 10 ? "0" + currentMinutes : currentMinutes) + ":" + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds);
                setTotalOfCurentTime(totalNumberOfCurentSeconds)

                // total time
                let time = Math.floor(audio.duration)
                let totalHours = parseInt(time / 3600);
                let totalMinutes = parseInt((time - (totalHours * 3600)) / 60);
                let totalSeconds = Math.floor((time - ((totalHours * 3600) + (totalMinutes * 60))));
                let totalNumberOftotalSeconds = (totalMinutes < 10 ? "0" + totalMinutes : totalMinutes) + ":" + (totalSeconds < 10 ? "0" + totalSeconds : totalSeconds);
                // $('.total_time').innerHTML = `<div class="total_time-play">${totalNumberOftotalSeconds}</div>`;
                setTotalOfTotalTime(totalNumberOftotalSeconds)
            }
        };

    }


    return (
        <>
            {/* <!-- audio-control --> */}
            <div className="container__audio">
                {/* <!-- infor sing and single --> */}
                <div className="infor__music">
                    <div className="img__played" style={{ display: Object.keys(dataInfor).length > 0 ? "block" : "none" }}>
                        <img class="img_song-play" src={dataInfor ? dataInfor.thumbnailM : ''} alt="" />

                    </div>
                    <div className="name__music">
                        <div class="desc_song-play" style={{ display: Object.keys(dataInfor).length > 0 ? "block" : "none" }}>
                            <p class="title_song-play">{dataInfor ? dataInfor.title : ''}</p>
                            <p class="title_single-play">{dataInfor ? dataInfor.artistsNames : ''}</p>

                        </div>
                    </div>
                </div>
                {/* <!-- tool control --> */}
                <div className="control">
                    <div className="audio__icon">
                        <div className="btn btn-repeat">
                            <IoMdRepeat />
                        </div>
                        <div className="btn btn-prev">
                            <IoIosSkipBackward onClick={() => {
                                  setIndexSong(currentIndex => currentIndex - 1)
                                  let type = "prev"
                                  handleToggle({value, type})
                            }} />
                        </div>
                        <div className="btn btn-toggle-play">
                            {isPlaying === true ?
                                <IoIosPause
                                    onClick={() => {
                                        let type = "pause"
                                        handleToggle({ value, type })
                                    }}
                                />
                                :
                                <IoIosPlay
                                    onClick={() => {
                                        let type = "play"

                                        handleToggle({ value, type })
                                    }}
                                />
                            }
                        </div>
                        <div className="btn btn-next">
                            <IoIosSkipForward onClick={() => {
                                console.log(dataInfor)
                                setIndexSong(currentIndex => currentIndex + 1)
                                // if (currentIndex >= dataAllTracks.length) {
                                //     currentIndex = 0;
                                // }
                                let type = "next"
                                handleToggle({value, type})
                            }} />
                        </div>
                        <div className="btn btn-random">
                            <IoMdShuffle />

                        </div>
                    </div>
                    <div className="time_music">
                        <div className="current_time">
                            <div class="current_time-play">{totalOfCurentTime}</div>

                        </div>
                        <input type="range" id="progress" className="progress" value={progressPercent} step="1" min="0" max="100" />
                        <div className="total_time">
                            <div class="total_time-play">{totalOfTotalTime}</div>

                        </div>
                    </div>
                    <audio id="audio">
                        <source className="src-audio" src='' type="audio/mpeg" />
                    </audio>
                </div>
                {/* <!-- render lyric --> */}
                <div className="render__lyric_control"> </div>
            </div>
        </>
    )
}
export default TracksPlay;