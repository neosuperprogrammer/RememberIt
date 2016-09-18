var express         = require("express");
var bodyParser      = require("body-parser");

var methodOverride  = require("method-override");
var app             = express();


var indexRoutes   = require("./routes/index");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use("/", indexRoutes);

var port = process.env.PORT || 3000;
//app.listen(port, process.env.IP, function(){
//  console.log("server started at http://localhost:" + port);
//});
app.listen(port, 'localhost', function(){
  console.log("server started at http://localhost:" + port);
});
