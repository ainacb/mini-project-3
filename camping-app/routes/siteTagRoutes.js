let express = require("express");
let router = express.Router();
let siteTagController = require("../controllers/siteTagController");

// GET route to return all site tags
router.get("/", (req, res) => {
  siteTagController.getSiteTags(req, res);
});

// GET route to return a specific site tag by site_id and tag_id
router.get("/:site_id/:tag_id", (req, res) => {
  siteTagController.getSiteTagById(req, res);
});

// POST route to create a new site tag association
router.post("/create", (req, res) => {
  siteTagController.createSiteTag(req, res);
});

// DELETE route to remove a site tag association
router.delete("/:site_id/:tag_id", (req, res) => {
  siteTagController.deleteSiteTag(req, res);
});

module.exports = router;
