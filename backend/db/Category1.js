const knexFile = require("./ConnectionKnex");
const Knex = require("knex");
const knex = Knex(knexFile);

function createCategory1(category1) {
  return knex("Category1").insert(category1);
}

function editCategory1(category1) {
  return knex("Category1").where({"id": category1.id}).update({"category1": category1.category1});
}

function getCategory1(countryid) {
  return knex("Category1").select({
    id: "id",
    category1: "category1"
  }).where("country", countryid);
}

// used to check if a specific id exists while validating for new auctions
function getCount(id) {
  return knex("Category1").count().where({"id": id});
}

module.exports = {
  createCategory1,
  getCategory1,
  getCount,
  editCategory1
};