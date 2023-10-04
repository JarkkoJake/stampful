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
 // WIP
exports.newPostImage = async (req, res) => {
  try {
    const auctionId = req.params.auctionId;
    if (!auctionId) res.status(400).send("No auction id was provided");
    const thumbnail = req.files["thumbnail"];
    if (thumbnail) await setThumbnail(thumbnail, auctionId);
    const additionalImages = req.files["additionalImages"];
    if (additionalImages) await saveAdditionalImages(additionalImages, auctionId);
  } catch (e) {
    console.log(e)
  }
};

const setThumbnail = async (thumbnail, auctionId) => {
  /* Post thumbnail image to get image id */
  const thumbnailId = (await imageDb.postImage({auctionId}))[0];
  const splitFileName = thumbnail.name.split(".");
  thumbnail.name = `${splitFileName[0]}_${thumbnailId}.${splitFileName[0]}`;
  const newImageData = {
    auctionId,
    id: thumbnailId,
    path: `images/${thumbnail.name}`,
  };
  const auctionUpdate = {
    id: auctionId,
    thumbnail: thumbnailId,
  };
  await auctionDb.editAuction(auctionUpdate);
  await imageDb.addPath(newImageData);
  await thumbnail.mv(join(__dirname, `..public/images/${thumbnail.name}`));
};

const saveAdditionalImages = async (additionalImages, auctionId) => {
  for (const image of additionalImages) {
    const imageId = (await imageDb.postImage({auctionId}))[0];
    const splitFileName = image.name.split(".");
    image.name = `${splitFileName[0]}_${imageId}.${splitFileName[1]}`;
    await imageDb.addPath({
      auctionId,
      id: imageId,
      path: `images/${image.name}`,
    });
    await image.mv(join(__dirname, `..public/images/${image.name}`));
  }
};
