import cookieParser from "cookie-parser";
import logger from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import express from "express";

const plugins = [
  { plugin: logger, options: "dev" }, // sin objeto, puedes pasar string directo
  { plugin: express.json },
  { plugin: express.urlencoded, options: { extended: false } },
  { plugin: cookieParser },
  {
    plugin: rateLimit,
    options: { windowMs: 15 * 60 * 1000, max: 100 },
  },
  {
    plugin: cors,
    options: {
      origin: "*",
      methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  },
];

export default plugins;
