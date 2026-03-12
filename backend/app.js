if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const passport = require("passport")
const localSrategy = require("passport-local");
const User = require("./models/user.js");

const cors=require("cors");

const listingsRouters = require("./routes/listing.js");
const reviewsRouters = require("./routes/review.js");
const userRouters = require("./routes/user.js");

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const mongo_url = 'mongodb://127.0.0.1:27017/wanderlust';
main()
    .then(() => {
        console.log("connected to mongo successfully..");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
  await mongoose.connect(mongo_url);
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const sessionOptions = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localSrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/current-user", (req, res) => {
  res.json(req.user || null);
});
 
app.use("/listings", listingsRouters);
app.use("/listings/:id/reviews", reviewsRouters);
app.use("/", userRouters);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

//middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // don't send headers twice
  }
  let { statusCode = 500, message = "something went wrong!" } = err;
  res.status(statusCode).json({ success: false, message });
});

app.listen(8080, () => {
    console.log("server is lestening to port 8080..");
});