import { Usuario } from "../modelos/Usuario.js";
/*import { datos } from "../datos/DatosUsuarios.js";*/



export async function obtenerUsuarios(req, res) {
    const datos = await Usuario.find();
    res.send(datos);
}

export async function obtenerUsuario(req, res) {
    const pos = req.params.posicion
    const dato = await Usuario.find({usuario: pos})
    res.send(dato);
}
  
export async function crearUsuario(req, res) {
    const nuevoUsuario = req.body
    const dato = new Usuario(nuevoUsuario);
    const resguardada = await dato.save();
    res.status(201).json({
        mensaje: "Usuario creado",
        resguardada
    });
}