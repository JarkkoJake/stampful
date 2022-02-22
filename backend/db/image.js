const { get } = require("express/lib/response");
const knex = require("./Knex");

function postImage (image) {
  return knex("Images").insert(image);
}

function addPath (image) {
  return knex("Images").where({"id": image.id}).update({"path": image.path});
}

function getImageWithId(id) {
  return knex("Images").select("path").where({"id": id});
}

module.exports = {
  postImage: postImage,
  addPath: addPath,
  getImageWithId: getImageWithId
}