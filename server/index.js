const express = require('express') //variable called express, requiring express middleware
const app = express() //app variable
const mysql = require('mysql')
var cors = require('cors')

app.use(cors());
const db = mysql.createPool({
  host: "usersrv01.cs.virginia.edu",
  user: "vxw6ta",
  password: "lvDM0m3nt!",
  database: "vxw6ta"
})

app.get('/', (req, res)=> { //req = required, res = response
    //req used to get information from front end
    //detects when we reach certain routes in browser

    /************TEST********************
     app.get('/bruh', (req, res)=> {
    res.send("hasdfd");
    })
    
    const sqlInsert = "INSERT INTO rating (appointment_id, numeric_rating, description) VALUES ('134', '5', 'great');"
    db.query(sqlInsert, (err, result)=> {
        res.send("hello world"); //sending that info to front end
    })
    **************TEST******************/
    
}); 

app.listen(3001, () => {
    console.log("running on port 3001");
});