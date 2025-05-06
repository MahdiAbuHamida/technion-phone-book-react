/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

import React, { Component } from 'react';

import './ContactsContainer.css'

import ContactCard from '../contact-card/ContactCard';


/************************************************************************
 Contacts Container Component - represents the main container of all the
 current viewable contacts from the user's side 
*************************************************************************/

class ContactsContainer extends Component {
    render() {
        let tContacts = this.props.contacts;
        tContacts = tContacts.map((contact) => (
            <ContactCard contact={contact} key={contact.id} 
            onDeleteContact={this.props.onDeleteContact} 
            openEditContact={this.props.openEditContact} 
            onEditContact={this.props.onEditContact}
            onContactInfo={this.props.onContactInfo}/>
        ));

        return (
            <div className = 'contacts-container'>
                <div className = 'table'>
                    <div className = 'contacts-header'>
                        <i className="fas fa-portrait"  title='contact picture'></i>
                        <h1 title='contact name'>Name</h1>
                        <h1 title='edit contacts'>Tools</h1>
                    </div>
                    <div className='contacts-list'>
                        {tContacts.length > 0 ? tContacts : <h1 className='txt-no-results'>No results</h1>}
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactsContainer;