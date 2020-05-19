import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';

import "../static/css/dv.css";
import json_file from './config/dv.json';
import matplotlib_logo from "../static/images/matplotlib.png";
import seaborn_logo from "../static/images/dv/seaborn.png";
import d3js_logo from "../static/images/dv/d3js.png";
import plotly_logo from "../static/images/dv/plotly.png";
import jupyter_logo from "../static/images/dv/jupyter.png";
import matlab_logo from "../static/images/dv/matlab.png";


class DataVisualization extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        let tool_names = json_file["tools"];
        this.tools = {
            "Matplotlib": [matplotlib_logo],
            "Seaborn": [seaborn_logo],
            "D3.js": [d3js_logo],
            "Plotly": [plotly_logo],
            "Jupyter Notebook": [jupyter_logo],
            "Matlab": [matlab_logo],
        };
    }

    handleDelete = e => {
        
    }

    load_intro_text = () => {
        return json_file["intro_text"];
    }

    render () {
    return (
        <div className={"dv_contents"}>
            <div className="dv_intro_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                    data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                    data-aos-once="true" >
                <div className="dv_intro">
                <Card className={"dv_intro_card"}>
                    <div className="dv_intro_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                        data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                        data-aos-once="true" >
                        <CardHeader title="DATA VISUALIZATION" className="dv_intro_header"
                            titleTypographyProps={{className:"dv_headers"}}
                        />
                    </div>
                    <CardContent>
                        <div className="dv_intro_text">
                            {this.load_intro_text().map((paragraph, idx) => (
                                <div className="dv_intro_paragraph">
                                    <Typography className={"dv_intro_typg"} variant="h5" component="h2">
                                        {paragraph}
                                    </Typography>
                                </div>
                            ))}
                            <br />
                        </div>
                        <div className="dv_intro_skills">
                            <div className="dv_tool_chips">
                                {
                                    Object.keys(this.tools).map((tool_name, idx) => (
                                        <div className="dv_tool_chip_area">
                                            <Chip label={tool_name} className={"dv_tool_chip"} size="medium"
                                                    avatar={<Avatar src={this.tools[tool_name][0]}/>} variant="outlined"
                                                    deleteIcon={<DoneIcon />} onDelete={this.handleDelete}
                                                    // style={{color: font_color, borderColor: bg_color, backgroundColor: bg_color}}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>

                </div>
            </div>
        </div>
    )}
}

export default DataVisualization;

