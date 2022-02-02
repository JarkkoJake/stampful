const countryDb = require("../db/Country.js");
const sellerDb = require("../db/Seller.js");
const category1Db = require("../db/Category1.js");
const category2Db = require("../db/Category2.js");
const category3Db = require("../db/Category3.js");

/* Editing uses PUT method, all data should be given and 
 replaced in the database besides ID (discuss images) */

 exports.editSeller = async (req, res) => {
    let seller = {name: req.body.name};
    try {
        let results = await sellerDb.editSeller(req.body.id, seller);
        res.status(201).send();
    }
    catch (err){
        console.log(err);
        res.status(400).send();
    }
};
exports.editCountry = async (req, res) => {
    let country = {id: req.body.id, name: req.body.name};
    try {
        let results = await countryDb.editCountry(country);
        res.status(201).send();
    }
    catch (err){
        console.log(err);
        res.status(400).send();
    }
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
