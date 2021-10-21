const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkUser");
const { User } = require("../config/db");

module.exports = (route) => {
  route.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  route.get("/dashboard", checkAuthenticated, async (req, res) => {
    res.render("dashboard.ejs", { user: req.user });
  });

  route.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
  });
  route.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
  });

  route.get("/*", (req, res) => {
    res.render("error.ejs");
  });
};
