const express = require('express');
const PDFDocument = require('pdfkit');
const { MotorHealthData, Equipment } = require('../models');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken);

// Generate PDF report for equipment performance
router.get('/equipment/:equipmentId', authorizeRoles('admin', 'technician', 'customer'), async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const { startDate, endDate } = req.query;

    const equipment = await Equipment.findByPk(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    // Fetch motor health data within date range
    const where = { equipmentId };
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp['$gte'] = new Date(startDate);
      if (endDate) where.timestamp['$lte'] = new Date(endDate);
    }

    const data = await MotorHealthData.findAll({
      where,
      order: [['timestamp', 'ASC']],
    });

    // Create PDF document
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="equipment_${equipmentId}_report.pdf"`);

    doc.pipe(res);

    doc.fontSize(20).text(`Performance Report for ${equipment.name}`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Report generated on: ${new Date().toLocaleString()}`);
    doc.moveDown();

    // Table header
    doc.font('Helvetica-Bold');
    doc.text('Timestamp', 50, doc.y, { continued: true });
    doc.text('Parameters', 200, doc.y);
    doc.font('Helvetica');
    doc.moveDown();

    // Data rows
    data.forEach((entry) => {
      doc.text(new Date(entry.timestamp).toLocaleString(), 50, doc.y, { continued: true });
      doc.text(JSON.stringify(entry.parameterData), 200, doc.y);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF report' });
  }
});

module.exports = router;
