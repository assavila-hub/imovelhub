import React from 'react';
import { Building2, Users, BadgeCheck, Zap } from 'lucide-react';

export default function StatsCounterWidget() {
  const stats = [
    { icon: Building2, value: '+1.500', label: 'Imóveis Ativos', desc: 'Nas principais capitais do Brasil' },
    { icon: Users, value: '+950', label: 'Famílias Atendidas', desc: 'Compradores e Inquilinos felizes' },
    { icon: BadgeCheck, value: '100%', label: 'Corretores Credenciados', desc: 'Com verificação oficial do CRECI' },
    { icon: Zap, value: '28 Dias', label: 'Tempo Médio de Venda', desc: 'Rapidez e divulgação nos portais' }
  ];

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      padding: '2rem 1.5rem',
      margin: '3rem 0',
      boxShadow: 'var(--shadow-xl)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.75rem',
        textAlign: 'center'
      }}>
        {stats.map((item, i) => {
          const IconComp = item.icon;
          return (
            <div key={i} style={{ padding: '0.5rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem auto'
              }}>
                <IconComp size={24} color="#38bdf8" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '4px' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '2px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
