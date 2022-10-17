
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Images").del()
    .then(function () {
      return knex("Images").insert([
        {path: "images/test_1.png", auctionId: 1},
        {path: "images/test_2.png", auctionId: 2},
        {path: "images/test_3.png", auctionId: 3},
        {path: "images/test_4.png", auctionId: 4},
      ]);
    });
};
