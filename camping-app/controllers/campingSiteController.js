"use strict";
const Models = require("../models");

// Finds all camping sites in DB, then sends array as response
const getCampingSites = (res) => {
  Models.CampingSite.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getCampingSiteById = (req, res) => {
  Models.CampingSite.findOne({
    where: { site_id: req.params.id },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ result: 404, message: "Camping site not found" });
      }
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

// Uses JSON from request body to create new camping site in DB
const createCampingSite = (data, res) => {
  Models.CampingSite.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateCampingSite = (req, res) => {
  Models.CampingSite.update(req.body, {
    where: { site_id: req.params.id },
  })
    .then(([updated]) => {
      if (updated) {
        return Models.CampingSite.findOne({
          where: { site_id: req.params.id },
        });
      } else {
        return null;
      }
    })
    .then((updatedCampingSite) => {
      if (!updatedCampingSite) {
        return res
          .status(404)
          .send({ result: 404, message: "Camping site not found" });
      }
      res.send({ result: 200, data: updatedCampingSite });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

// Deletes camping site matching ID from params
const deleteCampingSite = (req, res) => {
  Models.CampingSite.destroy({ where: { site_id: req.params.id } })
    .then((deleted) => {
      if (deleted) {
        res.send({ result: 200, message: "Camping site deleted successfully" });
      } else {
        res
          .status(404)
          .send({ result: 404, message: "Camping site not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  getCampingSites,
  getCampingSiteById,
  createCampingSite,
  updateCampingSite,
  deleteCampingSite,
};
