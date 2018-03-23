var express     = require("express");
router          = express.Router();
var middleware  = require("../middleware");
var Items       = require("../model/items");

router.get("/", middleware.isLoggedIn, function(req, res){
  res.redirect("/api/items/page/1");
//   var email = req.session.user.email;
//   console.log("email : " + email);
//   Items.find(email, function(err, items){
//     if (err) {
//       res.send('item find error : ' + err);
//     } else {
//       //console.log(">>>>" + items);
//       var result = {
//         result: 'success',
//         items: items
//       };
//       //res.send('test');
//       res.render('items/index', result);
//     }
//   });
});

router.get("/items/page/:page", middleware.isLoggedIn, function(req, res){
  var page = req.params.page;
  console.log("page : " + page);
  var email = req.session.user.email;
  var start = 0;
  var countPerPage = 20;
  if (page > 1) {
	  console.log("page is greater than 1");
  	start = countPerPage * (page - 1);
	  console.log("start : " + start);
  }
  Items.findByPage(email, start, countPerPage, function(err, items) {
    if (err) {
      var result = {
        result: 'fail',
        reason: err
      };
//       res.send('item find error : ' + err);
      res.send(result);
    } else {
      var result = {
        result: 'success',
        page: page,
        items: items
      };
      res.send(result);
    }
  });
//   Items.find(email, function(err, items){
//     if (err) {
//       res.send('item find error : ' + err);
//     } else {
//       var result = {
//         result: 'success',
//         items: items
//       };
//       res.render('items/index', result);
//     }
//   });
});




module.exports = router;
