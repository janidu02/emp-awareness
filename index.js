require("dotenv/config");
const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./utils/connect_db");
const router = require("./routes");
const requestLogger = require("./middleware/reqlogger.middleware");
const authMiddleware = require("./middleware/auth.middleaware");
const { accessControl } = require("./middleware/access_conrol.middleware");
const attachProtection = require("./middleware/attack_protection.middleware");

colors.enable();
const port = process.env.PORT || 3000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(authMiddleware);
app.use(accessControl);
app.use(attachProtection);

app.listen(port, () => {
    console.log(`Server running on port ${port}`.yellow.bold);
});

// for / route return client/dist/index.html
app.use(express.static("client/dist"));
app.get("/", (req, res) => {
    res.sendFile(__dirname, "index.html");
});

app.use("/api", router);

module.exports = app;
