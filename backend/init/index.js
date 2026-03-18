require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongo_url = process.env.MONGODB_URL;

main()
  .then(() => {
    console.log("connected to mongo successfully..");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69bb0ab7dc2e7baf8abaeb81",
  }));
  await Listing.insertMany(initData.data);
  console.log("data have been initilized...");
};
