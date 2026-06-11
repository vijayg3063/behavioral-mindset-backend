const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema(
  {
    time: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    choice: { type: String, default: "" },
    mindset: { type: String, default: "" },
    note: { type: String, default: "" },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    userId: { type: String, default: null },
    email: { type: String, default: null },
    finalScore: { type: Number, default: 0 },
    finalProfile: { type: String, default: "" },
    levels: {
      level1: { type: levelSchema, default: () => ({}) },
      level2: { type: levelSchema, default: () => ({}) },
      level3: {
        type: new mongoose.Schema(
          {
            time: { type: Number, default: 0 },
            attempts: { type: Number, default: 0 },
            score: { type: Number, default: 0 },
            choice: { type: String, default: "" },
            mindset: { type: String, default: "" },
            risk: { type: String, default: "" },
            decisionStyle: { type: String, default: "" },
            suggestion: { type: String, default: "" },
          },
          { _id: false }
        ),
        default: () => ({}),
      },
      level4: {
        type: new mongoose.Schema(
          {
            time: { type: Number, default: 0 },
            choice: { type: String, default: "" },
            confidence: { type: String, default: "" },
            score: { type: Number, default: 0 },
            mindset: { type: String, default: "" },
            adaptability: { type: String, default: "" },
            persistence: { type: String, default: "" },
            recoveryStyle: { type: String, default: "" },
            confidenceInsight: { type: String, default: "" },
            suggestion: { type: String, default: "" },
          },
          { _id: false }
        ),
        default: () => ({}),
      },
      level5: {
        type: new mongoose.Schema(
          {
            time: { type: Number, default: 0 },
            choice: { type: String, default: "" },
            riskPreference: { type: String, default: "" },
            priority: { type: String, default: "" },
            confidence: { type: String, default: "" },
            score: { type: Number, default: 0 },
            mindset: { type: String, default: "" },
            riskTolerance: { type: String, default: "" },
            ethicalAwareness: { type: String, default: "" },
            longTermThinking: { type: String, default: "" },
            leadershipStyle: { type: String, default: "" },
            preferenceInsight: { type: String, default: "" },
            suggestion: { type: String, default: "" },
          },
          { _id: false }
        ),
        default: () => ({}),
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);