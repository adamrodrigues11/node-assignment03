"use strict";

const Profile = require("../models/Profile");

class ProfileOps {
    ProfileOps() {}

    async getAllProfiles() {
        try {
            let profiles = await Profile.find({}).sort({ name: 1});
            return profiles;
        } catch(error) {
            console.log(error);
            return []
        }
    }

    async getProfileById(id) {
        try {
            let profile = await Profile.findById(id);
            return profile;
        } catch(error) {
            console.log(error);
            return null;
        }
        
    }

    async createProfile(profileObj) {
        try {
            const error = await profileObj.validateSync();
            if (error) {
                const response = {
                    obj: profileObj,
                    errorMsg: error.errorMessage
                }; 
                return response; 
            } else {
                const newProfile = await profileObj.save();
                const response = {
                    obj: newProfile,
                    errorMsg: ""
                };
                return response; 
            }
        } catch(error) {
            const response = {
                obj: profileObj,
                errorMsg: error.message
            };
            return response;
        }
    }
}

module.exports = ProfileOps;