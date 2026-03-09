const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage: storage });

router
  .route("/")
  //all listings
  .get(wrapAsync(listingController.index))
  // create new Listing
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createListing),
  );
//crete new listing from
router.get("/new", isLoggedIn, listingController.renderListForm);

router
  .route("/:id")
  //show Listing
  .get(wrapAsync(listingController.showListing))
  //update listing
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  //delete listing
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//edit listing form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
