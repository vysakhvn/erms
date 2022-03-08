import React from'react';
import '../styles/ConfirmationPopup.scss';

const ConfirmationModal = ({data, confirmAction, closeModal}) => {
    

    return (
        <div className='container bgoverlay'>
            <div className='card-panel'>
                <div className='title'>
                        Confirmation
                </div>
                <div className='content'>
                    This will delete the employee record permanenentlty for ID :
                    <label>{data}</label>
                </div>
                <div className='foot'>
                    <button className='btn' onClick={closeModal}>Cancel</button>
                    <button className='btn red darken-2' onClick={() => confirmAction(data)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;