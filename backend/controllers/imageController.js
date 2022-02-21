const imageDb = require("../db/image");
const auctionDb = require("../db/Auction");
const {join} = require("path");

exports.getImageWithId = async (req, res) => {
  console.log(req.params.id);
};

// Post image to database, add reference to auction item in database and
// save image file to server. Currently (21.2.2022) only supports one image (thumbnail).
exports.postImage = async (req, res) => {
  try {
    let newImage = {auctionId: req.params.auctionId};
    let imageId = await imageDb.postImage(newImage);
    let file = req.files["thumbnail"];

    // id of the created image entry to database is attached to the end
    // of file name before extension to prevern duplicate names from
    // causing errors
    let splitFileName = file.name.split(".");
    file.name = splitFileName[0] + "_" + imageId[0] + "." + splitFileName[1];

    // build image and auction information
    newImage.id = imageId[0];
    newImage.path = "images/" + file.name;
    let auction = {
      id: req.params.auctionId,
      thumbnail: imageId
    }

    // update items in database
    await auctionDb.editAuction(auction);
    await imageDb.addPath(newImage);

    // save file
    await file.mv(join(__dirname, "../public/images/" + file.name));
  } catch (err) {
    console.log(err);
  }
};