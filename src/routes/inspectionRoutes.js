const express = require('express');
const router = express.Router();

console.log("Checking if controller file exists...");
const inspectionController = require('./controllers/inspectionController'); 
console.log("Controller loaded successfully!");

// Test Route to see if the API is even awake
router.get('/test', (req, res) => {
    res.send("Inspection Route is Working!");
});

router.get('/', inspectionController.getAllInspections);
router.post('/', inspectionController.createInspection);
router.delete('/:id', inspectionController.deleteInspection);

module.exports = router;