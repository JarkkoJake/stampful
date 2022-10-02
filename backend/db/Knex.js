const connectedKnex = {
  client: "sqlite3",
  connection: {
    filename: "../stamp_auction_db.sqlite3"
  },
  useNullAsDefault: true,
};
module.exports = connectedKnex;