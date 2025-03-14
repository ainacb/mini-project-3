let express = require("express");
let router = express.Router();
const campingSiteController = require("../controllers/campingSiteController"); // index.js

// Adds a GET route to return all camping sites
router.get("/", (req, res) => {
  campingSiteController.getCampingSites(req, res);
});

// Adds a GET route to return a specific camping site
router.get("/:id", (req, res) => {
  campingSiteController.getCampingSiteById(req, res);
});

// Adds a POST route to create a new camping site
router.post("/create", (req, res) => {
  campingSiteController.createCampingSite(req.body, res);
});

// Adds a PUT route to update a camping site
router.put("/:id", (req, res) => {
  campingSiteController.updateCampingSite(req, res);
});

// Adds a DELETE route to remove a camping site
router.delete("/:id", (req, res) => {
  campingSiteController.deleteCampingSite(req, res);
});

module.exports = router;
