const express = require("express");
const server = express();

// Analyse le corps des requêtes en JSON
server.use(express.json());

// Importation du routeur principal
const routerPrincipal = require("./app/router/api");

// Montage du routeur sur la racine "/"
server.use("/", routerPrincipal);

// Démarrage du serveur
const portApp = 3000;
server.listen(portApp, () => {
    console.log(`Server running on http://localhost:${portApp}`);
});
