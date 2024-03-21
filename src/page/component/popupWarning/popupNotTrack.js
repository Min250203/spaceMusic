import React from 'react';
import { BiSolidMessageAltError } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";


function PopupNotTrack({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="popup_track">
            <div className="popup-content">
                <AiOutlineCloseCircle className='icon__close_msg' onClick={onClose} />

                <div className='infor_message'>
                    <BiSolidMessageAltError className='icon__msg' />
                    <p className='text_message'>Bài bát chưa được cập nhật!</p>
                </div>
            </div>
        </div>
    );
}

export default PopupNotTrack;