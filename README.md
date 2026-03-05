# ⚽ Frontend Alquiler Cancha

Aplicación frontend desarrollada con React + Vite para gestión de reservas de canchas y tienda deportiva con carrito y pago 🛒💳.

## 🛠️ Tecnologías

- React 19
- Vite 8
- React Router
- React Bootstrap + Bootstrap Icons
- React Hook Form
- SweetAlert2

## 🚀 Funcionalidades principales

- Registro e inicio de sesión de usuarios 👤
- Protección de rutas para panel de administración 🔐
- Gestión de productos (listar, crear, editar, eliminar) 📦
- Tienda con categorías y carrito persistido en `localStorage` 🛍️
- Flujo de pago desde carrito (integración con backend de pagos) 💳
- Gestión de reservas de canchas 🗓️
- Gestión de usuarios (cambio de rol y estado) 👥

## ✅ Requisitos

- Node.js 18+ (recomendado)
- Backend de API corriendo (usuarios, productos, canchas)
- Backend de pagos corriendo (checkout)

## 🌍 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_PAGOS=http://localhost:3000/api/pagos
```

Notas 📝:

- `VITE_API_URL` se usa para productos, usuarios y reservas.
- `VITE_API_PAGOS` se usa para crear la orden del carrito.

## ▶️ Instalación y ejecución

```bash
npm install
npm run dev
```

La app se levanta por defecto en `http://localhost:5173` 🌐.

## 📜 Scripts disponibles

- `npm run dev`: entorno de desarrollo
- `npm run build`: build de producción
- `npm run preview`: previsualizar build
- `npm run lint`: ejecutar ESLint

## 🧭 Rutas principales

### 🌐 Públicas

- `/` Inicio
- `/tienda` Tienda
- `/carrito` Carrito
- `/contacto` Contacto
- `/nosotros` Quiénes somos
- `/registro` Registro
- `/login` Login

### 🔒 Protegidas (admin)

Requieren sesión y rol `admin`:

- `/administrador` Panel administrador
- `/administrador/crear` Crear producto
- `/administrador/editar/:id` Editar producto
- `/admin/productos` Administración de productos
- `/admin/reservas` Administración de reservas
- `/admin/usuarios` Administración de usuarios
- `/reserva` Crear reserva

## 🗂️ Estructura del proyecto

```text
frontend-alquilerCancha/
|-- .env
|-- .env.example
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- vite.config.js
|-- public/
|   |-- argentina.jpg
|   |-- cancha11.jpg
|   |-- canchas.jpg
|   |-- canchas3.jpg
|   |-- error404-bg.jpg
|   |-- fondo.jpg
|   |-- formu.jpg
|   |-- fulbito5.jpg
|   |-- futbol11.jpg
|   |-- futbol7.jpg
|   |-- kitentrenamiento1.jpg
|   |-- login-bg.jpeg
|   |-- logo-navbar.png
|   |-- noche.jpg
|   |-- pelotafutbol2.jpg
|   `-- img/
|       |-- basilio.jpeg
|       |-- corina.jpeg
|       |-- gaston.jpeg
|       |-- joni.jpeg
|       |-- logo2.png
|       |-- lucas.jpeg
|       `-- vale.jpeg
`-- src/
    |-- App.jsx
    |-- Contacto.css
    |-- index.css
    |-- main.jsx
    |-- helpers/
    |   |-- queries.js
    |   `-- queriesPagos.js
    `-- components/
        |-- pages/
        |   |-- Administrador.jsx
        |   |-- AdminProductos.css
        |   |-- AdminProductos.jsx
        |   |-- AdminReservas.css
        |   |-- AdminReservas.jsx
        |   |-- AdminUsuarios.css
        |   |-- AdminUsuarios.jsx
        |   |-- BienvenidaInicio.jsx
        |   |-- CanchasSeccion.jsx
        |   |-- CardCarrito.jsx
        |   |-- Carrito.css
        |   |-- Carrito.jsx
        |   |-- CarrouselInicio.jsx
        |   |-- Contacto.jsx
        |   |-- DetalleProducto.jsx
        |   |-- Error404.css
        |   |-- Error404.jsx
        |   |-- FormularioProducto.jsx
        |   |-- Galeria.jsx
        |   |-- Inicio.jsx
        |   |-- Login.jsx
        |   |-- MisReservas.jsx
        |   |-- ProductosInicio.jsx
        |   |-- QuienesSomos.jsx
        |   |-- Registro.jsx
        |   |-- ReservarCancha.jsx
        |   |-- Sponsors.jsx
        |   |-- Tienda.jsx
        |   |-- VerificarCuenta.jsx
        |   `-- VerificarError.jsx
        |-- routes/
        |   `-- ProtectorRutas.jsx
        `-- shared/
            |-- Footer.jsx
            `-- Menu.jsx
```
## 💾 Estado local y sesión

- `sessionStorage["usuarioKey"]`: sesión del usuario autenticado (token, rol, uid)
- `localStorage["carritoKey"]`: productos del carrito

## 📌 Observaciones

- El frontend depende de respuestas del backend para autenticación, productos, reservas y pagos.
- Si una ruta protegida no tiene token o no tiene rol admin, redirige a login o inicio.

