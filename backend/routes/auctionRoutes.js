const express = require('express'),
  router = express.Router(),
  getAuctionController = require('../controllers/getAuctionController'),
  postAuctionController = require("../controllers/postAuctionController"),
  putAuctionController = require("../controllers/putAuctionController");

// used to get detailed information from one auction using its id given 
// in a query
router.get('/detailed', getAuctionController.browseWithId);

// used to get information for list based view, search options as query
router.get('/listbrowse', getAuctionController.browseListView);

// used to get information for tile based view, search options as query
router.get('/tilebrowse', getAuctionController.browseTileView);

// post new auction, takes auction data as body
router.post("/", postAuctionController.postNewAuction);

// edit auction, all data in body
router.put("/", putAuctionController.editAuction);

module.exports.router = router;