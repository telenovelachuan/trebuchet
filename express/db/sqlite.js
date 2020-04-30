const sqlite3 = require('sqlite3').verbose();
const path = require('path'); 

const getIP = require('ipware')().get_ip;

function get_all_access(req, res) {
    let sql = "select * from site_access";
    let db_path = path.resolve(__dirname, 'trebuchet.db')
    var db = new sqlite3.Database(db_path); 
    console.log('Connected to the trebuchet database.');
    
    db.all(sql, function(err, rows) {
        if (err) {
            return res.status(400).send({ message: 'DB Query failed. ' + err.message });
            
        }
        res.json(rows); 
        // rows.forEach(function (row) {
        //     console.log(row);
        // })
      
    });
    db.close()
}

function add_access_entry(req, res) {
    var ipInfo = getIP(req);
    // console.log("ip:" + ipInfo.clientIp)
    // var client_ip = req.body.client_ip;
    var client_ip = ipInfo.clientIp;
    let sql = `insert into site_access (ipv4, geo) values ('${client_ip}', '')`;
    console.log("sql:" + sql);
    let db_path = path.resolve(__dirname, 'trebuchet.db')
    var db = new sqlite3.Database(db_path); 
    db.run(sql, function(err) { 
        if (err) {
            return res.status(400).send({ message: 'DB insertion failed. ' + err.message });
        }
        res.json({message: 'insertion succeeded'}); 
      
    });
    db.close()
}

module.exports = {
    get_all_access: get_all_access,
    add_access_entry: add_access_entry,
};

