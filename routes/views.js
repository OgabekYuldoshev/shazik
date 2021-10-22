const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkUser");
const { User, Skills } = require("../config/db");

module.exports = (route) => {
  route.get("/", async (req, res) => {
    const user = await User.find()
    const skills = await Skills.find({authorID: user[0]._id})

    res.render("index.ejs", {user: user[0], skills: skills});
  });

  route.get("/dashboard", checkAuthenticated, async (req, res) => {
    const skills = await Skills.find({authorID: req.user._id})
    res.render("dashboard.ejs", { user: req.user, skills: skills });
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
