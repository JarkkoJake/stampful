const countryDb = require("../db/Country.js");
const sellerDb = require("../db/Seller.js");
const category1Db = require("../db/Category1.js");
const category2Db = require("../db/Category2.js");
const category3Db = require("../db/Category3.js");

/* Editing uses PUT method, all data should be given and 
 replaced in the database besides ID (discuss images) */

exports.editCountry = async (req, res) => {
    console.log("id: " + req.body.id + " name changed to " + req.body.name);
 };
exports.editCategory1 = async (req, res) => {
    console.log("id: " + req.body.id + " name changed to " + req.body.name);
};
exports.editCategory2 = async (req, res) => {
    console.log("id: " + req.body.id + " name changed to " + req.body.name);
};
exports.editCategory3 = async (req, res) => {
    console.log("id: " + req.body.id + " name changed to " + req.body.name);
};
exports.editSeller = async (req, res) => {
    console.log("id: " + req.body.id + " name changed to " + req.body.name);
};
