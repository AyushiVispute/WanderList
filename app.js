const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Routers
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");


// Database Connection

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  console.log("Connected to MongoDB");
}

main().catch((err) => console.log("MongoDB Connection Error:", err));


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.send("🌍 Welcome to WanderList!");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);


app.all("*", (req, res) => {
  res.status(404).send("❌ Page Not Found");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("⚠️ Something went wrong!");
});


app.listen(8080, () => {
  console.log("🚀 Server is running on http://localhost:8080");
});
