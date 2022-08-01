import {v2 as cloudinary}  from "cloudinary";

cloudinary.config({
    cloud_name: "lcobackend",
    api_key: "887834286126384",
    api_secret: "oOQfAUM6WCJ5QwUJCTbaew-1yMU"
})

module.exports = cloudinary;