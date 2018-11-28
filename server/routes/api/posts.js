const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { ObjectId } = require("mongodb");

/* LOAD MODELS (POST AND USER) */
const Post = require("../../models/Post");
const User = require("../../models/User");

/* LOAD INPUT VALIDATION */
const validatePostInput = require("../../validation/post");

/*
    @route      GET api/posts/test
    @desc       Tests posts route
    @access     Public
*/
router.get("/test", (req, res) => {
  res.json({ msg: "Posts Works!" });
});

/*
    @route      GET api/posts
    @desc       Gets an array of posts
    @access     Private
*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.find()
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      GET api/posts/:user_id
    @desc       Gets a list of posts by user id
    @access     Private
*/
router.get(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.find({ user: req.params.user_id })
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

module.exports = router;
