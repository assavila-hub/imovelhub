import React, { useState } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, X, ShieldCheck, Heart } from 'lucide-react';

export default function InteractiveMap({
  properties,
  selectedProperty,
  onSelectProperty,
  onToggleFavorite,
  favorites
}) {
  const [activePin, setActivePin] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Map bounding coordinates calculation helper
  // Default centered around São Paulo / Rio / Curitiba
  const minLat = -25.5;
  const maxLat = -19.8;
  const minLng = -49.5;
  const maxLng = -43.0;

  const getPosition = (lat, lng) => {
    const y = ((maxLat - lat) / (maxLat - minLat)) * 80 + 10;
    const x = ((lng - minLng) / (maxLng - minLng)) * 80 + 10;
    return { top: `${Math.max(10, Math.min(90, y))}%`, left: `${Math.max(10, Math.min(90, x))}%` };
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '600px',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
      backgroundColor: '#e2e8f0',
      boxShadow: 'var(--shadow-lg)'
    }}>
      {/* Map Graphic Vector Canvas */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.65 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#f1f5f9" />
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Simulated Map Rivers & Roads */}
        <path d="M 0 300 Q 300 150 600 400 T 1200 200" fill="none" stroke="#93c5fd" strokeWidth="24" strokeLinecap="round" opacity="0.7" />
        <path d="M 100 0 Q 400 300 800 600" fill="none" stroke="#fdba74" strokeWidth="8" opacity="0.6" />
        <path d="M 0 200 Q 500 200 1000 500" fill="none" stroke="#ffffff" strokeWidth="10" />
      </svg>

      {/* Map Overlay Badge Header (Viva Real) */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        zIndex: 20,
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(10px)',
        padding: '0.6rem 1.2rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <Navigation size={18} color="var(--color-accent)" />
        <div>
          <strong style={{ fontSize: '0.9rem', display: 'block' }}>Mapa Interativo ImóvelHUB</strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {properties.length} imóveis localizados no mapa
          </span>
        </div>
      </div>

      {/* Map Controls */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <button
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <ZoomIn size={20} color="var(--text-main)" />
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <ZoomOut size={20} color="var(--text-main)" />
        </button>
      </div>

      {/* Dynamic Property Map Pins */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'center center',
        transition: 'transform 0.3s ease'
      }}>
        {properties.map((prop) => {
          const pos = getPosition(prop.lat, prop.lng);
          const isHovered = activePin?.id === prop.id;
          const displayPrice = prop.transactionType === 'Venda'
            ? `R$ ${(prop.price / 1000).toFixed(0)}k`
            : `R$ ${prop.rentPrice}/mês`;

          return (
            <div
              key={prop.id}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -100%)',
                zIndex: isHovered ? 40 : 10,
                cursor: 'pointer'
              }}
              onClick={() => {
                setActivePin(prop);
                onSelectProperty(prop);
              }}
              onMouseEnter={() => setActivePin(prop)}
            >
              {/* Viva Real Price Marker Badge */}
              <div style={{
                backgroundColor: isHovered ? 'var(--color-accent)' : 'var(--color-primary)',
                color: '#ffffff',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.82rem',
                boxShadow: isHovered ? '0 8px 20px rgba(255, 71, 87, 0.5)' : '0 4px 12px rgba(30, 58, 138, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                border: '2px solid #ffffff'
              }}>
                <MapPin size={14} />
                <span>{displayPrice}</span>
              </div>
            </div>
          );
        })}

        {/* Selected / Hovered Property Preview Card Popup */}
        {activePin && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 50,
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xl)',
            width: '320px',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ position: 'relative', height: '140px' }}>
              <img src={activePin.images[0]} alt={activePin.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(null);
                }}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={15} />
              </button>
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                {activePin.transactionType === 'Venda' ? `R$ ${(activePin.price || 0).toLocaleString('pt-BR')}` : `R$ ${(activePin.rentPrice || activePin.price || 0).toLocaleString('pt-BR')}/mês`}
              </div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {activePin.title}
              </h4>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {activePin.neighborhood}, {activePin.city} • {activePin.area}m²{activePin.bedrooms > 0 ? ` • ${activePin.bedrooms} qtos` : ''}{activePin.parkingSpots > 0 ? ` • ${activePin.parkingSpots} vagas` : ''}
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onSelectProperty(activePin)}
                style={{ width: '100%' }}
              >
                Ver Detalhes do Imóvel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
