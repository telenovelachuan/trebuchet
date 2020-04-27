import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

import '../static/css/App.css';
import "../static/css/about.css";

function About() {
    return (
        <div className="content">
            <ScrollAnimation animateIn="fadeInUp" animateOut='fadeOutUp' duration={3}>
                <div id="self_intro">
                    <div id="intro_photo">

                    </div>
                    <div id="intro_text">
                        
                    </div>
                </div>
                
            </ScrollAnimation>

            <ScrollAnimation animateIn="fadeInUp" animateOut='fadeOutUp' duration={3}>
                <div className="about_me">
                    second paragraph
                </div>
                
            </ScrollAnimation>

            
        </div>
    );
}

export default About;
