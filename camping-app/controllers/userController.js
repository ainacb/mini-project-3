"use strict";
const Models = require("../models");
// finds all users in DB, then sends array as response

const getUsers = (res) => {
  Models.User.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getUserById = (req, res) => {
  Models.User.findOne({
    // Use findOne to fetch a single user
    where: { user_id: req.params.id }, // Find by user ID from the route parameter
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ result: 404, message: "User not found" });
      }
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

// uses JSON from request body to create new user in DB
const createUser = (data, res) => {
  Models.User.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateUser = (req, res) => {
  Models.User.update(req.body, {
    where: { user_id: req.params.id },
  })
    .then(([updated]) => {
      if (updated) {
        return Models.User.findOne({ where: { user_id: req.params.id } });
      } else {
        return null;
      }
    })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send({ result: 404, message: "User not found" });
      }
      res.send({ result: 200, data: updatedUser });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

// deletes user matching ID from params

const deleteUser = (req, res) => {
  Models.User.destroy({ where: { user_id: req.params.id } })
    .then((deleted) => {
      if (deleted) {
        res.send({ result: 200, message: "User deleted successfully" });
      } else {
        res.status(404).send({ result: 404, message: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
