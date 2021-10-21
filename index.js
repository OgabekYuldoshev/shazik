require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
// const {setUser} = require("./middleware/auth")

const cors = require("cors");

const routes = require("./routes/main.js");
// DataBase connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase Connected!"))
  .catch((err) => console.log(err));
// const { Blogs } = require("./config/db.js");

// View Engine

const app = express();
const server = http.createServer(app);
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

app.use(cors());
app.use(flash());
app.use(
  session({
    // store: new MongoStore({
    //   url: process.env.DATABASE,
    // }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// app.set(setUser)
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);



server.listen("3000" || process.env.PORT, () =>
  console.log("Server Running ...")
);