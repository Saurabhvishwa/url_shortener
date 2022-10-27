const express = require("express");
var router = require("./controller/UrlRouter");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", router);
};
