let express = require("express");
let router = express.Router();
let tagController = require("../controllers/tagController"); // index.js

// GET route to return all tags
router.get("/", (req, res) => {
  tagController.getTags(req, res);
});

// GET route to return a specific tag by ID
router.get("/:id", (req, res) => {
  tagController.getTagById(req, res);
});

// POST route to create a new tag
router.post("/create", (req, res) => {
  tagController.createTag(req.body, res);
});

// PUT route to update an existing tag
router.put("/:id", (req, res) => {
  tagController.updateTag(req, res);
});

// DELETE route to remove a tag
router.delete("/:id", (req, res) => {
  tagController.deleteTag(req, res);
});

module.exports = router;
