var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
var db_tools = require('./db/sqlite');
var service_tools = require('./service');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
var port = 3001;        
var router = express.Router(); 
var corsOptions = {origin: false}


router.get('/', cors(corsOptions), function(req, res) {
    res.json({ message: 'trebuchet get api' });   
});

router.get('/get_all_access', cors(corsOptions), function(req, res) {
    db_tools.get_all_access(req, res);
    //res.json({ message: 'trebuchet get api' });   
});
router.post('/new_access_entry', cors(corsOptions), function(req, res) {
    db_tools.add_access_entry(req, res);
});
router.post('/new_reply', cors(corsOptions), function(req, res) {
    db_tools.add_comment(req, res);
});

router.get('/get_prj_update_time', cors(corsOptions), function(req, res) {
    service_tools.get_prj_update_time(req, res);
    //res.json({ message: 'trebuchet get api' });   
})
router.post('/new_game_record', cors(corsOptions), function(req, res) {
    db_tools.create_game_record(req, res);
});


router.post('/', cors(corsOptions), function(req, res) {
    res.json({ message: 'trebuchet post api' });   
});
router.get('/get_game_success_rate', cors(corsOptions), function(req, res) {
    db_tools.get_game_success_rate(req, res, (succeeded, response) => {
        if (!succeeded) {
            res.json({result: ""}); 
        }
        else {
            if (response) {
                res.json({result: response}); 
            }
            else {
                res.json({result: ""}); 
            }
        }
    });
    //res.json({ message: 'trebuchet get api' });   
})
router.get('/get_3d_anomaly_js', cors(corsOptions), function(req, res) {
    service_tools.get_3d_anomaly_js_text(req, res);
});

app.use('/api', router);

app.listen(port);
console.log('Starting trebuchet backend on port ' + port);