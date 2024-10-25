const { verifyToken } = require("../utils/token");

const open_routes = ["/", "/api", "/api/auth/login", "/api/auth/register", "/api/auth/verify"];

const checkOpenRoutes = (req) => {
    if (open_routes.includes(req.path)) {
        return true;
    }
    if (req.path.startsWith("/assets")) {
        return true;
    }
};

const authenticate = (req, res, next) => {
    if (checkOpenRoutes(req)) {
        return next();
    }
    let token = req.cookies?.auth_token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (token) {
        try {
            const decoded = verifyToken(token);
            // console.log("decode", decoded);

            req.user = decoded;

            next();
        } catch (err) {
            // TODO: Handle error properly
            next();
        }
    } else {
        req.user = undefined;
        next();
    }
};

module.exports = authenticate;
