var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var db_tools = require('./db/sqlite');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3001;        
var router = express.Router(); 

router.get('/', function(req, res) {
    db_tools.get_all_access();
    res.json({ message: 'trebuchet get api' });   
});

router.post('/', function(req, res) {
    res.json({ message: 'trebuchet post api' });   
});


app.use('/api', router);

app.listen(port);
console.log('Starting trebuchet backend on port ' + port);