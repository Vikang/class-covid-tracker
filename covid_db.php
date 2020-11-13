<?php 

// CREATE TABLE friends (
//    name varchar(30) NOT NULL,
//    major varchar(10) NOT NULL,
//    year int NOT NULL,
//    PRIMARY KEY (name) );  

// Prepared statement (or parameterized statement) happens in 2 phases:
//   1. prepare() sends a template to the server, the server analyzes the syntax
//                and initialize the internal structure.
//   2. bind value (if applicable) and execute
//      bindValue() fills in the template (~fill in the blanks.
//                For example, bindValue(':name', $name);
//                the server will locate the missing part signified by a colon
//                (in this example, :name) in the template
//                and replaces it with the actual value from $name.
//                Thus, be sure to match the name; a mismatch is ignored.
//      execute() actually executes the SQL statement

function getHospitalAvailability($hospital_name){
	global $db;
	$query = "SELECT * from 'hospital_availability' where hospital_name = :name";
	$statement = $db->prepare($query);
	$statement->bindValue(':name', $hospital_name);
	$statement->execute();
	$results = $statement->fetchAll();
	$statement->closecursor();
	return $results;
}

function requestAppointment($hospital, $date, $time, $details, $physician, $computingId){
	global $db;
	$query = "SELECT max(appointment_id) from appointment";
	$statement = $db->prepare($query);
	$statement->execute();
	$statement->closecursor();
	$appointID = $statement->fetch();
	$appointID = $appointID + 1;
	$query2 = "SELECT * from hospital_availability where hospital_name = :name and available_time = :time and physician_name = :physician";
	$statement2 = $db->prepare($query2);
	$statement2->bindValue(':name', $hospital);
	$statement2->bindValue(':time', $time);
	$statement2->bindValue(':physician', $physician);
	$statement2->execute();
	$results = $statement2->fetchAll();
	$statement2->closecursor();
	if(count($results) == 0){
		return false;
	}
	$query3 = "DELETE FROM hospital_availability where hospital_name = :name and available_time = :time and physician_name = :physician";
	$statement3 = $db->prepare($query3);
	$statement3->bindValue(':name', $hospital);
	$statement3->bindValue(':time', $time);
	$statement3->bindValue(':physician', $physician);
	$statement3->execute();
	$statement3->closecursor();

	$query4 = "INSERT INTO appointment VALUES(:appointID, :appt_date, :appt_time, :details, :physician)";
	$statement4 = $db->prepare($query4);
	$statement4->bindValue(':appointID', $appointID);
	$statement4->bindValue(':appt_date', $date);
	$statement4->bindValue(':appt_time', $time);
	$statement4->bindValue(':details', $details);
	$statement4->bindValue(':physician', $physician);
	$statement4->execute();
	$statement4->closecursor();

	$query5 = "INSERT INTO requests VALUES(:appointID, :computingID)";
	$statement5 = $db->prepare($query5);
	$statement5->bindValue(':appointID', $appointID);
	$statement5->bindValue(':computingID', $computingId);
	$statement5->execute();
	$statement5->closecursor();
	return true;
}
function logIn($computingId, $password){
	global $db;
	$query = "SELECT password FROM uva_student";
	$statement = $db->prepare($query);
	$statement->execute();
	$results = $statement->fetchAll();
	$statement->closecursor();
	if($results == $password){
		return true;
	}
	return false;
}

function logHealthStatus($computingId, $severity, $status, $symptoms, $location){
	global $db;
	$query = "SELECT max(number) FROM `health_status` where computing_id = :computingId group by computing_id";
	$statement = $db->prepare($query);
	$statement->bindValue(':computingId', $computingId);
	$statement->execute();
	$num = $statement->fetchAll();
	// $statement->closecursor();
	$num = $num + 1;
	$query = "INSERT INTO 'health_status' VALUES (:computingId, :number, :severity, :status, :symptoms";
	$statement = $db->prepare($query);
	$statement->bindValue(':computingId', $computingId);
	$statement->bindValue(':number', $num);
	$statement->bindValue(':severity', $severity);
	$statement->bindValue(':symptoms', $symptoms);
	$statement->execute();
	// $num = $statement->fetchAll();
	$statement->closecursor();
	$date = date('Y-m-d');
	$query2 = "INSERT INTO 'logs' VALUES (:computingId, :date, :number, :student_location";
	$statement2 = $db->prepare($query2);
	$statement2->bindValue(':computingId', $computingId);
	$statement2->bindValue(':date', $date);
	$statement2->bindValue(':number', $num);
	$statement2->bindValue(':student_location', $location);
	$statement2->execute();
	$statement2->closecursor();

}


function addStudent($computingId, $first, $last, $pass, $email){
	global $db;
	$query = "SELECT COUNT(1) from 'uva_student' where computing_id = :computingId";
	$statement = $db->prepare($query);
	$statement->bindValue(':computingId', $computingId);
	$results = $statement->fetchAll();
	if($results > 0){
		$statement->closecursor();

		return false;
	}
	else{
		$query = "INSERT INTO 'uva_student' VALUES(:computingId, :first_name, :last_name, :password, :uva_student_email)";
		$statement = $db->prepare($query);
		$statement->bindValue(':computingId', $computingId);
		$statement->bindValue(':first_name', $first);
		$statement->bindValue(':last_name', $last);
		$statement->bindValue(':password', $pass);
		$statement->bindValue(':uva_student_email', $email);
		$statement->execute();
		$statement->closecursor();
		return true;
	}
	return false;
}

function updateStudent($computingId, $first, $last, $pass, $email)
{
	global $db;
	
	$query = "UPDATE 'uva_student' SET first_name=:first, last_name=:last, password = :pass, uva_student_email = :email WHERE computing_id=:computingId";
	$statement = $db->prepare($query);
	$statement->bindValue(':computingId', $computingId);
	$statement->bindValue(':first', $first);
	$statement->bindValue(':last', $last);
	$statement->bindValue(':pass', $pass);

	$statement->bindValue(':email', $email);

	
	$statement->execute();
	$statement->closeCursor();
}

function getHospitals(){
	global $db;
	$query = "SELECT * from 'hospital'";
	$statement = $db->prepare($query);
	$statement->execute();
	$results = $statement->fetchAll();
	$statement->closecursor();
	return $results;
}
// function getAllFriends()
// {
// 	global $db;
// 	$query = "SELECT * FROM vxw6ta";
// 	$statement = $db->prepare($query);
// 	$statement->execute();
	
// 	// fetchAll() returns an array for all of the rows in the result set
// 	$results = $statement->fetchAll();
	
// 	// closes the cursor and frees the connection to the server so other SQL statements may be issued
// 	$statement->closecursor();
	
// 	return $results;
// }

// function addFriend($name, $major, $year)
// {
// 	global $db;
	
// 	// bad
//     // $query = "INSERT INTO friends (name, major,year) VALUES('...', '...', '...')";
// 	// $query = "INSERT INTO friends VALUES('" . $name . "', '" . $major . "'," . $year . ")";	
// 	// $statement = $db->query($query); 

// 	// good 
// 	$query = "INSERT INTO vxw6ta VALUES(:name, :major, :year)";
// 	$statement = $db->prepare($query);
// 	$statement->bindValue(':name', $name);
// 	$statement->bindValue(':major', $major);
// 	$statement->bindValue(':year', $year);
// 	$statement->execute();        // run query, if the statement is successfully executed, execute() returns true
// 	                              // false otherwise
	
// 	$statement->closeCursor();    // release hold on this connection
// }
   
// function getFriendInfo_by_name($name)
// {
// 	global $db;
	
// 	// bad
// 	$query = "SELECT * FROM vxw6ta WHERE name ='" . $name . "'";
// 	$statement = $db->query($query);
	
// 	// good, use prepare statement to minimize chance of sql injection
// 	// $query = "SELECT * FROM friends WHERE name = :name";
// 	// $statement = $db->prepare($query);
// 	// $statement->bindValue(':name', $name);
// 	// $statement->execute();
	
// 	// fetchAll() returns an array for all of the rows in the result set
// 	// fetch() return a row
// 	$results = $statement->fetch();
	
// 	// closes the cursor and frees the connection to the server so other SQL statements may be issued
// 	$statement->closecursor();
	
// 	return $results;
// }

// function updateFriend($name, $major, $year)
// {
// 	global $db;
	
// 	$query = "UPDATE vxw6ta SET major=:major, year=:year WHERE name=:name";
// 	$statement = $db->prepare($query);
// 	$statement->bindValue(':name', $name);
// 	$statement->bindValue(':major', $major);
// 	$statement->bindValue(':year', $year);
// 	$statement->execute();
// 	$statement->closeCursor();
// }

// function deleteFriend($name)
// {
// 	global $db;
// 	$query = "DELETE FROM vxw6ta WHERE name=:name";
// 	$statement = $db->prepare($query);
// 	$statement->bindValue(':name', $name);
// 	$statement->execute();      // run query
// 	$statement->closeCursor();  // release hold on this connection	
// }
?>
