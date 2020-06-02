const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load  Input Validation

const validateItemInput = require("../../validation/item");

// Load Item Model
const Item = require("../../models/Item");

// @route  GET api/items/test
// @description  Test items route
// @access  Public

router.get("/test", (req, res) => {
  res.json({ message: "Item Works" });
});
// @route  GET api/items
// @description  get all items route
// @access  Public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
    .catch((err) =>
      res.status(404).json({ noItemsFound: "No Items found with that ID" })
    );
});

// @route  GET api/items/:id
// @description  get item by id
// @access  Public

router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      if (!item) {
        res.status(404).json({ noItemFound: "No Item found with that ID" });
      }
      res.json(item);
    })
    .catch((err) =>
      res.status(404).json({ noItemFound: "No Item found with that ID" })
    );
});

// @route  POST api/items
// @description  Create item route
// @access  Public

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateItemInput(req.body);

    // check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newItem = new Item({
      name: req.body.name,
      itemType: req.body.itemType,
    });
    newItem
      .save()
      .then((item) => res.json(item))
      .catch((err) => console.log(err));
  }
);

// @route  POST api/items/:id
// @description  Update item route
// @access  Private

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateItemInput(req.body);

    // check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const payload = { _id: req.body.id };
    const updateItem = {
      name: req.body.name,
      itemType: req.body.itemType,
    };
    Item.findOne({ _id: req.body.id }).then((item) => {
      if (item) {
        Item.findOneAndUpdate(payload, { $set: updateItem }, {})
          .then((item) => res.json(item))
          .catch((err) => res.status(404).json({ message: "Item not found" }));
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    });
  }
);

// @route  DELETE api/items/:id
// @description  delete item route
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Item.findById(req.params.id)
      .then((item) => {
        item.remove().then(() => res.json({ success: true }));
      })
      .catch((err) => res.status(404).json({ itemNotFound: "No Item found" }));
  }
);

module.exports = router;
