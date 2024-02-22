const express = require("express");
const { isAdmin, isAuth } = require("../middlewares/auth");
const { uploadFile, deleteFile } = require("../middlewares/cloudinary");
const Profile = require("../models/profiles.model");
const { populate } = require("../models/users.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allProfiles = await Profile.find().lean().populate("user");
    return res.status(200).json(allProfiles);
  } catch (error) {
    return next(error);
  }
});

router.get("/byUser/", [isAuth], async (req, res, next) => {
  try {
    const userID = req.user._id;
    const profile = await Profile.find({ user: userID });
    return res.status(200).json(profile);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const profileToFind = await Profile.findById(id);
    return res.status(200).json(profileToFind);
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/create",
  [isAuth],
  uploadFile.single("img"),
  async (req, res, next) => {
    const userID = req.user._id;
    try {
      const profile = req.body;
      if (req.file) {
        profile.img = req.file.path;
      }
      profile.user = userID;
      const newProfile = new Profile(profile);
      const created = await newProfile.save();
      return res.status(201).json(created);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete("/delete/:id", [isAdmin], async (req, res, next) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findById(id);
    if (profile.img) {
      deleteFile(profile.img);
    }
    const profileToDelete = await Profile.findByIdAndDelete(id);
    return res
      .status(200)
      .json(`The 'profile' has been deleted --> ${profileToDelete}`);
  } catch (error) {
    return next(error);
  }
});

router.put(
  "/edit/",
  [isAuth],
  uploadFile.single("img"),
  async (req, res, next) => {
    const userID = req.user._id;
    try {
      const profileDb = await Profile.find({ user: userID });
      const id = profileDb[0]._id;
      if (req.file && profileDb[0].img) {
        deleteFile(profileDb[0].img);
      }
      const profile = req.body;
      if (req.file) {
        profile.img = req.file.path;
      } else profile.img = profileDb[0].img;
      const profileModify = new Profile(profile);
      profileModify._id = id;
      profileModify.user = userID;
      const profileUpdated = await Profile.findByIdAndUpdate(id, profileModify);
      return res.status(200).json(`Successfully updated --> ${profileUpdated}`);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
