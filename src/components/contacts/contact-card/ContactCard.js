/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

import React, { Component } from 'react';

import './ContactCard.css';


/******************************************************
 Contact Card Component - represents a contact properites
 with some accessable interactions for the user
*******************************************************/

export default class ContactCard extends Component {
    

    /*
     once the user click on (delete-contact-button),
     prevents page from any refresh event and then calls
     a function to handle the main delete-contact progress
     with a sent contact to be deletd
    */
    handleDeleteContact = (event) => {
        event.preventDefault();
        this.props.onDeleteContact(this.props.contact);
    }

    /*
     once the user click on (edit-contact-button),
     prevents page from any refresh event and then calls
     a function to handle the main edit-contact progress
     with a sent contact to be edited
    */
    handleEditContact = (event) => {
        event.preventDefault();
        this.props.onEditContact(this.props.contact);
    }

    /*
     once the user click on (contact-info-button),
     prevents page from any refresh event and then calls
     a function to handle the main open-contact-info progress
     with a sent contact to be viewed
    */
    handleContactInfo = (event) => {
        event.preventDefault();
        this.props.onContactInfo(this.props.contact);
    }

    render() {
        return (
            <div className='contact-card'>
                <div className='cc-img'>
                    <img src={this.props.contact.imgSrc} alt='@' width='50px' height='50px'/>
                </div>
                <div className='cc-name'>
                    <h1>{this.props.contact.name}</h1>
                </div>
                <div className='cc-tools'>
                    <button onClick={this.handleDeleteContact} className='cc-trash-btn' title='click to remove this contact' id={this.props.contact.phoneNumber}>
                        <i className='fas fa-trash-alt'></i>
                    </button>
                    <button onClick={this.handleEditContact} type='button' className='cc-edit-btn' title='click to edit this contact'>
                        <i className='fas fa-user-edit'></i>
                    </button>
                    <button className='cc-info' onClick={this.handleContactInfo} type='button'>
                        <i className="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
        );
    }
}