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
  const results = await sellerDb.createSeller(newSeller);
  res.status(201).send();
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
  const results = await countryDb.createCountry(newCountry);
  res.status(201).send();
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
  const results = await category1Db.createCategory1(newCategory1);
  res.status(201).send();
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
  const results = await category2Db.createCategory2(newCategory2);
  res.status(201).send();
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
  const results = await category3Db.createCategory3(newCategory3);
  res.status(201).send();
};
