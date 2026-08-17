import React from 'react';
import { Search, MessageSquare, Key, Sparkles, ArrowRight } from 'lucide-react';

export default function ThreeStepsWidget() {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: '1. Encontre o Imóvel Ideal',
      desc: 'Filtre por preço, m², bairro e raio no mapa interativo com avaliação de mercado Loft.'
    },
    {
      step: '02',
      icon: MessageSquare,
      title: '2. Negocie com o Vendedor',
      desc: 'Converse no Chat em Tempo Real e envie propostas formais de compra pré-contratuais.'
    },
    {
      step: '03',
      icon: Key,
      title: '3. Pegue as Chaves',
      desc: 'Agende visitas online com segurança e calcule ITBI e custas de cartório em 1 clique.'
    }
  ];

  return (
    <div style={{
      backgroundColor: 'var(--bg-main)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: '3rem 2rem',
      margin: '3.5rem 0'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
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
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={14} />
          <span>Processo Simples e Transparente</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Como Funciona o ImóvelHUB em 3 Passos
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {steps.map((s, idx) => {
          const IconComp = s.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '20px',
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--border-color)',
                opacity: 0.6
              }}>
                {s.step}
              </div>

              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <IconComp size={28} color="var(--color-primary-light)" />
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
