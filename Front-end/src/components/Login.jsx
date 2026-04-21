import { useState } from 'react';
import { loginUsuario, crearUsuario } from '../services/usuariosService';
import '../styles/Login.css';

export function Login({ onLoginExitoso }) {
  const [modo, setModo] = useState('login'); // 'login' o 'registro'
  const [formData, setFormData] = useState({
    // Para login
    email: "",
    contrasenha: "",
    // Para registro
    usuario: "",
    nombre: "",
    apellido: "",
    edad: "",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(null);

    // Validación básica
    if (!formData.email || !formData.contrasenha) {
      setError("Email y contraseña son obligatorios");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Email inválido");
      return;
    }

    try {
      setCargando(true);
      
      console.log("=== INICIANDO LOGIN ===");
      console.log("Email:", formData.email);
      
      const respuesta = await loginUsuario(formData.email, formData.contrasenha);
      
      console.log("✓ Login exitoso");
      console.log("Token:", respuesta.token);
      console.log("Usuario:", respuesta.usuario);
      
      setExito("¡Login exitoso!");
      
      setTimeout(() => {
        if (onLoginExitoso) {
          onLoginExitoso(respuesta);
        }
      }, 1000);
    } catch (err) {
      const mensajeError = err.message || "Error desconocido al hacer login";
      setError(mensajeError);
      console.error("Error completo:", err);
    } finally {
      setCargando(false);
    }
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(null);

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
      
      console.log("=== REGISTRANDO USUARIO ===");
      
      await crearUsuario({
        usuario: formData.usuario,
        nombre: formData.nombre,
        apellido: formData.apellido,
        edad: parseInt(formData.edad),
        email: formData.email,
        contrasenha: formData.contrasenha,
      });
      
      console.log("✓ Usuario registrado correctamente");
      setExito("¡Usuario registrado! Ahora puedes iniciar sesión");
      
      setTimeout(() => {
        setModo('login');
        setFormData({
          usuario: "",
          nombre: "",
          apellido: "",
          edad: "",
          email: "",
          contrasenha: "",
        });
        setExito(null);
      }, 2000);
    } catch (err) {
      const mensajeError = err.message || "Error al registrar el usuario";
      setError(mensajeError);
      console.error("Error completo:", err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="tabs-container">
          <button 
            className={`tab ${modo === 'login' ? 'active' : ''}`}
            onClick={() => {
              setModo('login');
              setError(null);
              setExito(null);
            }}
            disabled={cargando}
          >
            Iniciar Sesión
          </button>
          <button 
            className={`tab ${modo === 'registro' ? 'active' : ''}`}
            onClick={() => {
              setModo('registro');
              setError(null);
              setExito(null);
            }}
            disabled={cargando}
          >
            Registrarse
          </button>
        </div>

        {error && <div className="alerta alerta-error">{error}</div>}
        {exito && <div className="alerta alerta-exito">{exito}</div>}

        {modo === 'login' ? (
          <form onSubmit={manejarLogin} className="formulario-login">
            <h2>Iniciar Sesión</h2>

            <div className="grupo-formulario">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={manejarCambio}
                placeholder="correo@example.com"
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

            <button 
              type="submit" 
              className="btn-submit"
              disabled={cargando}
            >
              {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>
        ) : (
          <form onSubmit={manejarRegistro} className="formulario-registro">
            <h2>Crear Cuenta</h2>

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
                placeholder="Tu nombre"
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
                placeholder="Tu apellido"
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
                placeholder="Tu edad (1-120)"
                disabled={cargando}
                min="1"
                max="120"
              />
            </div>

            <div className="grupo-formulario">
              <label htmlFor="email-reg">Email:</label>
              <input
                type="email"
                id="email-reg"
                name="email"
                value={formData.email}
                onChange={manejarCambio}
                placeholder="correo@example.com"
                disabled={cargando}
              />
            </div>

            <div className="grupo-formulario">
              <label htmlFor="contrasenha-reg">Contraseña:</label>
              <input
                type="password"
                id="contrasenha-reg"
                name="contrasenha"
                value={formData.contrasenha}
                onChange={manejarCambio}
                placeholder="Crea una contraseña"
                disabled={cargando}
              />
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={cargando}
            >
              {cargando ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
