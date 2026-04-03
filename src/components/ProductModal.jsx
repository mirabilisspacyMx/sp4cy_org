import React, { useState } from 'react';
import { X, ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      cartId: `${product.id}-${selectedSize}-${selectedColor.name}`,
      selectedSize,
      selectedColor: selectedColor.name,
      quantity,
      image: product.images[0] // Set base image for cart
    });
    onClose();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <div className="product-modal-overlay">
      <div className="product-modal-container">
        <button className="btn-close-product store-close" onClick={onClose} aria-label="Cerrar Producto"><X size={32} /></button>
        
        {/* Carrusel de Imagenes */}
        <div className="product-modal-image slider-container">
          <img 
            src={product.images[currentImageIndex]} 
            alt={`${product.title} - vista ${currentImageIndex + 1}`} 
            className="slider-image fade-animation"
            key={currentImageIndex} // force re-render for animation
          />
          
          {product.images.length > 1 && (
            <>
              <button className="slider-btn left" onClick={prevImage}><ChevronLeft size={36} /></button>
              <button className="slider-btn right" onClick={nextImage}><ChevronRight size={36} /></button>
              
              <div className="slider-dots">
                {product.images.map((_, index) => (
                  <span 
                    key={index} 
                    className={`slider-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></span>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="product-modal-info">
          <span className="store-card-badge product-badge">{product.category}</span>
          <h2 className="product-modal-title">{product.title}</h2>
          <p className="product-modal-price">${product.price.toFixed(2)} MXN</p>
          
          <div className="store-card-author product-author">
            <div className="author-emblem" style={{ borderColor: product.author.color, color: product.author.color }}>
              <product.author.icon size={14} />
            </div>
            <span className="author-name" style={{color: '#999'}}>Diseñado por {product.author.name}</span>
          </div>

          <p className="product-modal-desc">{product.fullDesc}</p>

          <div className="product-options">
            <div className="option-group">
              <h4>🛡️ Seleccionar Talla</h4>
              <div className="option-buttons">
                {product.sizes.map(s => (
                  <button 
                    key={s} 
                    className={`option-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <h4>🎨 Seleccionar Color <span className="selected-color-name">- {selectedColor?.name}</span></h4>
              <div className="color-swatches">
                {product.colors.map(c => (
                  <button 
                    key={c.name} 
                    className={`color-swatch-btn ${selectedColor?.name === c.name ? 'active' : ''}`}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c.hex }}
                    aria-label={`Seleccionar color ${c.name}`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Menos"><Minus size={18}/></button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} aria-label="Más"><Plus size={18}/></button>
            </div>
            <button className="btn btn-primary btn-add-cart" onClick={handleAdd}>
              <ShoppingCart size={20} /> AGREGAR - ${(product.price * quantity).toFixed(2)} MXN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
