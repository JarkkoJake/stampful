// model for auctions
const countryDb = require("../db/country");
const sellerDb = require("../db/seller");
const category1Db = require("../db/category1");
const category2Db = require("../db/category2");
const category3Db = require("../db/category3");
const moment = require("moment");

class Auction {
  constructor (data) {
    this.startingPrice = data.startingPrice || null;
    this.sellingPrice = data.sellingPrice || null;
    this.currency = data.currency || null;
    this.seller = data.seller || null;
    this.sellingYear = data.sellingYear || null;
    this.description = data.description || null;
    this.catalogueNumber = data.catalogueNumber || null;
    this.country = data.country || null;
    this.category1 = data.category1 || null;
    this.category2 = data.category2 || null;
    this.category3 = data.category3 || null;

    // boolean validation
    this.used = data.used === true;
    this.mint = data.mint === true;
    this.postalItem = data.postalItem === true;
    this.certificate = data.certificate === true;

    this.auctionNumber = data.auctionNumber || null;
    this.lotNumber = data.lotNumber || null;
    this.date = moment().format("DD-MM-YYYY");
    this.user = data.user || null;
  }
  static listModel = {
    id: "id",
    startingPrice: "startingPrice",
    sellingPrice: "sellingPrice",
    currency: "currency",
    seller: "seller",
    sellingYear: "sellingYear",
    thumbnail: "thumbnail",
    date: "date",
    description: "description",
    catalogueNumber: "catalogueNumber",
    country: "country",
    category1: "category1",
    category2: "category2",
    category3: "category3",
    used: "used",
    mint: "mint",
    postalItem: "postalItem",
    certificate: "certificate",
    auctionNumber: "auctionNumber",
    lotNumber: "lotNumber",
    date: "date",
    user: "user",
  };

  // used to check if the auction is assigned a country, seller or category that does not exist
  async invalidCategories() {

    // return true if country doesn't exist
    if (! await this.validate(this.country, countryDb)) {
      return true;
    }

    // return true if seller doesn't exist
    if (! await this.validate(this.seller, sellerDb)) {
      return true;
    }

    // return true if cat1 doesn't exist
    if (! await this.validate(this.category1, category1Db)) {
      return true;
    }

    // return true if cat2 doesn't exist
    if (! await this.validate(this.category2, category2Db)) {
      return true;
    }

    // return true if cat3 doesn't exist
    if (! await this.validate(this.category3, category3Db)) {
      return true;
    }

    // check for category hierarchy
    if (this.category1 == null) {
      if (this.category2 != null || this.category3 != null) return true;
    }
    if (this.category2 == null && this.category3 != null) return true;

    return false;
  }

  // checks if an id exists in db, return true is exists, false if not
  async validate (id, db) {
    var count;
    if (id != null) {
      count = await db.getCount(id);
      if (count[0]["count(*)"] < 1) {
        return false;
      }
    }
    return true;
  }
}

module.exports = {
  Auction: Auction
};