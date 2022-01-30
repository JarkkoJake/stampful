const knex = require("./Knex");

function createSeller(seller){
  return knex("Sellers").insert(seller);
}

function getAllSellers(){
  return knex("Sellers").select("*");
}

function editSeller(id, seller){
  return knex("Sellers").where({"id": id}).update(seller);
}

// used to check if a specific id exists while validating for new auctions
function getCount(id) {
  return knex("Sellers").count().where({"id": id});
}

function getSeller(id) {
  return knex("Sellers").select({name: "name", id: "id"}).where({"id": id});
}

module.exports = {
  createSeller,
  getAllSellers,
  getCount,
  getSeller,
  editSeller
};