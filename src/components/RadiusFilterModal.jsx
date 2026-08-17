import React, { useState } from 'react';
import { MapPin, Navigation, X, Check, Compass, Target } from 'lucide-react';

const NOTABLE_LANDMARKS = [
  { name: "Avenida Paulista (Masp / Metrô Trianon)", lat: -23.5615, lng: -46.6560, city: "São Paulo" },
  { name: "Estação Pinheiros (Metrô / Trem CPTM)", lat: -23.5668, lng: -46.7028, city: "São Paulo" },
  { name: "Parque Ibirapuera (Portão 7)", lat: -23.5874, lng: -46.6576, city: "São Paulo" },
  { name: "Estação Faria Lima (Largo da Batata)", lat: -23.5673, lng: -46.6934, city: "São Paulo" },
  { name: "Vila Olímpia (Shopping JK Iguatemi)", lat: -23.5912, lng: -46.6905, city: "São Paulo" },
  { name: "Copacabana (Posto 4)", lat: -22.9711, lng: -43.1825, city: "Rio de Janeiro" },
  { name: "Praça do Japão (Batel)", lat: -25.4431, lng: -49.2872, city: "Curitiba" },
  { name: "Savassi (Praça da Savassi)", lat: -19.9388, lng: -43.9377, city: "Belo Horizonte" }
];

export default function RadiusFilterModal({
  isOpen,
  onClose,
  activeRadiusFilter,
  onApplyRadiusFilter,
  onClearRadiusFilter
}) {
  const [selectedRadius, setSelectedRadius] = useState(activeRadiusFilter?.radiusKm || 3);
  const [selectedPoint, setSelectedPoint] = useState(
    activeRadiusFilter || NOTABLE_LANDMARKS[0]
  );
  const [customSearch, setCustomSearch] = useState('');
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUseGps = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada no seu navegador.");
      return;
    }
    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGpsLoading(false);
        const userLoc = {
          name: "📍 Minha Localização Atual (GPS)",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          city: "Detectada"
        };
        setSelectedPoint(userLoc);
      },
      (err) => {
        setIsGpsLoading(false);
        alert("Não foi possível obter sua localização atual via GPS.");
      }
    );
  };

  const handleApply = () => {
    onApplyRadiusFilter({
      ...selectedPoint,
      radiusKm: Number(selectedRadius)
    });
    onClose();
  };

  const filteredLandmarks = NOTABLE_LANDMARKS.filter(lm => 
    lm.name.toLowerCase().includes(customSearch.toLowerCase()) ||
    lm.city.toLowerCase().includes(customSearch.toLowerCase())
  );

  return (
    <div className="modal-overlay" style={{ zIndex: 1400 }} onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '560px', 
          width: '95vw', 
          padding: 0, 
          borderRadius: 'var(--radius-lg)', 
          overflow: 'hidden',
          backgroundColor: 'var(--bg-card)'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.2rem 1.5rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', borderRadius: '8px', backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
              <Compass size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Busca por Raio e Proximidade</h3>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Encontre imóveis no raio exato de onde você trabalha ou estuda</span>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', width: '28px', height: '28px', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '78vh', overflowY: 'auto' }}>
          
          {/* 1. Escolha do Raio (km) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                1. Defina a Distância Máxima do Perímetro:
              </label>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>
                Raio de {selectedRadius} km
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[1, 2, 3, 5, 10, 15].map(km => (
                <button
                  key={km}
                  type="button"
                  onClick={() => setSelectedRadius(km)}
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.2rem',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedRadius === km ? '2px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                    backgroundColor: selectedRadius === km ? 'var(--color-primary-light)' : 'var(--bg-main)',
                    color: selectedRadius === km ? '#ffffff' : 'var(--text-main)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {km} km
                </button>
              ))}
            </div>
          </div>

          {/* 2. Ponto Central de Referência */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                2. Ponto Central de Referência:
              </label>
              <button
                type="button"
                onClick={handleUseGps}
                disabled={isGpsLoading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-primary-light)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                <Navigation size={13} />
                <span>{isGpsLoading ? 'Obtendo GPS...' : 'Usar meu GPS Atual'}</span>
              </button>
            </div>

            {/* Selected Point Badge */}
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              border: '1.5px solid var(--color-primary-light)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={18} color="var(--color-primary-light)" />
                <div>
                  <strong style={{ fontSize: '0.88rem', display: 'block' }}>{selectedPoint?.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {selectedPoint?.city} • Lat: {selectedPoint?.lat?.toFixed(3)}, Lng: {selectedPoint?.lng?.toFixed(3)}
                  </span>
                </div>
              </div>
              <span style={{
                fontSize: '0.7rem',
                backgroundColor: 'var(--color-primary-light)',
                color: '#fff',
                padding: '0.2rem 0.5rem',
                borderRadius: '999px',
                fontWeight: 800
              }}>
                Selecionado
              </span>
            </div>

            {/* Search Filter for Landmarks */}
            <input
              type="text"
              placeholder="Buscar ponto (ex: Metrô, Paulista, Ibirapuera, Batel...)"
              value={customSearch}
              onChange={(e) => setCustomSearch(e.target.value)}
              style={{ width: '100%', marginBottom: '0.5rem', fontSize: '0.82rem', padding: '0.5rem 0.75rem' }}
            />

            {/* List of Landmarks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '170px', overflowY: 'auto' }}>
              {filteredLandmarks.map((lm, idx) => {
                const isSelected = selectedPoint?.name === lm.name;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedPoint(lm)}
                    style={{
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-main)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <MapPin size={14} color={isSelected ? "var(--color-primary-light)" : "var(--text-muted)"} />
                      <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 500 }}>{lm.name}</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{lm.city}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-main)'
        }}>
          {activeRadiusFilter ? (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => {
                onClearRadiusFilter();
                onClose();
              }}
              style={{ color: '#ef4444', borderColor: '#ef4444' }}
            >
              Remover Raio
            </button>
          ) : (
            <span />
          )}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleApply} style={{ fontWeight: 800 }}>
              Aplicar Raio de {selectedRadius} km ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
