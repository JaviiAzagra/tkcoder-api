const mongoose = require("mongoose");
const Article = require("../../api/models/articles.model");
const connectDb = require("../database/db");

const articles = [
  {
    title: "Top 10 extensiones de Visual Studio Code",
    description:
      "En este artículo, te presentaré las 10 extensiones que son imprescindibles para maximizar tu experiencia con Visual Studio Code y simplificar tus tareas diarias.",
    img: "/assets/vscodeextensionesimg.jpg",
    type: "vscode",
    url: "/articles/top-10-extensiones-visual-studio-code",
  },
  {
    title: "Herramientas Esenciales para Desarrolladores Full Stack",
    description:
      "Destaca las herramientas y tecnologías clave que todo desarrollador Full Stack debería conocer y dominar, desde frameworks de frontend como React o Angular, hasta bases de datos como MongoDB o MySQL.",
    img: "/assets/toolsimg.png",
    type: "fullstack",
    url: "/articles/top-10-extensiones-visual-studio-code",
  },
  {
    title: "JavaScript Tutorial",
    description: "Como crear un web en varios idiomas con i18n.js",
    img: "/assets/i18n.webp",
    type: "javascript",
    url: "/articles/top-10-extensiones-visual-studio-code",
  },
];

connectDb()
  .then(async () => {
    const allArticles = await Article.find().lean();

    if (!allArticles.length) {
      console.log("[seed]: No articles found, continuing...");
    } else {
      console.log(`[seed]: ${allArticles.length} article(ies) found.`);
      await Article.collection.drop();
      console.log("[seed]: Collection 'articles' succesfully removed");
    }
  })
  .catch((error) =>
    console.log("There has been an error removing the articles ---> " + error)
  )
  .then(async () => {
    await Article.insertMany(articles);
    console.log("[seed]: New articles succesfully uploaded to the database");
  })
  .catch((error) =>
    console.log("There has been an error inserting the articles ---> " + error)
  )
  .finally(() => mongoose.disconnect());
