import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SchoolIcon from '@material-ui/icons/School';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

import "animate.css/animate.min.css";
import intro_image from "../static/images/st.jpg";
import '../static/css/App.css';
import "../static/css/about.css";

function About() {
    return (
        <div className="content">
            <div id="about_content">
            <ScrollAnimation animateIn="fadeInUp" animateOut='fadeOutUp' duration={3}>
                <div id="self_intro">
                    
                    <Card className={"self_intro_card"}>
                        <CardContent>
                            <div className="self_intro_image_area">
                                <CardMedia
                                    className={"intro_image"}
                                    image={intro_image}
                                    title="St. Petersburg"
                                />
                            </div>
                            <div className="self_intro_text_area">
                                <div className="intro_general">
                                    <Typography className={"intro_typg"} variant="h5" component="h2">
                                I'm a data science enthusiast in the computer science program of the University of Kansas.
                            My domain of interest covers data science technologies, supervised/unsupervised learning, time series prediction and analysis, data engineering and software engineering.
                                    </Typography> <br />
                                    <Typography className={"intro_typg"} variant="h5" component="h2">
                                I possess over 4 years of working experience in software engineering & data engineering industry, 
                                with hands-on experience in solving data science and machine learning problems and proficiency on big data platforms.
                                    </Typography>
                                    <br /><br />
                                    <div className="intro_education">
                                        <Typography className={"intro_head1"} variant="h5" component="h1">EDUCATION</Typography> <br />
                                        <div className="intro_education_list">
                                            <List dense={true}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar> <SchoolIcon /> </Avatar>
                                                    </ListItemAvatar>
                                                <ListItemText className="education_text" primary="M.S in Computer Science" secondary={'University of Kansas'} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar> <SchoolIcon /> </Avatar>
                                                    </ListItemAvatar>
                                                <ListItemText className="education_text" primary="M.S in Computer Science" secondary={'Tongji University'} />
                                                </ListItem>
                                                {/* <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar> <SchoolIcon /> </Avatar>
                                                    </ListItemAvatar>
                                                <ListItemText primary="B.S in Computer Science" secondary={'Tongji University'} />
                                                </ListItem> */}
                                            
                                            </List>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </CardContent>
                    {/* <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                    </Card>

                    
                </div>
                
            </ScrollAnimation>

            <ScrollAnimation animateIn="fadeInUp" animateOut='fadeOutUp' duration={3}>
                <div className="about_me">
                    second paragraph
                </div>
                
            </ScrollAnimation>

            </div>
        </div>
    );
}

export default About;
