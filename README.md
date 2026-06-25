# Sistema de Gestión de Gastos - FinControl

## Descripción del proyecto

FinControl es una aplicación web desarrollada con React y Vite que permite gestionar ingresos, gastos y reportes financieros personales. El sistema permite registrar transacciones, editar movimientos, eliminar registros y visualizar información financiera desde un dashboard.

El proyecto también incorpora herramientas modernas de desarrollo como Docker, integración continua con GitHub Actions, sistema de tickets mediante GitHub Issues y despliegue continuo con Vercel.

---

## Funcionalidades principales

* Registro de usuario.
* Inicio de sesión.
* Dashboard principal.
* Registro de ingresos y gastos.
* Edición de transacciones.
* Eliminación de transacciones.
* Categorías predefinidas.
* Categoría personalizada al registrar una transacción.
* Reportes financieros.
* Perfil de usuario.
* Configuración visual.
* Rutas protegidas para usuarios autenticados.

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

---

## Instalación del proyecto

Para instalar las dependencias del proyecto, ejecutar:

```bash
npm install
```

Para iniciar el proyecto en modo desarrollo:

```bash
npm run dev
```

Para compilar el proyecto para producción:

```bash
npm run build
```

Para ejecutar la revisión de código:

```bash
npm run lint
```

---

## Variables de entorno

El proyecto utiliza variables de entorno para conectarse con Supabase.

Crear un archivo `.env` en la raíz del proyecto tomando como referencia el archivo `.env.example`.

Ejemplo:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
```

Por seguridad, el archivo `.env` no se sube al repositorio.

---

## Uso de Docker

El proyecto cuenta con soporte para Docker mediante los archivos:

```txt
Dockerfile
.dockerignore
```

Para construir la imagen Docker:

```bash
docker build -t sistema-financiero .
```

Para ejecutar el contenedor:

```bash
docker run -p 3000:80 sistema-financiero
```

Luego abrir en el navegador:

```txt
http://localhost:3000
```

Docker permite ejecutar el proyecto en un contenedor, evitando problemas de configuración entre diferentes equipos.

---

## Sistema de tickets

Se utilizó GitHub Issues para registrar y controlar las tareas pendientes del proyecto.

Tickets implementados:

1. Agregar Docker al proyecto React + Vite.
2. Configurar integración continua con GitHub Actions.
3. Configurar despliegue continuo del sistema.
4. Actualizar README del proyecto.

Cada ticket cuenta con descripción, tareas, prioridad y estado. Al finalizar una tarea, se agrega un comentario con el resultado y se cierra el issue.

---

## Integración continua

El proyecto utiliza GitHub Actions para ejecutar un pipeline de integración continua.

El archivo de configuración se encuentra en:

```txt
.github/workflows/ci.yml
```

El pipeline ejecuta automáticamente:

```bash
npm ci
npm run lint
npm run build
```

Esto permite validar el proyecto cada vez que se realiza un push o pull request hacia la rama principal.

---

## Despliegue continuo

El sistema fue desplegado en Vercel.

URL del proyecto:

```txt
https://sistema-eight-blue.vercel.app
```

El despliegue continuo permite que la aplicación se actualice automáticamente cada vez que se realiza un push a la rama `main`.

Configuración usada en Vercel:

* Framework: Vite
* Build Command: npm run build
* Output Directory: dist
* Variables de entorno configuradas en Vercel

---

## Evidencias de implementación

Durante el desarrollo se implementaron:

* Dockerfile y .dockerignore.
* Pipeline de GitHub Actions.
* Despliegue automático en Vercel.
* Tickets de seguimiento en GitHub Issues.
* Variables de entorno protegidas.
* Archivo .env.example como referencia.

---

## Estado del proyecto

El proyecto se encuentra funcional y desplegado. Actualmente cuenta con autenticación, gestión de transacciones, reportes, Docker, integración continua y despliegue continuo.
