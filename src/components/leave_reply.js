import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

import "../static/css/leave_reply.css";


class LeaveReply extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reply_text: "",
            more_info_checked: false
        }
    }

    handle_reply_text_changed = (e) => {
        this.setState({reply_text: e.target.value});
    }

    reply_box_focused = (e) => {
        console.log("focused!");
        this.setState({more_info_checked: true});
    }

    reply_box_blurred = (e) => {
        console.log("blurred!");
        let current_text = this.state.reply_text;
        if (current_text === "") {
            this.setState({more_info_checked: false});
        }

    }

    render () {
    return (
        <div className="leave_reply_area">
            <div className="comment_text_area leave_reply_textbox">
                <TextField className="reply_textbox" label="leave a reply" multiline style = {{width: '100%'}}
                    rows={6} defaultValue="" variant="outlined" 
                    onFocus={this.reply_box_focused} onBlur={this.reply_box_blurred}
                    value={this.state.reply_text} onChange={this.handle_reply_text_changed}
                />


            </div>
            <Grow in={this.state.more_info_checked} timeout={1000}>
                <div className="more_info_area">
                    <div className="more_info_name more_info_item">
                        <TextField className="reply_name_textbox" label="name(required)"  style = {{width: '100%'}}
                                defaultValue="" variant="outlined"
                        />
                    </div>
                    <div className="more_info_email more_info_item">
                        <TextField className="reply_email_textbox" label="email(optional)"  style = {{width: '100%'}}
                                defaultValue="" variant="outlined"
                        />
                    </div>
                    <div className="more_info_submit more_info_item">
                        <Button variant="outlined" color="primary" className="reply_submit_button">
                            SUBMIT
                        </Button>
                    </div>
                    
                </div>
            </Grow>
        </div>
    )}
}

export default LeaveReply;

