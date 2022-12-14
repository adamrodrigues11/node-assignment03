"use strict";

const { DeleteProfileById } = require("../controllers/ProfilesController");
const Profile = require("../models/Profile");

class ProfileOps {
    ProfileOps() {}

    async getAllProfiles() {
        let response = {
            profiles: [],
            errorMsg: ""
        };
        try {
            console.log("Fetching all profiles ...");
            const profiles = await Profile.find({}).sort({ name: 1});
            console.log("Successfully loaded all profiles");
            response.profiles = profiles;
        } catch(error) {
            const errorMsg = `Error: Unable to fetch profiles. Details: ${error}`;
            console.log(errorMsg);
            response.errorMsg = errorMsg
        } finally {
            return response;
        }
    }

    async getProfileById(id) {
        let response = {
            profile: null,
            errorMsg: ""
        };
        try {
            console.log(`Fetching profile with id ${id} ...`);
            const profile = await Profile.findById(id);
            console.log(`Succesffully loaded profile with id ${id}`);
            response.profile = profile;
        } catch(error) {
            const errorMsg = `Error: Unable to fetch profile with id ${id}. Details: ${error}`;
            console.log(errorMsg);
            response.errorMsg = errorMsg;
        } finally {
            return response;
        }
    }

    async createProfile(formData) {
        let response = {
            obj: formData,
            errorMsg: ""
        };
        try {
            // create new profile object
            console.log("Creating new profile ...");
            const profileObj = new Profile({
                name: formData.name
            });
            
            // try to commit to db
            response = await this.tryCommit(profileObj);
        } catch(error) {
            const errorMsg = `Error: Failed to commit changes to database. Details: ${error.message}`;
            console.log(errorMsg);
            response.errorMsg = errorMsg;
        } finally {
            return response;
        }
    }

    async updateProfile(formData) {
        let response = {
            obj: formData,
            errorMsg: ""
        };
        try {
            // try to find profile with given id from db
            let {profile, errorMsg} = await this.getProfileById(formData.id);
            
            if (profile) {
                // update the profile with formData
                console.log("Updating profile ...");
                profile.name = formData.name;

                // try to commit updates to db
                response = await this.tryCommit(profile);
            } else {
                response.errorMsg = errorMsg; 
            }
        } catch(error) {
            const errorMsg = `Error: Failed to commit changes to database. Details: ${error.message}`;
            response.errorMsg = errorMsg;
            console.log(errorMsg);
        } finally {
            return response;
        } 
    }

    async DeleteProfileById(id) {
        console.log(`Deleting profile with id ${id} ..`);
        let errorMsg = "";
        try {
            let deletedProfile = await Profile.findByIdAndDelete(id);
            if (deletedProfile) {
                console.log(`Success - Deleted profile with id ${id}`);
            } else {
                errorMsg = `Error: Unable to delete profile with id ${id}`;
                console.log(errorMsg);
            }
        } catch(error) {
            errorMsg = `Error: Unable to delete profile with id ${id}. Details: ${error.message}`;
            console.log(errorMsg);
        } finally { 
            return errorMsg;
        } 
    }

    async tryCommit(profileObj) {
        // validate profile object
        const error = await profileObj.validateSync();
        if (error) {
            const response = {
                obj: profileObj,
                errorMsg: error.message
            };
            console.log(`Error: Failed to commit changes to database. Details: ${error.message}`)
            return response; 
        } else {
            const newProfile = await profileObj.save();
            const response = {
                obj: newProfile,
                errorMsg: ""
            };
            console.log(`Success - Comitted profile to database: ${newProfile}`)
            return response; 
        }
    }
}

module.exports = ProfileOps;