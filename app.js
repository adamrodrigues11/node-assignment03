"use strict";

const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");

const app = express();
const port = process.envPORT || 3000;

// allow cross origin requests from any port on local machine
app.use(cors({ origin: [/127.0.0.1*/, /localhost*/] }));

// load Routers
const indexRouter = require("./routers/indexRouter");
const apiRouter = require("./routers/apiRouter");
const profilesRouter = require("./routers/profilesRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const logger = require("morgan");
app.use(logger("dev"));
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "./layouts/full-width");

app.use(indexRouter);
app.use("/profiles", profilesRouter);
app.use("/api", apiRouter);

app.all("/*", (req, res) => {
    res.status(404).send("File Not Found");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));