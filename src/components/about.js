import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SchoolIcon from '@material-ui/icons/School';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import AOS from 'aos';
import StarIcon from '@material-ui/icons/Star';
import TextField from '@material-ui/core/TextField';


import 'aos/dist/aos.css';
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
import mysql_logo from "../static/images/mysql.png";
import dbx_logo from "../static/images/databricks.png";
import postgresql_logo from "../static/images/postgresql.png";
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
import ebay_logo from "../static/images/ebay.png";
import ibm_logo from "../static/images/ibm.jpg";
import paypal_logo from "../static/images/paypal.png";
import ku_logo from "../static/images/ku.png";
import cpp_logo from "../static/images/c++.jpg";
import spss_logo from "../static/images/spss.png";
import csharp_logo from "../static/images/csharp.png";
import celery_logo from "../static/images/celery.jpg";
import rabbitmq_logo from "../static/images/rabbitmq.png";
import django_logo from "../static/images/django.png";
import instructor_logo from "../static/images/instructor.png";
import ripple_logo from "../static/images/ripple.png";
import ripple_logo2 from "../static/images/ripple2.png";
import bq_logo from "../static/images/bigquery.png";
import tableau_logo from "../static/images/tableau.png";
import cloud_composer_logo from "../static/images/cloud_composer.png";
import jira_logo from "../static/images/jira.png";
import overleaf_logo from "../static/images/overleaf.png";


import LeaveReply from './leave_reply';
import '../static/css/App.css';
import "../static/css/about.css";
import json_file from './config/about.json';

class About extends Component {

    constructor(props) {
        super(props);
        this.scrollDuration = 1
        this.scrollDelay= 100;
        this.python_libs = {'Pandas': pandas_logo, 'Numpy': numpy_logo, 'Scikit-Learn': sklearn_logo, 
                        'Tensorflow': tensorflow_logo, 'Keras': keras_logo, 'Matplotlib': matplotlib_logo}
        this.sql_pltfms = {'MySQL': mysql_logo, 'PostgreSQL': postgresql_logo, 'Google BigQuery': bq_logo,
                        'Hive': hive_logo, 'SQLite': sqlite_logo, 'Teradata': teradata_logo}
        this.data_engr_pltfms = {'Databricks': dbx_logo, 'Spark': spark_logo, 'Hadoop': hadoop_logo,
                        'Google Cloud Composer': cloud_composer_logo, 'Jenkins': jenkins_logo}
        this.other_tools = {'Linux': linux_logo, 'Git': git_logo, 'NodeJS': node_logo, 'Tableau': tableau_logo, "Jira": jira_logo}
        this.card_header_style = {
            fontFamily: "\"Segoe UI\", \"Tahoma\", \"Geneva\", \"Verdana\", sans-serif",
            letterSpacing: 2,
            fontWeight: "fontWeightBold"
        }
        this.skills = {
            'Python':[python_logo, this.python_libs], 'SQL': [sql_logo, this.sql_pltfms],
            'Data Engineering': [data_engr_logo, this.data_engr_pltfms], 'Other Tools': [tools_logo, this.other_tools]
        };
        
        this.exps = {
            'Ripple': [ripple_logo2, "Applied Scientist", [python_logo, dbx_logo, sklearn_logo]],
            'KU': [ku_logo, "Graduate Research Assistant", [pandas_logo, keras_logo, overleaf_logo]],
            'PayPal': [paypal_logo, "Senior Risk Engineer", [spark_logo, python_logo, hadoop_logo , node_logo, mysql_logo]],
            'IBM': [ibm_logo, "Software Engineer", [python_logo, django_logo, postgresql_logo, linux_logo]],
            'eBay': [ebay_logo, "Marketing Analytics Intern", [teradata_logo, csharp_logo, spss_logo]],
        };
    }

    load_exp_text = (exp_name) => {
        let exp_desc = json_file['exp'][exp_name];
        return (
            <div className="exp_desc">
                {exp_desc}
            </div>
        )
    };

    load_self_intro_text = () => {
        return json_file['self_intro'];
    }
    load_interest_text_left = () => {
        let interest = json_file['interest'];
        let mid = Math.ceil(interest.length / 2);
        return json_file['interest'].slice(0, mid);
    }
    load_interest_text_right = () => {
        let interest = json_file['interest'];
        let mid = Math.ceil(interest.length / 2);
        return json_file['interest'].slice(mid);
    }

    get_skill_cat_delay = idx => {
        return (idx + 1) * 150;
    }

    get_exp_delay = idx => {
        return ((idx + 1) % 4) * 150;
    }


    componentDidMount() {
        document.addEventListener('aos:in:aos_scroll_to_bottom', ({ detail }) => {
            this.props.toggleScrollDownVisibility(false);
        });
        document.addEventListener('aos:out:aos_scroll_to_bottom', ({ detail }) => {
            //this.props.sd_visible = true;
            this.props.toggleScrollDownVisibility(true);
        });
        AOS.init();
    }

    render() {
    return (
        <div className="content">
            <div id="about_content">
            
                <div className="self_intro card_general">
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
                                    {
                                        this.load_self_intro_text().map((txt, idx) => (
                                            <div>
                                            <Typography className={"intro_typg"} variant="h5" component="h2">
                                                {txt}
                                            </Typography><br />
                                            </div>
                                        ))
                                    }
                                    <br />
                                    <div className="intro_interest_area">
                                        <div className="intro_interest_head">INTEREST</div>
                                        <div className="intro_interest_list">
                                            <div className="intro_interest_list_left">
                                            <List >
                                                {
                                                    this.load_interest_text_left().map((interest, idx) => (
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <StarIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={interest} classes={{primary: "interest_item_text"}}/>
                                                        </ListItem>
                                                    )) 
                                                }
                                            </List>
                                            </div>
                                            <div className="intro_interest_list_right">
                                            <List >
                                                {
                                                    this.load_interest_text_right().map((interest, idx) => (
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <StarIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={interest} classes={{primary: "interest_item_text"}}/>
                                                        </ListItem>
                                                    )) 
                                                }
                                            </List>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                <div className="skills_area card_general" data-aos="fade-up" data-aos-offset="20" data-aos-delay="0"
                    data-aos-duration="500" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                    data-aos-once="true" >

                    {/* <Card className={"skills_card"}> */}
                        <CardHeader title="SKILLS & TECHNOLOGY" titleTypographyProps={{className:"intro_head1"}} />
                        <CardContent> 
                            {
                                Object.keys(this.skills).map((skill_name, idx_skill) => (
                                    <div className="skills_sub_area" data-aos="fade-up" data-aos-offset="20" data-aos-delay={this.get_skill_cat_delay(idx_skill)}
                                    data-aos-duration="500" data-aos-easing="ease-in-out-sine" data-aos-mirror="true"
                                    data-aos-once="true" >
                                        <List component="nav" aria-labelledby="nested-list-subheader" className={"skills_category"} >
                                            <ListItem button className={"skills_category_item"}>
                                            <ListItemIcon>
                                                <Avatar src={this.skills[skill_name][0]} />
                                            </ListItemIcon>
                                            <ListItemText primary={skill_name} classes={{primary: "skill_category"}}/>
                                                {<ExpandLess />}
                                            </ListItem>
                                            {
                                                Object.keys(this.skills[skill_name][1]).map((key, index) => (
                                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                                        <List component="nav" disablePadding>
                                                        <ListItem button className={"skill_item"}>
                                                            <ListItemIcon>
                                                                <Avatar src={this.skills[skill_name][1][key]} />
                                                            </ListItemIcon>
                                                            <ListItemText primary={key} classes={{primary: "skill_item_text"}}/>
                                                        </ListItem>
                                                        </List>
                                                    </Collapse>
                                                ))
                                            }
                                            </List>
                                            </div>
                                        ))
                            }
                        </CardContent>
                    {/* </Card> */}
                </div>

                <div className="exp_area card_general" data-aos="fade-up" data-aos-offset="20" data-aos-delay="20"
                    data-aos-duration="500" data-aos-easing="ease-in-out-sine" data-aos-mirror="true"
                    data-aos-once="true" >

                    {/* <Card className={"exps_card"}> */}
                        <CardHeader title="PROFESSIONAL EXPERIENCE" titleTypographyProps={{className:"intro_head1"}} />
                        <CardContent>
                            {
                                Object.keys(this.exps).map((exp, idx) => (
                                    <div className="exps_sub_area" data-aos="fade-up" data-aos-offset="0" data-aos-delay={this.get_exp_delay(idx)}
                                    data-aos-duration="600" data-aos-easing="ease-in-out-sine" data-aos-mirror="true"
                                    data-aos-once="true" data-aos-id="aos_scroll_to_bottom">
                                        <Card className={"exp_card"}>
                                            <CardContent className={"exp_card_content"}>
                                                <div className="exp_head">
                                                    <div className={exp === "KU" ? "exp_company_logo_long" : "exp_company_logo"}>
                                                    <CardMedia component="img" className="exp_avatar" alt={exp}
                                                        image={this.exps[exp][0]} title={exp}
                                                    />
                                                    </div>
                                                    <div className={exp === "KU" ? "exp_role_short" : "exp_role"}>
                                                        {this.exps[exp][1]}
                                                    </div>
                                                </div>
                                                {this.load_exp_text(exp)}
                                                <div className="exp_skill_area">
                                                {
                                                    this.exps[exp][2].map((skill_logo, sk_idx) => (
                                                        <div className="exp_skill_item">
                                                            <Avatar src={skill_logo} className="exp_skill_icon" />
                                                        </div>
                                                    ))
                                                }
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))
                            }
                        </CardContent>
                    {/* </Card> */}
                </div>


                {/* <div className="comment_area card_general" data-aos="fade-up" data-aos-offset="20" data-aos-delay="20"
                    data-aos-duration="500" data-aos-easing="ease-in-out-sine" data-aos-mirror="true"
                    data-aos-once="true" >

                        <CardHeader title="LEAVE A REPLY" titleTypographyProps={{className:"intro_head1"}} />
                        <CardContent>
                            <LeaveReply />
                        </CardContent>
                </div> */}

            

            </div>

            {/* <ScrollDown /> */}
        </div>
    )};
}

export default About;
