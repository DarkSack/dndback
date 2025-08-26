import supabase from "../../utils/supabase.js";
import { validateError, emailRegex } from "../../utils/functions.js";
import express from "express";
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email no válido" });
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(validateError(error).error);
    }
    if (!data.user || !data.session) {
      return res.status(500).json({ error: "No se pudo iniciar sesión" });
    }
    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    const user = {
      id: data.user.id,
      email: data.user.email,
      username: userData?.username,
      avatar_url: userData?.avatar_url,
    };

    return res.status(200).json({
      user,
      token: data.session.access_token,
    });
  } catch (error) {
    return res.status(validateError(error).status).json({ error: error.message });
  }
});

export default router;
