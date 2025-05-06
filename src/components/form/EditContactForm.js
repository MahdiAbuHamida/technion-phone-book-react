/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

import React, { useState } from 'react';

import './AddEditContactForm.css';

import validation from './EditContactValidation';

/**************************************************************
 Edit Contact Form Component - represents the form for editing
 a contact by the user, takes the inputs to be delivered to the 
 App Component to handle the rest of the proccess
***************************************************************/

const EditContactForm  = ({contact, closeForm, onSubmitEditContact}) => {

    const [Contact, setContact] = useState({
        name: contact.name,
        phoneNumber: contact.phoneNumber,
        address: contact.address,
        email: contact.email,
        moreDetails: contact.moreDetails,
        imgSrc: contact.imgSrc
    });

    const oldPhoneNumber = contact.phoneNumber;
    const edtId = contact.id;

    const [errors, setErrors] = useState({});


    /* 
        once the user hits (save-changes-button), this function
        gets called, so it checks the user's input values
        validation, validate -> callback to function means
        editing the contact fields is succeeded and now move
        to another step
    */
    const handleFormSubmit = (event) => {
        
        // to prevent page's refresh
        event.preventDefault();
        setErrors(validation(Contact, oldPhoneNumber));

        // check if there's no errors
        if (checkErros(errors))
        {
            closeForm();
            onSubmitEditContact(Contact, oldPhoneNumber, edtId);
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
        method updates the current contact being to be edited
        properties, according to user's input values
    */
    const handleChange = (event) => {
        setContact({
            ...Contact,
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
                    ...Contact,
                    imgSrc: reader.result
                });
            }
        }
        reader.readAsDataURL(event.target.files[0])
    }

    return (
        <div className='overlay'>
            <form onSubmit={handleFormSubmit}>
                <h1>Edit Contact Details</h1>
                <div className='form-control'>
                    <label>Name:</label>{typeof errors.name !== 'undefined' 
                    ? errors.name !== '' ? <p className='error'>{errors.name}</p>
                    : <i className='fas fa-check-circle'></i> : ''}
                    <input name='name' type='text' placeholder='ex: Ronaldo'
                     value={Contact.name} onChange={handleChange}/>
                </div>
                    
                <div className='form-control'>
                    <label>Phone number:</label>{typeof errors.phoneNumber !== 'undefined'
                    ? errors.phoneNumber !== '' ? <p className='error'>{errors.phoneNumber}</p>
                    : <i className='fas fa-check-circle'></i> : ''}
                    <input name='phoneNumber' type='text' placeholder='ex: 0545967845'
                    value={Contact.phoneNumber} onChange={handleChange}/>
                </div>
                    
                <div className='form-control'>
                    <label>Address:</label>{typeof errors.address !== 'undefined'
                    ? errors.address !== '' ?<p className='error'>{errors.address}</p>
                    : <i className='fas fa-check-circle'></i> : ''}
                    <input name='address' type='text' placeholder='ex: Tel-Aviv ...'
                    value={Contact.address} onChange={handleChange}/>
                </div>
                    
                <div className='form-control'>
                    <label>Email:</label>{typeof errors.email !== 'undefined'
                    ? errors.email !== '' ? <p className='error'>{errors.email}</p>
                    : <i className='fas fa-check-circle'></i> : ''}
                    <input name='email' type='text' placeholder='ex: Ronaldo@gmail.com'
                    value={Contact.email} onChange={handleChange}/>
                </div>

                <div className='form-control-txt'>
                    <label htmlFor='text' className='txt-label'>More information about this contact:</label>
                    <textarea name='moreDetails' rows='4' cols='50' onChange={handleChange.bind(this)}
                    value={Contact.moreDetails}></textarea>
                </div>
                    
                <div className='form-control-img'>
                    <label htmlFor='imageInput' className='image-label'>Choose Contact picture</label>
                    <input type='file' className='image-input' 
                    name='imgSrc' id='imageInput' accept='image/*' 
                    onChange={handleImage} />
                </div>

                <img className='imagePreview' src={Contact.imgSrc} 
                alt={Contact.name || ''} width='50px' height='50px'/>

                <div className='submitting'>
                    <button className='add-save-Contact' type='submit'>Save Changes</button>
                    <button type='button' className='cancel-btn'
                    onClick = {closeForm}>Cancel</button>
                </div>

                <span className='msg-success'></span>
            </form>
        </div>
    );
}

export default EditContactForm;