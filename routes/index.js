var express   = require("express")
    router    = express.Router();


router.get("/", function(req, res){
  console.log('landing');
  res.render("landing");
});

router.get("/SignUp", function(req, res){
  console.log('sign up');
  res.render("signup");
});


module.exports = router;
