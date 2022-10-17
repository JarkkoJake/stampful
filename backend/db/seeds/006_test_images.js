
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Images").del()
    .then(function () {
      return knex("Images").insert([
        {path: "images/test_1.jpg", auctionId: 1},
        {path: "images/test_2.jpg", auctionId: 2},
        {path: "images/test_3.jpg", auctionId: 3},
        {path: "images/test_4.jpg", auctionId: 4},
      ]);
    });
};
