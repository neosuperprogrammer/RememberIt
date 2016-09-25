
var contents = {
  isLoggedIn: function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash("error", "You must be signed in to do that");
      res.redirect("/LogIn");
    }
  }
};

var exports = module.exports = contents;
