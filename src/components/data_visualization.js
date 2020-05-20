import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';

import "../static/css/dv.css";
import json_file from './config/dv.json';
import matplotlib_logo from "../static/images/matplotlib.png";
import seaborn_logo from "../static/images/dv/seaborn.png";
import d3js_logo from "../static/images/dv/d3js.png";
import plotly_logo from "../static/images/dv/plotly.png";
import jupyter_logo from "../static/images/dv/jupyter.png";
import matlab_logo from "../static/images/dv/matlab.png";
import ts1_logo from "../static/images/dv/ts1.png";
import ts2_logo from "../static/images/dv/ts2.png";
import ts3_logo from "../static/images/dv/ts3.png";
import ca1_logo from "../static/images/dv/ca1.png";
import wc1_logo from "../static/images/dv/wc1.png";
import wc2_logo from "../static/images/dv/wc2.png";

const API_URL = process.env.REACT_APP_API_URL;


class DataVisualization extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        // let tool_names = json_file["tools"];
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

    componentWillMount() {
        document.addEventListener('mouseover', function(e){
            if(e.target && e.target.tagName === 'svg'){
                console.log("hover!!");
             }
         });
    }

    componentDidMount() {

        let plotlyjs = document.createElement("script");
        plotlyjs.src = 'https://cdn.plot.ly/plotly-latest.min.js';
        plotlyjs.async = true;
        document.body.appendChild(plotlyjs);
        

        const script = document.createElement("script");
        axios.get(`${API_URL}/get_3d_anomaly_js`).then(res => {
            console.log("get api returns!");
            console.log(res.data);
            let js = res.data.js.replace(' ', '');
            console.log(`js:${js}`);
            //script.src = js;
            let inlineScript = document.createTextNode(js);
            script.appendChild(inlineScript);
            script.async = true;
            document.body.appendChild(script);

            var modebar = document.getElementsByClassName("modebar-container")[0];
            modebar.parentNode.removeChild(modebar);
        })
        .catch(error => {
            console.log(JSON.stringify(error))
            return;
          })
        
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


            <div className="dv_static_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                    data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                    data-aos-once="true" >
                <div className="dv_static">
                <Card className={"dv_static_card"}>
                    <div className="dv_static_card_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                        data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                        data-aos-once="true" >
                        <CardHeader title="VISUALIZATION SCENARIOS" className="dv_static_header"
                            titleTypographyProps={{className:"dv_headers"}}
                        />
                    </div>
                    <CardContent className="dv_static_card_content">
                        <div className="dv_static_projects">
                            <div className="dv_static_left dv_static_area">
                                <div className="dv_static_left_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                                    data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true"
                                    data-aos-id="aos_scroll_not_bottom" data-aos-once="true">
                                    <Card className={"dv_static_left_card"}>
                                    <CardHeader title="Time Series Trend Prediction" className="dv_static_ts_header"
                                        titleTypographyProps={{className:"dv_static_headers"}}
                                    />
                                    <CardContent className="dv_static_cc">
                                        <div className="dv_static_ts_area dv_static_content">
                                        <CardMedia className="dv_static_ts_cm" title={"time series prediction"} >
                                            <img className="dv_static_img dv_static_ts_img" src={ts1_logo} alt="time series prediction"/>    
                                        </CardMedia>
                                        <CardMedia className="dv_static_ts_cm" title={"time series prediction"} >
                                            <img className="dv_static_img dv_static_ts_img" src={ts3_logo} alt="time series prediction"/>    
                                        </CardMedia>
                                        </div>
                                    </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="dv_static_middle dv_static_area">
                                <div className="dv_static_middle_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                                    data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true"
                                    data-aos-id="aos_scroll_not_bottom" data-aos-once="true">
                                    <Card className={"dv_static_middle_card"}>
                                    <CardHeader title="Topic Modeling" className="dv_static_wc_header"
                                        titleTypographyProps={{className:"dv_static_headers"}}
                                    />
                                    <CardContent className="dv_static_cc">
                                        <div className="dv_static_wc_area dv_static_content">
                                            <CardMedia className="dv_static_wc_cm" title={"word cloud"} >
                                                <img className="dv_static_img dv_static_wc_img" src={wc2_logo} alt="word cloud"/>    
                                            </CardMedia>
                                            <CardMedia className="dv_static_wc_cm" title={"word cloud"} >
                                                <img className="dv_static_img dv_static_wc_img" src={wc1_logo} alt="word cloud"/>    
                                            </CardMedia>
                                            
                                        </div>
                                    </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="dv_static_right dv_static_area">
                                <div className="dv_static_right_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                                    data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true"
                                    data-aos-id="aos_scroll_not_bottom" data-aos-once="true">
                                    <Card className={"dv_static_right_card"}>
                                    <CardHeader title="Clustering Analysis" className="dv_static_ca_header"
                                        titleTypographyProps={{className:"dv_static_headers"}}
                                    />
                                    <CardContent className="dv_static_cc">
                                        <div className="dv_static_ca_area dv_static_content">
                                            <CardMedia className="dv_static_ca_cm" title={"cluster analysis"} >
                                                <img className="dv_static_img dv_static_ca_img" src={ca1_logo} alt="cluster analysis"/>    
                                            </CardMedia>
                                        </div>
                                    </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </div>
            </div>


            <div className="dv_interactive_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                    data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                    data-aos-once="true" >
                <div className="dv_interactive">
                <Card className={"dv_interactive_card"}>
                    <div className="dv_interactive_card_aos" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                        data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                        data-aos-once="true" >
                        <CardHeader title="INTERACTIVE STORYTELLING" className="dv_interactive_header"
                            titleTypographyProps={{className:"dv_headers"}}
                        />
                    </div>
                    <CardContent className="dv_interactive_card_content">
                        <div className="dv_itr_example" id="dv_itr_3d" data-aos="fade-up" data-aos-offset="20" data-aos-delay="500"
                            data-aos-duration="1000" data-aos-easing="ease-in-out-sine" data-aos-mirror="true" data-aos-id="aos_scroll_not_bottom"
                            data-aos-once="true">
                                
                                <div id="dv_3d_anomaly" >
                                    <div id="dv_3d_anomaly_desc" className="dv_itr_desc">
                                        Outliers in California border entry data detected by isolation forest
                                    </div>
                                    <div className="dv_itr_instruction">
                                        Drag and zoom the plot to view details
                                    </div>
                                    <div id="ef712f18-82d7-4a21-85e0-8775ce51605d" className="plotly-graph-div" style={{height:600, width:600}}></div>
                                </div>
                                    
                                
                        </div>
                        <div className="dv_itr_example" id="dv_itr_topic">
                                topic dialog
                        </div>
                        <div className="dv_itr_example" id="dv_itr_geo">
                                geo scattering
                        </div>

                        







                    </CardContent>
                </Card>
                </div>
            </div>

        </div>
    )}
}

export default DataVisualization;

