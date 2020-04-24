import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import avatar_pic from "../static/images/avatar.jpg";
import linkedin_logo from "../static/images/linkedin.png";
import github_logo from "../static/images/github.png";
import email_logo from "../static/images/email.png";

import "../static/css/navigation.css";


function Navigation() {
    const [value, setValue] = React.useState(0);

    const navChange = (event, newValue) => {
        setValue(newValue);
      };

      const useStyles = makeStyles(theme => ({
        avatar_size: {
          width: theme.spacing(15),
          height: theme.spacing(15),
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
    
  return (
    <div className="navigation" >
        <div className="avatar_panel">
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
        {/* <div className="navigation_bar"> */}
            <AppBar position="static" color="red" >
                <Tabs
                    value={value}
                    onChange={navChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                >
                <Tab label="About"  />
                <Tab label="Regression"  />
                <Tab label="Classification"  />
                <Tab label="Data Storytelling"  />
                <Tab label="Data Engineering"  />

                </Tabs>
            </AppBar>
        {/* </div> */}
    </div>
  );
}

export default Navigation;
