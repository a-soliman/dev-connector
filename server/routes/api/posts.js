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

module.exports = router;
