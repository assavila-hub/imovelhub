import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export default function TestimonialsWidget() {
  const testimonials = [
    {
      id: 't-1',
      name: 'Mariana & Lucas',
      role: 'Compradores de Imóvel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      text: 'Conseguimos agendar as visitas online com agilidade pelo ImóvelHUB e fechar a proposta formal em menos de 48 horas! A transparência com o corretor credenciado no portal foi nota 100.',
      location: 'Apartamento em Moema, SP',
      rating: 5
    },
    {
      id: 't-2',
      name: 'Fernando Guimarães',
      role: 'Proprietário Anunciante',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      text: 'Anunciei minha casa de condomínio em Alphaville com a turbinada de Destaque ImóvelHUB. Tive 4 visitas agendadas na primeira semana e vendi pelo valor exato da avaliação.',
      location: 'Casa em Alphaville, Barueri',
      rating: 5
    },
    {
      id: 't-3',
      name: 'Beatriz Alcantara',
      role: 'Inquilina',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      text: 'A calculadora de ITBI e o simulador de parcelas no portal ajudaram muito a ter certeza dos custos antes de assinar. Atendimento rápido pelo Chat em Tempo Real!',
      location: 'Studio em Pinheiros, SP',
      rating: 5
    }
  ];

  return (
    <div style={{ margin: '3.5rem 0' }}>
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
          <span>Depoimentos Reais de Clientes</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          O que dizem os compradores e proprietários no ImóvelHUB
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.75rem'
      }}>
        {testimonials.map((t) => (
          <div
            key={t.id}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <Quote size={28} color="rgba(59, 130, 246, 0.2)" style={{ position: 'absolute', top: '16px', right: '16px' }} />

            <div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{t.text}"
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <img
                src={t.avatar}
                alt={t.name}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>{t.name}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-light)', fontWeight: 600 }}>
                  {t.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
