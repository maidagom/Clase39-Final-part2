import { useState, useEffect } from 'react';
import { obtenerUsuarios, eliminarUsuario } from '../services/usuariosService';
import { EditarUsuario } from './EditarUsuario';
import '../styles/ListaUsuarios.css';

export function ListaUsuarios({ onRefresh }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [usuarioEnEdicion, setUsuarioEnEdicion] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, [pagina, onRefresh]);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await obtenerUsuarios(busqueda, pagina, 10);
      setUsuarios(datos.usuariosFiltrados);
      setTotalPaginas(datos.totalPaginas);
    } catch (err) {
      setError("Error al cargar los usuarios");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };

  const manejarEliminar = async (usuarioNombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${usuarioNombre}?`)) {
      try {
        await eliminarUsuario(usuarioNombre);
        cargarUsuarios();
        alert("Usuario eliminado correctamente");
      } catch (err) {
        alert("Error al eliminar el usuario");
        console.error(err);
      }
    }
  };

  const manejarEditar = (usuario) => {
    console.log("=== CLICK EN EDITAR ===");
    console.log("Objeto recibido:", usuario);
    console.log("usuario.usuario:", usuario.usuario);
    console.log("usuario._id:", usuario._id);
    console.log("Keys del objeto:", Object.keys(usuario));
    setUsuarioEnEdicion(usuario);
  };

  const manejarActualizacion = () => {
    setUsuarioEnEdicion(null);
    cargarUsuarios();
  };

  const manejarCancelar = () => {
    setUsuarioEnEdicion(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagina(1);
      cargarUsuarios();
    }, 800);
    
    return () => clearTimeout(timer);
  }, [busqueda]);

  if (cargando && usuarios.length === 0) {
    return <div className="cargando">Cargando usuarios...</div>;
  }

  return (
    <div className="lista-usuarios">
      <h2>Lista de Usuarios</h2>
      
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar por nombre o apellido..."
          value={busqueda}
          onChange={manejarBusqueda}
          className="input-busqueda"
        />
      </div>

      {error && <div className="error">{error}</div>}

      {usuarios.length === 0 && !cargando && (
        <div className="sin-resultados">No se encontraron usuarios</div>
      )}

      {usuarios.length > 0 && (
        <>
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td>{usuario.usuario}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.edad}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => manejarEditar(usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => manejarEliminar(usuario.usuario)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="paginacion">
            <button
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
              className="btn-paginacion"
            >
              Anterior
            </button>
            <span>Página {pagina} de {totalPaginas}</span>
            <button
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(pagina + 1)}
              className="btn-paginacion"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
      
      {usuarioEnEdicion && (
        <EditarUsuario 
          usuario={usuarioEnEdicion}
          onActualizado={manejarActualizacion}
          onCancelar={manejarCancelar}
        />
      )}
    </div>
  );
}
