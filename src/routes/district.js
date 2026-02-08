const express = require('express');
const router = express.Router();
const { Village, Commune, District, Province } = require('../../models');

// 1. GET all districts (with Province info)
router.get('/', async (req, res) => {
  try {
    const districts = await District.findAll({
      include: [{ model: Province, attributes: ['province_en', 'province_kh'] }]
    });
    res.json(districts);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. POST bulk create districts (FOR BIG UPLOADS)
router.post('/bulk', async (req, res) => {
  try {
    const districts = await District.bulkCreate(req.body);
    res.status(201).json({ 
      success: true, 
      count: districts.length,
      message: "Districts uploaded successfully" 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 3. POST single district
router.post('/', async (req, res) => {
  try {
    const district = await District.create(req.body);
    res.status(201).json({ success: true, data: district });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 4. PUT update district
router.put('/:district_code', async (req, res) => {
  try {
    await District.update(req.body, {
      where: { district_code: req.params.district_code }
    });
    res.json({ success: true, message: "District updated" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 5. DELETE district
router.delete('/:district_code', async (req, res) => {
  try {
    await District.destroy({
      where: { district_code: req.params.district_code }
    });
    res.json({ success: true, message: "District deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;