"use strict";

const Profile = require("../models/Profile");
const ProfileOps = require("../data/ProfileOps");
const _profileOps = new ProfileOps();

// all profiles
exports.Index = async function(req, res) {
    console.log("index");
    const profiles = await _profileOps.getAllProfiles();
    res.render("profiles", {
        title: "Profiles",
        profiles: profiles,
    });
};

// single profile (details)
exports.Details = async function (req, res) {
    console.log("details")
    const profile = await _profileOps.getProfileById(req.params.id);
    const profiles = await _profileOps.getAllProfiles();
    if (profile) {
        const otherProfiles = profiles.filter(
            p => p.id !== profile.id);
        res.render("profile", {
            title: profile.name,
            profile: profile,
            otherProfiles: otherProfiles,
            layout: "./layouts/side-bar"
        });
    } else {
        res.status(404).send("File Not Found");
    }

};

// create - GET
exports.Create = async function (req, res) {
    console.log("create")
    res.render("profile-form", {
        title: "Create A New Profile",
        profile: null,
        errorMsg: ""
    });
};

// create - POST
exports.CreateProfile = async function (req, res) {
    console.log("createProfile");
    let newProfileObj = new Profile({
        name: req.body.name
    });

    let responseObj = await _profileOps.createProfile(newProfileObj);

    if (responseObj.errorMsg === "") {
        console.log(responseObj);
        const profile = newProfileObj;
        const profiles = await _profileOps.getAllProfiles();
        const otherProfiles = profiles.filter(
            p => p.id !== profile.id);
        res.render("profile", {
            title: profile.name,
            profile: profile,
            otherProfiles: otherProfiles,
            layout: "./layouts/side-bar"
        });
    } else {
        console.log(`Error: item not created. Details: ${responseObj.errorMsg}`);
        res.render("profile-form", {
            title: "Create Profile",
            profile: responseObj.obj,
            errorMsg: responseObj.errorMsg
        });
    }


};

// edit - GET
exports.Edit = async function (req, res) {
    console.log("edit")
    const profile = await _profileOps.getProfileById(req.params.id);
    if (profile) {
        res.render("profile-form", {
            title: "Edit Profile",
            profile: profile,
            errorMessage: ""
        });
    } else {
        res.status(404).send("File Not Found"); // change to call to CreateProfile()? maybe?
    }
};

// edit - POST
exports.EditProfile = async function (req, res) {
    console.log("editProfile")

};

// delete
exports.DeleteProfileById = async function (req, res) {
    console.log("delete")
};

