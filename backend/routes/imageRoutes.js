const express = require('express'),
  router = express.Router(),
  imageController = require("../controllers/imageController");

router.get("/:id", imageController.getImageWithId);

router.post("/:auctionId", imageController.postImage);

module.exports.router = router;