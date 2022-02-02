const knex = require("./Knex");

function createCountry(country){
  return knex("Countries").insert(country);
}

function editCountry(country){
  return knex("Countries").where({"id": country.id}).update({"name": country.name});
}

function getAllCountries(){
  return knex("Countries").select("*");
}

// used to check if a specific id exists while validating for new auctions
function getCount(id) {
  return knex("Countries").count().where({"id": id});
}

function getCountry(id) {
  return knex("Countries").select({name: "name", id: "id"}).where({"id": id});
}

module.exports = {
  createCountry,
  getAllCountries,
  getCount,
  getCountry,
  editCountry
};