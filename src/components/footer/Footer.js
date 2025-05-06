/*************************************************
 Code Written By: Mahdi Abu Hamida & Malek Safory
**************************************************/

import React from 'react';


/************************************************************************
 Footer Component - respresents the bottom-low footer of the application
*************************************************************************/

const Footer = props => {
    const {year, developers} = props;
    return (
        <footer>
            &copy; {year} {developers}
        </footer>
    );
}

export default Footer;