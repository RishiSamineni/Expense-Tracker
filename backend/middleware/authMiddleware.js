const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: "Not Authorized, no token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database and exclude the password field
        req.user = await User.findById(decoded.id).select("-password");

        // Check if user exists
        if (!req.user) {
            return res.status(404).json({ message: "User  not found" });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Handle token verification errors
        res.status(401).json({ message: "Not Authorized, token failed", error: err.message });
    }
};
