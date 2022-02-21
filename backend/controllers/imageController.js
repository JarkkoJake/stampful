const imageDb = require("../db/image");
const auctionDb = require("../db/Auction");
const {join} = require("path");

exports.getImageWithId = async (req, res) => {
  console.log(req.params.id);
};

exports.postImage = async (req, res) => {
  try {
    let newImage = {auctionId: req.params.auctionId};
    let imageId = await imageDb.postImage(newImage);
    let file = req.files["thumbnail"];
    let splitFileName = file.name.split(".");
    file.name = splitFileName[0] + "_" + imageId[0] + "." + splitFileName[1];
    newImage.id = imageId[0];
    newImage.path = "images/" + file.name;
    let auction = {
      id: req.params.auctionId,
      thumbnail: imageId
    }
    await auctionDb.editAuction(auction);
    await imageDb.addPath(newImage);
    await file.mv(join(__dirname, "../public/images/" + file.name));
  } catch (err) {
    console.log(err);
  }
};