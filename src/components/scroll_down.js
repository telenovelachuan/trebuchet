import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';

import scroll_down from "../static/images/scroll_down.png";


class ScrollDown extends Component {


    render () {
    return (
        <div className={this.props.visible === true ? "scroll_down_area_visible": "scroll_down_area_invisible"}>
            <div id="scroll_down_div">
                <Avatar src={scroll_down} className="schroll_down_icon" />
            </div>
        </div>
    )}
}

export default ScrollDown;

