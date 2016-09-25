var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();

var options = {
  host: 'localhost',
  port: 3306,
  user: 'flowgrammer',
  password: 'qwer1234',
  database: 'remember_it'
};

app.use(session(
  {
    secret: 'keyboard cat',
    store: new MySQLStore(options)
  }
));

app.get('/count', function(req, res){
  if (!req.session.count) {
    req.session.count = 1;
  } else {
    req.session.count++;
  }
  res.send('hi session : ' + req.session.count);
});

app.listen(3000, function(){
  console.log('Connected http://localhost:3000');
});