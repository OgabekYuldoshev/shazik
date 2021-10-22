const Joi = require("joi");

const for_login = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(6)
    .required(),
});

const for_register = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(6)
    .required(),
  regkey: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(6)
    .required(),
});

const update_user = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
  position: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  about: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = { for_register, for_login, update_user };
