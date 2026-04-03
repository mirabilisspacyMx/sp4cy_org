import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartModal = ({ isOpen, onClose, cart, setCart }) => {
  if (!isOpen) return null;

  const updateQuantity = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQ = item.quantity + delta;
        return { ...item, quantity: Math.max(0, newQ) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const remove = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar-panel">
        <div className="cart-header">
          <h2><ShoppingBag size={24} style={{ marginRight: '10px' }} /> Tu Carrito</h2>
          <button className="store-close" onClick={onClose} aria-label="Cerrar Carrito" style={{position:'static'}}>
            <X size={28} />
          </button>
        </div>
        
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} color="#444" style={{ marginBottom: '1rem' }} />
              <p>Tu inventario está vacío.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartId} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p className="cart-item-variant">{item.selectedColor} | Talla {item.selectedSize}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)} MXN</p>
                  
                  <div className="cart-item-controls">
                    <div className="quantity-selector small">
                      <button onClick={() => updateQuantity(item.cartId, -1)}><Minus size={14}/></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, 1)}><Plus size={14}/></button>
                    </div>
                    <button className="btn-remove" onClick={() => remove(item.cartId)} aria-label="Eliminar del carrito"><Trash2 size={18}/></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subcoste Estimado</span>
              <span className="total-amount">${total.toFixed(2)} MXN</span>
            </div>
            <button className="btn btn-primary btn-checkout">INICIAR PAGO PROTEGIDO</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
