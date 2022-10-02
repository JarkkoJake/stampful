/* Used for migrations */
const migrationKnex = {
  client: "sqlite3",
  connection: {
    filename: "../stamp_auction_db.sqlite3"
  },
  useNullAsDefault: true,
};

module.exports = migrationKnex;