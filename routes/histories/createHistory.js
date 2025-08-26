import express from "express";
const router = express.Router();
import { chatCompletion } from "../../utils/functions.js";
import { createHistory } from "../../utils/prompts.js";
import { validateError } from "../../utils/functions.js";

router.post("/", async function (req, res, next) {
  try {
    const response = await chatCompletion(createHistory);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(validateError(error).status)
      .json({ error: validateError(error).error });
  }
});
export default router;
