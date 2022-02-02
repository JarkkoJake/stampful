const express = require('express'),
  router = express.Router(),
  getDropdownController = require('../controllers/getDropdownController'),
  postDropdownController = require("../controllers/postDropdownController");
  putDropdownController = require("../controllers/putDropdownController");

// GET METHODS ------------------------

// get sellers
router.get('/seller', getDropdownController.getSellers);

// get countries
router.get('/country', getDropdownController.getCountries);

// get cat1's under a specific country
router.get('/category1', getDropdownController.getCategories1);

// get cat2's under a specific cat1
router.get('/category2', getDropdownController.getCategories2);

// get cat3's under a specific cat2
router.get('/category3', getDropdownController.getCategories3);

// POST METHODS ---------------

// post new seller, name given in body
router.post("/seller", postDropdownController.postSeller);

// post new country, name given in body
router.post("/country", postDropdownController.postCountry);

// post categories, category name and parents id given in body

router.post("/category1", postDropdownController.postCategory1);

router.post("/category2", postDropdownController.postCategory2);

router.post("/category3", postDropdownController.postCategory3);

// PUT METHODS --------------

// new name and id given in body

router.put("/seller", putDropdownController.editSeller);

router.put("/country", putDropdownController.editCountry);

router.put("/category1", putDropdownController.editCategory1);

router.put("/category2", putDropdownController.editCategory2);

router.put("/category3", putDropdownController.editCategory3);

module.exports.router = router;