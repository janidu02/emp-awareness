const { Router } = require("express");
const authRouter = require("./auth.router");
const quizRouter = require("./quiz.router");
const pathwayRouter = require("./pathway.router");
const userRouter = require("./users.router");
const magicLinkRouter = require("./magiclink.router");
const statsRouter = require("./stats.router");
const { authorization } = require("../middleware/access_conrol.middleware");

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

router.use("/auth", authRouter);
router.use("/magiclinks", [authorization(["admin", "manager"])], magicLinkRouter);
router.use("/quizzes", quizRouter);
router.use("/pathways", pathwayRouter);
router.use("/users", [authorization(["admin", "manager"])], userRouter);
router.use("/stats", [authorization(["admin", "manager"])], statsRouter);

module.exports = router;
