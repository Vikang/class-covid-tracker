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

  //LOGIN AND REGISTER
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

//RATING PAGE STUFF
app.get('/api/get_rating', (req,res)=>{
    const sqlSelect = "SELECT * FROM rating";
    con.query(sqlSelect, (err,result)=> {
        res.send(result)
        //console.log(result);
        });
});

app.post('/api/insert_rating', (req, res)=> {
    
    const appointment_id = req.body.appointment_id
    const numeric_rating = req.body.numeric_rating
    const description = req.body.description

    const sqlInsert = "INSERT INTO rating (appointment_id,numeric_rating,description) VALUES (?,?,?)"; 
    //(?,?) not inserting varialbe directly into sql statement for security reasons
    con.query(sqlInsert, [appointment_id,numeric_rating,description], (err,result)=> {
    //console.log(result);
    });
});

app.delete('/api/delete_rating/:appointment_id', (req, res)=> {
    const appt_id = req.params.appointment_id;
    const sqlDelete = 
    "DELETE FROM rating WHERE appointment_id = ?"; 
    con.query(sqlDelete, appt_id, (err, result) => {
        if (err) console.log(err)
    })
    //console.log(result);
})

app.put('/api/update_rating/:appointment_id', (req, res)=> {
    const appt_id = req.body.appointment_id;
    const rating = req.body.description;
    const sqlUpdate = 
    "UPDATE rating SET description = ? WHERE appointment_id = ?"; 
    con.query(sqlUpdate, appt_id, (err, result) => {
        if (err) console.log(err)
    })
    //console.log(result);
})

app.listen(3001, () => {
    console.log("running on port 3001");
});