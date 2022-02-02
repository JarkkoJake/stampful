const auctionDb = require("../db/Auction");
const Auction = require("../models/auction");
const countryDb = require("../db/country");

exports.editAuction = async (req, res) => {
  let auction = new Auction.Auction(req.body);
  auction.id = req.body.id;
  try {
    await auctionDb.editAuction(auction);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};