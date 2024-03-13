
import { useState } from "react";
import { IoIosPause } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";
import { IoIosSkipBackward } from "react-icons/io";
import { IoIosSkipForward } from "react-icons/io";
import { IoIosSync } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { IoMdShuffle } from "react-icons/io";


function FooterIndex() {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleToggle = () => {
        setIsPlaying(!isPlaying)
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
                            {isPlaying ?
                                <IoIosPause />
                                :
                                <IoIosPlay />
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
                        <source className="src-audio" src="" type="audio/mpeg" />
                    </audio>
                </div>
                {/* <!-- render lyric --> */}
                <div className="render__lyric_control"> </div>
            </div>
        </>
    )
};
export default FooterIndex;