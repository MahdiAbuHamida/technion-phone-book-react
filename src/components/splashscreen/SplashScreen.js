import React from 'react';

import './SplashScreen.css';

const SplashScreen = () => {
    const styles = [
        {'--i' :1} ,{'--i' :2},{'--i' :3},{'--i' :4},
        {'--i' :5},{'--i' :6},{'--i' :7},{'--i' :8},
        {'--i' :9}
    ];
    return (
        <div className='splash-screen-container'>
            <section>
                <div className="loader">
                    <div className="dot" style={styles[0]}></div>
                    <div className="dot" style={styles[1]}></div>
                    <div className="dot" style={styles[2]}></div>
                    <div className="dot" style={styles[3]}></div>
                    <div className="dot" style={styles[4]}></div>
                    <div className="dot" style={styles[5]}></div>
                    <div className="dot" style={styles[6]}></div>
                    <div className="dot" style={styles[7]}></div>
                    <div className="dot" style={styles[8]}></div>
                    <div className="dot" style={styles[9]}></div>
                </div>
                <h2>Getting You In ...</h2>
                <h2>Phonebook App Made By</h2>
                <h2>Mahdi & Malek</h2>
                <div className="loader">
                <div className="dot" style={styles[0]}></div>
                    <div className="dot" style={styles[1]}></div>
                    <div className="dot" style={styles[2]}></div>
                    <div className="dot" style={styles[3]}></div>
                    <div className="dot" style={styles[4]}></div>
                    <div className="dot" style={styles[5]}></div>
                    <div className="dot" style={styles[6]}></div>
                    <div className="dot" style={styles[7]}></div>
                    <div className="dot" style={styles[8]}></div>
                    <div className="dot" style={styles[9]}></div>
                </div>
            </section>
        </div>
    )
}

export default SplashScreen;