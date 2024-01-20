const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect.js");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth.js");

const URL = require("./models/url");
const app = express();
const PORT = 8001;
const mongoRoute = "mongodb://127.0.0.1:27017/short-url";

const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url.js");
const userRoute = require("./routes/user.js");

connectToMongoDB(mongoRoute).then(() => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

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
