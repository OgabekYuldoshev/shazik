const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkUser");
const { User } = require("../config/db");
module.exports = (route) => {
  route.get("/", checkAuthenticated, async (req, res) => {
    res.render("index.ejs", { user: req.user });
  });

  route.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
  });
  route.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
  });
};
