const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error("SECRET_KEY is not provided");
}

function generateToken(user, expiresIn = "1h") {
    return jwt.sign({ id: user.id, _id: user._id, role: user.role, firstName: user.firstName, lastName: user.lastName, email: user.email }, secretKey, {
        expiresIn: expiresIn,
    });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        throw new Error("Invalid token");
    }
}

module.exports = { generateToken, verifyToken };
