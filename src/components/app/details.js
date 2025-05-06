/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

import RonaldoPic from '../../images/person-2.jpg';
import JohnLockePic from  '../../images/person-4.jpg';


/*********************************************************
 details - a function with a set of contacts pre-declared
 to be as the first view as a total of 4 contacts
**********************************************************/

let staticDetails = [];

if (!JSON.parse(localStorage.getItem('firstRun')))
{
    localStorage.setItem('firstRun', JSON.stringify('isIt'));
    staticDetails = [
        {
            name: "John Locke", 
            phoneNumber: "0534789641", 
            address: "New York", 
            email: "JohnLocke@hotmail.com",
            moreDetails: "John locke - my adventure man!",
            imgSrc: JohnLockePic, 
            id: 0
        },
        {
            name: "Mahdi", 
            phoneNumber: "0544438681", 
            address: "", 
            email: "",
            moreDetails: "Mahdi, a developer, GameDev to be specific :D",
            imgSrc: "/static/media/contact_default_pic.92216697.png", 
            id: 1
        },
        {
            name: "Malek Safory", 
            phoneNumber: "0544789657", 
            address: "", 
            email: "",
            moreDetails: "Malek, without anime, he'll prefer to die !!",
            imgSrc: "/static/media/contact_default_pic.92216697.png",
            id: 2 
        },
        {
            name: "Ronaldo", 
            phoneNumber: "0522234876", 
            address: "TelAviv", 
            email: "CristianoRonaldo.offical@cr7.com", 
            imgSrc: RonaldoPic,
            id: 3  
        }
    ];

    localStorage.setItem('contacts', JSON.stringify(staticDetails));
}

export default staticDetails;