const express = require('express');
const { filteredByYear, getAllData }= require('../Controller/index');

//creating a router
const router = express.Router();

//api to get all the data
router.get('/all', getAllData);

// api to get data filtered by year
router.get("/year/:year", filteredByYear)




module.exports = router;