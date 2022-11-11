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
    const profile = profilesArr.find( p => p.id == req.params.id);
    const viewData = {
        title: profile.name,
        profile: profile,
        profiles: profilesArr,
        layout: "./layouts/side-bar"
    };
    res.render("profile", viewData)
});

module.exports = profilesRouter;