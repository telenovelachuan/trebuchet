import React from 'react';
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

import "../static/css/navigation.css";
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

function Navigation() {
    const [value, setValue] = React.useState(0);

    const navChange = (event, newValue) => {
        setValue(newValue);
      };

      const useStyles = makeStyles(theme => ({
        avatar_size: {
          width: '150px',
          height: '150px'
        },
      }));
      const classes = useStyles();

      const sc_ntwk_logo_click = (logo_name) => {
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

      const handleChangeIndex = (index) => {
        setValue(index);
      };
      
      console.log("env:" + API_URL);
      // add visit entry
      axios.post(API_URL, { client_ip: localIpUrl('public')})
      .then(res => {
        //console.log("add entry api returns: " + res);
        console.log(res.data);
      })
    

  return (
    <div className="navigation" >
        <div className="avatar_panel">
            <div className="avatar_panel_upper">
                <div className="avatar_area">
                    <Avatar src={avatar_pic} className={classes.avatar_size} />
                </div>
                <div className="main_intro">
                    <div className="main_name">Chuan Sun</div>
                    <div className="main_subintro">
                        Data Science, <br /> Data Engineering
                    </div>
                    <br />
                    <div id="social_ntwk_area">
                        <div className="sc_ntwk_logo">
                            <IconButton onClick={()=>sc_ntwk_logo_click("linkedin")}>
                                <Avatar src={linkedin_logo} style={{alignSelf: 'center'}} />
                            </IconButton>
                        </div>
                        <div className="sc_ntwk_logo">
                            <IconButton onClick={()=>sc_ntwk_logo_click("github")}>
                                <Avatar src={github_logo} style={{alignSelf: 'center'}} />
                            </IconButton>
                        </div>
                        <div className="sc_ntwk_logo">
                            <IconButton onClick={()=>sc_ntwk_logo_click("email")}>
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
                    value={value}
                    onChange={navChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                >
                <Tab label="About"  className={value === 0 ? "active_nav_tab" : "inactive_nav_tab"}/>
                <Tab label="Machine Learning"  className={value === 1 ? "active_nav_tab" : "inactive_nav_tab"}/>
                <Tab label="Visualization & Storytelling"  className={value === 2 ? "active_nav_tab" : "inactive_nav_tab"}/>
                <Tab label="Data Engineering"  className={value === 3 ? "active_nav_tab" : "inactive_nav_tab"}/>
                <Tab label="Software Engineering"  className={value === 4 ? "active_nav_tab" : "inactive_nav_tab"}/>

                </Tabs>
            </AppBar>

            <SwipeableViews axis={'x'} index={value} onChangeIndex={handleChangeIndex} hysteresis={0.01} >
                <TabPanel value={value} index={0} dir={"rtl"}>
                    <About />
                </TabPanel>
                <TabPanel value={value} index={1} dir={"rtl"}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={"rtl"}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3} dir={"rtl"}>
                    Item Four
                </TabPanel>
                <TabPanel value={value} index={4} dir={"rtl"}>
                    Item Five
                </TabPanel>
            </SwipeableViews>
        {/* </div> */}
    </div>
  );
}

export default Navigation;
