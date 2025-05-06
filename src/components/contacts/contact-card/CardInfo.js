/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

import React from 'react';

import './CardInfo.css'


/***********************************************************************
 Card Info Component, or Contact Card - represents a contact properites
 to be viewed by the user
************************************************************************/

const CardInfo = (props) => {

    // initialize new Object [contact] with the received props-> contacts
    const contact = props.contact;

    /* 
        once the user hits (close-button), a callback to a function,
        that will removes the contact-info poped-up from the document
    */
    const handleClose = () => {
        props.onClose();
    }
    
    return (
        <div className='overlay'>
            <div className='card-info-container'>
                <img src={contact.imgSrc} alt={contact.name} className='c-i-img'/>
                <h1 className='c-i-name'>{contact.name}</h1>
                <h1 className='c-i-phone'>{contact.phoneNumber}</h1>
                <h1 className='c-i-address'>{contact.address}</h1>
                <h1 className='c-i-email'>{contact.email}</h1>
                {
                    typeof contact.moreDetails !== 'undefined' ?
                        contact.moreDetails.length > 0 ? 
                            <div className='c-i-txt-container'>
                                <label>More info: </label> 
                                <h2>{contact.moreDetails}</h2> 
                            </div> : 
                        null :
                    null
                }
                <button onClick={handleClose} className='btn-close'>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    )
}

export default CardInfo;