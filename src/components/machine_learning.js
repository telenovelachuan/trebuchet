import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AOS from 'aos';

import regression_logo from "../static/images/ml/regression.png";
import classification_logo from "../static/images/ml/classification.jpg";
import anomaly_detection_logo from "../static/images/ml/anml_detection.jpg";
import clustering_logo from "../static/images/ml/clustering.png";
import time_series_logo from "../static/images/ml/time_series.png";
import pca_logo from "../static/images/ml/pca.png";


import json_file from './config/ml.json';
import "../static/css/ml.css";

class MachineLearning extends Component {

    constructor(props) {
        super(props);
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
    }

    load_intro_text = () => {
        return json_file["intro_text"]
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

                        <CardHeader title="FEATURED PROJECTS" titleTypographyProps={{className:"ml_projects_header ml_headers"}} />
                        <CardContent>
                                
                        </CardContent>
                </div>

            </div>
        )
    }
}

export default MachineLearning;
