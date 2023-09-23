
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '', 
  database:'tiktok-backend'
});
const util = require('util');

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connect to tiktok-backend successfully');
  });
const query = util.promisify(connection.query).bind(connection);
module.exports = query;