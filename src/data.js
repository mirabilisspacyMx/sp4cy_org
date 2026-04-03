import { Code, PenTool, Hexagon, Component } from 'lucide-react';

export const mockItems = [
  { 
    id: 1, 
    title: 'Neon Deck v2.0', 
    category: 'Skateboards', 
    desc: 'Tabla de arce premium 8.0" con bordes reflectantes y alta durabilidad para la calle.', 
    fullDesc: 'Nuestra tabla insignia. Fabricada con 7 capas de arce canadiense y recubierta con polímero anti-rayones. El laminado superior incluye un compuesto reflectante especial.', 
    tags: ['Nuevo', 'Pro'], 
    author: { name: 'Sp4cy Labs', color: '#ccff00', icon: Code }, 
    price: 850, 
    images: ['/skateboards.png', '/hero.png'], 
    sizes: ['8.0"', '8.25"', '8.5"'], 
    colors: [
      { name: 'Neon Green', hex: '#ccff00' },
      { name: 'Cyber Purple', hex: '#9d00ff' },
      { name: 'Pitch Black', hex: '#111111' }
    ]
  },
  { 
    id: 2, 
    title: 'Playera Cyber TX', 
    category: 'Apparel', 
    desc: 'Playera esencial estilo dark mode. Perfecta para rodar.', 
    fullDesc: 'Algodón orgánico de alto gramaje para máxima resistencia. Detalles bordados, etiqueta térmica en el interior y un corte fluido que te proporciona libertad total.', 
    tags: ['Más Vendido'], 
    author: { name: 'Neon Division', color: '#ff00ff', icon: PenTool }, 
    price: 250, 
    images: ['/apparel.png', '/accessories.png'], 
    sizes: ['S', 'M', 'L', 'XL'], 
    colors: [
      { name: 'Negro Asfalto', hex: '#1a1a1a' },
      { name: 'Blanco Hielo', hex: '#f0f0f0' },
      { name: 'Naranja Fuerte', hex: '#ff5e00' }
    ]
  },
  { 
    id: 3, 
    title: 'Sp4cy Grip Tape', 
    category: 'Accessories', 
    desc: 'Lija transparente de alta fricción con textura antideslizante neón.', 
    fullDesc: 'La lija que no destroza tu calzado pero te mantiene pegado a la tabla. Edición limitada de nuestra línea de accesorios.', 
    tags: ['Esencial'], 
    author: { name: 'Core Team', color: '#00ffff', icon: Hexagon }, 
    price: 150, 
    images: ['/accessories.png', '/skateboards.png'], 
    sizes: ['Estándar'], 
    colors: [
      { name: 'Transparente Neón', hex: '#ccff00' },
      { name: 'Humo Oscuro', hex: '#333333' }
    ]
  },
  { 
    id: 4, 
    title: 'Urban Cargo Pants', 
    category: 'Apparel', 
    desc: 'Pantalones cargo multiproposito tácticos con ajuste flexible para skate.', 
    fullDesc: 'Diseño utilitario con bolsillos reforzados y un tejido ripstop con elasticidad en 4 direcciones.', 
    tags: ['Tendencia'], 
    author: { name: 'Neon Division', color: '#ff00ff', icon: PenTool }, 
    price: 450, 
    images: ['/apparel.png', '/hero.png'], 
    sizes: ['30', '32', '34', '36'], 
    colors: [
      { name: 'Negro Tactico', hex: '#000000' },
      { name: 'Verde Olivo', hex: '#4B5320' }
    ]
  },
  { 
    id: 5, 
    title: 'Carbon Bearings ABEC-9', 
    category: 'Accessories', 
    desc: 'Rodamientos de alta velocidad sin fricción. Diseñados para rodar en concreto.', 
    fullDesc: 'Cuentan con un escudo extraíble recubierto de titanio. La mejor tecnología en tu eje.', 
    tags: ['Rendimiento'], 
    author: { name: 'Tech Ops', color: '#ff5e00', icon: Component }, 
    price: 320, 
    images: ['/accessories.png'], 
    sizes: ['Estándar'], 
    colors: [
      { name: 'Metálico oscuro', hex: '#444444' },
      { name: 'Dorado Titanio', hex: '#d4af37' }
    ]
  },
  { 
    id: 6, 
    title: 'Void Cruiser', 
    category: 'Skateboards', 
    desc: 'Tabla compacta ideal para transporte en la ciudad y curvas cerradas.', 
    fullDesc: 'Un cruiser silencioso pero letal. Ruedas de gel y ejes estrechos para máxima maniobrabilidad en asfalto dañado.', 
    tags: ['Cruiser'], 
    author: { name: 'Sp4cy Labs', color: '#ccff00', icon: Code }, 
    price: 1200, 
    images: ['/skateboards.png', '/apparel.png', '/accessories.png'], 
    sizes: ['Única'], 
    colors: [
      { name: 'Black Void', hex: '#0a0a0a' },
      { name: 'Neon Edge', hex: '#ccff00' },
      { name: 'Blood Red', hex: '#8a0303' }
    ]
  },
];
