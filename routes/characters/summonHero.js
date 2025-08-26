import { chatCompletion } from "../../utils/functions.js";
import { summonHero } from "../../utils/prompts.js";
import express from "express";
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const response = await chatCompletion(summonHero);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
