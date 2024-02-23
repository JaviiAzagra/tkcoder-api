const express = require("express");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./src/utils/database/db");
const db = require("./src/utils/database/db");
const server = express();
const indexRoutes = require("./src/api/routes/index.routes");
const userRoutes = require("./src/api/routes/users.routes");
const profileRoutes = require("./src/api/routes/profiles.routes");
const tutorialRoutes = require("./src/api/routes/tutorials.routes");
const articleRoutes = require("./src/api/routes/articles.routes");
const commentRoutes = require("./src/api/routes/comments.routes");
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/* db.connectDb(DB_URL); */
connectDb();

server.use(
  cors({
    origin: "*",
  })
);

server.use(express.json({ limit: "20mb" }));
server.use(express.urlencoded({ extended: false }));

server.use("/", indexRoutes);
server.use("/users", userRoutes);
server.use("/profiles", profileRoutes);
server.use("/tutorials", tutorialRoutes);
server.use("/articles", articleRoutes);
server.use("/comments", commentRoutes);

server.use("*", (req, res) => {
  const error = new Error("PATH NOT FOUND! 404");
  error.status = 404;
  return res.status(error.status).json(error.message);
});

server.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "unexpected error");
});

server.listen(PORT || 3000, () => {
  console.log(`Server running on --> http://localhost:${PORT}`);
});
