const express = require("express");
const { uploadFile, deleteFile } = require("../middlewares/cloudinary");
const Article = require("../models/articles.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allArticles = await Article.find();
    return res.status(200).json(allArticles);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const articleToFind = await Article.findById(id);
    return res.status(200).json(articleToFind);
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
    const article = req.body;
    if (req.file) {
      article.img = req.file.path;
    }
    const newArticle = new Article(article);
    const created = await newArticle.save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await Article.findById(id);
    if (article.img) {
      deleteFile(article.img);
    }
    const articleToDelete = await Article.findByIdAndDelete(id);
    return res
      .status(200)
      .json(`The 'article' has been deleted --> ${articleToDelete}`);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit/:id", uploadFile.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const articleDb = await Article.findById(id);
    if (articleDb.img) {
      deleteFile(articleDb.img);
    }
    const article = req.body;
    if (req.file) {
      article.img = req.file.path;
    }
    const articleModify = new Article(article);
    articleModify._id = id;
    const articleUpdated = await Article.findByIdAndUpdate(id, articleModify);
    return res.status(200).json(`Successfully updated --> ${articleUpdated}`);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
