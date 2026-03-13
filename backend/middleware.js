const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.status(401).json({ message: "Not logged in" });
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  // Check if user is logged in
  if (!res.locals.currentUser) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  // Check ownership
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    return res.status(403).json({ message: "Unauthorized..." });
  }
  next();
};

module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
  let { reviewId } = req.params;
  // check login
  if (!res.locals.currentUser) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  // find review
  let review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  // check author
  if (!review.author.equals(res.locals.currentUser._id)) {
    return res.status(403).json({ message: "Unauthorized..." });
  }
  next();
};