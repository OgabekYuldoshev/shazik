const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    avatar:{
        type: String,
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    position:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    fullname: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    about: {
        type: String,
    },
    address: {
        type: String,
    },
  });

  const SkillsSchema = new Schema({
      authorID: {
          type: String,
          required: true
      },
      name:{
          type: String,
          required: true
      },
      percent:{
          type: Number,
          min: 1,
          max: 100,
          required: true
      }
  })

  const WorksSchema = new Schema({
    authorID: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    }
})

const User = mongoose.model("user", UserSchema);
const Skills = mongoose.model("skills", SkillsSchema);
const Works = mongoose.model("works", WorksSchema);



module.exports = { User, Skills, Works };
