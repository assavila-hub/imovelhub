import React, { useMemo } from 'react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { INITIAL_PROPERTIES } from '../mockData/properties';

export default function NeighborhoodsWidget({ 
  onSelectNeighborhood, 
  onOpenNeighborhoodInsights,
  properties = INITIAL_PROPERTIES 
}) {
  const propList = properties && properties.length > 0 ? properties : INITIAL_PROPERTIES;

  const dynamicNeighborhoods = useMemo(() => {
    const map = new Map();
    propList.forEach(p => {
      if (!p.neighborhood) return;
      const key = `${p.neighborhood}|${p.city || 'São Paulo'}|${p.state || 'SP'}`;
      if (!map.has(key)) {
        map.set(key, {
          name: p.neighborhood,
          city: p.city || 'São Paulo',
          state: p.state || 'SP',
          count: 0,
          totalPrice: 0,
          totalArea: 0,
          image: p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'
        });
      }
      const item = map.get(key);
      item.count += 1;
      const price = p.transactionType === 'Venda' ? p.price : (p.rentPrice ? p.rentPrice * 200 : 500000);
      if (price && p.area) {
        item.totalPrice += price;
        item.totalArea += p.area;
      }
    });

    return Array.from(map.values())
      .filter(n => n.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map((n, idx) => {
        const avgM2 = n.totalArea > 0 ? Math.round(n.totalPrice / n.totalArea) : 12000;
        return {
          id: `neigh-${idx + 1}`,
          name: n.name,
          city: n.city,
          state: n.state,
          count: n.count,
          avgPricePerM2: `R$ ${avgM2.toLocaleString('pt-BR')}/m²`,
          image: n.image
        };
      });
  }, [propList]);

  return (
    <div style={{ margin: '3.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: 'var(--color-primary-light)',
            padding: '0.3rem 0.8rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '0.5rem'
          }}>
            <Sparkles size={14} />
            <span>Localizações Reais com Imóveis Ativos</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Explore Imóveis por Bairros em Destaque
          </h2>
        </div>

        {onOpenNeighborhoodInsights && (
          <button
            className="btn btn-outline"
            onClick={() => onOpenNeighborhoodInsights()}
            style={{ fontWeight: 800, gap: '0.4rem' }}
          >
            <MapPin size={16} color="var(--color-primary-light)" />
            <span>Ver Índices &amp; Métricas dos Bairros</span>
          </button>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {dynamicNeighborhoods.map((neigh) => (
          <div
            key={neigh.id}
            onClick={() => onSelectNeighborhood(neigh.name)}
            style={{
              position: 'relative',
              height: '320px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            {/* Background Image */}
            <img
              src={neigh.image}
              alt={neigh.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)'
            }} />

            {/* Content Top Badge */}
            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#0f172a',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <MapPin size={12} color="var(--color-primary)" />
                <span>{neigh.city} - {neigh.state}</span>
              </span>
            </div>

            {/* Content Bottom Info */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem',
              color: '#ffffff'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                {neigh.name}
              </h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                color: '#cbd5e1',
                marginTop: '0.5rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <span style={{ fontWeight: 600 }}>{neigh.count} {neigh.count === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  color: '#38bdf8',
                  fontWeight: 700,
                  fontSize: '0.8rem'
                }}>
                  Explorar <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
