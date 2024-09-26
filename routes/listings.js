const express=require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {userLogedIn,isOwner,validateListing} = require("../middleWare.js");
const ListingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(ListingController.Index))
    .post(userLogedIn,upload.single("listing[image]"),validateListing,wrapAsync(ListingController.createListing));

//New Route  
router.get("/new",userLogedIn, ListingController.newListingForm);

router
    .route("/:id")
    .get(wrapAsync(ListingController.showListing))
    .put(userLogedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(ListingController.updateListing))
    .delete(isOwner, wrapAsync(ListingController.destroyListing));

//edit Route 
router.get("/:id/edit",userLogedIn,isOwner,wrapAsync(ListingController.editListing));

module.exports = router;