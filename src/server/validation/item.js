const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateItemInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.itemType = !isEmpty(data.itemType) ? data.itemType : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.itemType)) {
    errors.itemType = "ItemType field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
