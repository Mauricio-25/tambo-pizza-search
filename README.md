
# Tambo Pizza Search

## Descripción

Este proyecto es una aplicación web simple de Robotic Process Automation (RPA) que permite buscar productos (como pizzas) en el sitio web de Tambo.pe mediante scraping. Utiliza un servidor backend en Node.js con Express para manejar peticiones y Playwright para automatizar la navegación y extracción de datos. El frontend es una interfaz estática en HTML/CSS/JS con Tailwind CSS para estilos, que muestra los resultados de búsqueda de manera dinámica.

El objetivo es proporcionar una herramienta rápida para buscar y visualizar productos de Tambo, ideal para prototipos o automatizaciones básicas.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Automatización/Scraping**: Playwright
- **Frontend**: HTML5, CSS (con Tailwind CSS via CDN), JavaScript Vanilla
- **Gestión de Dependencias**: npm

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/Mauricio-25/tambo-pizza-search.git
   cd tambo-pizza-search
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

   Nota: Playwright instalará automáticamente los binarios de navegadores necesarios durante la instalación.

## Uso

1. Inicia el servidor:
   ```
   npm start
   ```

2. Abre tu navegador en `http://localhost:3000`.

3. En la interfaz, ingresa un término de búsqueda (ej. "Pizzas") y presiona "Buscar". Los resultados se mostrarán en la página.

- El scraping se ejecuta en tiempo real para cada búsqueda, limitando a los primeros 5 resultados.
- Para depuración, el modo headless de Playwright está desactivado (ventana visible); cámbialo a `true` en `automations/tambo_search.js` para producción.

## Estructura del Proyecto

- `app.js`: Servidor principal con Express.
- `automations/tambo_search.js`: Script de scraping con Playwright.
- `public/index.html`: Interfaz frontend.
- `package.json`: Configuración y dependencias.

## Notas Importantes

- **Legalidad**: El scraping web puede violar los términos de servicio de sitios como Tambo.pe. Úsalo solo para fines educativos o con permiso.
- **Rendimiento**: Cada búsqueda lanza un navegador, lo que puede ser lento. Considera caching para mejoras.
- **Mejoras Sugeridas**: Agrega una base de datos para persistencia, tests con Jest, o integra un framework como React para el frontend.

## Licencia

Uso libre