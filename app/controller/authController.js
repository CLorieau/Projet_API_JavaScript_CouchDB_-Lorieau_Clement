const jsonWebToken = require("jsonwebtoken");
const userRepo = require("../model/usersModel");

const JWT_SECRET = "Acces_premium";

exports.authenticateUser = (req, res) => {
    const { login, mdp } = req.body;
    if (!login || !mdp) {
        return res.status(400).json({ error: "Veuillez fournir login et mdp dans le corps de la requête" });
    }

    const foundUser = userRepo.findByLogin(login);
    if (!foundUser) {
        return res.status(401).json({ error: "Utilisateur inconnu" });
    }
    if (foundUser.mdp !== mdp) {
        return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    const token = jsonWebToken.sign({ login: foundUser.login }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};
