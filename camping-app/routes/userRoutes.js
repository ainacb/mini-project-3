let express = require("express");
let router = express.Router();
let userController = require("../controllers/userController"); // index.js

// Adds a GET route to return all users
router.get("/", (req, res) => {
  userController.getUsers(req, res);
});

// Adds a GET route to return a specific user
router.get("/:id", (req, res) => {
  userController.getUserById(req, res);
});

// Adds a POST route to create a new user
router.post("/create", (req, res) => {
  userController.createUser(req.body, res);
});

router.put("/:id", (req, res) => {
  userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
