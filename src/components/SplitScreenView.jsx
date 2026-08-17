import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import RealLeafletMap from './RealLeafletMap';
import { SlidersHorizontal, MapPin, Sparkles, Building2 } from 'lucide-react';

export default function SplitScreenView({
  properties = [],
  favorites = [],
  comparedIds = [],
  onToggleFavorite,
  onToggleCompare,
  onSelectProperty,
  onOpenScheduler,
  onOpenCalculator,
  onOpenChat,
  onOpenVirtualTour,
  showTotalCost = false
}) {
  const [hoveredPropId, setHoveredPropId] = useState(null);
  const [selectedMapProp, setSelectedMapProp] = useState(null);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(420px, 1.15fr) minmax(360px, 0.95fr)',
      gap: '1.25rem',
      alignItems: 'start',
      position: 'relative'
    }}>
      {/* Left Column: Scrollable List of Property Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
            📍 Mostrando <strong>{properties.length} imóveis</strong> no mapa e na lista
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-primary-light)', fontWeight: 700 }}>
            ● Split-Screen Inteligente ImóvelHUB
          </span>
        </div>

        {properties.length === 0 ? (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <Building2 size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Nenhum imóvel encontrado nesta região</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tente ajustar os filtros ou navegar pelo mapa.</p>
          </div>
        ) : (
          properties.map(property => (
            <div
              key={property.id}
              onMouseEnter={() => setHoveredPropId(property.id)}
              onMouseLeave={() => setHoveredPropId(null)}
              style={{
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                transform: hoveredPropId === property.id ? 'translateY(-2px)' : 'none',
                boxShadow: hoveredPropId === property.id ? '0 10px 25px -5px rgba(59, 130, 246, 0.25)' : 'none',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <PropertyCard
                property={property}
                isFavorite={favorites.includes(property.id)}
                isCompared={comparedIds.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onToggleCompare={onToggleCompare}
                onSelectProperty={onSelectProperty}
                onOpenScheduler={onOpenScheduler}
                onOpenCalculator={onOpenCalculator}
                onOpenChat={onOpenChat}
                onOpenVirtualTour={onOpenVirtualTour}
                showTotalCost={showTotalCost}
              />
            </div>
          ))
        )}
      </div>

      {/* Right Column: Sticky Interactive Leaflet Map */}
      <div style={{
        position: 'sticky',
        top: '85px',
        height: 'calc(94vh - 90px)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <RealLeafletMap
          properties={properties}
          selectedProperty={properties.find(p => p.id === hoveredPropId) || selectedMapProp}
          onSelectProperty={(prop) => {
            setSelectedMapProp(prop);
            onSelectProperty(prop);
          }}
        />
      </div>
    </div>
  );
}
