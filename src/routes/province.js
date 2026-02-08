const express = require('express');
const router = express.Router();
const { Village, Commune, District, Province } = require('../../models');

// 1. GET all provinces
router.get('/', async (req, res) => {
  try {
    const provinces = await Province.findAll();
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. POST create a province (CRITICAL for fixing your FK error)
router.post('/', async (req, res) => {
  try {
    const newProvince = await Province.create(req.body);
    res.status(201).json({ success: true, data: newProvince });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 3. PUT update a province
router.put('/:province_code', async (req, res) => {
  try {
    await Province.update(req.body, {
      where: { province_code: req.params.province_code }
    });
    res.json({ success: true, message: "Province updated" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST bulk create provinces
router.post('/bulk', async (req, res) => {
  try {
    // req.body should be an Array of objects
    const provinces = await Province.bulkCreate(req.body);
    res.status(201).json({ 
      success: true, 
      message: `${provinces.length} provinces uploaded successfully`,
      data: provinces 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
// 4. DELETE a province
router.delete('/:province_code', async (req, res) => {
  try {
    await Province.destroy({
      where: { province_code: req.params.province_code }
    });
    res.json({ success: true, message: "Province deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;