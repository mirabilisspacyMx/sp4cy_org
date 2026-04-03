import React, { useState, useEffect } from 'react';
import { X, Search as SearchIcon, Filter, Layers, Zap, Box, Code, PenTool, Hexagon, Component } from 'lucide-react';
import { mockItems } from '../data';
import ProductModal from './ProductModal';

const SearchStore = ({ isOpen, onClose, onAddToCart, theme }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'catalog'

  // Prevenir scroll de la pagina al abrir
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredItems = mockItems.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`store-overlay ${theme === 'bw-blue' ? 'theme-bw-blue' : ''}`}>
      <div className="store-container">
        
        {/* Header Search */}
        <div className="store-header">
          <div className="store-search-bar">
            <SearchIcon size={32} className="search-icon-left" />
            <input 
              type="text" 
              placeholder="Buscar modelos, tablas, ropa..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button className="store-close" onClick={onClose} aria-label="Cerrar Búsqueda">
              <X size={36} />
            </button>
          </div>
        </div>

        {/* Promo Slider / Banner */}
        {viewMode === 'grid' && (
          <div className="store-promo-banner">
            <div className="promo-text">
              <h3 className="promo-title">NUEVA COLECCIÓN <span>VOID RUNNER</span></h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '0.2rem' }}>Explora el equipo que domina las calles esta temporada.</p>
            </div>
            <button className="promo-btn" onClick={() => setViewMode('catalog')}>Ver Catálogo</button>
          </div>
        )}

        {viewMode === 'catalog' ? (
          <div className="catalog-view">
            <div className="catalog-header">
              <h2>Catálogo Editorial Fall'26</h2>
              <button onClick={() => setViewMode('grid')} className="promo-btn">Volver a la Tienda</button>
            </div>
            <div className="catalog-carousel">
              {mockItems.map(item => (
                <div key={`catalog-${item.id}`} className="catalog-slide" onClick={() => setSelectedProduct(item)}>
                  <div className="catalog-slide-images">
                    <img src={item.images[0]} alt={item.title} className="catalog-img main-img" />
                    {item.images[1] ? (
                      <img src={item.images[1]} alt={`${item.title} alternate`} className="catalog-img hover-img" />
                    ) : (
                      <img src={item.images[0]} alt={`${item.title} alternate`} className="catalog-img hover-img" style={{filter: 'contrast(1.2) brightness(0.8)'}} />
                    )}
                  </div>
                  <div className="catalog-slide-info">
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="store-body">
          {/* Sidebar */}
          <div className="store-sidebar">
            <h4 className="sidebar-title"><Filter size={16}/> Filtros</h4>
            <ul className="sidebar-filters">
              <li className={activeCategory === 'All' ? 'active' : ''} onClick={() => setActiveCategory('All')}><Layers size={18}/> Todos</li>
              <li className={activeCategory === 'Skateboards' ? 'active' : ''} onClick={() => setActiveCategory('Skateboards')}><Zap size={18}/> Tablas</li>
              <li className={activeCategory === 'Apparel' ? 'active' : ''} onClick={() => setActiveCategory('Apparel')}><Box size={18}/> Ropa</li>
              <li className={activeCategory === 'Accessories' ? 'active' : ''} onClick={() => setActiveCategory('Accessories')}><Layers size={18}/> Accesorios</li>
            </ul>
          </div>

          {/* Main Grid View */}
          <div className="store-grid-container">
            <div className="store-grid">
              {filteredItems.map(item => (
                <div key={item.id} className="store-card" onClick={() => setSelectedProduct(item)}>
                  <div className="store-card-header">
                    <h3>{item.title}</h3>
                    <span className="store-card-badge">{item.category}</span>
                  </div>
                  
                  {/* Autor / Emblema del equipo */}
                  <div className="store-card-author">
                    <div className="author-emblem" style={{ borderColor: item.author.color, color: item.author.color }}>
                      <item.author.icon size={14} />
                    </div>
                    <span className="author-name">{item.author.name}</span>
                  </div>

                  <p className="store-card-desc">{item.desc}</p>
                  <div className="store-card-tags">
                    {item.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="no-results">No se encontraron resultados para "{searchQuery}"</div>
              )}
            </div>
          </div>
        </div>
        )}
        
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={onAddToCart} 
          />
        )}
      </div>
    </div>
  );
};

export default SearchStore;
