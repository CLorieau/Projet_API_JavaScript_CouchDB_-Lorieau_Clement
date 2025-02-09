const express = require("express");
const apiRouter = express.Router();

const authController = require("../controller/authController");
const bookController = require("../controller/livresController");

const { verifyToken } = require("../middleware/authMiddleware");

// Route d'authentification
apiRouter.post("/login", authController.authenticateUser);

// Routes Livres publiques
apiRouter.get("/livres", bookController.getAllBooks);
apiRouter.get("/livres/:numlivre", bookController.getBookByNumber);
apiRouter.get("/livres/:numlivre/pages", bookController.getBookPages);
apiRouter.get("/livres/:numlivre/pages/:numpage", bookController.getBookPageByNumber);

// Routes Livres protégées (token requis)
apiRouter.post("/livres", verifyToken, bookController.createBook);
apiRouter.delete("/livres/:numlivre", verifyToken, bookController.deleteBook);
apiRouter.put("/livres/:numlivre", verifyToken, bookController.updateBook);

module.exports = apiRouter;
