const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

/* LOAD MODELS (PROFILE AND USER) */
const Profile = require("../../models/Profile");
const User = require("../../models/User");

/* LOAD INPUT VALIDATION */
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

/*
    @route      GET api/profile/test
    @desc       Tests profile route
    @access     Public
*/
router.get("/test", (req, res) => {
  res.json({ msg: "Profile Works!" });
});

/*
    @route      GET api/profile/
    @desc       Get current user's profile
    @access     Private
*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }

        res.status(200).json(profile);
      })
      .catch(err => {
        errors.serverError = "Internal server error";
        res.status(404).json(errors);
      });
  }
);

/*
    @route      GET api/profile/all
    @desc       Gets all profiles
    @access     Public
*/
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = "There is no profile for this user.";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      errors.serverError = "Internal server error";
      res.status(404).json(errors);
    });
});

/*
    @route      GET api/profile/handle/:handle
    @desc       Gets profile by handle
    @access     Public
*/
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user.";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.serverError = "Internal server error.";
      res.status(500).json(errors);
    });
});

/*
    @route      GET api/profile/user/:user_id
    @desc       Gets profile by user id
    @access     Public
*/
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user.";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.serverError = "Internal server error.";
      res.status(500).json(errors);
    });
});

/*
    @route      POST api/profile/
    @desc       Creates or Edits user profile
    @access     Private
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* VALIDATE INPUTS */
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    /* SKILLLS */
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.replace(/ /g, "").split(",");
    }
    /* SOCIAL LINKS */
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // UPDATE
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

/*
    @route      POST api/profile/experience
    @desc       Add experience to profile
    @access     Private
*/
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* VALIDATE INPUTS */
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        console.log("user : ", profile);
        const newExperience = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          description: req.body.description,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current
        };

        profile.experience.unshift(newExperience);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            errors.invalidData = "Invalid input data.";
            res.status(401).json(errors);
          });
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

/*
    @route      POST api/profile/education
    @desc       Add education to profile
    @access     Private
*/
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /* VALIDATE INPUTS */
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEducation = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.education.unshift(newEducation);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            errors.invalidData = "Invalid input data.";
            res.status(401).json(errors);
          });
      })
      .catch(err => {
        errors.serverError = "Internal server error.";
        res.status(500).json(errors);
      });
  }
);

module.exports = router;
