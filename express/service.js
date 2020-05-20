// import { parse } from 'node-html-parser';
const axios = require('axios');
const fs = require("fs");

var db_tools = require('./db/sqlite');

const PRJ_URL_DICT = {
    "widget_maintenance": "https://github.com/telenovelachuan/predictive_widget_maintenance",
    "worldwide_products": "https://github.com/telenovelachuan/worldwide_products",
    "the_oscars": "https://github.com/telenovelachuan/the_oscars",
    "major_leagues": "https://github.com/telenovelachuan/major_leagues",
    "shakespear_plays": "https://github.com/telenovelachuan/shakespear_plays",
    "news_headline":"https://github.com/telenovelachuan/Eluvio_DS_Challenge",
    "dream_of_anomalies": "https://github.com/telenovelachuan/dream_of_anomalies",
    "movie_lens": "https://github.com/telenovelachuan/movie_lens",
}

function get_prj_update_time(req, res) {
    let prj_name = req.query.prj_name;
    let url = PRJ_URL_DICT[prj_name];
    const default_value = 'Dec 2019';

    db_tools.get_prj_last_update(req, res, (succeeded, response) => {
        let result = default_value;
        if (!succeeded) {
            res.json({result: result}); 
        }
        else {
            if (response) {
                res.json({result: response}); 
            }
            else {
                res.json({result: result}); 
            }
        }
    });
}

function get_3d_anomaly_js_text(req, res) {
    //fs.readFile(__dirname + '/htmls/California_subset_by_Isolation_forest_3D.html', 'utf8', function(err, html){

    fs.readFile(__dirname + '/htmls/cc.js', 'utf8', function(err, html){
        if(err) {
            res.json({error: err}); 
        }
        else {
            let result = html.replace(/(?:\r\n|\r|\n)/g, '');
            console.log("js read success!");
            console.log(result);
            res.json({"js": result}); 
        }
    })
}


module.exports = {
    get_prj_update_time: get_prj_update_time,
    get_3d_anomaly_js_text: get_3d_anomaly_js_text,
};