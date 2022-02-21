const knex = require("./Knex");

function postImage (image) {
  return knex("Images").insert(image);
}

module.exports = {
  postImage: postImage
}