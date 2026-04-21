import express from "express";
import { crearUsuario, obtenerUsuario, obtenerUsuarios, eliminarUsuario, actualizarUsuario, loginUsuario } from "../controladores/usuariosControlador.js";
import { datos } from "../datos/DatosUsuarios.js";


export const enrutador = express.Router();

// Rutas especiales (deben ir primero)
enrutador.post("/login", loginUsuario);

// Rutas genéricas
enrutador.get("/", obtenerUsuarios);

enrutador.get("/:posicion", obtenerUsuario);

enrutador.post("/", crearUsuario);

enrutador.put("/:posicion", actualizarUsuario);

enrutador.delete("/:posicion", eliminarUsuario);

/*export default enrutador;*/