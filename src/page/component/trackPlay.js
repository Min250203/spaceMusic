import React, { useState, useEffect, useRef, useContext } from 'react';

import { IoIosPause } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";
import { IoIosSkipBackward } from "react-icons/io";
import { IoIosSkipForward } from "react-icons/io";
import { IoIosSync } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { IoMdShuffle } from "react-icons/io";
import { useLocation } from 'react-router-dom';

function TracksPlay({ value }) {
    console.log(value)

    const END_POINT = process.env.REACT_APP_END_POINT;
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCheck, setIsCheck] = useState(true);
    const [trackUrl, setTrackUrl] = useState('');
    const location = useLocation();
    const audioRef = useRef(new Audio());

    const user = useContext(AudioContext);


    const handleToggle = ({ value, type }) => {
        const audioElement = document.getElementById('audio');
        // if (isCheck === true && audioRef.current) {
        // audioRef.current.play();
        console.log(value, type)
        if (type === "pause") {
            console.log("audioRef.current", audioRef.current)
            console.log("value", value)
            console.log("PPPPPPPPPPPPPPPPPPPPPPP")
            value.pause();
        } else {
            console.log("MMMMMMMMMMMMMM")
            value.play();
            console.log(value)
        }
        setIsPlaying(!isPlaying)

    }

    useEffect(() => {
        if (value !== null) {
            setIsPlaying(!isPlaying)
        }

    }, [value])


    const handlePlay = (prop) => {
        // // when click btn
        // playBtn.onclick = function () {
        //     if (_this.isPlaying) {
        //         audio.pause();
        //     } else {
        //         audio.play();
        //     }
        // };

        // // play song
        // audio.onplay = function (prop) {
        //     _this.isPlaying = true;
        //     playBtn.classList.add('playing');
        //     if (_this.dataNewlyLunched.type === "newly-play") {
        //     } else {
        //         $(`.content__sing-wrap[data-Index="${_this.currentIndex}"]`).querySelector('.icon_pause-tracks').style.display = "block";
        //         $(`.content__sing-wrap[data-Index="${_this.currentIndex}"]`).querySelector('.icon_play-tracks').style.display = "none";
        //     }
        // };

        // // pause song
        // audio.onpause = function (prop) {
        //     _this.isPlaying = false;
        //     playBtn.classList.remove('playing');
        //     if (_this.dataNewlyLunched.type = "newly-play") {
        //     } else {
        //         $(`.content__sing-wrap[data-Index="${_this.currentIndex}"]`).querySelector('.icon_pause-tracks').style.display = "none";
        //         $(`.content__sing-wrap[data-Index="${_this.currentIndex}"]`).querySelector('.icon_play-tracks').style.display = "block";
        //     }
        // };

        // // update time for progress
        // audio.ontimeupdate = function () {
        //     if (audio.duration) {
        //         // 
        //         const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        //         progress.value = progressPercent;

        //         // current Time
        //         let timeCurrent = Math.floor(audio.currentTime)
        //         let currentHours = Math.floor(timeCurrent / 3600);
        //         let currentMinutes = Math.floor((timeCurrent - (currentHours * 3600)) / 60);
        //         let currentSeconds = Math.floor(timeCurrent - (currentHours * 3600) - (currentMinutes * 60));
        //         let totalNumberOfCurentSeconds = (currentMinutes < 10 ? "0" + currentMinutes : currentMinutes) + ":" + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds);
        //         $('.current_time').innerHTML = `<div className="current_time-play">${totalNumberOfCurentSeconds}</div>`;


        //         if (!_this.dataNewlyLunched.lyric) {
        //             const isExitLyric = _this.fullLyric[timeCurrent];
        //             const renderLyricControl = document.querySelector(`.lyric_control_${timeCurrent}`);
        //             if (isExitLyric && timeCurrent !== _this.currentLyric) {
        //                 renderLyricControl.style.color = "#1ed760";
        //                 renderLyricControl.classList.add('isPlayed');
        //                 // const autoRemoveId = setTimeout(function () {
        //                 //     renderLyricControl.style.display = "none";
        //                 // }, timeCurrent + 6000);

        //                 // const htmRenderlLyric = _this.showLyric.slice(_this.indexLyric, _this.indexLyric + 2).map(key => (
        //                 //     `<p className="lyric_control_${key} content__lyric_control" data-time = ${key}>${_this.fullLyric[key]}</p>`
        //                 // ))
        //                 // $('.render__lyric_control').innerHTML = htmRenderlLyric.join('');

        //                 if (_this.indexLyric - 1 >= 0) {
        //                     const el = document.querySelector(`.lyric_control_${_this.showLyric[_this.indexLyric - 1]}`);
        //                     if (el) {
        //                         el.style.display = "none";
        //                     }
        //                 }
        //                 _this.currentLyric = timeCurrent;
        //                 _this.indexLyric++;
        //             }
        //         } else {
        //             const isExitLyric = _this.dataNewlyLunched.lyric[timeCurrent];
        //             const renderLyricControl = document.querySelector(`.lyric_control_${timeCurrent}`);
        //             if (isExitLyric && timeCurrent !== _this.currentLyric) {
        //                 renderLyricControl.style.color = "#1ed760";
        //                 renderLyricControl.classList.add('isPlayed');
        //                 // const autoRemoveId = setTimeout(function () {
        //                 //     renderLyricControl.style.display = "none";
        //                 // }, timeCurrent + 6000);

        //                 // const htmRenderlLyric = _this.showLyric.slice(_this.indexLyric, _this.indexLyric + 2).map(key => (
        //                 //     `<p className="lyric_control_${key} content__lyric_control" data-time = ${key}>${_this.fullLyric[key]}</p>`
        //                 // ))
        //                 // $('.render__lyric_control').innerHTML = htmRenderlLyric.join('');

        //                 if (_this.indexLyric - 1 >= 0) {
        //                     const el = document.querySelector(`.lyric_control_${_this.dataNewlyLunched.showLyric[_this.indexLyric - 1]}`);
        //                     if (el) {
        //                         el.style.display = "none";
        //                     }
        //                 }
        //                 _this.currentLyric = timeCurrent;
        //                 _this.indexLyric++;
        //             }
        //         }

        //         // total time
        //         let time = Math.floor(audio.duration)
        //         let totalHours = parseInt(time / 3600);
        //         let totalMinutes = parseInt((time - (totalHours * 3600)) / 60);
        //         let totalSeconds = Math.floor((time - ((totalHours * 3600) + (totalMinutes * 60))));
        //         let totalNumberOftotalSeconds = (totalMinutes < 10 ? "0" + totalMinutes : totalMinutes) + ":" + (totalSeconds < 10 ? "0" + totalSeconds : totalSeconds);
        //         $('.total_time').innerHTML = `<div className="total_time-play">${totalNumberOftotalSeconds}</div>`;
        //     }
        // };

        // // khi tua song
        // progress.onchange = function (e) {
        //     const seekTime = audio.duration / 100 * e.target.value;
        //     audio.currentTime = seekTime;
        // };

        // // khi next bài hát
        // btnNext.onclick = function () {
        //     if (_this.isRandom) {
        //         _this.randomSong();
        //     } else {
        //         _this.nextSong();
        //     }
        //     audio.play();

        // };

        // // // khi prev bài hát
        // btnPrev.onclick = function () {
        //     if (_this.isRandom) {
        //         _this.randomSong();
        //     } else {
        //         _this.prevSong();
        //     }
        //     audio.play();
        // }

        // // // khi random bài hát
        // btnRandom.onclick = function () {
        //     if (!_this.isRandom) {
        //         _this.isRandom = true;
        //         btnRandom.classList.add("btnActive");
        //     } else {
        //         _this.isRandom = false;
        //         btnRandom.classList.remove("btnActive");
        //     }
        // }

        // // // Xử lý next song khi ended bài hát
        // audio.onended = function () {
        //     if (_this.isRepeat) {
        //         audio.play();
        //     } else {
        //         _this.nextSong();
        //         audio.play();
        //     }
        //     // Hoặc dùng click --> btnNext.click(); --> vậy là nó tự động click luôn
        // }


        // // // Xử lý phats lại 1 bài hát
        // btnRepeat.onclick = function () {
        //     _this.isRepeat = !_this.isRepeat;
        //     btnRepeat.classList.toggle('btnActive', _this.isRepeat);
        // }

    }
    return (
        <>
            {/* <!-- audio-control --> */}
            <div className="container__audio">
                {/* <!-- infor sing and single --> */}
                <div className="infor__music">
                    <div className="img__played"></div>
                    <div className="name__music"></div>
                </div>
                {/* <!-- tool control --> */}
                <div className="control">
                    <div className="audio__icon">
                        <div className="btn btn-repeat">
                            <IoMdRepeat />
                        </div>
                        <div className="btn btn-prev">
                            <IoIosSkipBackward />
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
                            <IoIosSkipForward />
                        </div>
                        <div className="btn btn-random">
                            <IoMdShuffle />

                        </div>
                    </div>
                    <div className="time_music">
                        <div className="current_time"></div>
                        <input type="range" id="progress" className="progress" value="0" step="1" min="0" max="100" />
                        <div className="total_time"></div>
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