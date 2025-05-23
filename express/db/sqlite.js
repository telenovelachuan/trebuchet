// const sqlite3 = require('sqlite3').verbose();
// const path = require('path'); 
// const config = require('./config.json');
// const getIP = require('ipware')().get_ip;

// const db_path = `${config.db_path}/trebuchet.db`;
// console.log(`db_path:${db_path}`);

// function get_all_access(req, res) {
//     let sql = "select * from site_access";
//     var db = new sqlite3.Database(db_path); 
    
//     db.all(sql, function(err, rows) {
//         if (err) {
//             return res.status(400).send({ message: 'DB Query failed. ' + err.message });    
//         }
//         res.json(rows);    
//     });
//     db.close()
// }

// function add_access_entry(req, res) {
//     var ipInfo = getIP(req);
//     // console.log("ip:" + ipInfo.clientIp)
//     // var client_ip = req.body.client_ip;
//     var client_ip = ipInfo.clientIp;
//     var time = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
//     let sql = `insert into site_access (ipv4, geo, ts) values ('${client_ip}', '', '${time}')`;
//     console.log("sql:" + sql);
//     var db = new sqlite3.Database(db_path); 
//     db.run(sql, function(err) { 
//         if (err) {
//             return res.status(400).send({ message: 'DB failed on inserting a visit. ' + err.message });
//         }
//         res.json({message: 'insertion succeeded'}); 
      
//     });
//     db.close()
// }

// function add_comment(req, res) {
//     var name = req.body.name;
//     var email = req.body.email;
//     var comment = req.body.comment;
//     var time = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
//     let sql = `insert into reply (name, email, comment, ts) values ('${name}', '${email}', '${comment}', '${time}')`;
//     console.log("sql:" + sql);
//     var db = new sqlite3.Database(db_path); 
//     db.run(sql, function(err) { 
//         if (err) {
//             return res.status(400).send({ message: 'DB failed on inserting a reply. ' + err.message });
//         }
//         res.json({message: 'insertion succeeded'}); 
      
//     });
//     db.close()
// }

// function update_prj_last_update(req, res, need_return) {
//     let last_update = req.body.last_update;
//     let prj_name = req.body.prj_name;
//     let sql = `update ml_projects set last_update='${last_update}' where name='${prj_name}'`;
//     console.log(sql);
//     var db = new sqlite3.Database(db_path); 
//     db.run(sql, function(err) { 
//         if (err) {
//             let err_msg = 'DB failed on update project time. ' + err.message;
//             if (need_return === false) {
//                 console.log(err_msg)
//             }
//             else {
//                 return res.status(400).send({ message: err_msg });
//             }
//         }
//         else {
//             if (need_return === false) {
//                 console.log("updating db succeeded");
//             }
//             else {
//                 res.json({message: 'update succeeded'}); 
//             }
//         }

//     });
//     db.close()
// }

// function get_prj_last_update(req, res, callback) {
//     let prj_name = req.query.prj_name;
//     let sql = `select last_update from ml_projects where name='${prj_name}'`;
//     var db = new sqlite3.Database(db_path); 
    
//     db.all(sql, function(err, rows) {
//         if (err) {
//             return callback(false, 'DB query failed');    
//         }
//         if (rows.length < 1) {
//             return callback(false, `${prj_name} not found`);  
//         }
//         return callback(true, rows[0].last_update);  
//     });
//     db.close()
// }

// function create_game_record(req, res) {
//     let result = req.body.result;
//     let game_name = req.body.game_name;
//     var time = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
//     let sql = `insert into for_fun (game_name, result, ts) values ('${game_name}', '${result}', '${time}')`;
//     console.log("sql:" + sql);
//     var db = new sqlite3.Database(db_path); 
//     db.run(sql, function(err) { 
//         if (err) {
//             return res.status(400).send({ message: 'DB failed on inserting a game record. ' + err.message });
//         }
//         res.json({message: 'game record insertion succeeded'}); 
      
//     });
//     db.close()
// }

// function get_game_success_rate(req, res, callback) {
//     let game_name = req.query.game_name;
//     let sql = `select distinct game_name,result,ts from for_fun where game_name='${game_name}'`;
//     var db = new sqlite3.Database(db_path); 
    
//     db.all(sql, function(err, rows) {
//         if (err) {
//             return callback(false, 'DB query failed');    
//         }
//         if (rows.length < 1) {
//             return callback(false, `${game_name} not found`);  
//         }

//         let success = 0;
//         let failure = 0;
//         let result;
//         for (let i=0; i<rows.length; i++) {
//             if (rows[i].result === 'win') {
//                 success += 1;
//             }
//             else if (rows[i].result === 'lose') {
//                 failure += 1;
//             }
//         }
//         if ((success + failure) === 0) {
//             result = "No games played yet...";
//         }
//         else {
//             let pct = Math.ceil((success * 100 / (success + failure)));
//             result = pct.toString() + "%";
//         }
//         return callback(true, result);  
//     });
//     db.close()
// }


// module.exports = {
//     get_all_access: get_all_access,
//     add_access_entry: add_access_entry,
//     add_comment: add_comment,
//     update_prj_last_update: update_prj_last_update,
//     get_prj_last_update: get_prj_last_update,
//     create_game_record: create_game_record,
//     get_game_success_rate: get_game_success_rate,
// };

