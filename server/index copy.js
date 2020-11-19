const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: 'usersrv01.cs.virginia.edu',
    user: 'vxw6ta',
    password: 'lvDM0m3nt!',
    database: 'vxw6ta'
});


app.get("/", (req,res)=> {
    res.send("<h1>Home Page</h1>")
});

app.listen(3001, ()=> {
    console.log("Server started on port 3001")
})
/*const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect( (error) => {
  if(error) {
    console.log(error)
  } else {
    console.log("MYSQL Connected...")
  }
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3001, () => {
  console.log("Server started on Port 5001");
})*/

/*const express = require('express') //variable called express, requiring express middleware
const path = require('path');
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv'); //protect passwords
const cookieParser = require('cookie-parser')
const authController = require('../controllers/auth')

dotenv.config({path: './.env' });

var cors = require('cors')
var mysql = require('mysql');



var con = mysql.createConnection({
    host: 'usersrv01.cs.virginia.edu',
    user: 'vxw6ta',
    password: 'lvDM0m3nt!',
    database: 'vxw6ta'
    /*host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });

  app.set('view engine', 'hbs');
  const publicDirectory = path.join(__dirname, '../src') //where we put files for js and css for front end
  app.use(express.static(publicDirectory))
  //console.log(__dirname);

  app.use(cors());
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  //CHECK DATABASE CONNECTION
  con.connect( (error) => {
    if(error) {
        console.log(error)
    }
    else {
        console.log("MYSQL Connected...")
    }
  })

  //USER - DEFINE ROUTES
  app.use('/', require('../routes/pages.js'));
  app.use('/auth', require('../routes/auth'));

  //Parse URL-encoded bodies (as wend by HTML forms)
  app.use(express.urlencoded({extended: false}));
  //Parse JSON bodies (as sent by API clients)
  app.use(express.json());

  app.use(cookieParser());*/

/************************************* Report health status *****************************************
app.post('/track',  authController.isLoggedIn, (req, res, fields)=> {
    const date = req.body.date;
    const location = req.body.location;   
    const status = req.body.status;   
    const severity = req.body.severity;   
    const symptoms = req.body.details;
    con.query('INSERT INTO status (date, location, status, severity, symptoms) VALUES (?,?,?,?,?)', [date, location, status, severity, symptoms], (err, rows)=>{
        console.log(req.body)
        if(err) throw err;
        return res.render('report', {
            message: 'Health Status Report Submitted!'
        })
    });
})

/************************************* Edit Profile ********************************************

app.post('/edit', (req, res, fields)=> {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const id = req.body.compID;
    const email = req.body.email;
    const phone = req.body.phone;   
    console.log(id);
    con.query(`UPDATE uva_student SET first_name="${fname}", last_name="${lname}", uva_student_email="${email}", phone="${phone}" WHERE computing_id = ?`, [id], (err, rows)=>{
        if(err) throw err;
        return res.render('edit', {
            message: 'Profile Updated!'
        })
        
    })
})

/************************************* Tracker ************************************************
app.get('/tracker',  authController.isLoggedIn, (req, res, fields)=> {
    con.query('SELECT * FROM status', (err, rows)=>{
        if(err) throw err;
            console.log(rows);
            res.render('tracker', {student: req.student, title:"Class Cases", cases: rows}); 
    })
});

app.get('/api/tracker', (req, res, fields)=> {
    con.query('SELECT * FROM status', (err, rows)=>{
        if(err) throw err;

        return res.send(rows);
    })
})

/************************************* Request Appointment *****************************************
app.post('/request', authController.isLoggedIn, (req, res, fields)=> {
    const appt_date = req.body.appt_date;
    const appt_time = req.body.appt_time;   
    const appt_location = req.body.appt_location;   
    const details = req.body.details;   
    const compID = req.body.compID;   
    con.query('INSERT INTO appointment (appt_date,appt_time,appt_location,details,patient) VALUES (?,?,?,?,?)', [appt_date, appt_time, appt_location, details, compID], (err, rows)=>{
        if(err) throw err;
        return res.render('requestappt', {
            message: 'Appointment Request Submitted!'
        })
        
    })
})

app.get('/appointment',  authController.isLoggedIn, (req, res, fields)=> {
    con.query('SELECT * FROM appointment WHERE patient = ?', [req.student.computing_id], (err, rows)=>{
        if(err) throw err;
            console.log(rows);
            res.render('appointment', {student: req.student, title:"My Appointment Requests", requests: rows}); 
    })
});

/************************************* Edit Appointment *****************************************
app.get('/edit-appt-form/:id', authController.isLoggedIn, (req, res, next)=> {
    const id = req.params.id;
    con.query('SELECT * FROM appointment WHERE appointment_id = ?', [id], (err,rows,fields)=> {
        if(err) throw err;
        res.render('editapptform', {student: req.student, title: 'Edit Appointment', appointment: rows[0]})
    })
})

app.post('/edit/:id', (req, res, fields)=> {
    const id = req.body.appt_id;
    const appt_date = req.body.appt_date;
    const appt_time = req.body.appt_time;   
    const appt_location = req.body.appt_location;   
    const details = req.body.details;   
    console.log(id);
    con.query(`UPDATE appointment SET appt_date="${appt_date}", appt_time="${appt_time}", appt_location="${appt_location}", details="${details}" WHERE appointment_id = ?`, [id], (err, rows)=>{
        if(err) throw err;
        return res.render('editapptform', {
            message: 'Appointment Updated!'
        })
        
    })
})

/************************************* Delete Appointment *****************************************
app.get('/delete/:appointment_id', (req, res, next)=> {
    const id = req.params.appointment_id;
    con.query('DELETE FROM appointment WHERE appointment_id = ?', [id], (err,rows,fields)=> {
        if(err) throw err;
        console.log(id);
        return res.render('appointment', {
            message: 'Appointment Deleted!'
        })
    })
})

/************************************* Rate Appointment *****************************************
app.get('/rate-appt-form/:id', authController.isLoggedIn, (req, res, next)=> {
    const id = req.params.id;
    con.query('SELECT * FROM appointment WHERE appointment_id = ?', [id], (err,rows,fields)=> {
        if(err) throw err;
        res.render('rateapptform', {student: req.student, title: 'Rate Appointment', appointment: rows[0]})
    })
})

app.post('/rate/:id', (req, res, fields)=> {
    const id = req.body.appt_id;
    const numeric = req.body.numeric;
    const comment = req.body.comment;  
    con.query('INSERT INTO rating (appointment_id, numeric_rating, description) VALUES (?,?,?)', [id, numeric, comment], (err, rows)=>{
        if(err) throw err;
        return res.render('rateapptform', {
            message: 'Rating Submitted!'
        })
        
    })
})

*/

/*************************************************************************************/
/*
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
      User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            })
            await newUser.save();
            res.send("User Created")
        }
    })

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
});*/