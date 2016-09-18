var express   = require("express")
    router    = express.Router();

var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();


router.get("/", function(req, res){
  console.log('landing');
  res.render("landing");
});

router.get("/SignUp", function(req, res){
  console.log('sign up');
  res.render("signup");
});

router.post("/SignUp", function(req, res){
  console.log('sign up post');
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  console.log('email : ' + email + ', username : ' + username + ', password : ' + password);
  hasher({password:password}, function(err, pass, salt, hash){


  });

});


module.exports = router;
