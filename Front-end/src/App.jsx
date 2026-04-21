import { useState, useEffect } from 'react'
import { ListaUsuarios } from './components/ListaUsuarios'
import { Login } from './components/Login'
import './App.css'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)

  // Verificar si hay usuario autenticado al cargar
  useEffect(() => {
    const token = localStorage.getItem('token')
    const usuario = localStorage.getItem('usuario')
    const email = localStorage.getItem('email')

    if (token && usuario) {
      setUsuarioAutenticado({
        usuario,
        email,
        token
      })
      console.log("✓ Usuario autenticado:", usuario)
    }
  }, [])

  const handleLoginExitoso = (datosLogin) => {
    setUsuarioAutenticado({
      usuario: datosLogin.usuario,
      email: datosLogin.email,
      token: datosLogin.token
    })
    // Refrescar la lista después del login
    setRefreshKey(prev => prev + 1)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('email')
    setUsuarioAutenticado(null)
    console.log("✓ Sesión cerrada")
  }

  // Si no hay usuario autenticado, mostrar login
  if (!usuarioAutenticado) {
    return <Login onLoginExitoso={handleLoginExitoso} />
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>Gestión de Usuarios</h1>
            <p>Sistema de administración de usuarios conectado con MongoDB</p>
          </div>
          <div className="user-info">
            <span>Bienvenido, <strong>{usuarioAutenticado.usuario}</strong></span>
            <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="contenedor">
          <ListaUsuarios key={refreshKey} onRefresh={refreshKey} />
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Gestión de Usuarios. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
