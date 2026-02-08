const express = require('express');
const router = express.Router();
const { Village, Commune, District, Province } = require('../../models');

// 1. GET all communes (Nested with District and Province)
router.get('/', async (req, res) => {
  try {
    const communes = await Commune.findAll({
      include: [
        { 
          model: District, 
          attributes: ['district_en', 'district_kh'],
          include: [{ model: Province, attributes: ['province_en', 'province_kh'] }]
        }
      ]
    });
    res.json(communes);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. POST bulk create communes (Optimized for large lists)
router.post('/bulk', async (req, res) => {
  try {
    // This allows you to send hundreds of communes at once
    const communes = await Commune.bulkCreate(req.body);
    res.status(201).json({ 
      success: true, 
      count: communes.length,
      message: "Communes uploaded successfully" 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 3. POST single commune
router.post('/', async (req, res) => {
  try {
    const commune = await Commune.create(req.body);
    res.status(201).json({ success: true, data: commune });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 4. PUT update commune
router.put('/:commune_code', async (req, res) => {
  try {
    await Commune.update(req.body, {
      where: { commune_code: req.params.commune_code }
    });
    res.json({ success: true, message: "Commune updated" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 5. DELETE commune
router.delete('/:commune_code', async (req, res) => {
  try {
    await Commune.destroy({
      where: { commune_code: req.params.commune_code }
    });
    res.json({ success: true, message: "Commune deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;