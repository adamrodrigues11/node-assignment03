"use strict";

const fs = require("fs").promises;
const path = require("path");

const express = require("express");
const profilesRouter = express.Router();

const profilesPath = path.join(__dirname + "/../data/profiles.json");

profilesRouter.get("/", (req, res) => { 
    fs.readFile(profilesPath) 
        .then(contents => {
            const profiles = JSON.parse(contents);
            const viewData = {
                title: "Profiles",
                profiles: profiles
            };
            res.render("profiles", viewData);
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500);
            res.end("Error");
        })
});

profilesRouter.get("/:id", (req, res) => {
    fs.readFile(profilesPath)
        .then(contents => {
            const profiles = JSON.parse(contents);
            const profile = profiles.find( 
                p => p.id === req.params.id);
            const otherProfiles = profiles.filter(
                p => p !== profile);
            const viewData = {
                title: profile.name,
                profile: profile,
                otherProfiles: otherProfiles,
                layout: "./layouts/side-bar"
            };
            res.render("profile", viewData);
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500);
            res.end("Error");
        })
});

module.exports = profilesRouter;