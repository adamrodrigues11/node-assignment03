"use strict";
//Requirements
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

//Create App Server & Port
const app = express();
const port = process.envPORT || 3000;

// Allow cross origin requests from any port on local machine
app.use(cors({ origin: [/127.0.0.1*/, /localhost*/] }));

// Load Routers
const indexRouter = require("./routers/indexRouter");
const apiRouter = require("./routers/apiRouter");
const profilesRouter = require("./routers/profilesRouter");

//Allow Access to Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Use Logger, Layouts, & Body Parser
app.use(logger("dev"));
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "./layouts/full-width");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set Router Paths
app.use(indexRouter);
app.use("/profiles", profilesRouter);
app.use("/api", apiRouter);

//Set Error Message for Invalid URL
app.all("/*", (req, res) => {
    res.status(404).send("File Not Found");
});

//Activate Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));