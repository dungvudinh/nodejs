var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '', 
});
const util = require('util');

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connect to tiktok-frontend successfully');
  });
const tableQuery = util.promisify(connection.query).bind(connection);
module.exports = tableQuery;