const express = require("express");
const { uploadFile, deleteFile } = require("../middlewares/cloudinary");
const Tutorial = require("../models/tutorials.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allTutorials = await Tutorial.find();
    return res.status(200).json(allTutorials);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const tutorialToFind = await Tutorial.findById(id);
    return res.status(200).json(tutorialToFind);
  } catch (error) {
    return next(error);
  }
});

router.get("/type/:type", async (req, res, next) => {
  try {
    const type = req.params.type;
    const tutorialToFind = await Tutorial.find({ type: type });
    return res.status(200).json(tutorialToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", uploadFile.single("img"), async (req, res, next) => {
  try {
    const tutorial = req.body;
    if (req.file) {
      tutorial.img = req.file.path;
    }
    const newTutorial = new Tutorial(tutorial);
    const created = await newTutorial.save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const tutorial = await Tutorial.findById(id);
    if (tutorial.img) {
      deleteFile(tutorial.img);
    }
    const tutorialToDelete = await Tutorial.findByIdAndDelete(id);
    return res
      .status(200)
      .json(`The 'tutorial' has been deleted --> ${tutorialToDelete}`);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", uploadFile.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const tutorialDb = await Tutorial.findById(id);
    if (tutorialDb.img) {
      deleteFile(tutorialDb.img);
    }
    const tutorial = req.body;
    if (req.file) {
      tutorial.img = req.file.path;
    }
    const tutorialModify = new Tutorial(tutorial);
    tutorialModify._id = id;
    const tutorialUpdated = await Tutorial.findByIdAndUpdate(
      id,
      tutorialModify
    );
    return res.status(200).json(`Successfully updated --> ${tutorialUpdated}`);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
