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
import ins_logo from "../static/images/ins.png";
import About from "./about"
import axios from 'axios';
import localIpUrl from 'local-ip-url';
import ScrollDown from "./scroll_down"
import Divider from '@material-ui/core/Divider';
import TrackVisibility from 'react-on-screen';
import MachineLearning from "./machine_learning";
import Button from '@material-ui/core/Button';
import LeaveReply from './leave_reply';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import DataVisualization from "./data_visualization";
import DataEngineering from "./data_engineering";
import ForFun from "./for_fun";


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
    this.footer_text = <div className="footer_text_div">
      <div className="footer_text">
      {/* <Typography className="footer_text_internal" component={'span'}> */}
        Copyright © 2020 Chuan Sun. All Rights Reserved | Handcrafted with Node.js
      {/* </Typography> */}
      </div>
          <div className="footer_contact_area">
            <Button variant="outlined" color="primary" className="footer_contact_button"
              onClick={e => this.contact_me_click(e)} >
              CONTACT ME
            </Button>
          </div>
          </div>
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
    this.wc_entries = [ 
      { label: 'Dev Blog', url: 'http://niklasknaack.blogspot.de/', target: '_top', tooltip: 'Lorem ipsum' },
      { label: 'Flashforum', url: 'http://www.flashforum.de/', target: '_top', tooltip: 'Dolor sit amet' },
      { label: 'jQueryScript.net', url: 'http://www.jqueryscript.net/', target: '_top', tooltip: 'Consetetur sadipscing' },
      { label: 'Javascript-Forum', url: 'http://forum.jswelt.de/', target: '_top', tooltip: 'Sed diam' },
      { label: 'JSFiddle', url: 'https://jsfiddle.net/user/NiklasKnaack/fiddles/', target: '_top' },
      { label: 'CodePen', url: 'http://codepen.io/', target: '_top', tooltip: 'At vero' },
      { label: 'three.js', url: 'http://threejs.org/', target: '_top', tooltip: 'Nonumy eirmod' },
      { label: 'WebGLStudio.js', url: 'http://webglstudio.org/', target: '_top', tooltip: 'Stet clita' },
      { label: 'JS Compress', url: 'http://jscompress.com/', target: '_top', tooltip: 'Justo duo' },
      { label: 'TinyPNG', url: 'https://tinypng.com/', target: '_top', tooltip: 'Ut wisi enim' },
    ];
    this.wc_settings = {
      entries: this.wc_entries,
      width: 480,
      height: 480,
      radius: '100%',
      radiusMin: 75,
      bgDraw: true,
      bgColor: 'white',
      opacityOver: 0.5,
      opacityOut: 0.05,
      opacitySpeed: 6,
      fov: 800,
      speed: 0.5,
      fontFamily: 'Oswald, Arial, sans-serif',
      fontSize: '15',
      fontColor: 'black',
      fontWeight: 'normal',//bold
      fontStyle: 'normal',//italic 
      fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
      fontToUpperCase: true,
      tooltipFontFamily: 'Oswald, Arial, sans-serif',
      tooltipFontSize: '11',
      tooltipFontColor: '#fff',
      tooltipFontWeight: 'normal',//bold
      tooltipFontStyle: 'normal',//italic 
      tooltipFontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
      tooltipFontToUpperCase: false,
      tooltipTextAnchor: 'left',
      tooltipDiffX: 0,
      tooltipDiffY: 10,
      animatingSpeed: 0.01,
      animatingRadiusLimit: 1.3
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
      else if (logo_name == "ins") {
        window.open("https://www.instagram.com/kc_coloration/", "_blank");
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
      // const script = document.createElement("script");
      // script.async = true;
      // script.innerHTML = `
      // document.addEventListener("DOMContentLoaded", function(){
      //     var wc_entries = ${JSON.stringify(this.wc_entries)};
      //     var wc_settings = ${JSON.stringify(this.wc_settings)};
      //   var svg3DTagCloud = new SVG3DTagCloud(document.getElementById('wc_tag_area'), wc_settings);
      //   console.log("svg3DTagCloud initialized");
      // });`;
      // document.body.appendChild(script);
      
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
        {/* <div className="avatar_panel" id="wc_tag_area"></div> */}
        <div className="avatar_panel" id="avatar_panel">
            
            <div className="avatar_panel_upper">
                {/* <div className="avatar_area">
                    <Avatar src={avatar_pic} className={"main_avatar"} />
                </div> */}
                <div className="main_intro">
                    <div className="main_name">Chuan Sun</div>
                    <div className="main_subintro">
                        Applied Science, <br /> Data Science, <br /> Data Engineering
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
                            <IconButton onClick={()=>this.sc_ntwk_logo_click("ins")}>
                                <Avatar src={ins_logo} style={{alignSelf: 'center'}} />
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
                    <DataVisualization />
                </TabPanel>
                <TabPanel value={this.state.tab_value} index={3} dir={"rtl"}>
                    <DataEngineering />
                </TabPanel>
                <TabPanel value={this.state.tab_value} index={4} dir={"rtl"}>
                    <ForFun />
                </TabPanel>
            </SwipeableViews>
        {/* </div> */}
        
        {
            (this.state.footer_expanded === false) && <Divider light />
        }

        <TrackVisibility>
          <ComponentToTrack toggle_visibility={this.toggle_scroll_display} toggle_divider={this.toggle_footer_expansion}/>
        </TrackVisibility>

        <ScrollDown visible={!this.state.scrolled_to_bottom} />
    </div>
  )};
}

export default Navigation;
