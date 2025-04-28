# 🌎 Alrededor de los EE.UU. | Proyecto Web Interactivo

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

**Sitio web interactivo** que permite explorar y gestionar tarjetas de lugares emblemáticos de EE.UU. con funcionalidades CRUD completas.

## 🚀 Demo en Vivo
▶️ [Ver Proyecto en GitHub Pages](https://robensonl.github.io/web_project_around/)

## ✨ Características Principales

Tarjetas	Modal
🔄 Mejoras Futuras
- HTML5
- CSS3
- Flexbox y Grid Layout
- Responsive Web Design (RWD)
- JavaScript Puro (vanilla JS)
- Validación de formularios
- JavaScript modular (import/export)
- Git y GitHub
- GitHub Pages

### 🛠️ Funcionalidades Avanzadas
```html
<!-- Ejemplo de tarjeta generada dinámicamente -->
<template id="card-template">
      <div class="gallery__card">
        <img class="gallery__img" src="#" alt="Imagen de lugar" />
        <button class="gallery__delete-button" type="button" aria-label="Eliminar tarjeta">
          <img src="./images/Trash-delete.svg" alt="icono eliminar">
        </button>
        <div class="gallery__card-description">
          <h2 class="gallery__card-text"></h2>
          <div class="gallery__like-container">
            <button class="gallery__card-button" type="button" aria-label="Me gusta"></button>
          </div>
        </div>
      </div>
    </template>

🧩 Componentes Clave
Componente	Tecnología	Descripción
Ventanas Modales	HTML/CSS + JS	3 tipos: edición, añadir tarjetas, zoom
Formularios	Validación HTML5	Campos con restricciones de longitud
Diseño Responsive	Media Queries	Adaptable a móviles (320px+) y desktop
🛠️ Tecnologías Utilizadas
Metodología BEM para estructura CSS

Normalize.css para reset de estilos

JavaScript ES6+ para interacciones dinámicas

GitHub Pages para despliegue

✅ Cumplimiento de Estándares
Categoría	Cumplimiento	Detalle
Accesibilidad	✅	Atributos alt, aria-label
Performance	✅	Optimización de imágenes (75vh/75vw)
Código Limpio	✅	Funciones con single responsibility
BEM	✅	Bloque__elemento--modificador

Vista de Tarjetas	Ventana Modal 
https://robensonl.github.io/web_project_around/


## 🎯 Funciones implementadas

- Editar el perfil del usuario (nombre y descripción).
- Agregar una nueva tarjeta (título y enlace a imagen).
- Validación de formularios:
  - Nombre: entre 2 y 40 caracteres.
  - Acerca de mí: entre 2 y 200 caracteres.
  - Título de tarjeta: entre 2 y 30 caracteres.
  - Imagen: enlace (URL) válido.
- Cerrar popups:
  - Haciendo clic fuera del popup.
  - Pulsando la tecla **Esc**.
  - Haciendo clic en el botón de cerrar.
- Dar "Me gusta" a las tarjetas.
- Eliminar tarjetas creadas.
- Ver imagen ampliada en popup.
Abre un Pull Request

🌟 ¡Tu contribución es bienvenida!
benbenlouissaint@gmail.com | @Robensonl