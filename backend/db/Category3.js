const knex = require("./Knex");

function createCategory3(category3) {
  return knex("Category3").insert(category3);
}

function editCategory3(category3) {
  return knex("Category3").where({"id": category3.id}).update({"category3": category3.category3});
}

function getCategory3(category2id) {
  return knex("Category3").select({
    id: "id",
    category3: "category3"
  }).where("category2", category2id);
}

// used to check if a specific id exists while validating for new auctions
function getCount(id) {
  return knex("Category3").count().where({"id": id});
}

module.exports = {
  createCategory3,
  getCategory3,
  getCount,
  editCategory3
};