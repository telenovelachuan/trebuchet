import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import scroll_down from "../static/images/scroll_down.png";


class ScrollDown extends Component {

    scroll_on_click = (e) => {
        console.log("clicked!");
    }

    render () {
    return (
        <div className={this.props.visible === true ? "scroll_down_area_visible": "scroll_down_area_invisible"}>
            <div id="scroll_down_div">
                <IconButton onClick={this.scroll_on_click()}>
                    <Avatar src={scroll_down} className="schroll_down_icon" />
                </IconButton>
            </div>
        </div>
    )}
}

export default ScrollDown;

