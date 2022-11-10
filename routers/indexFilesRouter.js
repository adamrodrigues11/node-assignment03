const express = require("express");
const indexRouter = express.Router();
const path = require("path");

indexRouter.get("/", (req, res) => res.send("/../views/index.ejs"))
indexRouter.get("/about", (req, res) => res.send(__dirname, "/../views/about.ejs"))
indexRouter.get("/contact", (req, res) => res.send(__dirname, "/../views/contact.ejs"))


module.exports = indexRouter;