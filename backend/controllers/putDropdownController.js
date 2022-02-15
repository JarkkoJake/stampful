const countryDb = require("../db/Country.js");
const sellerDb = require("../db/Seller.js");
const category1Db = require("../db/Category1.js");
const category2Db = require("../db/Category2.js");
const category3Db = require("../db/Category3.js");

/* Editing uses PUT method, all data should be given and 
 replaced in the database besides ID */

 exports.editSeller = async (req, res) => {
  let seller = {id:req.body.id, name: req.body.name};
  try {
    await sellerDb.editSeller(seller);
    res.status(201).send(seller);
  }
  catch (err){
    console.log(err);
    res.status(400).send();
  }
};
exports.editCountry = async (req, res) => {
  let country = {id: req.body.id, name: req.body.name};
  try {
    await countryDb.editCountry(country);
    res.status(201).send(country);
  }
  catch (err){
    console.log(err);
    res.status(400).send();
  }
 };
exports.editCategory1 = async (req, res) => {
  let category = {id: req.body.id, category1: req.body.category1};
  try {
    await category1Db.editCategory1(category);
    res.status(201).send(category);
  }
  catch (err) {
    console.log(err);
    res.status(400).send();
  }
};
exports.editCategory2 = async (req, res) => {
  let category = {id: req.body.id, category2: req.body.category2};
  try {
    await category2Db.editCategory2(category);
    res.status(201).send(category);
  }
  catch (err) {
    console.log(err);
    res.status(400).send();
  }
};
exports.editCategory3 = async (req, res) => {
  let category = {id: req.body.id, category3: req.body.category3};
  try {
    await category3Db.editCategory3(category);
    res.status(201).send(category);
  }
  catch (err) {
    console.log(err);
    res.status(400).send();
  }
};
