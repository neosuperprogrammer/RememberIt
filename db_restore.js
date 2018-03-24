var mysql = require('mysql');

var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'db_backup.txt');

var readFile = function(callback) {
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err) {
			console.log('received data: ' + data);
			callback(data, null);
		} else {
			console.log(err);
			callback(null, err);
		}
	});
};

var con = mysql.createConnection({
  host: "localhost",
  user: "flowgrammer",
  password: "qwer1234",
  database: "remember_it"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  readFile(function(data, err) {
  	if (err) {
  		console.log(err);
  	} else {
//   		console.log(data);
		dropTable(con);
		var array = data.split('|||||\r\n');
		var count = 0;
		array.forEach(function(value) {
// 			console.log(value);
			var fields = value.split('||');
			if (fields[0].length > 0) {
				var newItem = [fields[0].trim(), fields[1].trim(), fields[2].trim(), fields[3].trim(), new Date()];
				insertToDB(con, newItem);
				count++;
			}
		});   
		
		console.log("count : " + count);
		showDB(con); 
  	}
  	
  });
});

var dropTable = function(con) {
	var sql = "delete from items"; 
  con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("delete " + result.affectedRows);
  })
}

var insertToDB = function(con, newItem) {
// 	  var sql = "INSERT INTO items (user_email, item, item_desc, remember_state) VALUES ?";
	var sql = "INSERT INTO items (user_email, item, item_desc, remember_state) VALUES (" 
	+ "'" + newItem[0] + "'" + ", " 
	+ "'" + newItem[1] + "'" + ", " 
	+ "'" + newItem[2] + "'" + ", " 
	+ "'" + newItem[3] + "'"
	+ ")";
	console.log('sql : ' + sql);
	con.query(sql, function (err, result) {
		if (err) throw err;
	// 		console.log("Number of records inserted: " + result.affectedRows);
	});

};

var showDB = function(con) {
	var sql = "select * from items"; 
  con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("result " + result.length);
  })	
};



