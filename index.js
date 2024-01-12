const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect.js");

const urlRoute = require("./routes/url.js");
const URL = require("./models/url");
const app = express();
const PORT = 8001;
const staticRoute = require("./routes/staticRouter");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded());

app.get("/", staticRoute);

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", urlRoute);

app.get("/url/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
