
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Auctions").del()
    .then(function () {
      return knex("Auctions").insert([
        {
          seller: 1,
          country: 1,
          category1: 1,
          category2: 1,
          category3: 1,
          thumbnail: 1,
          lotNumber: "AB1234",
          auctionNumber: "2009B",
          certificate: true,
          postalItem: false,
          mint: false,
          used: true,
          catalogueNumber: "IL1939A",
          description: "Test description Test description Test description Test description Test description Test description Test description Test description Test description ",
          currency: "€",
          sellingYear: 2009,
          sellingPrice: 10000,
          startingPrice: 4000
        },
        {
          seller: 1,
          country: 1,
          category1: 2,
          category2: null,
          category3: null,
          thumbnail: 2,
          lotNumber: "AC103",
          auctionNumber: "2009",
          certificate: false,
          postalItem: true,
          mint: false,
          used: true,
          catalogueNumber: "IL1939",
          description: "Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description ",
          currency: "€",
          sellingYear: 2009,
          sellingPrice: 10000,
          startingPrice: 4000
        },
        {
          seller: 2,
          country: 2,
          category1: 3,
          category2: 5,
          category3: null,
          thumbnail: 3,
          lotNumber: "BO100",
          auctionNumber: "2009A",
          certificate: false,
          postalItem: true,
          mint: false,
          used: true,
          catalogueNumber: "IX1929",
          description: "Test description Test description Test description Test description ",
          currency: "€",
          sellingYear: 2009,
          sellingPrice: 10000,
          startingPrice: 4000
        },
        {
          seller: 3,
          country: 2,
          category1: 3,
          category2: 6,
          category3: null,
          thumbnail: 4,
          lotNumber: "GH123",
          auctionNumber: "2009A",
          certificate: true,
          postalItem: false,
          mint: true,
          used: false,
          catalogueNumber: "IL1939",
          description: "Test description Test description Test description Test description Test description ",
          currency: "€",
          sellingYear: 2009,
          sellingPrice: 10000,
          startingPrice: 4000
        },
      ]);
    });
};
