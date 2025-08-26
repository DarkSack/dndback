import { Groq } from "groq-sdk";
import express from "express";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateError = (error) => {
  if (!error) return { error: "Error desconocido", status: 500 };

  if (
    error.code === "invalid_login_credentials" ||
    error.code === "invalid_credentials"
  ) {
    return { error: "Credenciales inválidas", status: 401 };
  }

  if (error.message.includes("Email not confirmed")) {
    return { error: "Confirma tu email primero", status: 403 };
  }

  if (error.message.includes("Too many requests")) {
    return { error: "Demasiados intentos", status: 429 };
  }

  return {
    error: error.message || "Error desconocido",
    status: error.status || 500,
  };
};

/**
 * Limpia el texto de una respuesta de la IA quitando los delimitadores
 * de bloques de c digo y los espacios en blanco iniciales y finales.
 *
 * @param {string} responseText - El texto a limpiar
 * @returns {object} El objeto JSON resultante de parsear el texto limpio.
 * @throws {SyntaxError} Si el texto no se puede parsear como JSON.
 */
export function cleanJsonIA(responseText) {
  const clean = responseText.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch (err) {
    console.error("Error al hacer JSON.parse:", clean);
    throw err;
  }
}

/**
 * Utiliza el modelo de lenguaje Groq para completar un texto
 * dados algunos mensajes de contexto.
 *
 * @param {string} prompt - El texto a completar
 * @returns {string} - Un string con la respuesta del modelo.
 * @throws {Error} Si Groq devuelve un error.
 */
async function chatCompletion(prompt, json = true) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
  const responseText = response.choices[0].message.content;
  return json ? cleanJsonIA(responseText) : responseText;
}

const router = express.Router();

export { validateError, emailRegex, chatCompletion, router };
