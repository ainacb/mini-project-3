"use strict";
const User = require("./user"); //require the model
const CampingSite = require("./campingSite");
const Tag = require("./tag");

async function init() {
  await User.sync(); // sync the model
  await CampingSite.sync();
  await Tag.sync();
  // also sync any extra models here
}

init();

module.exports = {
  User, // export the model
  CampingSite,
  Tag,
  // also export any extra models here
};
