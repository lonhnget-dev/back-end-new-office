// You now need to go up three levels to reach the root 'models' folder
const { Province, District, Commune, Village } = require('../../../models');
// Get all Provinces
exports.getProvinces = async (req, res) => {
    try {
        const data = await Province.findAll({ order: [['province_en', 'ASC']] });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Districts by Province Code
exports.getDistricts = async (req, res) => {
    try {
        const data = await District.findAll({ 
            where: { province_code: req.params.province_code },
            order: [['district_en', 'ASC']] 
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Communes by District Code
exports.getCommunes = async (req, res) => {
    try {
        const data = await Commune.findAll({ 
            where: { district_code: req.params.district_code },
            order: [['commune_en', 'ASC']] 
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Villages by Commune Code
exports.getVillages = async (req, res) => {
    try {
        const data = await Village.findAll({ 
            where: { commune_code: req.params.commune_code },
            order: [['village_en', 'ASC']] 
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};