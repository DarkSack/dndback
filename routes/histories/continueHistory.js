import express from "express";
const router = express.Router();
import { chatCompletion } from "../../utils/functions.js";
import { validateError } from "../../utils/functions.js";

router.post("/", async function (req, res, next) {
  const { resumen, jugadores, ultima_accion } = req.body;
  // Validación de campos requeridos
  if (!resumen || !jugadores || !ultima_accion) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  const createHistory = `Aquí está el estado actual de la historia de rol:
  - Resumen hasta ahora: ${resumen}
  - Jugadores involucrados: ${jugadores}
  - Última acción del jugador: ${ultima_accion}
  Con base en eso, genera:
  {
    descripcion_del_resultado: "",
    cambios_en_la_historia: "",
    eventos_ocurridos: [],
    oportunidades_o_peligros_nuevos: [],
    dialogo_npc: "",
    resumen_actualizado: ""
  }`;

  try {
    const response = await chatCompletion(createHistory);
    res.status(200).json({ response });
  } catch (error) {
    res
      .status(validateError(error).status)
      .json({ error: validateError(error).error });
  }
});

export default router;
