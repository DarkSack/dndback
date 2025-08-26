import supabase from "../../utils/supabase.js";
import { validateError, emailRegex } from "../../utils/functions.js";
import express from "express";
const router = express.Router();

router.post("/", async function (req, res, next) {
  // Extraer y validar datos del body
  const { email, password, username, id } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña requeridos" });
  }

  // Validaciones adicionales
  if (password.length < 6) {
    return res.status(400).json({
      error: "La contraseña debe tener al menos 6 caracteres",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email no válido" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(validateError(error).error);
    }
    const userData = {
      id,
      username,
      email,
      avatar_url: "",
    };

    const { error: userError } = await supabase.from("users").insert(userData);

    if (userError) {
      throw new Error(validateError(userError).error);
    }

    return res.status(200).json({
      user: data.user,
      token: data.session.access_token ?? null,
    });
  } catch (error) {
    return res.status(validateError(error).status).json({ error: error.message });
  }
});
export default router;
