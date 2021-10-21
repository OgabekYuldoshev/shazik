const { User } = require("../config/db");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkUser");
const passport = require("passport");
const bcrypt = require("bcrypt");
const initializePassport = require("../middleware/passport");
initializePassport(passport);

const { user } = require('../middleware/Joi')

module.exports = (route) => {
  // Authentification
  route.post("/reg", async (req, res) => {
    if (!req.body.regKey && req.body.regkey !== process.env.REG_KEY) {
      res.status(401).send({msg:"Not Alllowed"});
    } else {
      try {
        if (req.body.password.length < 6) {
          res.status(400).send({msg:"Password must be 6 chapter!"});
        }
        if (req.body.password.includes(" ")) {
          res.status(400).send({msg:"Password must not be space!"});
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
          fullname: req.body.fullname,
          username: req.body.username,
          password: hashPassword,
        })
          .then(() => {
            res.status(201).send({msg:"New User Created"});
          })
          .catch((err) => res.status(400).send(err));
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  });
  // Login
  route.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  route.delete("/logout", async (req, res) => {
    req.logOut();
    res.redirect("/login");
  });

  route.post("/update-user", checkAuthenticated, async (req, res) => {
    const { fullname, about, address, status } = req.body;
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        fullname,
        about,
        address,
        status
      }
    )
      .then((data) => {
        res.send({msg: "User Updated Successfuly!"});
      })
      .catch((err) => {
        res.send(err).status(400);
      });
  });

  route.post("/change-password", checkAuthenticated, async (req, res) => {
    
    const { username, password, confirm } = user.validate(req.body);
    if(password !== confirm){res.send({msg: "Password doesn\'t match!" })}
    // const newpassword = 
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        username
      }
    )
      .then((data) => {
        res.send({msg: "User Updated Successfuly!"});
      })
      .catch((err) => {
        res.send(err).status(400);
      });
  });




};
