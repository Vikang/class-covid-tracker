const express = require('express') //variable called express, requiring express middleware
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "usersrv01.cs.virginia.edu",
    user: "vxw6ta",
    password: "lvDM0m3nt!",
    database: "vxw6ta"
  });
  


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/api/signin', (req, res)=> {

    const computingID = req.query.computingID;
    const password = req.query.password;
    const sqlget = "SELECT password FROM uva_student where computing_id = (?)";
    con.query(sqlget, [computingID], (err, result) => {
        console.log(computingID);
        console.log(password);
        console.log(result);
    });
    res.send("hello world");
})
app.get('/bruh', (req, res)=> {
    res.send("hasdfd");
})

app.listen(3001, () => {
    console.log("running on port 3001");
});