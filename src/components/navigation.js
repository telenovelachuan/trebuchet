import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import avatar_pic from "../static/images/avatar.jpg";
// import avatar_pic2 from "../static/images/me.jpg";
import linkedin_logo from "../static/images/linkedin.png";
import github_logo from "../static/images/github.png";
import email_logo from "../static/images/email.png";
import About from "./about"
import axios from 'axios';
import localIpUrl from 'local-ip-url';
import ScrollDown from "./scroll_down"
import Divider from '@material-ui/core/Divider';
import TrackVisibility from 'react-on-screen';


import "../static/css/navigation.css";
import nav_json from './config/nav.json';

//var get_all_access = require('../db/sqlite').get_all_access;
const API_URL = process.env.REACT_APP_API_URL;

function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
      >
        {value === index && (
          <Box p={3}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

let current_visibility = false;
const Footer = ({ isVisible, toggle_scroll_display }) => {
    if (current_visibility !== isVisible) {
      toggle_scroll_display(isVisible);
      current_visibility = isVisible;
    }
    return (
      <div className="footer_area" >
        Copyright © 2020 Chuan Sun. All Rights Reserved | Handcrafted with Node.js
      </div>
    );
}

class Navigation extends Component {

  constructor(props) {
    //const [value, setValue] = React.useState(0);
    super(props);
    this.state =  {
      tab_value: 0,
      scrolled_to_bottom: false,
    };
  }

    navChange = (event, newValue) => {
      console.log("navchange:" + newValue);
      this.setState({"tab_value": newValue});
    };

    sc_ntwk_logo_click = (logo_name) => {
      if (logo_name === "linkedin") {
        window.open("https://www.linkedin.com/in/chuan-sun-2868646b/", '_blank');
      }
      else if (logo_name === "github") {
        window.open("https://github.com/telenovelachuan", '_blank');
      }
      else if (logo_name === "email") {
        window.open("mailto:chuansun.sc@gmail.com", '_blank');
      }
    };

    toggleScrollDownVisibility = (newValue) => {
      this.setState({"scroll_down_visible": newValue});
    }

    load_nav_tabs = () => {
      return nav_json["tabs"];
    }

    toggle_scroll_display = (is_footer_visible) => {
      console.log("hhhhh, " + is_footer_visible);
      if (is_footer_visible) {
        this.setState({scrolled_to_bottom: true});
      }
      else {
        this.setState({scrolled_to_bottom: false});
      }
    }
    
    componentDidMount() {
      // add visit entry
      axios.post(`${API_URL}/new_access_entry`, { client_ip: localIpUrl('public')})
      .then(res => {
        //console.log("add entry api returns: " + res);
        console.log(res.data);
      })      
    }

    
    render() {
  return (
    <div className="navigation" >
        <div className="avatar_panel">
            <div className="avatar_panel_upper">
                <div className="avatar_area">
                    <Avatar src={avatar_pic} className={"main_avatar"} />
                </div>
                <div className="main_intro">
                    <div className="main_name">Chuan Sun</div>
                    <div className="main_subintro">
                        Data Science, <br /> Data Engineering
                    </div>
                    <br />
                    <div id="social_ntwk_area">
                        <div className="sc_ntwk_logo">
                            <IconButton onClick={()=>this.sc_ntwk_logo_click("linkedin")}>
                                <Avatar src={linkedin_logo} style={{alignSelf: 'center'}} />
                            </IconButton>
                        </div>
                        <div className="sc_ntwk_logo">
                            <IconButton onClick={()=>this.sc_ntwk_logo_click("github")}>
                                <Avatar src={github_logo} style={{alignSelf: 'center'}} />
                            </IconButton>
                        </div>
                        <div className="sc_ntwk_logo">
                            <IconButton onClick={()=>this.sc_ntwk_logo_click("email")}>
                                <Avatar src={email_logo} style={{alignSelf: 'center'}} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        {/* <div className="navigation_bar"> */}
            <AppBar position="static" style={{ background: '#FFFFFF' }} >
                <Tabs 
                    value={this.state.tab_value}
                    onChange={this.navChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                >

                  {
                    this.load_nav_tabs().map((tab, idx) => (
                      <Tab label={tab}  className={this.state.tab_value === idx ? "active_nav_tab" : "inactive_nav_tab"}/>
                    ))
                  }
                </Tabs>
            </AppBar>

            <SwipeableViews slideStyle={{ overflow: 'hidden'}} axis={'x'} index={this.state.tab_value} onChangeIndex={this.andleChangeIndex} hysteresis={0.01} >
                <TabPanel className="nav_tab_panel" value={this.state.tab_value} index={0} dir={"rtl"} >
                    <About toggleScrollDownVisibility={this.toggleScrollDownVisibility} />
                </TabPanel>
                <TabPanel value={this.state.tab_value} index={1} dir={"rtl"}>
                    Item Two
                </TabPanel>
                <TabPanel value={this.state.tab_value} index={2} dir={"rtl"}>
                    Item Three
                </TabPanel>
                <TabPanel value={this.state.tab_value} index={3} dir={"rtl"}>
                    Item Four
                </TabPanel>
                <TabPanel value={this.state.tab_value} index={4} dir={"rtl"}>
                    Item Five
                </TabPanel>
            </SwipeableViews>
        {/* </div> */}

        <Divider light />

        <TrackVisibility>
          <Footer scrolled_to_bottom={this.state.scrolled_to_bottom} toggle_scroll_display={this.toggle_scroll_display} />
        </TrackVisibility>

        <ScrollDown visible={!this.state.scrolled_to_bottom} />
    </div>
  )};
}

export default Navigation;
