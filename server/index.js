const express = require('express') //variable called express, requiring express middleware
const app = express() //app variable
const mysql = require('mysql')
const bodyParser = require('body-parser')
var cors = require('cors')
// var mysql = require('mysql');
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
    // const b;
    var data = [];
    const sqlget = "SELECT password FROM uva_student where computing_id = (?)";
    con.query(sqlget, [computingID], (err, result) => {
        // console.log(computingID);
        console.log(password);
        console.log(result);
        // const b = result;
        // result;
        if(result.length == 0){
            res.send("false");
        }
        console.log(result[0].password);
        if(result[0].password == password){
            res.send("true");
        }
    });
    // console.log(data);
    // res.send("false");
});
app.post('/api/report', (req, res)=> {
    const computing_id = req.body.computingID;
    const report_id = req.body.reportID;
    const status = req.body.status;
    const severity = req.body.severity;
    const symptoms = req.body.symptoms;

    // const b;
    var data = [];
    var number = 1; // place holder
    var insert_sql = [
        [computing_id, report_id, status, severity, symptoms]
    ];
    con.query("INSERT INTO health_status (computing_id,number,status,severity,symptoms) VALUES ?", [insert_sql], function (err, result, fields) {
    if (err) {
        res.send("You submitted a duplicate computing ID and report ID. Try again.");
    }
    else{
        console.log(result);
        console.log("Number of rows affected : " + result.affectedRows);
        console.log("Number of records affected with warning : " + result.warningCount);
        console.log("Message from MySQL Server : " + result.message);
        res.send("Thank you for reporting your health status!");
    }
    
    });
    // console.log(data);
    // res.send("false");
    //*/
});

app.post('/api/register', (req, res)=> {
    // console.log(req);
    const computingID = req.body.computingID;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(computingID);
    if(password != confirmPassword){
        res.send("Passwords didn't match.");
        return;
    }

    const sqlget = "INSERT INTO uva_student (computing_id,password,first_name,last_name,uva_student_email) VALUES ?";
    var insert_sql = [
        [computingID, password, 'test', 'test2', 'test@test.edu'],
        // ['111233', 'ooos', 'yeyey', '1234', 'test1234@test.edu']
    ];
    // ['abcdef', 'mypassiscool', 'test', 'test2', 'test@test.edu'],
    con.query(sqlget, [insert_sql], function (err, result, fields) {
        if (err) throw err;
        // some extra info (not too important)
        console.log(result);
        console.log("Number of rows affected : " + result.affectedRows);
        console.log("Number of records affected with warning : " + result.warningCount);
        console.log("Message from MySQL Server : " + result.message);
        if(result.affectedRows == 1){
            res.send("Success");
        }else{
            res.send("Failed");
        }
    });
    // res.send("Scues");
});

app.get('/', (req, res)=> { //req = required, res = response
    //req used to get information from front end
    //detects when we reach certain routes in browser

    const sqlInsert = "INSERT INTO rating (appointment_id, numeric_rating, description) VALUES ('134', '5', 'great');"
    db.query(sqlInsert, (err, result)=> {
        res.send("hello world"); //sending that info to front end
    })
    /************TEST********************
    **************TEST******************/
    
}); 

app.listen(3001, () => {
    console.log("running on port 3001");
});