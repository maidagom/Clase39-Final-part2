# Guía de Configuración - Front-end y Back-end

## 🔌 Conexión Front-end ↔ Back-end

### ✅ Back-end (Ya configurado)
- Puerto: `3000`
- CORS: Habilitado
- URL base de API: `http://localhost:3000`

### ✅ Front-end (Recién configurado)
- Puerto: `5173` (Vite)
- API URL: `http://localhost:3000/users`
- Archivos creados:
  - `src/services/usuariosService.js` - Servicio de comunicación con API
  - `src/components/FormularioUsuario.jsx` - Formulario para crear usuarios
  - `src/components/ListaUsuarios.jsx` - Tabla con lista de usuarios
  - `src/styles/FormularioUsuario.css` - Estilos del formulario
  - `src/styles/ListaUsuarios.css` - Estilos de la tabla
  - `src/App.jsx` (Actualizado) - Componente principal integrado

## 🚀 Pasos para Ejecutar

### 1. Terminal 1 - Ejecutar Back-end
```bash
cd Back-end
npm run dev
# Deberías ver: "servidor Funcionando desde el puerto 3000"
```

### 2. Terminal 2 - Ejecutar Front-end
```bash
cd Front-end
npm install  # Solo si no has instalado antes
npm run dev
# Deberías ver: "VITE v5.x.x  ready in XXX ms"
# y "Local: http://localhost:5173"
```

### 3. Abrir en navegador
- Ve a: `http://localhost:5173`
- Deberías ver el formulario para crear usuarios y la tabla de usuarios

## 📝 Flujo de la Aplicación

1. **Cargar página** → Se cargan automáticamente los usuarios existentes
2. **Llenar formulario** → Ingresa datos del nuevo usuario
3. **Crear usuario** → Se envía al Back-end (`POST /users`)
4. **Actualizar lista** → Se recarga automáticamente la tabla
5. **Buscar usuarios** → Escribe en el buscador para filtrar
6. **Paginar** → Navega entre páginas de usuarios
7. **Eliminar usuario** → Haz clic en botón Eliminar

## 🔍 Verificar Funcionamiento

### ✅ Test 1: Crear Usuario
1. Completa el formulario con datos válidos
2. Haz clic en "Crear Usuario"
3. Deberías ver un mensaje de éxito
4. El usuario aparecerá en la tabla

### ✅ Test 2: Buscar Usuario
1. Escribe un nombre en el buscador
2. La tabla se filtrará automáticamente
3. Verifica que muestre solo los usuarios que coinciden

### ✅ Test 3: Eliminar Usuario
1. Haz clic en el botón "Eliminar" de cualquier usuario
2. Confirma la acción
3. El usuario desaparecerá de la tabla

### ✅ Test 4: Paginación
1. Si hay más de 20 usuarios, verás botones de paginación
2. Navega entre páginas con los botones "Anterior" y "Siguiente"

## 🐛 Solución de Problemas

### Problema: "CORS policy error"
**Solución:** El Back-end no tiene CORS habilitado
```bash
# En Back-end/server.js, verifica:
import cors from "cors";
server.use(cors());
```

### Problema: "Cannot GET /users"
**Solución:** El Back-end no está ejecutándose
```bash
# Reinicia el Back-end:
cd Back-end
npm run dev
```

### Problema: La lista de usuarios está vacía
**Solución:** 
1. Verifica que la base de datos de MongoDB esté conectada
2. Crea algunos usuarios primero usando el formulario
3. Revisa la consola del navegador (F12) para errores

### Problema: El formulario no responde
**Solución:**
1. Abre la consola (F12)
2. Verifica que no haya errores de JavaScript
3. Comprueba que el Back-end esté ejecutándose

## 📊 Detalles Técnicos

### Servicio de API (usuariosService.js)
```javascript
// Ejemplos de uso:
import { obtenerUsuarios, crearUsuario, eliminarUsuario } from './services/usuariosService'

// Obtener usuarios
const datos = await obtenerUsuarios(busqueda, pagina, limite)

// Crear usuario
await crearUsuario({ usuario, nombre, apellido, email, contraseña })

// Eliminar usuario
await eliminarUsuario(nombreUsuario)
```

### Estados Manejados en Componentes
- `cargando` - Mientras se obtienen datos
- `error` - Si hay algún error en la petición
- `exito` - Después de crear un usuario exitosamente
- `pagina` - Control de paginación
