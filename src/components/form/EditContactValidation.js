/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

let errors = {};

const validation = (contact, oldPhoneNumber) => {
    nameValidation(contact.name);
    phoneNumberValidation(contact.phoneNumber, oldPhoneNumber);
    addressValidation(contact.address);
    emailValidation(contact.email);
    return errors;
}

function nameValidation(name){
    if (!name)
    {
        errors.name = 'Name cannot be empty.';
    }
    else 
    {
        let nameRegex = /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/;
        if (!nameRegex.test(name))
        {
            errors.name = 'Name is invalid.';       
        }
        else 
        {
            errors.name = '';
        }
    }
}

function phoneNumberValidation(phoneNumber, oldPhoneNumber) {
    if (typeof phoneNumber === 'undefined' || phoneNumber.length === 0) 
    {
        errors.phoneNumber = 'Phone number cannot be empty.';
        return;
    }
    const numberRegex = /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|([71,72,73,74,75,76,77]{2}\d{7})|[5]{1}\d{8})$/;
    if (!numberRegex.test(phoneNumber))
    {
        errors.phoneNumber = 'Phone number is invalid.';
        return;
    }
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    let flag = true;
    errors.phoneNumber = 'Phone number already been assiocated with another contact';
    contacts.forEach(contact => {
        if (contact.phoneNumber === phoneNumber && phoneNumber !== oldPhoneNumber)
        {
            flag = false;
        }
    });
    if (flag)
    {
        errors.phoneNumber = '';
    }
}

function addressValidation(address) {
    if (address)
    {
        let addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        if (!addressRegex.test(address))
        {
            errors.address = 'Address is invalid.'
        }
        else 
        {
            errors.address = '';
        }
    }
}

function emailValidation(email) {
    if (email)
    {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email))
        {
            errors.email = 'Email address is invalid.';
        }
        else 
        {
            errors.email = '';
        }
    }
}

export default validation;