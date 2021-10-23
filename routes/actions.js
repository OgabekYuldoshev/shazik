const { User, Skills, Works } = require("../config/db");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkUser");
const passport = require("passport");
const bcrypt = require("bcrypt");
const initializePassport = require("../middleware/passport");
initializePassport(passport);

const { for_register, update_user } = require("../middleware/Joi");
const { upload } = require("../middleware/upload");
const fs = require("fs");

module.exports = (route) => {
  // Start USer
  route.post("/reg", async (req, res) => {
    try {
      const { fullname, password, username, regkey } =
        await for_register.validateAsync(req.body);
      if (!regkey && regkey !== process.env.REG_KEY) {
        res.status(401).send({ msg: "Not Alllowed" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
          fullname: fullname,
          username: username,
          password: hashPassword,
        })
          .then(() => {
            res.status(201).send({ msg: "New User Created" });
          })
          .catch((err) => res.status(400).send(err));
      }
    } catch (error) {
      res.status(500).send(error);
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
    try {
      const { fullname, about, address, status, position, phone, email } =
        req.body;
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          fullname,
          about,
          address,
          status,
          position,
          phone,
          email,
        }
      )
        .then((data) => {
          res.send({ msg: "User Updated Successfuly!" });
        })
        .catch((err) => {
          res.send(err).status(400);
        });
    } catch (error) {
      res.send(error);
    }
  });

  route.put(
    "/set_avatar",
    checkAuthenticated,
    upload.single("avatar"),
    async (req, res) => {
      const user = await User.findOne({_id:req.user._id})
      fs.unlinkSync(user.avatar);
      await User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          avatar: `uploads/${req.file.filename}`,
        }
      )
        .then((data) => {
          res.send({ msg: "Update Avatar" });
        })
        .catch((err) => {
          res.send(err).status(400);
        });
    }
  );

  // End USer
  // route.post("/change-password", checkAuthenticated, async (req, res) => {
  //   const { username, password, confirm } = user.validate(req.body);
  //   if (password !== confirm) {
  //     res.send({ msg: "Password doesn't match!" });
  //   }
  //   // const newpassword =
  //   await User.findOneAndUpdate(
  //     { _id: req.user._id },
  //     {
  //       username,
  //     }
  //   )
  //     .then((data) => {
  //       res.send({ msg: "User Updated Successfuly!" });
  //     })
  //     .catch((err) => {
  //       res.send(err).status(400);
  //     });
  // });

  // Start Skills
  route.post("/add_skills", checkAuthenticated, async (req, res) => {
    const { name, percent } = req.body;
    await Skills.create({
      authorID: req.user._id,
      name,
      percent,
    })
      .then((data) => {
        res.send({ msg: "New Skills Add" });
      })
      .catch((err) => {
        res.send(err).status(400);
      });
  });

  route.delete("/delete_skill", checkAuthenticated, async (req, res) => {
    const { id } = req.body;
    await Skills.findByIdAndDelete({
      _id: id,
    })
      .then((data) => {
        res.send({ msg: "Skill Deleted!" });
      })
      .catch((err) => {
        res.send(err).status(400);
      });
  });
  // END Skills

  // START Works

  route.post(
    "/add_works",
    checkAuthenticated,
    upload.any(),
    async (req, res) => {
      const { name } = req.body;
      await Works.create({
        authorID: req.user._id,
        name,
        img: `uploads/${req.files[0].filename}`,
      })
        .then((data) => {
          res.send({ msg: "Work Add" });
        })
        .catch((err) => {
          res.send(err).status(400);
        });
    }
  );

  route.delete("/delete_work", checkAuthenticated, async (req, res) => {
    const { id } = req.body;
    await Works.findByIdAndDelete({
      _id: id,
    })
      .then((data) => {
        fs.unlinkSync(data.img);
        res.send({ msg: "Work Deleted!" });
      })
      .catch((err) => {
        res.send(err).status(400);
      });
  });

  // END Works
};
