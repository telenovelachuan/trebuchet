import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {  animateScroll as scroll } from 'react-scroll';

import scroll_down from "../static/images/scroll_down.png";




class ScrollDown extends Component {

    scroll_more = () => {
        scroll.scrollMore(300, {duration: 500 ,smooth: true});
    }

    scroll_on_click = (e) => {
        console.log("clicked!");
        this.scroll_more();
    }

    render () {
    return (
        <div className={this.props.visible === true ? "scroll_down_area_visible": "scroll_down_area_invisible"}>
            <div id="scroll_down_div" onClick={this.scro}>
                <IconButton onClick={this.scroll_on_click} className="scroll_down_button">
                    <Avatar src={scroll_down} className="schroll_down_icon" />
                </IconButton>
            </div>
        </div>
    )}
}

export default ScrollDown;

