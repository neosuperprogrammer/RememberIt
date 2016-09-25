var express   = require("express");
var middleware = require("../middleware");
router    = express.Router();


router.get("/", middleware.isLoggedIn, function(req, res){
  if (req.session.user) {
    console.log('/items : userInfo : ' + req.session.user);
    res.render('items');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
