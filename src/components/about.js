import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SchoolIcon from '@material-ui/icons/School';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';

import "animate.css/animate.min.css";
import intro_image from "../static/images/st.jpg";
import python_logo from "../static/images/python.png";
import pandas_logo from "../static/images/pandas.png";
import numpy_logo from "../static/images/numpy.png";
import sklearn_logo from "../static/images/sklearn.png";
import keras_logo from "../static/images/keras.png";
import tensorflow_logo from "../static/images/tensorflow.png";
import matplotlib_logo from "../static/images/matplotlib.png";
import sql_logo from "../static/images/sql.png";
import mysql_logo from "../static/images/mysql.jpg";
import postgresql_logo from "../static/images/postgresql.jpg";
import sqlite_logo from "../static/images/sqlite.png";
import teradata_logo from "../static/images/teradata.png";
import spark_logo from "../static/images/spark.png";
import hadoop_logo from "../static/images/hadoop.png";
import hive_logo from "../static/images/hive.jpg";
import jenkins_logo from "../static/images/jenkins.png";
import sagemaker_logo from "../static/images/sagemaker.png";
import data_engr_logo from "../static/images/data_engr.jpeg";
import tools_logo from "../static/images/tools.png";
import git_logo from "../static/images/git.png";
import node_logo from "../static/images/node.png";
import linux_logo from "../static/images/linux.png";


import '../static/css/App.css';
import "../static/css/about.css";

function About() {
    const scrollDuration = 1.5;
    const python_libs = {'Pandas': pandas_logo, 'Numpy': numpy_logo, 'Scikit-Learn': sklearn_logo, 
                        'Tensorflow': tensorflow_logo, 'Keras': keras_logo, 'Matplotlib': matplotlib_logo}
    const sql_pltfms = {'MySQL': mysql_logo, 'PostgreSQL': postgresql_logo, 'SQLite': sqlite_logo,
                        'Teradata': teradata_logo}
    const data_engr_pltfms = {'Spark': spark_logo, 'Hadoop': hadoop_logo, 'Hive': hive_logo,
                        'Jenkins': jenkins_logo, 'AWS SageMaker': sagemaker_logo}
    const other_tools = {'Git': git_logo, 'NodeJS': node_logo, 'Linux': linux_logo}
    const card_header_style = {
        fontFamily: "\"Segoe UI\", \"Tahoma\", \"Geneva\", \"Verdana\", sans-serif",
        letterSpacing: 2,
        fontWeight: "fontWeightBold"
     }
    return (
        <div className="content">
            <div id="about_content">
            <ScrollAnimation animateIn="fadeInUp"  duration={scrollDuration}>
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
                
            </ScrollAnimation><br /><br />

            <ScrollAnimation animateIn="fadeInUp"  duration={scrollDuration}>
                <div className="skills_area">
                    <Card className={"skills_card"}>
                        <CardHeader title="SKILLS & TECHNOLOGY" titleTypographyProps={{className:"intro_head1"}} />
                        <CardContent>
                            {/* <div className="skills_icon_area"> */}
                                <div className="skills_sub_area">
                                
                                <List component="nav" aria-labelledby="nested-list-subheader"
                                    className={"skills_category"}
                                >
                                <ListItem button className={"skills_category_item"}>
                                    <ListItemIcon>
                                        <Avatar src={python_logo} />
                                    </ListItemIcon>
                                    <ListItemText primary="Python" />
                                    {<ExpandLess />}
                                </ListItem>
                                {
                                    Object.keys(python_libs).map((key, index) => (
                                        <Collapse in={true} timeout="auto" unmountOnExit>
                                            <List component="nav" disablePadding>
                                            <ListItem button className={"skill_item"}>
                                                <ListItemIcon>
                                                    <Avatar src={python_libs[key]} />
                                                </ListItemIcon>
                                                <ListItemText primary={key} />
                                            </ListItem>
                                            </List>
                                        </Collapse>
                                    ))
                                }
                                </List>
                                </div>
                                <div className="skills_sub_area">
                                    <List component="nav" aria-labelledby="nested-list-subheader"
                                        className={"skills_category"}
                                    >
                                    <ListItem button className={"skills_category_item"}>
                                        <ListItemIcon>
                                            <Avatar src={sql_logo} />
                                        </ListItemIcon>
                                        <ListItemText primary="SQL" />
                                        {<ExpandLess />}
                                    </ListItem>
                                    {
                                        Object.keys(sql_pltfms).map((key, index) => (
                                            <Collapse in={true} timeout="auto" unmountOnExit>
                                                <List component="nav" disablePadding>
                                                <ListItem button className={"skill_item"}>
                                                    <ListItemIcon>
                                                        <Avatar src={sql_pltfms[key]} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={key} />
                                                </ListItem>
                                                </List>
                                            </Collapse>
                                        ))
                                    }
                                    </List>
                                </div>
                                <div className="skills_sub_area">
                                <List component="nav" aria-labelledby="nested-list-subheader"
                                        className={"skills_category"}
                                >
                                    <ListItem button className={"skills_category_item"}>
                                        <ListItemIcon>
                                            <Avatar src={data_engr_logo} />
                                        </ListItemIcon>
                                        <ListItemText primary="Data Engineering" />
                                        {<ExpandLess />}
                                    </ListItem>
                                    {
                                        Object.keys(data_engr_pltfms).map((key, index) => (
                                            <Collapse in={true} timeout="auto" unmountOnExit>
                                                <List component="nav" disablePadding>
                                                <ListItem button className={"skill_item"}>
                                                    <ListItemIcon>
                                                        <Avatar src={data_engr_pltfms[key]} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={key} />
                                                </ListItem>
                                                </List>
                                            </Collapse>
                                        ))
                                    }
                                    </List>
                                </div>
                                <div className="skills_sub_area">
                                    <List component="nav" aria-labelledby="nested-list-subheader"
                                            className={"skills_category"}
                                    >
                                        <ListItem button className={"skills_category_item"}>
                                            <ListItemIcon>
                                                <Avatar src={tools_logo} />
                                            </ListItemIcon>
                                            <ListItemText primary="Other Tools" />
                                            {<ExpandLess />}
                                        </ListItem>
                                        {
                                            Object.keys(other_tools).map((key, index) => (
                                                <Collapse in={true} timeout="auto" unmountOnExit>
                                                    <List component="nav" disablePadding>
                                                    <ListItem button className={"skill_item"}>
                                                        <ListItemIcon>
                                                            <Avatar src={other_tools[key]} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={key} />
                                                    </ListItem>
                                                    </List>
                                                </Collapse>
                                            ))
                                        }
                                        </List>
                                </div>
                            {/* <Chip avatar={<Avatar alt="python" src={python_logo} />}
                                label="Python"
                                variant="outlined"
                            /> */}
                            {/* </div> */}
                        </CardContent>
                    </Card>
                </div>
            </ScrollAnimation>

            </div>
        </div>
    );
}

export default About;
