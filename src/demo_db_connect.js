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

    // EXAMPLES OF QUERIES/FUNCTIONS WE CAN DO

    // how to SELECT * from appointment
    var select_sql = 'SELECT * FROM appointment'
    con.query(select_sql, function (err, result, fields) {
    console.log(result)
    });
    /*
    // how to insert 2 students into uva_student
    var insert_sql = [
        ['abcdef', 'mypassiscool', 'test', 'test2', 'test@test.edu'],
        ['111233', 'ooos', 'yeyey', '1234', 'test1234@test.edu']
    ];
    con.query("INSERT INTO uva_student (computing_id,password,first_name,last_name,uva_student_email) VALUES ?", [insert_sql], function (err, result, fields) {
        if (err) throw err;
        // some extra info (not too important)
        console.log(result);
        console.log("Number of rows affected : " + result.affectedRows);
        console.log("Number of records affected with warning : " + result.warningCount);
        console.log("Message from MySQL Server : " + result.message);
    });
    */
    
    //UPDATE values in  uva_student_phone
    con.query("UPDATE uva_student_phone SET phone_number='111-222-3333' WHERE computing_id='ab22a'", function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result);
        console.log("Number of rows affected : " + result.affectedRows);
        console.log("Number of records affected with warning : " + result.warningCount);
        console.log("Message from MySQL Server : " + result.message);
      });

    //DELETE from cases
    con.query("DELETE FROM cases WHERE case_date='2020-10-23'", function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result);
        console.log("Number of rows affected : " + result.affectedRows);
        console.log("Number of records affected with warning : " + result.warningCount);
        console.log("Message from MySQL Server : " + result.message);


    });
  });