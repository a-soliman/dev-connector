const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

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
