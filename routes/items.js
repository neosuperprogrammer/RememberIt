var express     = require("express");
router          = express.Router();
var middleware  = require("../middleware");
var Items       = require("../model/items");

router.get("/", middleware.isLoggedIn, function(req, res){
	var result = {
			page: 1
		  };

	res.render('items/list', result);
//   res.redirect("/items/page/1");
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

router.get("/page/:page", middleware.isLoggedIn, function(req, res){
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
      res.send('item find error : ' + err);
    } else {
      var result = {
        result: 'success',
        page: page,
        items: items
      };
      res.render('items/index', result);
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

router.post("/", middleware.isLoggedIn, function(req, res){
  var email = req.session.user.email;
  var item = req.body.item;
  var itemDesc = req.body.item_desc;
  console.log("item : " + item + ", desc : " + itemDesc);
  created = new Date();
  var newItem = {
    user_email: email,
    item: item,
    item_desc: itemDesc,
    remember_state: 1,
    created: created
  };
  Items.create(newItem, function(err){
    if (err) {
      res.send("create item failed : " + err);
    } else {
      res.redirect("/items");
    }
  });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
  console.log("new item");
  res.render("items/new");
});

router.get("/:id", middleware.checkUserItem, function(req, res){
  // find the job with provided id
  var itemId = req.params.id;
  Items.findById(itemId, function(err, foundItem){
    if (err) {
      res.send('item not found : ' + err);
    } else {
      if (foundItem) {
        var result = {
          result: 'success',
          item: foundItem
        };
        res.render('items/show', result);
      } else {
        res.send('item not found');
      }

    }

  });
});

router.put("/:id", middleware.checkUserItem, function(req, res){
  var email = req.session.user.email;
  var item = req.body.item;
  var itemDesc = req.body.item_desc;
  var rememberState = req.body.remember_state;
  console.log("item : " + item + ", desc : " + itemDesc);
  var updatedItem = {
    user_email: email,
    item: item,
    item_desc: itemDesc,
    remember_state: rememberState
  };
  Items.findByIdAndUpdate(req.params.id, updatedItem, function(err, item){
    if (err) {
      res.send("update item failed : " + err);
    } else {
      res.redirect("/items/");
    }
  });
});

router.delete("/:id", middleware.checkUserItem, function(req, res){
  Items.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect("/items");
    }
  })
});


module.exports = router;
