var mysql = require('mysql');
var host = "gabastil1.db.8756087.hostedresource.com",
    username = "gabastil1",
    password = "";

var con = mysql.createConnection({
    host : host,
    username : username,
    password : password
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
});