import React, { useState } from 'react';
import { X, Eye, Sparkles, MoveHorizontal, Compass, Layers } from 'lucide-react';

export default function VirtualTourModal({
  property,
  onClose
}) {
  const rooms = [
    { id: 'living', name: 'Sala de Estar 360°', img: property?.images?.[0] || '' },
    { id: 'balcony', name: 'Varanda Gourmet 360°', img: property?.images?.[1] || property?.images?.[0] || '' },
    { id: 'bedroom', name: 'Suíte Master 360°', img: property?.images?.[2] || property?.images?.[0] || '' }
  ];

  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  if (!property) return null;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation(prev => prev + delta * 0.4);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1350 }} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '900px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: '#0f172a',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Compass size={22} color="#38bdf8" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Tour Virtual 360° Imersivo</h2>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{property.title}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={22} />
          </button>
        </div>

        {/* 360 Viewport Container */}
        <div style={{ padding: '1.5rem' }}>
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              position: 'relative',
              width: '100%',
              height: '460px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              backgroundColor: '#000',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none'
            }}
          >
            {/* Panoramic Image with transform rotation simulation */}
            <img
              src={activeRoom.img}
              alt=""
              style={{
                width: '140%',
                height: '100%',
                objectFit: 'cover',
                transform: `translateX(${(rotation % 360) - 200}px) scale(1.15)`,
                transition: isDragging ? 'none' : 'transform 0.1s linear'
              }}
            />

            {/* Overlay instruction */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.65)',
              color: '#fff',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              pointerEvents: 'none'
            }}>
              <MoveHorizontal size={16} />
              <span>Arraste para girar a visão 360° em {activeRoom.name}</span>
            </div>
          </div>

          {/* Room Selector Pills */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'center' }}>
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoom(room);
                  setRotation(0);
                }}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: activeRoom.id === room.id ? '2px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                  backgroundColor: activeRoom.id === room.id ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-card)',
                  color: activeRoom.id === room.id ? 'var(--color-primary-light)' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
