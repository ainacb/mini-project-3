"use strict";
const Models = require("../models");

// Get all tags
const getTags = (req, res) => {
  Models.Tag.findAll({})
    .then((data) => {
      res.status(200).json({ result: 200, data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

// Get a specific tag by ID
const getTagById = (req, res) => {
  Models.Tag.findOne({
    where: { tag_id: req.params.id },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ result: 404, message: "Tag not found" });
      }
      res.status(200).json({ result: 200, data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

// Create a new tag
const createTag = (req, res) => {
  console.log("Received Body:", req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ result: 400, error: "Request body is missing" });
  }

  const { tag_id, tag_name } = req.body; // Extract fields

  if (!tag_name) {
    return res.status(400).json({ result: 400, error: "tag_name is required" });
  }

  Models.Tag.create({ tag_id, tag_name })
    .then((newTag) => {
      res.status(201).json({ result: 201, data: newTag });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

// Update an existing tag
const updateTag = (req, res) => {
  Models.Tag.update(req.body, {
    where: { tag_id: req.params.id },
  })
    .then(([updated]) => {
      if (updated) {
        return Models.Tag.findOne({ where: { tag_id: req.params.id } });
      }
      return null;
    })
    .then((updatedTag) => {
      if (!updatedTag) {
        return res.status(404).json({ result: 404, message: "Tag not found" });
      }
      res.status(200).json({ result: 200, data: updatedTag });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

// Delete a tag
const deleteTag = (req, res) => {
  Models.Tag.destroy({ where: { tag_id: req.params.id } })
    .then((deleted) => {
      if (deleted) {
        res
          .status(200)
          .json({ result: 200, message: "Tag deleted successfully" });
      } else {
        res.status(404).json({ result: 404, message: "Tag not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

module.exports = {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
