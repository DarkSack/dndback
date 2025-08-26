import express from "express";
const router = express.Router();
import supabase from "../../utils/supabase.js";

router.post("/", async function (req, res, next) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    // Validar campos requeridos
    const characterData = req.body;

    if (!characterData.nombre) {
      return res
        .status(400)
        .json({ error: "El nombre del personaje es obligatorio" });
    }

    // Insertar en la base de datos
    const { data, error } = await supabase
      .from("characters")
      .insert(characterData)
      .select();

    if (error) {
      console.error("Error de Supabase:", error);
      return res.status(400).json({
        error: error.message || "Error desconocido",
      });
    }

    return res.status(201).json({
      character: data[0],
    });
  } catch (error) {
    console.error("Error interno:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;
