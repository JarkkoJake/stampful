const countryDb = require("../db/Country.js");
const sellerDb = require("../db/Seller.js");
const category1Db = require("../db/Category1.js");
const category2Db = require("../db/Category2.js");
const category3Db = require("../db/Category3.js");

// POST METHODS -------------

// post a new seller, takes {"name": "example"} as a request body

exports.postSeller = async (req, res) => {

  if(!req.body.name) {
    res.status(400).send();
    return;
  }

  // used to avoid invalid attributes to be thrown to the db
  const newSeller = {
    name: req.body.name
  };
  newSeller.id = (await sellerDb.createSeller(newSeller))[0];
  res.status(201).send(newSeller);
};

// post a new country, takes {"name": "example"} as a request body

exports.postCountry = async (req, res) => {

  if(!req.body.name) {
    res.status(400).send();
    return;
  }

  // used to avoid invalid attributes to be thrown to the db
  const newCountry = {
    name: req.body.name
  };
  newCountry.id = (await countryDb.createCountry(newCountry))[0];
  res.status(201).send(newCountry);
};

// post a new category1, takes {"country": id, "category1": "example"}
// as a request body

exports.postCategory1 = async (req, res) => {

  if(!req.body.country || !req.body.category1) {
    res.status(400).send();
    return;
  }

  // used to avoid invalid attributes to be thrown to the db
  const newCategory1 = {
    country: req.body.country,
    category1: req.body.category1
  };
  newCategory1.id = (await category1Db.createCategory1(newCategory1))[0];
  res.status(201).send(newCategory1);
};

// post a new category2, takes {"category1": id, "category2": "example"}
// as a request body

exports.postCategory2 = async (req, res) => {

  if(!req.body.category1 || !req.body.category2) {
    res.status(400).send();
    return;
  }

  // used to avoid invalid attributes to be thrown to the db
  const newCategory2 = {
    category1: req.body.category1,
    category2: req.body.category2
  };
  newCategory2.id = (await category2Db.createCategory2(newCategory2))[0];
  res.status(201).send(newCategory2);
};

// post a new category3, takes {"category2": id, "category3": "example"}
// as a request body

exports.postCategory3 = async (req, res) => {

  if(!req.body.category2 || !req.body.category3) {
    res.status(400).send();
    return;
  }

  // used to avoid invalid attributes to be thrown to the db
  const newCategory3 = {
    category2: req.body.category2,
    category3: req.body.category3
  };
  newCategory3.id = (await category3Db.createCategory3(newCategory3))[0];
  res.status(201).send(newCategory3);
};
