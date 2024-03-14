const express = require("express");
const Router = express.Router();
const loginController = require("../controllers/loginController");

Router.post("/", loginController.login);

module.exports.Router = Router;