"use strict";
const Models = require("../models");

// Get all SiteTags
const getSiteTags = (req, res) => {
  Models.SiteTag.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// Get a specific SiteTag by site_id and tag_id
const getSiteTagById = (req, res) => {
  Models.SiteTag.findOne({
    where: { site_id: req.params.site_id, tag_id: req.params.tag_id },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ result: 404, message: "SiteTag not found" });
      }
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

// Create a new SiteTag (Associating a tag with a site)
const createSiteTag = async (req, res) => {
  try {
    const { site_id, tag_id } = req.body;

    if (!site_id || !tag_id) {
      return res.status(400).json({
        result: 400,
        error: "Missing required fields: site_id or tag_id",
      });
    }

    // Check if site-tag relationship already exists
    const existingEntry = await Models.SiteTag.findOne({
      where: { site_id, tag_id },
    });

    if (existingEntry) {
      return res.status(409).json({
        // 409 Conflict
        result: 409,
        message: "SiteTag relationship already exists",
      });
    }

    // If not found, create new entry
    const newSiteTag = await Models.SiteTag.create({ site_id, tag_id });
    res.status(201).json({ result: 201, data: newSiteTag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

// Delete a SiteTag (Removing a tag from a site)
const deleteSiteTag = (req, res) => {
  Models.SiteTag.destroy({
    where: { site_id: req.params.site_id, tag_id: req.params.tag_id },
  })
    .then((deleted) => {
      if (deleted) {
        res.send({ result: 200, message: "SiteTag deleted successfully" });
      } else {
        res.status(404).send({ result: 404, message: "SiteTag not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  getSiteTags,
  getSiteTagById,
  createSiteTag,
  deleteSiteTag,
};
