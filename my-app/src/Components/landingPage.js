import React from 'react';
import logo from '../shared/images/CCLogo.png';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const LandingPage = () => {
    return(
        <div className='landingPage'>
            <div className='bannerArea'>
                <img className='bigLogo' src={logo}/>
                <h3>Join Clean Collective</h3>
                <p>Get more features and privileges by joining the most helpful community</p>
            </div>
            <div className='landingPageButtons'>
                <p>Explore features of our knowledge and matching software</p>
                
                <Link to={"/forum"} className="nav-link">
                    <button type='submit' className='buttonGreenBig landingFont'>Questions & Answers</button>
                </Link>
                <Link to={"/FAQ"} className="nav-link">
                    <button type='submit' className='buttonGreenBig landingFont'>FAQs</button>
                </Link>
                <Link to={"/register"} className="nav-link">
                    <button type='submit' className='buttonGreenBig landingFont'>Meet The Team</button>
                </Link> 
            </div>
            <div className='bigBlock'>
                <div className='adoptor'>
                    <h3>Adoptor</h3>
                    <p>This text is just a placeholder for the infomation that will be displayed here in the future. This website is still a work in progress. Please be patient while our developers work on this website.</p>
                </div> 
                <div className='innovator'>
                    <h3>Innovator</h3>
                    <p>This text is just a placeholder for the infomation that will be displayed here in the future. This website is still a work in progress. Please be patient while our developers work on this website.</p>
                </div>  
                <Link to={"/register"} className="nav-link getStarted">
                    <button className='landingButton'>Get Started</button>
                </Link>
            </div>
            <div className='twoBoxes'>
                <div className='box1'>

                </div>
                <div className='box2'>
                    
                </div>
            </div>
        </div>
    );
};

export default LandingPage;