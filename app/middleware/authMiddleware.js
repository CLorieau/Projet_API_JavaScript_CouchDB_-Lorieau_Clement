const jsonWebToken = require("jsonwebtoken");

const JWT_SECRET = "Acces_token";

exports.verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(403).json({ error: "Token absent" });
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
        return res.status(403).json({ error: "Token absent" });
    }
    try {
        const decodedPayload = jsonWebToken.verify(accessToken, JWT_SECRET);
        req.user = decodedPayload;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token invalide ou expiré" });
    }
};
