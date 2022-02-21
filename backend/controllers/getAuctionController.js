const auctionDb = require("../db/Auction"),
countryDb = require("../db/country"),
sellerDb = require("../db/seller"),
category1Db = require("../db/category1"),
category2Db = require("../db/category2"),
category3Db = require("../db/category3"),
imageDb = require("../db/image");
const Auction = require("../models/auction");

// send all information about the auction for a detailed view

exports.browseWithId = async (req, res) => {
  var results = await auctionDb.getAuctionWithId(req.query.id);
  
  // if no auction is found, return empty array
  if (results.length == 0) {
    res.status(200).send(results);
  } else {
    var auction = results[0];

    // sqlite3 stores booleans true = 1, false = 0, this code formats the return values back to booleans
    auction.used = auction.used === 1;
    auction.mint = auction.mint === 1;
    auction.postalItem = auction.postalItem === 1;
    auction.certificate = auction.certificate === 1;

    // populate categories, seller and country
    auction.country = (await countryDb.getCountry(auction.country))[0] || null;
    auction.seller = (await sellerDb.getSeller(auction.seller))[0] || null;
    auction.category1 = (await category1Db.getCategory1(auction.category1))[0] || null;
    auction.category2 = (await category2Db.getCategory2(auction.category2))[0] || null;
    auction.category3 = (await category3Db.getCategory3(auction.category3))[0] || null;
    auction.thumbnail = (await imageDb.getImageWithId(auction.thumbnail))[0] || null;

    res.status(200).send([auction]);
  }
};

// send information for list view about the auctions

exports.browseListView = async (req, res) => {

  // build settings object based on client requirements
  var settings = {
    page: req.query.page ? parseInt(req.query.page) : 1,
    maxPageSize: req.query.maxPageSize ? parseInt(req.query.maxPageSize) : 10,
    orderBy: req.query.orderBy || "date",
    orderAscending: req.query.orderAscending === "true" ? 1 : 0
  };

  if (req.query.minPrice || req.query.maxPrice) {
    settings.minPrice = parseInt(req.query.minPrice) || 0;
    settings.maxPrice = parseInt(req.query.maxPrice) || Number.POSITIVE_INFINITY;
    console.log(settings);

  }

  // Build filters based on client requirements
  var filters = {};
  if (req.query.seller) filters.seller = req.query.seller;
  if (req.query.country) filters.country = req.query.country;
  if (req.query.category1) filters.category1 = req.query.category1;
  if (req.query.category2) filters.category2 = req.query.category2;
  if (req.query.category3) filters.category3 = req.query.category3;
  if (req.query.used) filters.used = req.query.used == "true";
  if (req.query.mint) filters.mint = req.query.mint == "true";
  if (req.query.postalItem) filters.postalItem = req.query.postalItem == "true";
  if (req.query.certificate) filters.certificate = req.query.certificate == "true";
  if (req.query.catalogueNumber) filters.catalogueNumber = req.query.catalogueNumber;

  var results = await auctionDb.getAuctions(Auction.Auction.listModel, filters, settings);

  // populate the seller object and thumbnail paths based on id
  for (var i = 0; i < results.length; i++){
    results[i].seller = (await sellerDb.getSeller(results[i].seller))[0] || null;
    results[i].thumbnail = (await imageDb.getImageWithId(results[i].thumbnail))[0] || null;
  };
  
  // get count of items to calculate total pages
  var totalPages = await auctionDb.getCount(filters);

  res.send({info: {totalPages: Math.ceil(totalPages[0]["count(*)"] / settings.maxPageSize)}, auctions: results});
};

// send information for tile view about the auctions

exports.browseTileView = (req, res) => {
  res.send("Page " + (req.body.page || 1) + " of auctions ordered by " + (req.body.orderby || "date"));
};

