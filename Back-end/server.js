import express from "express";
import cors from "cors";
import { enrutador } from "./rutas/RutasUsuarios.js";
import conectar from "./config/Basedatos.js";

const server = express();

server.use(cors());
server.use(express.json());

conectar();

server.use("/users", enrutador);

server.listen(3000, () => {
    console.log("servidor Funcionando desde el puerto 3000");
    
});
