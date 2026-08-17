import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  MapPin, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  Compass, 
  Maximize2 
} from 'lucide-react';

const DEFAULT_ROOM_MARKERS = [
  {
    id: 'room-1',
    name: 'Living Integrado & Varanda',
    top: '35%',
    left: '28%',
    area: '28m²',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Amplo living com pé direito duplo, integração total com a varanda e iluminação natural em abundância.'
  },
  {
    id: 'room-2',
    name: 'Suíte Master com Closet',
    top: '65%',
    left: '68%',
    area: '22m²',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    description: 'Suíte silenciosa com espaço para cama King Size, closet privativo planejado e piso em madeira nobre.'
  },
  {
    id: 'room-3',
    name: 'Cozinha Gourmet & Ilha',
    top: '25%',
    left: '72%',
    area: '16m²',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Cozinha em conceito aberto com bancadas em granito preto são gabriel e espaço para cooktop e coifa.'
  },
  {
    id: 'room-4',
    name: 'Varanda com Churrasqueira',
    top: '75%',
    left: '25%',
    area: '14m²',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Varanda gourmet envidraçada com churrasqueira a carvão e vista panorâmica livre para o pôr do sol.'
  }
];

export default function InteractiveFloorPlanModal({ property, onClose }) {
  const [activeRoom, setActiveRoom] = useState(DEFAULT_ROOM_MARKERS[0]);

  if (!property) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1300,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} onClick={onClose}>
      <div 
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-2xl)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Layers size={22} color="#38bdf8" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Planta Baixa Interativa com Marcadores de Cômodos
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Clique nos pontos pulsantes da planta para visualizar cada ambiente em alta resolução
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              border: 'none', 
              background: 'rgba(255, 255, 255, 0.1)', 
              cursor: 'pointer', 
              color: '#ffffff',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body (Split Layout: Interactive Plan Canvas vs Room Photo Preview) */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          backgroundColor: 'var(--bg-main)'
        }}>
          {/* Left Canvas: Graphical Floor Plan with Pulsing Hotspots */}
          <div style={{
            position: 'relative',
            backgroundColor: '#ffffff',
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            minHeight: '340px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.03)'
          }}>
            {/* Background Floor Plan Schematic SVG */}
            <svg viewBox="0 0 500 350" style={{ width: '100%', height: '100%', padding: '1.5rem' }}>
              {/* Outer Walls */}
              <rect x="30" y="30" width="440" height="290" fill="#f8fafc" stroke="#334155" strokeWidth="4" rx="6" />
              
              {/* Rooms Partitions */}
              <line x1="250" y1="30" x2="250" y2="320" stroke="#64748b" strokeWidth="3" strokeDasharray="4 2" />
              <line x1="30" y1="180" x2="250" y2="180" stroke="#64748b" strokeWidth="3" />
              <line x1="250" y1="160" x2="470" y2="160" stroke="#64748b" strokeWidth="3" />

              {/* Room Labels */}
              <text x="140" y="110" fill="#94a3b8" fontSize="14" fontWeight="700" textAnchor="middle">LIVING &amp; ESTAR</text>
              <text x="140" y="260" fill="#94a3b8" fontSize="14" fontWeight="700" textAnchor="middle">VARANDA GOURMET</text>
              <text x="360" y="100" fill="#94a3b8" fontSize="14" fontWeight="700" textAnchor="middle">COZINHA &amp; ILHA</text>
              <text x="360" y="240" fill="#94a3b8" fontSize="14" fontWeight="700" textAnchor="middle">SUÍTE MASTER</text>
            </svg>

            {/* Pulsing Hotspot Markers */}
            {DEFAULT_ROOM_MARKERS.map((room) => {
              const isSelected = activeRoom.id === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  style={{
                    position: 'absolute',
                    top: room.top,
                    left: room.left,
                    transform: 'translate(-50%, -50%)',
                    width: isSelected ? '38px' : '30px',
                    height: isSelected ? '38px' : '30px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#0284c7' : '#0f172a',
                    color: '#ffffff',
                    border: '3px solid #ffffff',
                    boxShadow: isSelected ? '0 0 15px rgba(2, 132, 199, 0.8)' : '0 2px 8px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    zIndex: 20
                  }}
                  title={room.name}
                >
                  <Eye size={isSelected ? 16 : 13} />
                </button>
              );
            })}
          </div>

          {/* Right Preview: Selected Room Photo & Specs */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#0284c7', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 800 }}>
                  Ambiente Selecionado
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Área: {activeRoom.area}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                {activeRoom.name}
              </h3>

              {/* Room Image */}
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '200px', marginBottom: '0.85rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <img
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {activeRoom.description}
              </p>
            </div>

            {/* Quick Room Selector Chips */}
            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Navegar por Ambientes:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {DEFAULT_ROOM_MARKERS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActiveRoom(r)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: activeRoom.id === r.id ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                      backgroundColor: activeRoom.id === r.id ? 'var(--color-primary-light)' : 'var(--bg-main)',
                      color: activeRoom.id === r.id ? '#ffffff' : 'var(--text-main)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
