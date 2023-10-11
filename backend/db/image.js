const knexFile = require("./ConnectionKnex");
const Knex = require("knex");
const knex = Knex(knexFile);

function postImage (image) {
  return knex("Images").insert(image);
}

function addPath (image) {
  return knex("Images").where({"id": image.id}).update({"path": image.path});
}

function getImageWithId(id) {
  return knex("Images").select("path").where({"id": id});
}

function getImagesForAuction(auctionId) {
  return knex("Images").select("path").where({"auctionId": auctionId});
}

module.exports = {
  postImage: postImage,
  addPath: addPath,
  getImageWithId: getImageWithId,
  getImagesForAuction
}