const knexFile = require("./ConnectionKnex");
const Knex = require("knex");
const knex = Knex(knexFile);

function createCategory2(category2) {
  return knex("Category2").insert(category2);
}

function editCategory2(category2) {
  return knex("Category2").where({"id": category2.id}).update({"category2": category2.category2});
}

function getCategory2(category1id) {
  return knex("Category2").select({
    id: "id",
    category2: "category2"
  }).where("category1", category1id);
}

function getCategory2WithId(id) {
  return knex("Category2").select({
    id: "id",
    category2: "category2"
  }).where("id", id);
};

// used to check if a specific id exists while validating for new auctions
function getCount(id) {
  return knex("Category2").count().where({"id": id});
}

module.exports = {
  createCategory2,
  getCategory2,
  getCount,
  editCategory2,
  getCategory2WithId,
};