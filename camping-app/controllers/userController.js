"use strict";
const Models = require("../models");

// Get all users
const getUsers = (req, res) => {
  Models.User.findAll({})
    .then((data) => {
      res.status(200).json({ result: 200, data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

// Get a specific user by ID
const getUserById = (req, res) => {
  Models.User.findOne({
    where: { user_id: req.params.id }, // Find user by ID from the route parameter
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ result: 404, message: "User not found" });
      }
      res.status(200).json({ result: 200, data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

// Create a new user
const createUser = (req, res) => {
  console.log("Received Headers:", req.headers); // Debug headers
  console.log("Received Body:", req.body); // Debugging log

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ result: 400, error: "Request body is missing" });
  }

  const {
    first_name,
    last_name,
    username,
    email,
    profile_pic,
    is_verified,
    social_links,
  } = req.body;

  if (!first_name || !last_name || !username || !email) {
    return res.status(400).json({
      result: 400,
      error:
        "Missing required fields: first_name, last_name, username, or email",
    });
  }

  Models.User.create(req.body)
    .then((newUser) => {
      res.status(201).json({ result: 201, data: newUser });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

// Update an existing user
const updateUser = (req, res) => {
  Models.User.update(req.body, {
    where: { user_id: req.params.id },
  })
    .then(([updated]) => {
      if (updated) {
        return Models.User.findOne({ where: { user_id: req.params.id } });
      }
      return null;
    })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ result: 404, message: "User not found" });
      }
      res.status(200).json({ result: 200, data: updatedUser });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

// Delete a user by ID
const deleteUser = (req, res) => {
  Models.User.destroy({ where: { user_id: req.params.id } })
    .then((deleted) => {
      if (deleted) {
        res
          .status(200)
          .json({ result: 200, message: "User deleted successfully" });
      } else {
        res.status(404).json({ result: 404, message: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: 500, error: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
