/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

import React, { Component } from 'react';

import './ContactsTools.css';


/*******************************************************
 Contact Tools Component - represents some static useful 
 tools - interactives with the user's requests
********************************************************/

class ContactsTools extends Component {

    /* 
        on search-bar input value changes, re-assign
        the value in a props callback function
        that takes the value for filtering-updates the contacts results
    */
    onChange = (event) => {
        this.props.setSearchValue(event.target.value);
    }

    render() {
        return (
            <div className='tools'>
                <div className='search-btn'>
                    <i className='fas fa-search'></i>
                    <input type = 'search' onChange={this.onChange}></input>
                    <h1 className='results-count'>{this.props.results} results</h1>
                </div>
                <button className='plus-btn' onClick = {this.props.formOpenAdd} title='add new contact'>
                    <i className = 'fas fa-user-plus'></i>
                </button>
                <button className='trash-btn' title='delete all contacts' onClick={this.props.onDeleteAll}>
                    <i className='fas fa-trash-alt'></i>
                </button>
                <button className='restore-btn' title='restore all deleted contacts' onClick={this.props.onBackup}>
                    <i className='fas fa-trash-restore'></i>
                </button>
            </div>
        );
    }
}


export default ContactsTools;