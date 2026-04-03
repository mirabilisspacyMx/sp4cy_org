import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import CartModal from './components/CartModal';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    { id: 1, image: '/hero.png', filter: 'grayscale(100%) contrast(1.1)', color: '#ff5e00', titleCode: 'VOID', subtitle: 'LO NUEVO. LO ESENCIAL.', titleSuffix: 'RUNNER', desc: 'Equípate con la última colección en blanco y negro pensada para maximizar el rendimiento urbano y redefinir cada truco en el concreto.' },
    { id: 2, image: '/skateboards.png', filter: 'grayscale(100%) contrast(1.2) sepia(50%) hue-rotate(90deg)', color: '#ccff00', titleCode: 'NEON', subtitle: 'ESTILO. DURABILIDAD.', titleSuffix: 'DECK', desc: 'Arce de 7 capas con una estética vibrante que desafía las reglas tradicionales de lo estético en las rampas.' },
    { id: 3, image: '/apparel.png', filter: 'grayscale(100%) contrast(1.1) sepia(30%) hue-rotate(180deg)', color: '#00f3ff', titleCode: 'CYBER', subtitle: 'EL AJUSTE PERFECTO.', titleSuffix: 'FIT', desc: 'Materiales inteligentes moldeados en color monocromático con destellos fríos para cualquier terreno.' },
    { id: 4, image: '/accessories.png', filter: 'grayscale(100%) contrast(1.1) sepia(80%) hue-rotate(270deg)', color: '#ff00ff', titleCode: 'ULTRA', subtitle: 'AGARRE. CONTROL.', titleSuffix: 'GRIP', desc: 'Texturas anti-derrapantes que abrazan el asfalto. Tu seguridad en colores imposibles.' },
    { id: 5, image: '/hero.png', filter: 'grayscale(50%) contrast(1.3) hue-rotate(45deg)', color: '#ffd700', titleCode: 'GOLD', subtitle: 'EDICIÓN LIMITADA.', titleSuffix: 'STREET', desc: 'El dorado representa el más alto rango. Accede a piezas de baja disponibilidad antes de que se agoten.' },
    { id: 6, image: '/skateboards.png', filter: 'grayscale(100%) invert(10%) contrast(1.1)', color: '#ff3333', titleCode: 'DARK', subtitle: 'INNOVAR O MORIR.', titleSuffix: 'MATTER', desc: 'La oscuridad es solo la ausencia de lo preestablecido. Colección pesada para sesiones extremas.' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.cartId === item.cartId);
      if (existing) {
        return prev.map(i => 
          i.cartId === item.cartId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} onAddToCart={handleAddToCart} />
      <Popup />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} />
      
      {/* New Hero Section Slider */}
      <section className="hero-nike" id="inicio">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ opacity: index === currentSlide ? 1 : 0, transition: 'opacity 1s ease-in-out', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: index === currentSlide ? 1 : 0 }}
          >
            <div className="hero-nike-bg">
              <img src={slide.image} alt={slide.titleCode} className="bw-image" style={{ filter: slide.filter }} />
            </div>
            <div className="hero-nike-content" style={{ position: 'absolute', bottom: '10%', left: '5%' }}>
              <p className="nike-subtitle">{slide.subtitle}</p>
              <h1 className="nike-title">THE <span className="neon-orange-text" style={{ WebkitTextStroke: `1.5px ${slide.color}`, textShadow: `0 0 20px ${slide.color}55` }}>{slide.titleCode}</span> {slide.titleSuffix}</h1>
              <p className="nike-desc">{slide.desc}</p>
              <div className="nike-actions">
                <button className="btn-nike-solid" style={{ color: '#000', background: '#fff' }}>Comprar Ahora</button>
                <button className="btn-nike-outline" style={{ borderColor: slide.color, color: slide.color }}>Ver la Colección</button>
              </div>
            </div>
          </div>
        ))}
        {/* Puntos de navegación (Dots) */}
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <div 
              key={index} 
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              style={{ background: index === currentSlide ? heroSlides[index].color : 'rgba(255,255,255,0.3)', boxShadow: index === currentSlide ? `0 0 10px ${heroSlides[index].color}` : 'none' }}
            />
          ))}
        </div>
      </section>

      {/* Categories Preview (Nike Style Vertical/Horizontal clean grid) */}
      <section className="section nike-categories-section">
        <div className="nike-section-header">
          <h2 className="nike-section-title">DESTACADOS</h2>
        </div>
        
        <div className="nike-grid">
          <div className="nike-card">
            <div className="nike-card-img-wrapper">
              <img src="/apparel.png" alt="Apparel Collection" className="bw-image" />
            </div>
            <div className="nike-card-info">
              <h3>Ropa de Alto Rendimiento <span className="neon-arrow">→</span></h3>
              <p>Playeras, sudaderas y cargo pants.</p>
            </div>
          </div>
          
          <div className="nike-card center-card">
            <div className="nike-card-img-wrapper">
              <img src="/skateboards.png" alt="Skateboards Collection" className="bw-image" />
            </div>
            <div className="nike-card-info">
              <h3>Tablas Profesionales <span className="neon-arrow">→</span></h3>
              <p>Construidas en 7 capas de arce.</p>
            </div>
          </div>

          <div className="nike-card">
            <div className="nike-card-img-wrapper">
              <img src="/accessories.png" alt="Accessories" className="bw-image" />
            </div>
            <div className="nike-card-info">
              <h3>Accesorios y Lijas <span className="neon-arrow">→</span></h3>
              <p>El grip que tu estilo necesita.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook dummy section */}
      <section className="section" id="lookbook" style={{ textAlign: 'center', padding: '10rem 5%'}}>
        <h2 className="section-title">Lookbook Vol. 1</h2>
        <p className="section-subtitle" style={{marginBottom: '2rem'}}>Cyber-Street FW 26</p>
        <button className="btn btn-outline">View Lookbook</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">MIRABILIS.SP</div>
        <p className="footer-copy">&copy; 2026 Mirabilis.Sp All rights reserved. Designed for the streets.</p>
      </footer>
    </div>
  );
}

export default App;
