import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    message: "D&D Backend API",
    title: "Express",
    status: "running",
    endpoints: [
      "/users",
      "/auth/login",
      "/auth/register",
      "/characters/create",
      "/characters/summon",
      "/histories/create",
      "/histories/continue",
      "/room/create",
      "/extras/improveField",
    ],
  });
});

export default router;
