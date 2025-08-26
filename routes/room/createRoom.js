import express from "express";
const router = express.Router();
import { validateError } from "../../utils/functions.js";
import supabase from "../../utils/supabase.js";

router.post("/", async function (req, res, next) {
  // Validar que el body existe y no está vacío
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const roomData = req.body;
    const { data, error } = await supabase
      .from("rooms")
      .insert(roomData)
      .select();

    if (error) {
      console.error("Error de Supabase:", error);
      return res.status(400).json({
        error: error.message || "Error desconocido",
      });
    }

    return res.status(201).json({ message: "Sala creada exitosamente" });
  } catch (error) {
    res
      .status(validateError(error).status)
      .json({ error: validateError(error).error });
  }
});
export default router;
