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


import json_file from './config/ml.json';
import "../static/css/ml.css";

const API_URL = process.env.REACT_APP_API_URL;

class MachineLearning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prj_latest_updates: {}
        };
        let ml_skills = {
            "classification": [classification_logo],
            "clustering": [clustering_logo],
            "time_series": [time_series_logo],
            "regression": [regression_logo],
            "anomaly_detection": [anomaly_detection_logo],
            "pca": [pca_logo]
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
    }

    load_intro_text = () => {
        return json_file["intro_text"]
    }

    get_prj_update_time = (prj_name) => {
        const default_update_time = 'Dec 2019';
        axios.get(`${API_URL}/get_prj_update_time?prj_name=${prj_name}`)
        .catch(error => {
            console.log(JSON.stringify(error))
            let prj_updates = this.state.prj_latest_updates;
            prj_updates[prj_name] = default_update_time;
            this.setState({prj_latest_updates: prj_updates})
            return;
          })
        .then(res => {
            console.log(res.data);
            let prj_updates = this.state.prj_latest_updates;
            prj_updates[prj_name] = res.data['result']
            this.setState({prj_latest_updates: prj_updates})
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

    componentDidMount() {
        // document.addEventListener('aos:in:aos_scroll_to_bottom', ({ detail }) => {
        //     this.props.toggleScrollDownVisibility(false);
        // });
        // document.addEventListener('aos:out:aos_scroll_to_bottom', ({ detail }) => {
        //     //this.props.sd_visible = true;
        //     this.props.toggleScrollDownVisibility(true);
        // });
        AOS.init();
    }

    render() {
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
                        <CardHeader title="FEATURED PROJECTS" titleTypographyProps={{className:"ml_projects_header ml_headers"}} />
                        <CardContent>
                        {
                            Object.keys(this.projects).map((prj, idx) => (
                                <div className="ml_prj" data-aos="fade-up" data-aos-offset="20" data-aos-delay="0"
                                    data-aos-duration="500" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                                    data-aos-once="true">
                                    <Card className={"ml_prj_card"}>
                                        <CardMedia
                                                className="ml_prj_img"
                                                image={this.projects[prj][0]}
                                                title={prj}
                                        />
                                        <div className="ml_prj_title">{this.projects[prj][1]}</div>
                                        <div className="ml_prj_info_row">
                                            <div className="ml_prj_last_update">
                                                <div className="ml_prj_last_update_text">Last updated on {this.load_prj_update_time(prj)}</div>
                                            </div>
                                            {/* <div className="ml_prj_learn_more">
                                                <Button size="small" color="primary" className="ml_prj_lm_button">Learn More</Button>
                                            </div> */}
                                        </div>
                                        <div className="ml_prj_intro">{this.projects[prj][3]}</div>
                                        <div className="ml_prj_more_info">
                                            <div className="ml_prj_skills">
                                                skills
                                            </div>
                                            <div className="ml_prj_learn_more">
                                                <Button size="small" color="primary" className="ml_prj_lm_button"
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