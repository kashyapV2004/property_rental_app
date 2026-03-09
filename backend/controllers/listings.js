const Listing = require("../models/listing.js");

//all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.json(allListings);
};

//crete new listing from
module.exports.renderListForm = (req, res) => {
  return res.status(200).json({ message: "Authorized" });
};

//show Listing
module.exports.showListing = async (req, res) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }
    return res.status(200).json( listing, {success : true});
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//create new Listing
module.exports.createListing = async (req, res) => {
  try {
    let newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      newlisting.image = { url, filename };
    }
    await newlisting.save();
    return res.status(200).json({ success: true, listing: newlisting });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//edit listing form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
  } else {
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    return res.json({listing, originalImageUrl});
  }
};

//update listing
module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { runValidators: true, new: true },
    );
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }
    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
      await listing.save();
    }
    return res.status(200).json({ success: true, listing });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//delete listing
module.exports.deleteListing = async (req, res) => {
  try {
    let { id } = req.params;
    const deleted = await Listing.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }
    return res.status(200).json({ success: true, message: "Listing deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};