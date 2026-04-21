import { Usuario } from "../modelos/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function obtenerUsuarios(req, res) {
    //const datos = await Usuario.find();

    const { busqueda, pagina = 1, limite = 10 } = req.query;
    const consulta = {};
    if (busqueda) {
        consulta.$or = [
            { nombre: { $regex: busqueda, $options: 'i' } },
            { apellido: { $regex: busqueda, $options: 'i' } }
        ]
    }

    //paginación de datos del usuario:
    const pageNumber = parseInt(pagina, 10) || 1;
    const limitNumber = parseInt(limite, 20) || 20;
    const salto = (pageNumber - 1) * limitNumber;

    //res.send(datos);

    const datosFiltrados = await Usuario.find(consulta).skip(salto).limit(limitNumber).sort({ createdat: -1 });
    const total = await Usuario.countDocuments(consulta);
    
    console.log("=== OBTENER USUARIOS (Backend) ===");
    console.log("Usuarios encontrados:", datosFiltrados.length);
    if (datosFiltrados.length > 0) {
        console.log("Primer usuario completo:", datosFiltrados[0]);
        console.log("Campos del primer usuario:", Object.keys(datosFiltrados[0].toObject ? datosFiltrados[0].toObject() : datosFiltrados[0]));
    }
    
    res.status(200).json({
        totalUsuariosFiltrados: total,
        pagina: pageNumber,
        limite: limitNumber,
        totalPaginas: Math.ceil(total / limitNumber),
        usuariosFiltrados: datosFiltrados
    })
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

export async function actualizarUsuario(req, res) {
    let usuarioActualizar = req.params.posicion;
    const datosActualizados = req.body;
    
    // Remover espacios en blanco
    usuarioActualizar = usuarioActualizar.trim();
    
    console.log("===== ACTUALIZAR USUARIO =====");
    console.log("ID/Usuario a buscar:", `"${usuarioActualizar}"`);
    console.log("Datos recibidos:", datosActualizados);
    
    try {
        // Primero intentar buscar por _id (si es un ObjectId válido)
        let usuarioActual = null;
        let usoBusquedaPorId = false;
        
        // Validar si es un ObjectId válido
        if (usuarioActualizar.match(/^[0-9a-fA-F]{24}$/)) {
            console.log("Buscando por _id...");
            usuarioActual = await Usuario.findById(usuarioActualizar);
            usoBusquedaPorId = true;
            
            if (usuarioActual) {
                console.log("✓ Usuario encontrado por _id:", usuarioActual.usuario);
            }
        }
        
        // Si no encontró por _id, buscar por el campo 'usuario'
        if (!usuarioActual) {
            console.log("Buscando por campo 'usuario'...");
            usuarioActual = await Usuario.findOne({ usuario: usuarioActualizar });
            
            if (usuarioActual) {
                console.log("✓ Usuario encontrado por campo usuario:", usuarioActual.usuario);
            }
        }
        
        // Si aún no encuentra, intenta búsqueda insensible a mayúsculas
        if (!usuarioActual) {
            console.log("Intentando búsqueda insensible a mayúsculas...");
            usuarioActual = await Usuario.findOne({ 
                usuario: { $regex: `^${usuarioActualizar}$`, $options: 'i' }
            });
            
            if (usuarioActual) {
                console.log("✓ Usuario encontrado (búsqueda insensible):", usuarioActual.usuario);
            }
        }
        
        // Si sigue sin encontrar, error
        if (!usuarioActual) {
            console.log("❌ Usuario no encontrado");
            const todosUsuarios = await Usuario.find({}, { usuario: 1, _id: 1 }).limit(5);
            console.log("Primeros 5 usuarios en BD:", todosUsuarios);
            
            return res.status(404).json({
                error: "Usuario no encontrado",
                busquedaPor: usuarioActualizar,
                detalles: `No se encontró usuario con id/nombre "${usuarioActualizar}"`
            });
        }
        
        // Verificar si el nuevo email ya existe en otro usuario
        if (datosActualizados.email && datosActualizados.email !== usuarioActual.email) {
            const emailExistente = await Usuario.findOne({ 
                email: datosActualizados.email,
                _id: { $ne: usuarioActual._id }
            });
            
            if (emailExistente) {
                console.log("Email ya existe:", datosActualizados.email);
                return res.status(400).json({
                    error: "El email ya está registrado",
                    detalles: "Este email ya está siendo usado por otro usuario"
                });
            }
        }
        
        // Verificar si el nuevo usuario ya existe en otro documento
        if (datosActualizados.usuario && datosActualizados.usuario !== usuarioActual.usuario) {
            const usuarioExistente = await Usuario.findOne({ 
                usuario: datosActualizados.usuario,
                _id: { $ne: usuarioActual._id }
            });
            
            if (usuarioExistente) {
                console.log("Usuario ya existe:", datosActualizados.usuario);
                return res.status(400).json({
                    error: "El usuario ya existe",
                    detalles: "Este nombre de usuario ya está registrado"
                });
            }
        }
        
        // Si la contraseña fue modificada, encriptarla
        if (datosActualizados.contrasenha) {
            try {
                console.log("Encriptando nueva contraseña...");
                datosActualizados.contrasenha = await bcrypt.hash(datosActualizados.contrasenha, 10);
                console.log("✓ Contraseña encriptada");
            } catch (hashError) {
                console.error("Error al encriptar contraseña:", hashError);
                return res.status(500).json({
                    error: "Error al procesar la contraseña",
                    detalles: hashError.message
                });
            }
        }
        
        // Actualizar el usuario por _id
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            usuarioActual._id,
            { $set: datosActualizados },
            { new: true, runValidators: false }
        );
        
        console.log("✓ Usuario actualizado exitosamente:", usuarioActualizado.usuario);
        console.log("=============================");
        
        res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuarioActualizado
        });
    } catch (error) {
        console.error("❌ Error al actualizar usuario:", error.message);
        console.error("Stack:", error.stack);
        console.log("=============================");
        res.status(500).json({
            error: "Error al actualizar el usuario",
            detalles: error.message
        });
    }
}

export async function eliminarUsuario(req, res) {
    const usuarioEliminar = req.params.posicion
    await Usuario.deleteOne({usuario: usuarioEliminar})
    res.status(200).json({
        mensaje: "Usuario eliminado",
        usuario_id: usuarioEliminar
    });
}

export async function loginUsuario(req, res) {
    const Usuariologin = req.body;
    const { contrasenha, email } = Usuariologin;
    
    console.log("===== LOGIN USUARIO =====");
    console.log("Email:", email);
    console.log("Contraseña ingresada:", contrasenha);
    
    try {
        // Validar que lleguen los datos requeridos
        if (!email || !contrasenha) {
            return res.status(400).json({
                error: "Email y contraseña son requeridos",
                detalles: "Proporciona email y contrasenha"
            });
        }
        
        // Buscar el usuario por email
        const usuarioEncontrado = await Usuario.findOne({ email });
        
        if (!usuarioEncontrado) {
            console.log("❌ Usuario no encontrado con email:", email);
            return res.status(404).json({
                error: "Usuario no encontrado",
                detalles: "No existe usuario con ese email"
            });
        }
        
        console.log("✓ Usuario encontrado:", usuarioEncontrado.usuario);
        console.log("Contraseña almacenada (encriptada):", usuarioEncontrado.contrasenha);
        console.log("Longitud contraseña almacenada:", usuarioEncontrado.contrasenha.length);
        
        // Comparar la contraseña encriptada
        console.log("Comparando contraseñas con bcrypt...");
        const contrasenhaValida = await bcrypt.compare(contrasenha, usuarioEncontrado.contrasenha);
        
        console.log("Resultado de bcrypt.compare:", contrasenhaValida);
        
        if (!contrasenhaValida) {
            console.log("❌ Contraseña incorrecta para:", email);
            console.log("Contraseña ingresada:", contrasenha);
            console.log("Contraseña en BD:", usuarioEncontrado.contrasenha);
            return res.status(401).json({
                error: "Contraseña incorrecta",
                detalles: "Las credenciales no son válidas"
            });
        }
        
        console.log("✓ Contraseña correcta");
        
        // Generar JWT Token
        const token = jwt.sign(
            { 
                id: usuarioEncontrado._id,
                usuario: usuarioEncontrado.usuario,
                email: usuarioEncontrado.email
            },
            process.env.JWT_SECRET || "tu_clave_super_segura_2026_mongodb_usuarios",
            { expiresIn: "24h" }
        );
        
        console.log("✓ Token JWT generado");
        console.log("=============================");
        
        res.status(200).json({
            mensaje: "Usuario logueado",
            usuario: usuarioEncontrado.usuario,
            email: usuarioEncontrado.email,
            token: token
        });
        
    } catch (error) {
        console.error("❌ Error al hacer login:", error.message);
        console.error("Stack completo:", error);
        console.log("=============================");
        res.status(500).json({
            error: "Error al realizar el login",
            detalles: error.message
        });
    }
}