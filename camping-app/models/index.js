"use strict";
const User = require("./user"); //require the model
const CampingSite = require("./campingSite");

async function init() {
  await User.sync(); // sync the model
  await CampingSite.sync();
  // also sync any extra models here
}

init();

module.exports = {
  User, // export the model
  CampingSite,
  // also export any extra models here
};
