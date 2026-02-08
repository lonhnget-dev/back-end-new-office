const express = require('express');
const router = express.Router();
// Change this line:
const locationController = require('./controllers/locationController');

router.get('/provinces', locationController.getProvinces);
router.get('/districts/:province_code', locationController.getDistricts);
router.get('/communes/:district_code', locationController.getCommunes);
router.get('/villages/:commune_code', locationController.getVillages);

module.exports = router;