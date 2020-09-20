import React from 'react';
import './style.scss';
import {useDispatch, useSelector} from "react-redux";
import {hideModal} from "../../store/actions/modal";


function Modal() {

    const modal = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    if (!modal.visible) return null;

    return (
        <div className="Modal-Overlay"
             onClick={(e) => (e.target===e.currentTarget) && dispatch(hideModal())}>
            <div className="Modal-Window">
                <div className="Modal-Title">
                    {modal.title}
                </div>
                <div className="Modal-Content">
                    {modal.content}
                </div>
                <div className="Modal-Close"
                     onClick={() => dispatch(hideModal())}>
                    &times;
                </div>
            </div>
        </div>
    )
}

export default Modal;