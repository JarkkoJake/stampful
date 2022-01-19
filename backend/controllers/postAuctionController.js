const auctionDb = require("../db/Auction");
const Auction = require("../models/auction");
const countryDb = require("../db/country");

exports.postNewAuction = async (req, res) => {

  console.log(req.body);

  // create new auction object based on model
  var auction = new Auction.Auction(req.body);

  if (req.files) {
    console.log("files realized");
    req.files.array.forEach(file => {
      console.log(file.name);
    });
    let file = req.files.thumbnail;
    let filepath = "images/" + file.name;
    auction.thumbnail = filepath;
    await file.mv(__dirname + "/../public/images/" + file.name);
}

  // this function checks if the auction somehow got country, seller or category id's
  // that dont exist at the moment
  if (await auction.invalidCategories()) {
    res.status(400).send();
  } else {
  var result = await auctionDb.createAuction(auction);
  res.status(201).send(result);
  }
};

exports.editAuction = (req, res) => {
  res.send("auction " + req.body.id + " updated");
};