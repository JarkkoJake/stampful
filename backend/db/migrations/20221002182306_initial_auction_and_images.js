
exports.up = function(knex) {
  return knex.schema.createTable("Auctions", function (table) {
    table.increments("id");
    table.decimal("startingPrice");
    table.decimal("sellingPrice");
    table.string("currency");
    table.string("description");
    table.string("catalogueNumber");
    table.boolean("used");
    table.boolean("mint");
    table.boolean("postalItem");
    table.boolean("certificate");
    table.string("auctionNumber");
    table.string("lotNumber");
    table.string("date");
    table.string("user");
    table.integer("seller").references("id").inTable("Sellers")
      .onDelete("CASCADE").onUpdate("CASCADE");
    table.integer("country").references("id").inTable("Countries")
      .onDelete("CASCADE").onUpdate("CASCADE");
    table.integer("category1").references("id").inTable("Category1")
      .onDelete("CASCADE").onUpdate("CASCADE");
    table.integer("category2").references("id").inTable("Category2")
      .onDelete("CASCADE").onUpdate("CASCADE");
    table.integer("category3").references("id").inTable("Category3")
      .onDelete("CASCADE").onUpdate("CASCADE");
    table.integer("thumbnail").references("id").inTable("Images")
      .onDelete("CASCADE").onUpdate("CASCADE");
  })
  .createTable("Images", function (table) {
    table.increments("id");
    table.string("path");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Auctions")
    .dropTable("Images");
};