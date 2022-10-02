
exports.up = function(knex) {
  return knex.schema
  .createTable("Countries", function (table) {
    table.increments("id");
    table.string("name").notNullable();
  })
  .createTable("Sellers", function (table) {
    table.increments("id");
    table.string("name").notNullable();
  })
  .createTable("Category1", function (table) {
    table.increments("id");
    table.string("category1");
    table.integer("country").references("id")
      .inTable("Countries").onDelete("CASCADE")
      .onUpdate("CASCADE");
  })
  .createTable("Category2", function (table) {
    table.increments("id");
    table.string("category2");
    table.integer("category1").references("id")
      .inTable("Category1").onDelete("CASCADE")
      .onUpdate("CASCADE");
  })
  .createTable("Category3", function (table) {
    table.increments("id");
    table.string("category3");
    table.integer("category2").references("id")
      .inTable("Category2").onDelete("CASCADE")
      .onUpdate("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("Countries")
  .dropTable("Sellers")
  .dropTable("Category1")
  .dropTable("Category2")
  .dropTable("Category3")
};
