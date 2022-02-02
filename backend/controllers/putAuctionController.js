const auctionDb = require("../db/Auction");
const Auction = require("../models/auction");
const countryDb = require("../db/country");

exports.editAuction = async (req, res) => {
  let auction = new Auction.Auction(req.body);
  console.log(auction);
  res.send();
};