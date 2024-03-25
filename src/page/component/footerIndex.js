import React, { useState, useEffect, useRef, useContext } from 'react';

import { IoIosPause } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";
import { IoIosSkipBackward } from "react-icons/io";
import { IoIosSkipForward } from "react-icons/io";
import { IoIosSync } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { IoMdShuffle } from "react-icons/io";
function FooterIndex() {
    return (
        <div class="container__audio">
            <div class="infor__music">
                <div class="img__played" style={{display: "none"}}></div>
                <div class="name__music"></div>
            </div>
            <div className="control">
                <div className="audio__icon">
                    <div className="btn btn-repeat">
                        <IoMdRepeat />
                    </div>
                    <div className="btn btn-prev">
                        <IoIosSkipBackward />
                    </div>
                    <div className=" btn-toggle-play">
                        <IoIosPlay />
                    </div>
                    <div className="btn btn-next">
                        <IoIosSkipForward />
                    </div>
                    <div className="btn btn-random">
                        <IoMdShuffle />

                    </div>
                </div>
                <div className="time_music">
                    <input
                        type="range"
                        id="progress"
                        className="progress"
                        value="0"
                        step="1"
                        min="0"
                        max="100" />
                </div>
                <audio id="audio">
                    <source className="src-audio" src='' type="audio/mpeg" />
                </audio>
            </div>
            <div class="render__lyric_control"> </div>
        </div>
    )
}
export default FooterIndex;