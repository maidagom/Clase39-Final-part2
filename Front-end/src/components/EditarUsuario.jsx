import { useState, useEffect } from 'react';
import { actualizarUsuario } from '../services/usuariosService';
import '../styles/EditarUsuario.css';

export function EditarUsuario({ usuario, onActualizado, onCancelar }) {
  const [usuarioOriginal, setUsuarioOriginal] = useState(null);
  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    apellido: "",
    edad: "",
    email: "",
    contrasenha: "",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (usuario) {
      console.log("=== EDITARUSUARIO - USEEFFECT ===");
      console.log("Objeto usuario recibido:", usuario);
      console.log("Tiene campo usuario?:", usuario.usuario);
      console.log("Tiene campo _id?:", usuario._id);
      console.log("Todos los campos:", {
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        edad: usuario.edad,
        email: usuario.email,
        contrasenha: usuario.contrasenha,
        _id: usuario._id
      });
      
      // Si no tiene campo "usuario", lo agregamos del objeto
      const usuarioIdentificador = usuario.usuario || usuario._id || Object.keys(usuario)[0];
      
      console.log("Usuario identificador usado:", usuarioIdentificador);
      
      setUsuarioOriginal(usuario.usuario || usuarioIdentificador);
      setFormData({
        usuario: usuario.usuario || usuarioIdentificador || "",
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        edad: usuario.edad || "",
        email: usuario.email || "",
        contrasenha: usuario.contrasenha || "",
      });
      setError(null);
      setExito(false);
    }
  }, [usuario]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(false);

    // Validación básica
    if (!formData.usuario || !formData.nombre || !formData.apellido || !formData.edad || !formData.email || !formData.contrasenha) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (isNaN(formData.edad) || formData.edad < 1 || formData.edad > 120) {
      setError("La edad debe ser un número válido entre 1 y 120");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Email inválido");
      return;
    }

    try {
      setCargando(true);
      
      const datosParaEnviar = {
        usuario: formData.usuario,
        nombre: formData.nombre,
        apellido: formData.apellido,
        edad: parseInt(formData.edad),
        email: formData.email,
        contrasenha: formData.contrasenha
      };
      
      console.log("=== ENVIANDO ACTUALIZACIÓN ===");
      console.log("Usuario original (búsqueda):", usuarioOriginal);
      console.log("Datos a actualizar:", datosParaEnviar);
      
      await actualizarUsuario(usuarioOriginal, datosParaEnviar);
      setExito(true);
      
      setTimeout(() => {
        setExito(false);
        if (onActualizado) {
          onActualizado();
        }
      }, 1500);
    } catch (err) {
      const mensajeError = err.message || "Error desconocido al actualizar el usuario";
      setError(mensajeError);
      console.error("Error completo:", err);
    } finally {
      setCargando(false);
    }
  };

  if (!usuario) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <div className="modal-header">
          <h2>Editar Usuario: {usuarioOriginal}</h2>
          <button className="btn-cerrar" onClick={onCancelar}>✕</button>
        </div>

        {error && <div className="alerta alerta-error">{error}</div>}
        {exito && <div className="alerta alerta-exito">¡Usuario actualizado correctamente!</div>}

        <form onSubmit={manejarEnvio}>
          <div className="grupo-formulario">
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={manejarCambio}
              placeholder="Nombre de usuario"
              disabled={cargando}
            />
          </div>

          <div className="grupo-formulario">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={manejarCambio}
              placeholder="Ingresa el nombre"
              disabled={cargando}
            />
          </div>

          <div className="grupo-formulario">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={manejarCambio}
              placeholder="Ingresa el apellido"
              disabled={cargando}
            />
          </div>

          <div className="grupo-formulario">
            <label htmlFor="edad">Edad:</label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={formData.edad}
              onChange={manejarCambio}
              placeholder="Ingresa la edad"
              min="1"
              max="120"
              disabled={cargando}
            />
          </div>

          <div className="grupo-formulario">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={manejarCambio}
              placeholder="Ingresa el email"
              disabled={cargando}
            />
          </div>

          <div className="grupo-formulario">
            <label htmlFor="contrasenha">Contraseña:</label>
            <input
              type="password"
              id="contrasenha"
              name="contrasenha"
              value={formData.contrasenha}
              onChange={manejarCambio}
              placeholder="Ingresa la contraseña"
              disabled={cargando}
            />
          </div>

          <div className="botones-modal">
            <button 
              type="button" 
              className="btn-cancelar" 
              onClick={onCancelar}
              disabled={cargando}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-guardar"
              disabled={cargando}
            >
              {cargando ? "Actualizando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
