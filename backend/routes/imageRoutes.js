const express = require('express'),
  router = express.Router(),
  imageController = require("../controllers/imageController");

router.post("/:auctionId", imageController.postImage);

module.exports.router = router;