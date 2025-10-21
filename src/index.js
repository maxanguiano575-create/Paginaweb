import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Inventario from './vistas/Inventario';

import htmlImage from './html.jpg';
import cssImage from './css.jpg';

function Index() {
  const [productos, setProductos] = useState([]);
  const [mostrarInventario, setMostrarInventario] = useState(false);

  const categorias = ["Hombre", "Mujer", "Niño", "Running", "Básquetbol", "Fútbol"];

  useEffect(() => {
    fetch("http://localhost:3001/productos") 
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.log("Error al cargar productos:", err));
  }, []);

  // Efectos interactivos premium
  useEffect(() => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Efecto de partículas para el banner
    const createParticles = () => {
      const banner = document.querySelector('.banner');
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'banner-particles';
      
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.background = 'rgba(255,255,255,0.3)';
        particlesContainer.appendChild(particle);
      }
      
      banner.appendChild(particlesContainer);
    };
    
    createParticles();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo">tiendatenis</div>
          
          {/* NAV SIMPLIFICADO - SOLO LOGO Y BOTONES */}
          <div className="actions">
            <button type="button">Cuenta</button>
            <button type="button">Carrito</button>
            <button 
              type="button" 
              onClick={() => setMostrarInventario(!mostrarInventario)}
            >
              {mostrarInventario ? 'Tienda' : 'Inventario'}
            </button>
          </div>
        </div>
      </header>

      {mostrarInventario ? (
        <Inventario />
      ) : (
        <>
          {/* Banner principal */}
          <section className="banner">
            <h1>Moda deportiva para cada paso</h1>
            <p>¡Meses sin intereses y envío gratis!</p>
            <button type="button">Comprar ahora</button>
          </section>

          {/* Categorías populares */}
          <section className="categories-section">
            <h2>Categorías Populares</h2>
            <div className="categories">
              {categorias.map(cat => (
                <div key={cat} className="category-card">
                  <h3>{cat}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Productos destacados */}
          <section className="productos-destacados">
            <h2>Productos destacados</h2>
            <div className="products-grid">
              {productos.length === 0 ? (
                <p>Cargando productos...</p>
              ) : (
                productos.map(p => (
                  <div key={p.id} className="product-card">
                    <div className="product-image">
                      {p.imagen_url ? (
                        <img 
                          src={p.imagen_url} 
                          alt={p.nombre}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <div className="image-placeholder" style={{display: p.imagen_url ? 'none' : 'block'}}>
                        Imagen
                      </div>
                    </div>
                    <h4>{p.nombre}</h4>
                    <p>${p.precio}</p>
                    <button type="button">Agregar al carrito</button>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      )}

      {!mostrarInventario && (
        <footer className="footer">
          <div className="footer-sections">
            <div className="footer-section">
              <h3>Misión</h3>
              <p>Ofrecer calzado y ropa deportiva de la más alta calidad, brindando a nuestros clientes estilo, comodidad y rendimiento en cada paso de su vida activa.</p>
            </div>

            <div className="footer-section">
              <h3>Visión</h3>
              <p>Ser la tienda líder en moda deportiva en México, reconocida por nuestra innovación, servicio excepcional y compromiso con el deporte y estilo de vida saludable.</p>
            </div>

            <div className="footer-section">
              <h3>Validaciones</h3>
              <div className="tech-images">
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

            <div className="footer-section">
              <h3>Contacto</h3>
              <p>info@tiendatenis.com</p>
              <p>Av. Principal 123, CDMX</p>
              <p>Lunes a Sábado: 9:00 AM - 8:00 PM</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>Contamos con envío gratis y devolución segura. Marcas oficiales.</p>
            <p>© 2025 dportenis.mx - Todos los derechos reservados</p>
          </div>
        </footer>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

reportWebVitals();