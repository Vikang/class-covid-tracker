const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');


const con = mysql.createConnection({
    host: 'usersrv01.cs.virginia.edu',
    user: 'vxw6ta',
    password: 'lvDM0m3nt!',
    database: 'vxw6ta'
});

exports.login = async (req, res) => {
    try {
      const { computing_id, password } = req.body;
  
      if( !computing_id || !password ) {
        return res.status(400).render('login', {
          message: 'Please provide an email and password'
        })
      }
  
      con.query('SELECT * FROM uva_student WHERE computing_id = ?', [computing_id], async (error, results) => {
        console.log(results);
        if( !results || !(await bcrypt.compare(password, results[0].password)) ) {
          res.status(401).render('login', {
            message: 'Computing ID or Password is incorrect'
          })
        } else {
          const computing_id = results[0].computing_id;
  
          const token = jwt.sign({ computing_id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
          });
  
          console.log("The token is: " + token);
  
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
          }
  
          res.cookie('jwt', token, cookieOptions );
          res.status(200).redirect("/");
        }
  
      })
  
    } catch (error) {
      console.log(error);
    }
  }


exports.register = (req, res) => {

    console.log(req.body);
  
    const { first_name, last_name, computing_id, email, password, passwordConfirm } = req.body;
  
    con.query('SELECT computing_id FROM uva_student WHERE computing_id = ?', [computing_id], async (error, results) => {
      if(error) {
        console.log(error);
      }
  
      if( results.length > 0 ) {
        return res.render('register', {
          message: 'That Computing ID is already in use'
        })
      } else if( password !== passwordConfirm ) {
        return res.render('register', {
          message: 'Passwords do not match'
        });
      }
  
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
  
      con.query('INSERT INTO uva_student SET ?', {first_name: first_name, last_name: last_name, computing_id: computing_id, uva_student_email: email, password: hashedPassword }, (error, results) => {
        if(error) {
          console.log(error);
        } else {
          console.log(results);
          return res.render('register', {
            message: 'Student registered!'
          });
        }
      })
    });
  
  }

  exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies);
    if( req.cookies.jwt) {
      try {
        //1) verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
  
        console.log(decoded);
  
        //2) Check if the user still exists
        con.query('SELECT * FROM uva_student WHERE computing_id = ?', [decoded.computing_id], (error, result) => {
          console.log(result);
  
          if(!result) {
            return next();
          }
  
          req.student = result[0];
          //console.log("student is")
          //console.log(req.student);
          return next();
  
        });
      } catch (error) {
        console.log(error);
        return next();
      }
    } else {
      next();
    }
  }
  
  exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 2*1000),
      httpOnly: true
    });
  
    res.status(200).redirect('/');
  }

  exports.edit = async (req, res) => {
        const fname = req.body.first_name;
        const lname = req.body.last_name;
        const id = req.body.computing_id;
        const email = req.body.uva_student_email;
        const phone = req.body.phone;   
        console.log(id);
        con.query(`UPDATE uva_student SET first_name="${fname}", last_name="${lname}", uva_student_email="${email}", phone="${phone}" WHERE computing_id = ?`, [id], (err, rows)=>{
            if(err) throw err;
            console.log(rows)
            return res.render('edit', {
                message: 'Profile Updated!'
            })
            
        })
  }

  exports.report = async (req, res) => {
    const date = req.body.date;
    const location = req.body.location;   
    const status = req.body.status;   
    const severity = req.body.severity;   
    const symptoms = req.body.symptoms;
    con.query('INSERT INTO status (date, location, status, severity, symptoms) VALUES (?,?,?,?,?)', [date, location, status, severity, symptoms], (err, rows)=>{
        console.log(req.body)
        if(err) throw err;
        return res.render('report', {
            message: 'Health Status Report Submitted!'
        })
    });
  }

  /*exports.appointment = async (req, res) => {
    con.query('SELECT * FROM appointment WHERE patient = ?', req.computing_id, (err, rows)=>{
        console.log(req.student.computing_id);
        if(err) throw err;
            
            res.render('appointment', {student: req.student, title:"My Appointment Requests", requests: rows}); 
    })
  }*/

  
  exports.requestappt = async (req, res) => {
    const appt_date = req.body.appt_date;
    const appt_time = req.body.appt_time;   
    const appt_location = req.body.appt_location;   
    const details = req.body.details;   
    const patient = req.body.patient;   
    con.query('INSERT INTO appointment (appt_date,appt_time,appt_location,details,patient) VALUES (?,?,?,?,?)', [appt_date, appt_time, appt_location, details, patient], (err, rows)=>{
        if(err) throw err;
        return res.render('requestappt', {
            message: 'Appointment Request Submitted!'
        })
        
    })
  }