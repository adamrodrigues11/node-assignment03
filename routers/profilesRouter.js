const express = require("express");
const profilesRouter = express.Router();

const fs = require("fs");
const path = require("path");
let profilesArr;

const profilesPath = path.join(__dirname + "/../data/profiles.json");

fs.promises.readFile(profilesPath) 
    .then(contents => {
    profilesArr = JSON.parse(contents);
    console.log(profilesArr);
    })

profilesRouter.get("/", (req, res) => { 
    const viewData = {
        title: "Profiles",
        profiles: profilesArr
    };
    res.render("profiles", viewData)
});

profilesRouter.get("/:id", (req, res) => {
    const viewData = {
        title: "Profile",
        profile: profilesArr.find( p => p.id == req.params.id)
    };
    res.render("profile", viewData)
});

module.exports = profilesRouter;