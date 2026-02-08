const express = require('express');
const router = express.Router();
const { Village, Commune, District, Province } = require('../../models');

// 1. GET all villages (with full location hierarchy)
router.get('/', async (req, res) => {
  try {
    const villages = await Village.findAll({
      include: [
        {
          model: Commune,
          attributes: ['commune_en', 'commune_kh'],
          include: [{
            model: District,
            attributes: ['district_en', 'district_kh'],
            include: [{ model: Province, attributes: ['province_en', 'province_kh'] }]
          }]
        }
      ]
    });
    res.json(villages);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. POST bulk create villages (For large data uploads)
router.post('/bulk', async (req, res) => {
  try {
    const villages = await Village.bulkCreate(req.body);
    res.status(201).json({ 
      success: true, 
      count: villages.length,
      message: "Villages uploaded successfully" 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 3. POST single village
router.post('/', async (req, res) => {
  try {
    const village = await Village.create(req.body);
    res.status(201).json({ success: true, data: village });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 4. PUT update village
router.put('/:village_code', async (req, res) => {
  try {
    const { village_code } = req.params;
    await Village.update(req.body, {
      where: { village_code: village_code }
    });
    res.json({ success: true, message: "Village updated" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 5. DELETE village
router.delete('/:village_code', async (req, res) => {
  try {
    const { village_code } = req.params;
    await Village.destroy({
      where: { village_code: village_code }
    });
    res.json({ success: true, message: "Village deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;