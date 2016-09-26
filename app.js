var express         = require("express");
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
//var mysql = require('mysql');
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");
var flash = require('connect-flash');

var app             = express();


var options = {
  host: 'localhost',
  port: 3306,
  user: 'flowgrammer',
  password: 'qwer1234',
  database: 'remember_it'
};

app.use(session({
    secret: '124124jlsjdlsjdl!@',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(options)
  }
));

//var conn = mysql.createConnection({
//  host: "localhost",
//  user: "flowgrammer",
//  password: "qwer1234",
//  database: "remember_it"
//
//});
//
//conn.connect(function(err) {
//  if (err) {
//    console.error('error connecting: ' + err.stack);
//    return;
//  }
//
//  console.log('connected as id ' + conn.threadId);
//});

var indexRoutes   = require("./routes/index");
var itemsRoutes = require("./routes/items")

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(flash());

app.use("/", indexRoutes);
app.use("/items", itemsRoutes);

var port = process.env.PORT || 3000;
//app.listen(port, process.env.IP, function(){
//  console.log("server started at http://localhost:" + port);
//});
app.listen(port, function(){
  console.log("server started at http://localhost:" + port);
});
