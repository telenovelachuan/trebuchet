// import { parse } from 'node-html-parser';
const axios = require('axios');
const cheerio = require('cheerio')

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
    axios.get(`${url}`).then(response => {
        const $ = cheerio.load(response.data);
        let result = $('span[itemprop=dateModified]').children().first().html();
        if (!result) {
            db_tools.get_prj_last_update(req, res, (succeeded, response) => {
                if (!succeeded) {
                    result = default_value;
                    res.json({result: result}); 
                }
                else {
                    if (response) {
                        res.json({result: response}); 
                    }
                    else {
                        result = default_value;
                        res.json({result: result}); 
                    }
                }
            });
        }
        else {
            req.body.last_update = result;
            req.body.prj_name = prj_name;
            db_tools.update_prj_last_update(req, res, false);
            res.json({result: result}); 
        }
        
    }).catch(error => {
        // handle error
        let err_msg = `Error getting update time for project '${prj_name}'`
        console.log(err_msg);
        //res.json({result: default_value}); 
        res.status(500).send({ message: err_msg })
      })
}


module.exports = {
    get_prj_update_time: get_prj_update_time,

};