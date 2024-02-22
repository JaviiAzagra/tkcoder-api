const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  img: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  comments: [
    {
      name: { type: String, required: true },
      content: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Article = mongoose.model("articles", articlesSchema);

module.exports = Article;
