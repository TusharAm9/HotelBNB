const express=require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview,userLogedIn,isReviewAuthor}=require("../middleWare.js");

const reviewController = require("../controllers/review.js");

//Post route
router.post("/",userLogedIn,validateReview, wrapAsync(reviewController.createReview));

//Review Delete Route
router.post("/:reviewId",userLogedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports = router;