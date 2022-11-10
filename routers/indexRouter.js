const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", (req, res) => res.send("Welcome to our app!"))
indexRouter.get("/about", (req, res) => res.send("This is our about page"))
indexRouter.get("/contact", (req, res) => res.send(<form><textarea id="text" name="text" rows="4" cols="50"></textarea><input type="submit" value="Submit"/></form>))