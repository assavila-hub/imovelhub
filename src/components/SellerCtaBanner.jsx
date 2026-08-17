import React from 'react';
import { PlusCircle, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function SellerCtaBanner({ onOpenPostProperty }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
      color: '#ffffff',
      borderRadius: 'var(--radius-xl)',
      padding: '2.5rem 2rem',
      margin: '3.5rem 0',
      boxShadow: 'var(--shadow-xl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '650px', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          color: '#38bdf8',
          padding: '0.35rem 0.85rem',
          borderRadius: '999px',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          <Sparkles size={14} />
          <span>Para Proprietários e Imobiliárias</span>
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Quer Vender ou Alugar seu Imóvel com Rapidez?
        </h2>

        <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          Anuncie gratuitamente no **ImóvelHUB** e alcance milhares de compradores diariamente. Ganhe avaliação gratuita por m² e divulgação prioritária no nosso ecossistema imobiliário.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-accent"
            onClick={onOpenPostProperty}
            style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem', fontWeight: 800 }}
          >
            <PlusCircle size={18} />
            <span>Anunciar Imóvel Grátis</span>
          </button>
        </div>
      </div>

      {/* Decorative Glow Badge */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        zIndex: 2,
        minWidth: '220px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38bdf8' }}>0%</div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Taxa para Anunciar</div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Publicação imediata em 2 minutos</div>
      </div>
    </div>
  );
}
