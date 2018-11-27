const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const keys = require("../../config/keys");

/*
    @route      GET api/users/test
    @desc       Tests users route
    @access     Public
*/
router.get("/test", (req, res) => {
  res.json({ msg: "Users Works" });
});

/*
    @route      GET api/users/register
    @desc       Register user
    @access     Public
*/
router.post("/register", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "Email already exists" });
    else {
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name,
        email,
        password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json({ user }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/*
    @route      POST api/users/login
    @desc       Login user / Returns JWT Token
    @input      Email, Password
    @access     Public
*/
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) return res.status(404).json({ msg: "User not found." });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(401).json({ msg: "Invalid password" });

      const payload = { id: user.id, name: user.name, avatar: user.avatar };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        if (err) return res.status(500).json({ msg: "Internal server error." });
        return res
          .status(200)
          .json({ success: true, token: `Bearer ${token}` });
      });
    });
  });
});

/*
    @route      GET api/users/current
    @desc       Return current user
    @input      JWT Token
    @access     Private
*/
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userFildsExcludingPassword = {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar
    };

    res.json(userFildsExcludingPassword);
  }
);
module.exports = router;
