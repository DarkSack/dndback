import { chatCompletion } from "../../utils/functions.js";
import express from "express";
const router = express.Router();

router.post("/", async function (req, res, next) {
  let prompt = "";
  const type = req.body.type;
  try {
    type === "cv"
      ? (prompt = `Del siguiente texto, que es un texto extraido de un curriculum, quiero que me regreses un json con los siguientes campos en caso de lograr extraerlos, en caso de no lograr obtenerlos solo deja vacio el campo pero aun así devuelvelo
        {
          "fullName": "",
          "title": "",
          "email": "",
          "phone": "",
          "location": "",
          "linkedin": "",
          "github": "",
          "portfolio": "",
          "summary": "",
          "experience": [
            {
              "position": "",
              "company": "",
              "location": "",
              "startDate": "",
              "endDate": "",
              "current": false,
              "description": ""
            }
          ],
          "education": [
            {
              "degree": "",
              "institution": "",
              "location": "",
              "startDate": "",
              "endDate": "",
              "gpa": ""
            }
          ],
          "skills": [""],
          "languages": [
            {
              "language": "",
              "level": "Básico"
            }
          ],
          "certifications": [
            {
              "name": "",
              "issuer": "",
              "date": "",
              "url": ""
            }
          ],
          "projects": [
            {
              "name": "",
              "description": "",
              "technologies": "",
              "url": "",
              "date": ""
            }
          ]
        }

        Ahora extrae la información del siguiente texto, solo devuelveme el JSON, comentarios ni texto adicional:
    ${req.body.prompt}`)
      : (prompt = `Mejora el siguiente contenido profesional para un CV: "${req.body.prompt}". Necesito que solo devuelvas el contenido mejorado, sin agregar nada más, en un formato limpio.`);
    const response =
      type === "cv"
        ? await chatCompletion(prompt)
        : await chatCompletion(prompt, true);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
