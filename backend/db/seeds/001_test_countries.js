
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Countries').del()
    .then(function () {
      // Inserts seed entries
      return knex('Countries').insert([
        {name: 'Suomi'},
        {name: 'Viro'},
        {name: 'Saksa'},
        {name: 'Ruotsi'},
      ]);
    });
};
