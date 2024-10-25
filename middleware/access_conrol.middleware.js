const open_routes = ["/", "/api", "/api/auth/login", "/api/auth/register", "/api/auth/verify"];

const checkOpenRoutes = (req) => {
    if (open_routes.includes(req.path)) {
        return true;
    }
    if (req.path.startsWith("/assets")) {
        return true;
    }
};

const authorization =
    (role = []) =>
    (req, res, next) => {
        role = Array.isArray(role) ? role : [role];
        if (role.length === 0) {
            if (req.user.role === role) {
                return next();
            }
        }
        if (role.includes(req.user.role)) {
            return next();
        }
        res.status(401).json({ message: "Unauthorized, Access denied." });
    };

const accessControl = (req, res, next) => {
    req.isAuthenticated = () => {
        if (req.user) {
            return true;
        }
        return false;
    };
    req.isAdmin = () => {
        return req.user.role === "admin";
    };
    req.isActive = () => {
        if (req.user && req.user.active) {
            return true;
        }
        res.status(401).json({ message: "Unauthorized, User not active." });
        return false;
    };
    req.isOwner = (userId) => {
        if (req.user && req.user.id === userId) {
            return true;
        }
        return false;
    };

    if (checkOpenRoutes(req)) {
        return next();
    } else if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized, Please login." });
    return;
};

module.exports = { accessControl, authorization };
