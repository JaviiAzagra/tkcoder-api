const mongoose = require("mongoose");
const Tutorial = require("../../api/models/tutorials.model");
const connectDb = require("../database/db");

const tutorials = [
  {
    title: "Añadir Dark Mode en tu página de React",
    description:
      "El modo oscuro sería una excelente adición a tu aplicación, ya que enriquecería la experiencia del usuario. En esta ocasión, te mostraré cómo implementarlo en React sin necesidad de utilizar ninguna librería externa.",
    img: "/assets/darkmodeimg.png",
    type: "react",
    url: "/tutorials/dark-mode-react",
  },
  {
    title: "Como instalar Oh my Posh en Windows 10/11",
    description:
      "En este tutorial te mostraré cómo instalar Oh My Posh en Windows 10/11 y cómo configurarlo para que se ejecute automáticamente cada vez que abras una nueva ventana de PowerShell.",
    img: "/assets/ohmyposhimg.png",
    type: "terminal",
    url: "/tutorials/instalar-ohmyposh-windows",
  },
  {
    title: "Como crear un nuevo proyecto en React",
    description:
      "En este tutorial te enseñaré cómo crear un nuevo proyecto en React desde cero.",
    img: "/assets/reacttutorial.png",
    type: "react",
    url: "/tutorials/instalar-ohmyposh-windows",
  },
  {
    title: "Como crear un menú hamburguesa con HTML, CSS y JavaScript",
    description: "Como crear un menú hamburguesa con HTML, CSS y JavaScript",
    img: "/assets/hamburguesaimg.webp",
    type: "javascript",
    url: "/tutorials/instalar-ohmyposh-windows",
  },
  {
    title: "Como crear un web en varios idiomas con i18n.js",
    description: "Como crear un web en varios idiomas con i18n.js",
    img: "/assets/i18n.webp",
    type: "react",
    url: "/tutorials/instalar-ohmyposh-windows",
  },
];

connectDb()
  .then(async () => {
    const allTutorials = await Tutorial.find().lean();

    if (!allTutorials.length) {
      console.log("[seed]: No tutorials found, continuing...");
    } else {
      console.log(`[seed]: ${allTutorials.length} tutorial(ies) found.`);
      await Tutorial.collection.drop();
      console.log("[seed]: Collection 'tutorials' succesfully removed");
    }
  })
  .catch((error) =>
    console.log("There has been an error removing the tutorials ---> " + error)
  )
  .then(async () => {
    await Tutorial.insertMany(tutorials);
    console.log("[seed]: New tutorials succesfully uploaded to the database");
  })
  .catch((error) =>
    console.log("There has been an error inserting the tutorials ---> " + error)
  )
  .finally(() => mongoose.disconnect());
