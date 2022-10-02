/* Used for connecting the database */
const connectionKnex = {
  client: "sqlite3",
  connection: {
    filename: "./stamp_auction_db.sqlite3"
  },
  useNullAsDefault: true,
};

module.exports = connectionKnex;