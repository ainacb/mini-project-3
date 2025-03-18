"use strict";
const User = require("./user"); //require the model
const CampingSite = require("./campingSite");
const Tag = require("./tag");
const SiteTag = require("./siteTag");

async function init() {
  await User.sync(); // sync the model
  await CampingSite.sync();
  await Tag.sync();
  await SiteTag.sync();
  // also sync any extra models here
}

init();

module.exports = {
  User, // export the model
  CampingSite,
  Tag,
  SiteTag,
  // also export any extra models here
};
