const express = require('express');
const router = express.Router();
const { Factory, Province, District, Commune, Village } = require('../../models');

// Helper to keep the "include" list consistent and clean
const locationIncludes = [
    { model: Province, attributes: ['province_kh', 'province_en'] },
    { model: District, attributes: ['district_kh', 'district_en'] },
    { model: Commune, attributes: ['commune_kh', 'commune_en'] },
    { model: Village, attributes: ['village_kh', 'village_en'] }
];

// 1. GET ALL FACTORIES
router.get('/', async (req, res) => {
    try {
        const factories = await Factory.findAll({ include: locationIncludes });
        res.status(200).json(factories);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching data", error: error.message });
    }
});

// 2. GET ONE FACTORY BY ID
router.get('/:id', async (req, res) => {
    try {
        const factory = await Factory.findByPk(req.params.id, { include: locationIncludes });
        
        if (!factory) {
            return res.status(404).json({ success: false, message: "Factory not found" });
        }
        
        res.status(200).json(factory);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. CREATE NEW FACTORY
router.post('/', async (req, res) => {
    try {
        // Simple 'if' check to see if body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "No data provided" });
        }

        const factory = await Factory.create(req.body);
        res.status(201).json({ success: true, data: factory });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// 4. UPDATE FACTORY
router.put('/:id', async (req, res) => {
    try {
        const [updatedRows] = await Factory.update(req.body, {
            where: { id: req.params.id }
        });

        // Use 'if' to check if anything actually changed
        if (updatedRows === 0) {
            return res.status(404).json({ success: false, message: "Factory not found or no changes made" });
        }

        const updatedFactory = await Factory.findByPk(req.params.id);
        res.json({ success: true, data: updatedFactory });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// 5. DELETE FACTORY
router.delete('/:id', async (req, res) => {
    try {
        const deletedRows = await Factory.destroy({
            where: { id: req.params.id }
        });

        if (!deletedRows) {
            return res.status(404).json({ success: false, message: "Factory not found" });
        }

        res.json({ success: true, message: "Factory deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;