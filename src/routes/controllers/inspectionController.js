// Step 1: Log that the file is being loaded
console.log("🔍 Controller Loading: inspectionController.js");

const { Inspection, Factory } = require('../../../models'); 

// Step 2: Test if Models are imported correctly
if (!Inspection || !Factory) {
    console.error("❌ ERROR: Models (Inspection or Factory) not found! Check your path.");
} else {
    console.log("✅ Models loaded successfully in Controller.");
}

exports.getAllInspections = async (req, res) => {
    console.log("GET Request: Fetching all inspections...");
    try {
        const data = await Inspection.findAll({
            include: [{ 
                model: Factory, 
                attributes: ['factoryEn', 'factoryKh'] 
            }],
            order: [['inspection_date', 'DESC']]
        });
        res.status(200).json(data);
    } catch (error) {
        console.error("❌ GET Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.createInspection = async (req, res) => {
    // Step 3: Log the data coming from Postman
    console.log("📥 POST Request Received!");
    console.log("Body Content:", JSON.stringify(req.body, null, 2));

    try {
        const data = await Inspection.create(req.body);
        console.log("🚀 Success: Record created with ID:", data.id);
        res.status(201).json(data);
    } catch (error) {
        console.error("❌ POST Error (Database/Validation):", error.message);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteInspection = async (req, res) => {
    console.log(`🗑️ DELETE Request for ID: ${req.params.id}`);
    try {
        const deleted = await Inspection.destroy({ where: { id: req.params.id } });
        if (deleted) {
            console.log("✅ Record deleted successfully.");
            res.status(200).json({ message: "Deleted" });
        } else {
            console.log("⚠️ Delete failed: ID not found.");
            res.status(404).json({ message: "Record not found" });
        }
    } catch (error) {
        console.error("❌ DELETE Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};