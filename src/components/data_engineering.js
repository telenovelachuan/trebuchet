import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import spark_logo from "../static/images/spark.png";
import hadoop_logo from "../static/images/hadoop.png";
import hive_logo from "../static/images/hive.jpg";
import sql_logo from "../static/images/de/sql.png";
import nosql_logo from "../static/images/de/nosql.png";
import devops_logo from "../static/images/de/devops.png";
import cloud_logo from "../static/images/de/cloud.png";

import json_file from './config/de.json';
import "../static/css/de.css";

class DataEngineering extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        let de_skills = {
            "hadoop": [hadoop_logo],
            "spark": [spark_logo],
            "sql": [sql_logo],
            "cloud": [cloud_logo],
            "no_sql": [nosql_logo],
            "devops": [devops_logo],
        }
        this.de_skills_list = Object.keys(json_file["skills"]);
        Object.keys(de_skills).forEach(function(key) {
            de_skills[key] = de_skills[key].concat(json_file["skills"][key]);
        });
        this.de_skills = de_skills;
    }

    load_intro_text = () => {
        return json_file["intro_text"];
    }


    render () {
    return (
        <div className={"de_contents content"}>
            
            <div className="de_intro_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                    data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                    data-aos-once="true" >
                <div className="ml_intro">
                <Card className={"de_intro_card"}>
                    <div className="de_intro_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                        data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                        data-aos-once="true" >
                        <CardHeader title="DATA ENGINEERING" className="de_intro_header"
                            titleTypographyProps={{className:"de_headers"}}
                        />
                    </div>
                    <CardContent>
                        <div className="de_intro_text">
                            {this.load_intro_text().map((paragraph, idx) => (
                                <div className="de_intro_paragraph">
                                    <Typography className={"de_intro_typg"} variant="h5" component="h2">
                                        {paragraph}
                                    </Typography>
                                </div>
                            ))}
                            <br />
                        </div>
                        <div className="de_intro_skills">
                            {
                                Object.keys(this.de_skills).map((skill, idx) => (
                                    <div className="de_intro_skill_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                                        data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                                        data-aos-once="true" >
                                    <div className="de_intro_skill">
                                        <Card className={"de_intro_skill_card"}>
                                            <CardHeader className="de_skill_header" 
                                                avatar={
                                                <Avatar src={this.de_skills[skill][0]} className="de_skill_avatar" />
                                                }
                                                // action={
                                                // <IconButton aria-label="settings">
                                                //     <MoreVertIcon />
                                                // </IconButton>
                                                // }
                                                title={this.de_skills[skill][1].toUpperCase()}
                                                // subheader="sub-header"
                                            />
                                            <CardContent className="de_skill_content">
                                                <div className="de_skill_text">
                                                    {this.de_skills[skill][2]}
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


        </div>
    )}
}

export default DataEngineering;

