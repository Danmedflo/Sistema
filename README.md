# FinControl - Sistema de Gestión de Gastos

## Descripción

FinControl es una aplicación web desarrollada con React y Vite para la gestión de ingresos, gastos y reportes financieros personales. El sistema permite registrar usuarios, iniciar sesión, administrar transacciones, visualizar reportes y controlar la información financiera desde un panel principal.

El proyecto también implementa herramientas modernas de desarrollo como Docker, GitHub Actions para integración continua, Vercel para despliegue continuo y GitHub Issues para el seguimiento de tareas.

---

## URL del sistema desplegado

https://sistema-eight-blue.vercel.app

---

## Funcionalidades principales

* Registro de usuarios.
* Inicio de sesión.
* Rutas protegidas para usuarios autenticados.
* Dashboard principal.
* Registro de ingresos y gastos.
* Edición de transacciones.
* Eliminación de transacciones.
* Categorías predefinidas.
* Categoría personalizada al registrar una transacción.
* Reportes financieros.
* Perfil de usuario.
* Configuración de tema claro y oscuro.
* Diseño responsive para escritorio, tablet y celular.
* Menú hamburguesa funcional en vista móvil.

---

## Tecnologías utilizadas

* React
* Vite
* JavaScript
* Supabase
* React Router
* Chart.js
* Styled Components
* Docker
* GitHub Actions
* Vercel
* GitHub Issues

---

## Instalación del proyecto

Clonar el repositorio:

```bash
git clone https://github.com/Danmedflo/Sistema.git
```

Entrar a la carpeta del proyecto:

```bash
cd Sistema
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

Compilar el proyecto para producción:

```bash
npm run build
```

Ejecutar revisión de código:

```bash
npm run lint
```

---

## Variables de entorno

El proyecto utiliza Supabase como servicio de autenticación y base de datos.

Crear un archivo `.env` en la raíz del proyecto tomando como referencia el archivo `.env.example`.

Ejemplo:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
```

Por seguridad, el archivo `.env` no se sube al repositorio.

---

## Docker

El proyecto cuenta con soporte para Docker mediante los archivos:

```txt
Dockerfile
.dockerignore
```

Construir la imagen Docker:

```bash
docker build -t sistema-financiero .
```

Ejecutar el contenedor:

```bash
docker run -p 3000:80 sistema-financiero
```

Abrir en el navegador:

```txt
http://localhost:3000
```

Docker permite ejecutar la aplicación en un contenedor, evitando problemas de configuración entre diferentes equipos.

---

## Integración continua

El proyecto utiliza GitHub Actions para validar automáticamente el código cada vez que se realiza un push o pull request hacia la rama principal.

El workflow se encuentra en:

```txt
.github/workflows/ci.yml
```

El pipeline ejecuta:

```bash
npm ci
npm run lint
npm run build
```

Esto permite detectar errores de instalación, revisión de código o compilación antes de considerar válido un cambio.

---

## Despliegue continuo

El sistema fue desplegado en Vercel.

Configuración utilizada:

* Framework: Vite
* Build Command: npm run build
* Output Directory: dist
* Variables de entorno configuradas en Vercel

Cada vez que se realiza un push a la rama principal, Vercel genera automáticamente un nuevo despliegue.

---

## Sistema de tickets

Se utilizó GitHub Issues para registrar, controlar y cerrar tareas del proyecto.

Tickets trabajados:

1. Agregar Docker al proyecto React + Vite.
2. Configurar integración continua con GitHub Actions.
3. Configurar despliegue continuo del sistema.
4. Actualizar README del proyecto.

Cada ticket contiene una descripción, tareas, prioridad y estado. Al finalizar cada implementación, se agregó un comentario de cierre con el resultado obtenido.

---

## Mejoras responsive

Se optimizaron los estilos globales del proyecto para mejorar la experiencia en diferentes dispositivos.

Mejoras realizadas:

* Adaptación del login y registro para celular.
* Ajuste responsive del dashboard.
* Corrección del menú hamburguesa.
* Sidebar funcional en vista móvil.
* Cierre del menú al tocar fuera o cambiar de ruta.
* Tablas con desplazamiento horizontal en pantallas pequeñas.
* Modales adaptados para celular.
* Mejoras en tema claro y oscuro.
* Uso de variables CSS para colores, bordes, sombras y fondos.

---

## Estado actual del proyecto

El proyecto se encuentra funcional, desplegado y documentado. Actualmente cuenta con autenticación, registro de usuarios, gestión de transacciones, reportes, diseño responsive, Docker, integración continua, despliegue continuo y seguimiento de tareas mediante tickets.
