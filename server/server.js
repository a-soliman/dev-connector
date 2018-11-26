const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

/* ROUTES */
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

/* EXPRESS APP */
const app = express();
const port = process.env.PORT || 5000;

/* DB Config & Mongoose to Mongo connection */
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected Successfully!"))
  .catch(e => console.log(`Error while connecting to MongoDB ${e}`));

/* POINTING PUBLIC FOLDER */
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

/* USE ROUTES */
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

/* SERVE REACT APP FOR ALL ROUTES */
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up!");
});
