
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Category2").del()
    .then(function () {
      return knex("Category2").insert([
        {category2: "<1950", category1: 1},
        {category2: ">1950", category1: 1},
        {category2: "<1850", category1: 2},
        {category2: ">1850", category1: 2},
        {category2: "Test 12", category1: 3},
        {category2: "Test 13", category1: 3},
        {category2: "Test 14", category1: 3},
        {category2: "Test 15", category1: 3},
      ]);
    });
};
