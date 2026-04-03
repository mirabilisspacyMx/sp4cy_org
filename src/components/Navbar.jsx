import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import SearchStore from './SearchStore';

const Navbar = ({ cartCount, onCartClick, onAddToCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSp4cyStoreOpen, setIsSp4cyStoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Add transparent to solid dark glassmorphism effect after 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when body is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        Mirabilis<span className="brand-accent">_Sp</span>
      </div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li>
          <a href="#inicio" onClick={(e) => { e.preventDefault(); setIsOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            inicio
          </a>
        </li>
        <li>
          <a href="#sp4cy_shop" onClick={(e) => { e.preventDefault(); setIsOpen(false); setIsSp4cyStoreOpen(true); }} className="nav-highlight">
            Sp4cy
          </a>
        </li>
        <li className="nav-item-dropdown">
          <a href="#c3st_l4_0z" onClick={(e) => e.preventDefault()}>
            <span className="leet-word">
              <span className="leet-l">c</span><span className="leet-n">3</span><span className="leet-l">st_l</span><span className="leet-n">4</span><span className="leet-l">_</span><span className="leet-n">0</span><span className="leet-l">z</span>
            </span> <ChevronDown size={14} className="dropdown-arrow" />
          </a>
          <ul className="submenu">
            <li><a href="#comunidad">Cultura y Comunidad</a></li>
            <li><a href="#eventos">Eventos Privados</a></li>
          </ul>
        </li>
        <li className="nav-separated nav-item-dropdown">
          <a href="#r4b_proyect" onClick={(e) => e.preventDefault()}>
            <span className="leet-word">
              <span className="leet-l">r</span><span className="leet-n">4</span><span className="leet-l">b_Proyect</span>
            </span> <ChevronDown size={14} className="dropdown-arrow" />
          </a>
          <ul className="submenu submenu-right">
            <li><a href="#labs">Laboratorio Sp4cy</a></li>
            <li><a href="#unete">Únete al Equipo Técnico</a></li>
          </ul>
        </li>
      </ul>

      <div className="nav-controls">
        <button className="icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
          <Search size={22} />
        </button>
        <button className="icon-btn" aria-label="Account">
          <User size={22} />
        </button>
        <button className="icon-btn" aria-label="Cart" onClick={onCartClick} style={{ position: 'relative' }}>
          <ShoppingBag size={22} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>

        <button
          className="icon-btn hamburger-container"
          onClick={toggleMenu}
          style={{ display: 'none' }} // Replaced by CSS display media query
        >
          {isOpen ? <X size={28} color="#ccff00" /> : <Menu size={28} />}
        </button>

        {/* Custom Hamburger Animation */}
        <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
      <SearchStore isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onAddToCart={onAddToCart} />
      <SearchStore isOpen={isSp4cyStoreOpen} onClose={() => setIsSp4cyStoreOpen(false)} onAddToCart={onAddToCart} theme="bw-blue" />
    </nav>
  );
};

export default Navbar;
