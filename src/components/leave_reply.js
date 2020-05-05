import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import axios from 'axios';


import "../static/css/leave_reply.css";
const API_URL = process.env.REACT_APP_API_URL;


class LeaveReply extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reply_text: "",
            reply_name: "",
            reply_email: "",
            more_info_checked: false,
            submit_loading: false,
            submit_success: false,
        }
    }

    handle_reply_text_changed = (e) => {
        this.setState({reply_text: e.target.value});
    }
    handle_reply_name_changed = (e) => {
        this.setState({reply_name: e.target.value});
    }
    handle_reply_email_changed = (e) => {
        this.setState({reply_email: e.target.value});
    }

    reply_text_focused = (e) => {
        console.log("focused!");
        this.setState({more_info_checked: true});
    }
    reply_name_focused = (e) => {
        this.setState({more_info_checked: true});
    }
    reply_email_focused = (e) => {
        this.setState({more_info_checked: true});
    }

    reply_text_blurred = (e) => {
        console.log("blurred!");
        let current_text = this.state.reply_text;
        let current_name = this.state.reply_name;
        if (current_text === "" && current_name === "") {
            this.setState({more_info_checked: false});
        }
    }

    reply_name_blurred = (e) => {
        console.log("blurred!");
        let current_text = this.state.reply_text;
        if (current_text === "") {
            this.setState({more_info_checked: false});
        }
    }

    reply_submit_click = (e) => {
        console.log("submitted");
        if (!this.state.submit_loading) {

            this.setState({
                submit_success: false,
                submit_loading: true,
                more_info_checked: true
            })
            
            console.log(`name:${this.state.reply_name}, email:${this.state.reply_email}, comment:${this.state.reply_text}`)
            axios.post(`${API_URL}/new_reply`, {
                name: this.state.reply_name,
                email: this.state.reply_email || "",
                comment: this.state.reply_text || ""  
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    submit_success: true,
                    submit_loading: false
                })
            })

            
            // this.timer.current = setTimeout(() => {

            // }, 2000);
          }

        //this.setState({more_info_checked: false});
    }

    get_submit_status_classname = () => {
        if (this.state.submit_success) {
            return "submit_success";
        }
        return "";
    }

    render () {
    return (
        <div className="leave_reply_area">
            <div className="comment_text_area leave_reply_textbox">
                <TextField className="reply_textbox" label="leave a reply" multiline style = {{width: '100%'}}
                    rows={6} defaultValue="" variant="outlined" 
                    onFocus={this.reply_text_focused} onBlur={this.reply_text_blurred}
                    value={this.state.reply_text} onChange={this.handle_reply_text_changed}
                />


            </div>
            <Grow in={this.state.more_info_checked} timeout={1000}>
                <div className="more_info_area">
                    <div className="more_info_name more_info_item">
                        <TextField className="reply_name_textbox" label="name(required)"  style = {{width: '100%'}}
                                defaultValue="" variant="outlined" onFocus={this.reply_name_focused}
                                onChange={this.handle_reply_name_changed}
                        />
                    </div>
                    <div className="more_info_email more_info_item">
                        <TextField className="reply_email_textbox" label="email(optional)"  style = {{width: '100%'}}
                                defaultValue="" variant="outlined" onFocus={this.reply_email_focused}
                                onChange={this.handle_reply_email_changed}
                        />
                    </div>
                    <div className="more_info_submit more_info_item progress_button_wrapper">
                        <Button variant="outlined" color="primary" className={["reply_submit_button", this.get_submit_status_classname()].join(" ")}
                            onClick={this.reply_submit_click} disabled={this.state.submit_loading} > 
                            SUBMIT
                        </Button>
                        {this.state.submit_loading && <CircularProgress size={24}
                            className={"button_progress"} />}
                    </div>
                    
                </div>
            </Grow>
        </div>
    )}
}

export default LeaveReply;

