import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AOS from 'aos';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import Fade from '@material-ui/core/Fade';

import regression_logo from "../static/images/ml/regression.png";
import classification_logo from "../static/images/ml/classification.jpg";
import anomaly_detection_logo from "../static/images/ml/anml_detection.jpg";
import clustering_logo from "../static/images/ml/clustering.png";
import time_series_logo from "../static/images/ml/time_series.png";
import pca_logo from "../static/images/ml/pca.png";
import widget_mtn_logo from "../static/images/ml/widget_mtn.jpeg";
import dream_of_anomalies_logo from "../static/images/ml/dream_of_anomalies.jpeg";
import major_league_logo from "../static/images/ml/major_league.jpg";
import the_oscars_logo from "../static/images/ml/the_oscars.jpg";
import shakespeare_play_logo from "../static/images/ml/shakespeare_play.jpg";
import news_headline from "../static/images/ml/news_headline.jpg";
import worldwide_product_logo from "../static/images/ml/worldwide_product.jpg";
import movie_lens_logo from "../static/images/ml/movie_lens.jpg";
import regression_small_logo from "../static/images/ml/regression_small.png";
import anomaly_detection_small_logo from "../static/images/ml/anml_detection_small.png";
import topic_logo from "../static/images/ml/topic.png";
import topic_small_logo from "../static/images/ml/topic_small.png";
import visualiztion_logo from "../static/images/ml/visualization.png";
import time_series_small_logo from "../static/images/ml/time_series_small.png";
import classification_small_logo from "../static/images/ml/classification_small.png";


import json_file from './config/ml.json';
import "../static/css/ml.css";

const API_URL = process.env.REACT_APP_API_URL;

class MachineLearning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prj_latest_updates: {},
            display_show_all: false,
        };
        let ml_skills = {
            "classification": [classification_logo],
            "clustering": [clustering_logo],
            "time_series": [time_series_logo],
            "regression": [regression_logo],
            "anomaly_detection": [anomaly_detection_logo],
            "topic_modeling": [topic_logo]
        }
        this.ml_skills_list = Object.keys(json_file["skills"]);
        Object.keys(ml_skills).forEach(function(key) {
            ml_skills[key] = ml_skills[key].concat(json_file["skills"][key]);
        });
        console.log(ml_skills);
        this.ml_skills = ml_skills;

        let projects = {
            "widget_maintenance": [widget_mtn_logo],
            "worldwide_products": [worldwide_product_logo],
            "the_oscars": [the_oscars_logo],
            "major_leagues": [major_league_logo],
            "shakespear_plays": [shakespeare_play_logo],
            "news_headline": [news_headline],
            "dream_of_anomalies": [dream_of_anomalies_logo],
            "movie_lens": [movie_lens_logo],
        }
        Object.keys(projects).forEach(function(prj) {
            projects[prj] = projects[prj].concat(json_file["projects"][prj]);
        });
        this.projects = projects;
        this.skill_palette = {
            "regression": [regression_small_logo, "#d4fc78", 'black'],
            "time series": [time_series_small_logo, "#8debff", 'black'],
            "clustering": [clustering_logo, "#ffff80", 'black'],
            "classification": [classification_small_logo, "#8f71ff", 'white'],
            "anomaly detection": [anomaly_detection_small_logo, "#E9007F", 'white'],
            "topic modeling": [topic_small_logo, "#deb0df", 'white'],
            "visualization": [visualiztion_logo, "#ffcdd8", 'black']
        }
        this.state.projects_on_page = JSON.parse(JSON.stringify(projects));
    }

    load_intro_text = () => {
        return json_file["intro_text"]
    }

    get_prj_update_time = (prj_name) => {
        const default_update_time = 'Dec 2019';
        let api_url = `${API_URL}/get_prj_update_time?prj_name=${prj_name}`;
        console.log(api_url);
        axios.get(api_url)
        .then(res => {
            console.log("get api returns!");
            console.log(res.data);
            let prj_updates = this.state.prj_latest_updates;
            prj_updates[prj_name] = res.data['result']
            this.setState({prj_latest_updates: prj_updates})
        })
        .catch(error => {
            console.log(JSON.stringify(error))
            let prj_updates = this.state.prj_latest_updates;
            prj_updates[prj_name] = default_update_time;
            this.setState({prj_latest_updates: prj_updates})
            return;
          })
        
    }

    load_prj_update_time = (prj_name) => {
        if (!(prj_name in this.state.prj_latest_updates)) {
            this.get_prj_update_time(prj_name);
            return "loading..."
        }
        else {
            return this.state.prj_latest_updates[prj_name];
        }
    }

    ml_prj_click = (e, prj_name) => {
        let link = json_file["projects"][prj_name][1];
        window.open(link, '_blank');
    }

    skill_card_click = (e, skill_name) => {
        console.log("card clicked, " + skill_name);
        let projects_on_page = {};
        Object.keys(this.projects).map((prj_name, idx) => {
            let prj_obj = this.projects[prj_name];
            console.log(prj_obj);
            console.log(skill_name);
            console.log(prj_obj[4]);
            console.log(skill_name in prj_obj[4]);
            if (prj_obj[4].includes(skill_name.replace('_', ' '))) {

                projects_on_page[prj_name] = prj_obj;
            }
        })
        console.log("projects_on_page");
        console.log(projects_on_page);
        console.log("in skill_card_click");
        console.log(this.state.projects_on_page);
        this.setState({
            "projects_on_page": projects_on_page,
            "display_show_all": true,
        })
    }

    show_all_prj_click = (e) => {
        this.setState({
            "projects_on_page": this.projects,
            "display_show_all": false
        });
    };

    componentDidMount() {
        AOS.init();
    }

    render() {
        console.log("this.ml_skills:")
        console.log(this.ml_skills);
        return (
            <div id="ml_content">

                <div className="ml_intro_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                    data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                    data-aos-once="true" >
                <div className="ml_intro">
                <Card className={"ml_intro_card"}>
                    <CardContent>
                        <div className="ml_intro_text">
                            <Typography className={"intro_typg"} variant="h5" component="h2">
                                {this.load_intro_text()}
                            </Typography><br />
                        </div>
                        <div className="ml_intro_skills">
                            {
                                Object.keys(this.ml_skills).map((skill, idx) => (
                                    <div className="ml_intro_skill_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                                        data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                                        data-aos-once="true" >
                                    <div className="ml_intro_skill">
                                        <Card className={"ml_intro_skill_card"}>
                                        <CardActionArea onClick={ e => this.skill_card_click(e, skill)}>
                                            <CardHeader className="ml_skill_header" 
                                                avatar={
                                                <Avatar src={this.ml_skills[skill][0]} className="ml_skill_avatar" />
                                                }
                                                // action={
                                                // <IconButton aria-label="settings">
                                                //     <MoreVertIcon />
                                                // </IconButton>
                                                // }
                                                title={this.ml_skills[skill][1].toUpperCase()}
                                                // subheader="sub-header"
                                            />
                                            <CardContent className="ml_skill_content">
                                                <div className="ml_skill_text">
                                                    {this.ml_skills[skill][2]}
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                        </Card>
                                    </div>
                                    </div>
                                ))
                            }
                        </div>
                    </CardContent>
                </Card>

                </div>
                </div>

                <div className="ml_project_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="0"
                    data-aos-duration="500" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                    data-aos-once="true" >
                    <div className="ml_projects">
                        <CardHeader title="FEATURED PROJECTS" className="ml_projects_header"
                        titleTypographyProps={{className:"ml_headers"}} 
                            action={
                            <Fade in={this.state.display_show_all} timeout={1000}>
                            <div className="ml_prj_show_all" >

                                <Button variant="outlined" color="primary" className="ml_prj_show_all"
                                        onClick={this.show_all_prj_click}
                                    >SHOW ALL</Button>
                            </div></Fade>}
                        />
                        <CardContent>
                        {
                            Object.keys(this.state.projects_on_page).map((prj, idx) => (
                                <div className="ml_prj" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                                    data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true"
                                    data-aos-id="aos_scroll_not_bottom" data-aos-once="true">
                                    <Card className={"ml_prj_card"}>
                                        <CardMedia
                                                className="ml_prj_img"
                                                image={this.state.projects_on_page[prj][0]}
                                                title={prj}
                                        />
                                        <div className="ml_prj_title">{this.state.projects_on_page[prj][1]}</div>
                                        <div className="ml_prj_info_row">
                                            <div className="ml_prj_last_update">
                                                <div className="ml_prj_last_update_text">Last updated on {this.load_prj_update_time(prj)}</div>
                                            </div>
                                        </div>
                                        <div className="ml_prj_intro">{this.state.projects_on_page[prj][3]}</div>
                                        <div className="ml_prj_more_info">
                                            <div className="ml_prj_skills">
                                                {
                                                    this.state.projects_on_page[prj][4].map((skill, idx) => {
                                                        let chip_avatar = this.skill_palette[skill][0];
                                                        let bg_color = this.skill_palette[skill][1];
                                                        let font_color = this.skill_palette[skill][2];
                                                        return (
                                                        <div className="ml_prj_chip_area">
                                                            <Chip label={skill} className={"ml_prj_skill_chip"}
                                                            avatar={<Avatar src={chip_avatar}/>}
                                                            style={{color: font_color, borderColor: bg_color, backgroundColor: bg_color}}
                                                            />
                                                        </div>)
                                                    })
                                                }
                                            </div>
                                            <div className="ml_prj_learn_more">
                                                <Button size="small" variant="outlined" color="primary" className="ml_prj_lm_button"
                                                    onClick={e => this.ml_prj_click(e, prj)}
                                                >Learn More</Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))
                        }
                        </CardContent>
                    </div>
                </div>

            </div>
        )
    }
}

export default MachineLearning;
