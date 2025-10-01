import React, { useEffect } from 'react';
import htmlImage from '../html.jpg';
import cssImage from '../css.jpg';

function Inventario() {
 useEffect(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://maxanguiano575-create.github.io/Paginaweb/src/inventario.css';
  document.head.appendChild(link);

  console.log("CSS cargado desde GitHub Pages");

  return () => {
    if (document.head.contains(link)) {
      document.head.removeChild(link);
    }
  };
}, []);


  return (
    <div className="inventario">
      <h1>Gestión de Inventario</h1>
      
      <form className="formulario-alta">
        <h2>Agregar Producto</h2>
        <input type="text" placeholder="Nombre" required />
        <input type="number" placeholder="Precio" required />
        <select required>
          <option value="">Categoría</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
        <button type="submit">Agregar</button>
      </form>

      <form className="formulario-modificacion">
        <h2>Modificar Producto</h2>
        <select required>
          <option value="">Selecciona producto</option>
        </select>
        <input type="text" placeholder="Nuevo nombre" />
        <input type="number" placeholder="Nuevo precio" />
        <button type="submit">Actualizar</button>
      </form>

      <form className="formulario-eliminacion">
        <h2>Eliminar Producto</h2>
        <select required>
          <option value="">Selecciona producto</option>
        </select>
        <button type="submit">Eliminar</button>
      </form>
      
      <div className="footer-section">
        <h3>Validaciones</h3>
        <div className="tech-images">
  {/* IMAGEN 1 en el footer - HTML */}
  <a 
    href="https://validator.w3.org/" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <img 
      src={htmlImage} 
      alt="HTML5 - Lenguaje de marcado web" 
      className="tech-image"
    />
  </a>

  {/* IMAGEN 2 en el footer - CSS */}
  <a 
    href="https://jigsaw.w3.org/css-validator/#validate_by_uri" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <img 
      src={cssImage} 
      alt="CSS3 - Hojas de estilo en cascada" 
      className="tech-image"
    />
  </a>
</div>

      </div>
    </div>
  );
}

export default Inventario;