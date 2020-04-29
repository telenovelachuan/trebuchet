//import sqlite3 from 'sqlite3';
//import { open } from 'sqlite';


// function get_all_access() {
//   console.log("in get_all_access!!");
//   let sql = "select * from access";
//   db.transaction(function(txn) {
//     txn.executeSql(
//       sql,                 //Query to execute as prepared statement
//       [],      //Argument to pass for the prepared statement
//       function(tx, res) {
//         console.log("success!");
//       }   //Callback function to handle the result
//     );
//   });
// }

// module.exports = {
//   get_all_access: get_all_access,
// };

// export function get_all_access() {
//   console.log("in get_all_access!!");
//   let sql = "select * from access";
//   let db = new sqlite3.Database('./trebuchet.db', (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Connected to the trebuchet database.');
//   });
// }