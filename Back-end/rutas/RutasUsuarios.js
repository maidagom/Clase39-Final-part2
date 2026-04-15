import express from "express";
import { crearUsuario, obtenerUsuario, obtenerUsuarios } from "../controladores/usuariosControlador.js";
import { datos } from "../datos/DatosUsuarios.js";


export const enrutador = express.Router();

enrutador.get("/", obtenerUsuarios);

enrutador.get("/:posicion", obtenerUsuario);

enrutador.post("/", crearUsuario);

/*export default enrutador;*/