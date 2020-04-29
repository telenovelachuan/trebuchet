const sqlite3 = require('sqlite3').verbose();

function get_all_access() {
    let db = new sqlite3.Database('./db/chinook.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        else {
            console.log('Connected to the trebuchet database.');
        }
        
    });
}

module.exports = {
    get_all_access: get_all_access,

};

