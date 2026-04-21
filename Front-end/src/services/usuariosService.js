const API_URL = "https://clase-3839.vercel.app";

// Obtener todos los usuarios con filtros opcionales
export async function obtenerUsuarios(busqueda = "", pagina = 1, limite = 10) {
  try {
    const params = new URLSearchParams();
    if (busqueda) params.append("busqueda", busqueda);
    params.append("pagina", pagina);
    params.append("limite", limite);

    const respuesta = await fetch(`${API_URL}?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error("Error al obtener usuarios");
    }

    const datos = await respuesta.json();
    console.log("=== DATOS DEL BACKEND ===");
    console.log("Respuesta completa:", datos);
    if (datos.usuariosFiltrados && datos.usuariosFiltrados.length > 0) {
      console.log("Primer usuario:", datos.usuariosFiltrados[0]);
      console.log("Campos disponibles:", Object.keys(datos.usuariosFiltrados[0]));
    }
    return datos;
  } catch (error) {
    console.error("Error en obtenerUsuarios:", error);
    throw error;
  }
}

// Obtener un usuario por nombre
export async function obtenerUsuario(usuario) {
  try {
    const respuesta = await fetch(`${API_URL}/${usuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error("Error al obtener el usuario");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error en obtenerUsuario:", error);
    throw error;
  }
}

// Crear un nuevo usuario
export async function crearUsuario(datosUsuario) {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    });

    if (!respuesta.ok) {
      throw new Error("Error al crear el usuario");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error en crearUsuario:", error);
    throw error;
  }
}

// Actualizar un usuario
export async function actualizarUsuario(usuario, datosActualizados) {
  try {
    const respuesta = await fetch(`${API_URL}/${usuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.detalles || datos.error || "Error al actualizar el usuario");
    }

    return datos;
  } catch (error) {
    console.error("Error en actualizarUsuario:", error);
    throw error;
  }
}

// Eliminar un usuario
export async function eliminarUsuario(usuario) {
  try {
    const respuesta = await fetch(`${API_URL}/${usuario}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error en eliminarUsuario:", error);
    throw error;
  }
}

// Login de usuario
export async function loginUsuario(email, contrasenha) {
  try {
    const respuesta = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, contrasenha }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.detalles || datos.error || "Error al hacer login");
    }

    // Guardar token en localStorage
    if (datos.token) {
      localStorage.setItem("token", datos.token);
      localStorage.setItem("usuario", datos.usuario);
      localStorage.setItem("email", datos.email);
      console.log("✓ Token guardado en localStorage");
    }

    return datos;
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw error;
  }
}
