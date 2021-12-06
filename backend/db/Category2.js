const knex = require("./Knex");

function createCategory2(category2) {
  return knex("Category2").insert(category2);
}

function getCategory2(category1id) {
  return knex("Category2").select({
    id: "id",
    category2: "category2"
  }).where("category1", category1id);
}

// used to check if a specific id exists while validating for new auctions
function getCount(id) {
  return knex("Category2").count().where({"id": id});
}

module.exports = {
  createCategory2,
  getCategory2,
  getCount
};