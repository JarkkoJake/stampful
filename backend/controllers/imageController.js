const imageDb = require("../db/image");
const auctionDb = require("../db/Auction");
const {join} = require("path");

exports.getImageWithId = async (req, res) => {
  console.log(req.params.id);
};

exports.postImage = async (req, res) => {
  /** Post images to an auction, requires auctionId, saves thumbnail, and additionalImages, save
   * the files to images folder and references to sqlite.
   */
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
  thumbnail.name = `${splitFileName[0]}_${thumbnailId}.${splitFileName[1]}`;
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
  await thumbnail.mv(join(__dirname, `../public/images/${thumbnail.name}`));
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
    await image.mv(join(__dirname, `../public/images/${image.name}`));
  }
};
