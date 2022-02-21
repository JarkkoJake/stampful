const knex = require("./Knex");

function postImage (image) {
  return knex("Images").insert(image);
}

function addPath (image) {
  return knex("Images").where({"id": image.id}).update({"path": image.path});
}

module.exports = {
  postImage: postImage,
  addPath: addPath
}