/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

import React, { useState } from 'react';

import './AddEditContactForm.css';
import logo from '../../images/contact_default_pic.png';

import validation from './AddContactValidation';


/************************************************************
 Add Contact Form Component - represents the form for adding 
 a new contacts by the user, takes the inputs to be delivered
 to the App Component to handle the rest of the proccess
*************************************************************/

const AddContactForm  = (props) => {

    const [contact, setContact] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        email: '',
        moreDetails: '',
        imgSrc: logo
    });

    const [errors, setErrors] = useState({});

    /* 
        once the user hits (add-contact-button), this function
        gets called, so it checks the user's input values
        validation, validate -> callback to function means
        adding the contact fields is succeeded and now move
        to another step
    */
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(contact));

        // check if there's no errors
        if (checkErros(errors))
        {
            props.closeForm();
            props.onSubmitNewContact(contact);
            setContact({});
        }
    }

    // method checks the error array fields
    const checkErros = (errors) => {
        if (typeof errors === 'undefined' || Object.keys(errors).length === 0)
        {
            return false;
        }
        for (const p in errors)
        {
            if (typeof errors[p] === 'undefined' || errors[p].length !== 0)
            {
                return false;
            }
        }
        return true;
    }

    /* 
        method updates the current contact being to be added
        properties, according to user's input values
    */
    const handleChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        });
    }

    // method handles uploading an image from the user's current local device
    const handleImage = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            // the image upload operation is complete
            if (reader.readyState === 2)
            {
                setContact({
                    ...contact,
                    imgSrc: reader.result
                });
            }
        }
        reader.readAsDataURL(event.target.files[0])
    }

    return (
        <div className='overlay'>
            <form onSubmit={handleFormSubmit}>
                <h1>Contact Details</h1>
                <div className='form-control'>
                    <label>Name:</label>{typeof errors.name !== 'undefined' 
                    ? errors.name !== '' ? <p className='error'>{errors.name}</p>
                    : <i className='fas fa-check-circle'></i> : ''}
                    <input name='name' type='text' placeholder='ex: Ronaldo'
                     value={contact.name} onChange={handleChange}/>
                </div>
                    
                <div className='form-control'>
                    <label>Phone number:</label>{typeof errors.phoneNumber !== 'undefined'
                    ? errors.phoneNumber !== '' ? <p className='error'>{errors.phoneNumber}</p>
                    : <i className='fas fa-check-circle'></i> : ''}
                    <input name='phoneNumber' type='text' placeholder='ex: 0545967845'
                    value={contact.phoneNumber} onChange={handleChange}/>
                </div>
                    
                <div className='form-control'>
                    <label>Address:</label>{typeof errors.address !== 'undefined'
                    ? errors.address !== '' ?<p className='error'>{errors.address}</p>
                    : <i className='fas fa-check-circle'></i> : ''}
                    <input name='address' type='text' placeholder='ex: Tel-Aviv ...'
                    value={contact.address} onChange={handleChange}/>
                </div>
                    
                <div className='form-control'>
                    <label>Email:</label>{typeof errors.email !== 'undefined'
                    ? errors.email !== '' ? <p className='error'>{errors.email}</p>
                    : <i className='fas fa-check-circle'></i> : ''}
                    <input name='email' type='email' placeholder='ex: Ronaldo@gmail.com'
                    value={contact.email} onChange={handleChange}/>
                </div>

                <div className='form-control-txt'>
                    <label htmlFor='text' className='txt-label'>More information about this contact:</label>
                    <textarea name='moreDetails' rows='4' cols='50' onChange={handleChange.bind(this)}></textarea>
                </div>
                    
                <div className='form-control-img'>
                    <label htmlFor='imageInput' className='image-label'>Choose contact picture</label>
                    <input type='file' className='image-input' name='imgSrc' id='imageInput' accept='image/*' onChange={handleImage} />
                </div>

                <img className='imagePreview' src={contact.imgSrc} 
                alt={contact.name || ''} width='50px' height='50px'/>

                <div className='submitting'>
                    <button className='add-save-contact' type='submit'>Add Contact</button>
                    <button type='button' className='cancel-btn'
                    onClick = {props.closeForm}>Cancel</button>
                </div>

                <span className='msg-success'></span>
            </form>
        </div>
    );
}

export default AddContactForm;