const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  url: { type: String, required: true, trim: true },
});

const Comment = mongoose.model("comments", commentsSchema);

module.exports = Comment;
