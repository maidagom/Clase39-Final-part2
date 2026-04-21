import { useState } from 'react';
import { crearUsuario } from '../services/usuariosService';
import '../styles/FormularioUsuario.css';

export function FormularioUsuario({ onUsuarioCreado }) {
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
      await crearUsuario(formData);
      setExito(true);
      setFormData({
        usuario: "",
        nombre: "",
        apellido: "",
        edad: "",
        email: "",
        contrasenha: "",
      });
      
      if (onUsuarioCreado) {
        onUsuarioCreado();
      }

      setTimeout(() => setExito(false), 3000);
    } catch (err) {
      setError("Error al crear el usuario. Verifica que el usuario no exista");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="formulario-usuario">
      <h2>Crear Nuevo Usuario</h2>

      {error && <div className="alerta alerta-error">{error}</div>}
      {exito && <div className="alerta alerta-exito">¡Usuario creado correctamente!</div>}

      <form onSubmit={manejarEnvio}>
        <div className="grupo-formulario">
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={manejarCambio}
            placeholder="Ingresa el nombre de usuario"
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
            placeholder="Ingresa tu nombre"
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
            placeholder="Ingresa tu apellido"
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
            placeholder="Ingresa tu edad"
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
            placeholder="Ingresa tu email"
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
            placeholder="Ingresa tu contraseña"
            disabled={cargando}
          />
        </div>

        <button type="submit" disabled={cargando} className="btn-enviar">
          {cargando ? "Creando..." : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
}
