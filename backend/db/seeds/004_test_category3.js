
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Category3").del()
    .then(function () {
      return knex("Category3").insert([
        {category3: "1905", category2: 1},
        {category3: "1935", category2: 1},
        {category3: "1948", category2: 1},
        {category3: "1830", category2: 2},
        {category3: "Test 12", category2: 3},
        {category3: "Test 13", category2: 3},
        {category3: "Test 14", category2: 3},
        {category3: "Test 15", category2: 3},
      ]);
    });
};
