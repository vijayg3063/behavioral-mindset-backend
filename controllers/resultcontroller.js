const jwt = require("jsonwebtoken");

const Result = require("../models/Result");

function readToken(req) {
  const header = req.headers.authorization || "";
  const [, token] = header.split(" ");
  return token || null;
}

function readUserContext(req) {
  const token = readToken(req);
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
  } catch (error) {
    return null;
  }
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function saveResult(req, res) {
  try {
    const authUser = readUserContext(req);
    const body = req.body || {};

    const level1 = body.levels?.level1 || {};
    const level2 = body.levels?.level2 || {};
    const level3 = body.levels?.level3 || {};
    const level4 = body.levels?.level4 || {};
    const level5 = body.levels?.level5 || {};

    const result = await Result.create({
      userId: authUser?.userId || body.userId || null,
      email: authUser?.email || body.email || null,
      finalScore: toNumber(body.finalScore),
      finalProfile: body.finalProfile || "",
      levels: {
        level1: {
          time: toNumber(level1.time),
          attempts: toNumber(level1.attempts),
          score: toNumber(level1.score),
        },
        level2: {
          time: toNumber(level2.time),
          attempts: toNumber(level2.attempts),
          score: toNumber(level2.score),
        },
        level3: {
          time: toNumber(level3.time),
          attempts: toNumber(level3.attempts),
          score: toNumber(level3.score),
          choice: level3.choice || "",
          mindset: level3.mindset || "",
          risk: level3.risk || "",
          decisionStyle: level3.decisionStyle || "",
          suggestion: level3.suggestion || "",
        },
        level4: {
          time: toNumber(level4.time),
          choice: level4.choice || "",
          confidence: level4.confidence || "",
          score: toNumber(level4.score),
          mindset: level4.mindset || "",
          adaptability: level4.adaptability || "",
          persistence: level4.persistence || "",
          recoveryStyle: level4.recoveryStyle || "",
          confidenceInsight: level4.confidenceInsight || "",
          suggestion: level4.suggestion || "",
        },
        level5: {
          time: toNumber(level5.time),
          choice: level5.choice || "",
          riskPreference: level5.riskPreference || "",
          priority: level5.priority || "",
          confidence: level5.confidence || "",
          score: toNumber(level5.score),
          mindset: level5.mindset || "",
          riskTolerance: level5.riskTolerance || "",
          ethicalAwareness: level5.ethicalAwareness || "",
          longTermThinking: level5.longTermThinking || "",
          leadershipStyle: level5.leadershipStyle || "",
          preferenceInsight: level5.preferenceInsight || "",
          suggestion: level5.suggestion || "",
        },
      },
    });

    return res.status(201).json({
      message: "Result saved successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
 } 
} 
module.exports = {
     saveResult, 

};