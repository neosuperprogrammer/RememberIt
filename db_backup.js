var mysql = require('mysql');
var fs = require('fs');
// fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
//     if (err) 
//         return console.log(err);
//     console.log('Wrote Hello World in file helloworld.txt, just check it');
// });

var con = mysql.createConnection({
  host: "localhost",
  user: "flowgrammer",
  password: "qwer1234",
  database: "remember_it"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT user_email, item, item_desc, remember_state, created FROM items", function (err, result, fields) {
    if (err) throw err;
    var buffer = '';
    result.forEach(function(value) {
    	buffer += value['user_email'] + ', ';
    	buffer += value['item'] + ', ';
    	buffer += value['item_desc'] + ', ';
    	buffer += value['remember_state'] + ', ';
    	buffer += value['created'] + '\n';
    });
    console.log(buffer);
    writeFile(buffer);
  });
});


var writeFile = function(buffer) {
 fs.writeFile('db_backup.txt', buffer, function (err) {
    if (err) 
        return console.log(err);
    console.log('Wrote in file db_backup.txt, just check it');
});
};