// const mongoose = require('mongoose');

// async function connect() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/TikTok');
//         mongoose.set('strictQuery', false);
//         console.log('Connected');
//     } catch (error) {
//         console.log('error connection');
//     }
// }
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '', 
  database:'tiktok-database'
});
const util = require('util');

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
const query = util.promisify(connection.query).bind(connection);
module.exports = query;
