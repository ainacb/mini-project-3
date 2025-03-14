const express = require("express");
const app = express();
require("dotenv").config();
let dbConnect = require("./lib/dbConnect");
let userRoutes = require("./routes/userRoutes");
let campingSiteRoutes = require("./routes/campingSiteRoutes");

// parse requests of content-type - application/json
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/campingSite", campingSiteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my SQL application." });
});

// set port, listen for requests

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
