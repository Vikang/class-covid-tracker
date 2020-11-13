var mysql = require('mysql');

var con = mysql.createConnection({
  host: "usersrv01.cs.virginia.edu",
  user: "vxw6ta",
  password: "lvDM0m3nt!",
  database: "vxw6ta"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});