const Result = require("../models/Result");

async function getReport(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const result = await Result.findOne({ userId }).sort({ createdAt: -1 });

      if (!result) {
        return res.status(404).json({ error: "No report found for this user" });
      }

      return res.json({ report: result });
    }

    const reports = await Result.find().sort({ createdAt: -1 }).limit(10);
    return res.json({ reports });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getReport,
};