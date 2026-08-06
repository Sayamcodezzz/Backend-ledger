const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
    // console.log("Cookies:", req.cookies);
    // console.log("Authorization:", req.headers.authorization);

    const token =
        req.cookies.token ||
        req.headers.authorization?.split(" ")[1];

    // console.log("Token:", token);

    if (!token) {
        return res.status(401).json({
            message: "No token found",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // console.log("Decoded:", decoded);

        const user = await userModel.findById(decoded.userId);

        // console.log("User:", user);

        req.user = user;
        next();
    } catch (err) {
        // console.log(err);
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}

module.exports = {
    authMiddleware,
};