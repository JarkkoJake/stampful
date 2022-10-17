
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Sellers").del()
    .then(function () {
      return knex("Sellers").insert([
        {name: "Hellman"},
        {name: "Cherrystone"},
        {name: "Postiljonen"},
        {name: "Mark"},
        {name: "Test"},
        {name: "Testing"},
      ]);
    });
};
