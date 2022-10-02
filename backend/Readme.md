# Migrations
Apply migrations on at a time:</br>
npx knex migrate:up --knexfile ./db/Knex.js </br>
Undo last migration: </br>
npx knex migrate:down --knexfile ./db/Knex.js </br>
# Seeds
To create testing countries and categories 1 and 2: </br>
npx knex seed:run --knexfile ./db/Knex.js </br>
These seed files use static ids when posting categories.</br>
This means that the seed should be run immediately after migrating up (there should not be any countries or categories when seeds are applied).