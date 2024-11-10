# NodePop

NodePop es un proyecto de servicio de venta de artículos de segunda mano con SSR (Server-Side Rendering) usando EJS, donde los usuarios pueden publicar y buscar productos. Este proyecto incluye autenticación de usuarios, CRUD de productos y paginación.

## Requisitos Previos

- **Node.js**: Versión 14 o superior.
- **MongoDB**: Debes tener una instancia de MongoDB en ejecución y conectada a `mongodb://127.0.0.1:27017/nodepop`.

## Dependencias

Las principales dependencias usadas en este proyecto son:
- `express`: para manejar rutas y peticiones HTTP.
- `mongoose`: para modelar los datos en MongoDB.
- `express-session` y `connect-mongo`: para manejar las sesiones de usuario.
- `bcrypt`: para cifrar contraseñas de usuario.

## Configuración Inicial

1. **Instalar Dependencias**  
   Ejecuta el siguiente comando para instalar todas las dependencias:
   ```js
   npm install
   ```
Inicializar la Base de Datos
Para preparar la base de datos con datos iniciales y vaciar cualquier dato anterior:
ella

```js
npm run initDB
```

Esto creará algunos usuarios de ejemplo y productos iniciales.
Usuarios de prueba
Se han predefinido algunos usuarios en el archivo initDB.js:

Usuario 1 :
Nombre de usuario:megabox
Correo:megabox@example.com
Contraseña:1234
Usuario 2 :
Nombre de usuario:altex
Correo:altex@example.com
Contraseña:1234
Usuario 3 :
Nombre de usuario:megaiamgen
Correo:megaiamgen@example.com
Contraseña:1234
Puedes usar estos usuarios para realizar pruebas de autenticación y acceso a los productos.

Ejecución:
Para iniciar el proyecto, puedes usar uno de los siguientes modos:

Modo de producción :
```js
npm start
```
Modo Desarrollo:

```js
npm run dev
```

```js
El proyecto se ejecutará en: "http://localhost:3100"
```


```js
Funcionalidades
```

1. Inicio de Sesión : 
   Los usuarios deben iniciar sesión para crear, ver y borrar productos.
2. Publicación de Productos: 
   Los productos incluyen campos como nombre, precio, imagen y etiquetas.
3. Paginación : 
   La lista de productos se muestra con un límite de 3 productos por página.
4. Filtro de Etiquetas : Los productos se pueden etiquetar con valores específicos como work, lifestyle, motoro mobile.
Paginación
5. En la vista principal de productos, puedes navegar a través de las páginas de productos usando los enlaces 
```js
"Anterior" y "Siguiente".
```


