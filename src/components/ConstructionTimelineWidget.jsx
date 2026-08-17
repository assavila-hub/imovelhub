import React from 'react';
import { HardHat, Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function ConstructionTimelineWidget({ property }) {
  if (!property || (!property.isLaunch && !property.title.includes('Lançamento') && !property.title.includes('Novo'))) return null;

  const stages = [
    { name: 'Fundação e Terreno', percent: 100 },
    { name: 'Estrutura e Alvenaria', percent: 85 },
    { name: 'Instalações Elétricas e Hidráulicas', percent: 70 },
    { name: 'Revestimento e Acabamento', percent: 45 }
  ];

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <HardHat size={22} color="var(--color-accent)" />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Estágio de Evolução da Obra</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Acompanhamento técnico de construção</span>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          color: 'var(--color-quinto)',
          padding: '0.4rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Calendar size={14} />
          <span>Entrega: Dez/2026</span>
        </div>
      </div>

      {/* Progress Bars Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {stages.map((stage, i) => (
          <div key={i} style={{ backgroundColor: 'var(--bg-main)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              <span>{stage.name}</span>
              <span style={{ color: 'var(--color-primary-light)' }}>{stage.percent}%</span>
            </div>
            <div style={{ height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${stage.percent}%`, height: '100%', backgroundColor: 'var(--color-accent)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
