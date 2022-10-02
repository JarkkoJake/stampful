
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Category1").del()
    .then(function () {
      return knex("Category1").insert([
        {category1: "1900", country: 1},
        {category1: "1800", country: 1},
        {category1: "Test 1", country: 2},
        {category1: "Test 2", country: 2},
        {category1: "1920", country: 3},
        {category1: "1940", country: 3},
        {category1: "1960", country: 3},
        {category1: "West", country: 4},
      ]);
    });
};
