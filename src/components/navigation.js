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
import MachineLearning from "./machine_learning";
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LeaveReply from './leave_reply';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';


import "../static/css/navigation.css";
import nav_json from './config/nav.json';

//var get_all_access = require('../db/sqlite').get_all_access;
const API_URL = process.env.REACT_APP_API_URL;

function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div role="tabpanel" hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        className="tab_content"
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


class Footer extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      expanded: this.props.contact_me_expanded,
      anchorEl: null,
    };
    this.footer_text = <div><div className="footer_text">Copyright © 2020 Chuan Sun. All Rights Reserved | Handcrafted with Node.js
          </div>
          <div className="footer_contact_area">
            <Button variant="outlined" color="primary" className="footer_contact_button"
              onClick={e => this.contact_me_click(e)} >
              CONTACT ME
            </Button>
          </div></div>
    this.footer_contact = <div className="footer_epd">
        <LeaveReply />
      </div>
  }

  toggle_expansion = (is_expanded) => {
    this.setState({expanded: is_expanded});
    this.props.update_divider(is_expanded);  
    this.props.toggle_contact_me_expanded(is_expanded);
  }

  contact_me_click = e => {
    let current_expanded = this.state.expanded;
    let entire_footer = document.getElementById("entire_footer");
    this.setState({expanded: !current_expanded, anchorEl: entire_footer});  
    this.props.toggle_contact_me_expanded(!current_expanded);
    this.props.update_divider(!current_expanded);  
  }  

  componentDidMount() {
    this.props.setToggle(this.toggle_expansion);
 }
    
  render() {
    console.log("anchorEL:");
    console.log(this.state.anchorEl);
    return (
      <div id="entire_footer">
        <Popper open={this.state.expanded} anchorEl={this.state.anchorEl}
            className="footer_contact_popper" placement={"top"} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350} className="footer_contact_fade">
            <Paper>
              {this.footer_contact}
            </Paper>
          </Fade>
        )}
      </Popper>
        <div className="footer_area" >
          {this.footer_text}
        </div>
      </div>
    )
  }
}

let scroller_visible = false;
let contact_me_expanded = false;
let toggleExpansion = (param) => {
  //empty
}
const toggle_contact_me_expanded = is_expanded => {
  contact_me_expanded = is_expanded;
}
const ComponentToTrack = ({ isVisible, toggle_visibility, toggle_divider }) => {
  if (isVisible !== scroller_visible) {
    toggle_visibility(isVisible);
    scroller_visible = isVisible;
    if (contact_me_expanded === true) {
      contact_me_expanded = false;
      toggleExpansion(false);
    }
  }
  return <Footer update_divider={toggle_divider} toggle_contact_me_expanded={toggle_contact_me_expanded}
    setToggle={func => toggleExpansion = func}
  />;
}

class Navigation extends Component {

  constructor(props) {
    //const [value, setValue] = React.useState(0);
    super(props);
    this.state =  {
      tab_value: 0,
      scrolled_to_bottom: false,
      footer_expanded: false,
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
    toggle_footer_expansion = (is_expanded) => {
      console.log("in toggle_footer_expansion ", is_expanded);
      if (is_expanded) {
        this.setState({footer_expanded: true});
      }
      else {
        this.setState({footer_expanded: false});
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
                <TabPanel classes="nav_tab_panel" value={this.state.tab_value} index={0} dir={"rtl"} >
                    <About toggleScrollDownVisibility={this.toggleScrollDownVisibility} />
                </TabPanel>
                <TabPanel value={this.state.tab_value} index={1} dir={"rtl"}>
                    <MachineLearning />
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
        
        {
            (this.state.footer_expanded === false) && <Divider light />
        }

        <TrackVisibility>
          {/* <Footer scrolled_to_bottom={this.state.scrolled_to_bottom}
            toggle_scroll_display={this.toggle_scroll_display} isExpanded={this.state.footer_expanded}
            toggle_expanded={this.toggle_footer_expansion}
          /> */}
          <ComponentToTrack toggle_visibility={this.toggle_scroll_display} toggle_divider={this.toggle_footer_expansion}/>
        </TrackVisibility>

        <ScrollDown visible={!this.state.scrolled_to_bottom} />
    </div>
  )};
}

export default Navigation;
