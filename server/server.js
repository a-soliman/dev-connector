const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

/* Express App */
const app = express();
const port = process.env.PORT || 5000;

/* DB Config & Mongoose to Mongo connection */
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected Successfully!"))
  .catch(e => console.log(`Error while connecting to MongoDB ${e}`));

// Pointing public folder
const publicPath = path.join(__dirname, "..", "public");
// app.use(express.static(publicPath));

// Serve React app for all routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

app.listen(port, () => {
  console.log("Server is up!");
});
