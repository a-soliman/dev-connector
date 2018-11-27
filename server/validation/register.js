const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must between 2 and 30 characters.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email address.";
  }

  if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must contain a minimum of 6 characters.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
