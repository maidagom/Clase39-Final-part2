# Proyecto Frontend - Gestión de Usuarios

Este es el Front-end de una aplicación de gestión de usuarios construida con **React** y **Vite**. Proporciona una interfaz moderna y responsiva para interactuar con una API REST de administración de usuarios.

## 🚀 Tecnologías Utilizadas

- **React 18**: Librería para la construcción de interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos web modernos.
- **CSS3**: Estilos personalizados con diseño responsivo y moderno.
- **Fetch API**: Para la comunicación asíncrona con el Back-end.
- **LocalStorage**: Gestión de tokens de autenticación y sesión de usuario.

## ✨ Características Principales

- **Sistema de Autenticación**: Login y Registro de usuarios con validaciones.
- **Gestión Completa (CRUD)**:
  - **Listar**: Visualización de usuarios en una tabla interactiva.
  - **Crear**: Formulario dedicado para el registro de nuevos usuarios.
  - **Editar**: Modal emergente para la actualización de datos existentes.
  - **Eliminar**: Funcionalidad de borrado con confirmación.
- **Búsqueda en Tiempo Real**: Filtrado de usuarios por nombre o apellido.
- **Paginación**: Navegación fluida entre grandes conjuntos de datos.
- **Diseño Responsivo**: Totalmente adaptado para móviles, tablets y escritorio.

## 📂 Estructura del Proyecto

```text
Front-end/
├── src/
│   ├── components/       # Componentes de React (Lista, Login, Editar, etc.)
│   ├── services/         # Servicios para llamadas a la API
│   ├── styles/           # Archivos de estilos CSS por componente
│   ├── App.jsx           # Componente principal y control de rutas/sesión
│   └── main.jsx          # Punto de entrada de la aplicación
├── public/               # Activos estáticos
└── vite.config.js        # Configuración de Vite
```

## 🛠️ Instalación y Configuración

1. Navega a la carpeta del frontend:
   ```bash
   cd Front-end
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación se abrirá por defecto en `http://localhost:5173`.

## 🔗 Conexión con la API

El frontend está configurado para conectarse a la API en:
`https://clase-3839.vercel.app/users` (configurado en `src/services/usuariosService.js`).

### Servicios disponibles:
- `loginUsuario(email, password)`
- `obtenerUsuarios(busqueda, pagina, limite)`
- `crearUsuario(datos)`
- `actualizarUsuario(id, datos)`
- `eliminarUsuario(id)`

## 📝 Notas de Desarrollo

- **Seguridad**: El token JWT obtenido tras el login se almacena en `localStorage` para persistir la sesión.
- **Validaciones**: Se implementan validaciones tanto en el lado del cliente (campos vacíos, formato de email, edad) como en el servidor.
- **HMR**: Soporte para Hot Module Replacement gracias a Vite para una experiencia de desarrollo ágil.
