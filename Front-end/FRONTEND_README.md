# Sistema de Gestión de Usuarios - Front-end

Este es el Front-end de una aplicación de gestión de usuarios construida con **React** y **Vite**, que consume una API REST del Back-end.

## 🚀 Características

- ✅ Listar todos los usuarios con paginación
- ✅ Buscar usuarios por nombre o apellido
- ✅ Crear nuevos usuarios
- ✅ Eliminar usuarios
- ✅ Interfaz responsiva y moderna
- ✅ Manejo de errores integrado

## 📋 Requisitos Previos

- Node.js v16+ instalado
- npm o yarn
- El Back-end ejecutándose en `http://localhost:3000`

## 🔧 Instalación

1. Navega a la carpeta del Front-end:
```bash
cd Front-end
```

2. Instala las dependencias:
```bash
npm install
```

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── FormularioUsuario.jsx    # Componente para crear usuarios
│   └── ListaUsuarios.jsx         # Componente para listar usuarios
├── services/
│   └── usuariosService.js        # Servicio de API (llamadas HTTP)
├── styles/
│   ├── FormularioUsuario.css     # Estilos del formulario
│   └── ListaUsuarios.css         # Estilos de la lista
├── App.jsx                       # Componente principal
├── App.css                       # Estilos globales
└── main.jsx                      # Punto de entrada
```

## 🔗 Endpoints de la API

El Front-end consume los siguientes endpoints del Back-end:

- **GET** `/users` - Obtener todos los usuarios (con búsqueda y paginación)
  - Query params: `busqueda`, `pagina`, `limite`
- **GET** `/users/:usuario` - Obtener un usuario específico
- **POST** `/users` - Crear un nuevo usuario
- **PUT** `/users/:usuario` - Actualizar un usuario
- **DELETE** `/users/:usuario` - Eliminar un usuario

## 🎨 Tecnologías Utilizadas

- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **CSS3** - Estilos de la interfaz
- **Fetch API** - Comunicación con el Back-end

## ⚙️ Configuración Importante

El Front-end está configurado para conectarse al Back-end en:
```
http://localhost:3000
```

Si tu Back-end está en otro puerto, edita el archivo `src/services/usuariosService.js` y cambia la variable `API_URL`.

## 📝 Notas Importantes

1. Asegúrate de que el Back-end esté ejecutándose antes de iniciar el Front-end
2. El Back-end debe tener CORS habilitado (ya está configurado)
3. La aplicación usa paginación de 10 usuarios por página por defecto
4. Las búsquedas son case-insensitive

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Failed to fetch"
- Verifica que el Back-end esté ejecutándose en puerto 3000
- Comprueba que CORS esté habilitado en el servidor

### Puerto 5173 en uso
```bash
npm run dev -- --port 3001
```

## 🎯 Funcionalidades Implementadas

### 1️⃣ Servicio de API (`usuariosService.js`)
- ✅ `obtenerUsuarios()` - GET con búsqueda y paginación
- ✅ `obtenerUsuario()` - GET de usuario específico
- ✅ `crearUsuario()` - POST para crear
- ✅ `actualizarUsuario()` - PUT para actualizar
- ✅ `eliminarUsuario()` - DELETE para eliminar
- ✅ Manejo de errores en todas las funciones

### 2️⃣ Componente: Formulario de Usuario
**FormularioUsuario.jsx**
- ✅ Campos: usuario, nombre, apellido, email, contraseña
- ✅ Validación básica de datos
- ✅ Estado de carga durante el envío
- ✅ Mensajes de éxito/error
- ✅ Limpieza de formulario después de crear
- ✅ Callback para actualizar lista de usuarios

### 3️⃣ Componente: Lista de Usuarios
**ListaUsuarios.jsx**
- ✅ Tabla con información de usuarios
- ✅ Búsqueda por nombre o apellido
- ✅ Paginación (10 usuarios por página)
- ✅ Botón para eliminar usuarios con confirmación
- ✅ Estados de carga y error
- ✅ Actualización automática después de crear usuario
- ✅ Interfaz responsiva

### 4️⃣ Estilos Profesionales
- ✅ Diseño moderno con gradiente
- ✅ Componentes con sombras y redondeado
- ✅ Botones interactivos con hover
- ✅ Tabla bien formateada
- ✅ Responsive design (mobile-friendly)
- ✅ Colores coherentes
## 🔌 Flujo de Datos

```
┌─────────────────────────────────┐
│      INTERFAZ DE USUARIO        │
│  (React Components en el        │
│   navegador)                    │
└────────────┬────────────────────┘
             │
             ↓ Fetch API HTTP
┌─────────────────────────────────┐
│   usuariosService.js            │
│  (Funciones helper para API)    │
└────────────┬────────────────────┘
             │
             ↓ HTTP requests
┌─────────────────────────────────┐
│   Back-end Express.js           │
│   Puerto: 3000                  │
│   /users endpoints              │
└────────────┬────────────────────┘
             │
             ↓ Mongoose queries
┌─────────────────────────────────┐
│   MongoDB Database              │
│   Colección: usuarios           │
└─────────────────────────────────┘
```

### Operaciones Disponibles

| Operación | Cómo hacerlo |
|-----------|-------------|
| **Ver usuarios** | Automático al cargar la página |
| **Crear usuario** | Llena el formulario y haz clic en "Crear Usuario" |
| **Buscar usuario** | Escribe en el campo de búsqueda |
| **Paginar** | Usa los botones "Anterior" y "Siguiente" |
| **Eliminar usuario** | Haz clic en el botón "Eliminar" en la fila |

## 🎨 Estructura de Componentes

```jsx
<App>
  ├── <header>
  │   └── Título y descripción
  ├── <main>
  │   ├── <FormularioUsuario>
  │   │   ├── Input usuario
  │   │   ├── Input nombre
  │   │   ├── Input apellido
  │   │   ├── Input email
  │   │   ├── Input contraseña
  │   │   └── Botón Crear
  │   └── <ListaUsuarios>
  │       ├── Campo de búsqueda
  │       ├── Tabla de usuarios
  │       └── Controles de paginación
  └── <footer>
      └── Información de derechos
```

