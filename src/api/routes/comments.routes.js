const express = require("express");
const { uploadFile, deleteFile } = require("../middlewares/cloudinary");
const Comment = require("../models/comments.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allComments = await Comment.find();
    return res.status(200).json(allComments);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const commentToFind = await Comment.findById(id);
    return res.status(200).json(commentToFind);
  } catch (error) {
    return next(error);
  }
});

router.get("/type/:type", async (req, res, next) => {
  try {
    const type = req.params.type;
    const commentToFind = await Comment.find({ type: type });
    return res.status(200).json(commentToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const created = await newComment.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("No se ha podido crear el comentario");
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    if (comment.img) {
      deleteFile(comment.img);
    }
    const commentToDelete = await Comment.findByIdAndDelete(id);
    return res
      .status(200)
      .json(`The 'comment' has been deleted --> ${commentToDelete}`);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", uploadFile.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const commentDb = await Comment.findById(id);
    if (commentDb.img) {
      deleteFile(commentDb.img);
    }
    const comment = req.body;
    if (req.file) {
      comment.img = req.file.path;
    }
    const commentModify = new Comment(comment);
    commentModify._id = id;
    const commentUpdated = await Comment.findByIdAndUpdate(id, commentModify);
    return res.status(200).json(`Successfully updated --> ${commentUpdated}`);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
