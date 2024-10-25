const scriptRegex = /<script>|<\/script>|<sql>|<\/sql>/;

const attackProtection = (req, res, next) => {
    if (req.method === "GET" || req.method === "DELETE") {
        return next();
    }
    Object.keys(req.body).forEach((key) => {
        if (scriptRegex.test(req.body[key])) {
            return res.status(400).json({ message: "Script Injection detected" });
        }
    });

    next();
};

module.exports = attackProtection;
