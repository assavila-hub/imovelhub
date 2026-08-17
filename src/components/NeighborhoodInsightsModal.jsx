import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Train, 
  GraduationCap, 
  Utensils, 
  TrendingUp, 
  Building2, 
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';

const NEIGHBORHOODS_DATA = [
  {
    name: 'Pinheiros',
    city: 'São Paulo',
    state: 'SP',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80',
    avgM2Price: 15800,
    appreciation12m: '+9.4%',
    description: 'Um dos bairros mais vibrantes e desejados de São Paulo, famoso pela vida cultural, polo gastronômico na Rua dos Pinheiros e excelente mobilidade com estações de metrô da Linha 4-Amarela e Linha 9-Esmeralda.',
    scores: {
      seguranca: 8.8,
      transporte: 9.8,
      educacao: 9.2,
      gastronomia: 9.9
    },
    highlights: [
      'Estações de Metrô Faria Lima e Fradique Coutinho',
      'Polo gastronômico e cafés premiados',
      'Proximidade com o Parque Villa-Lobos e Ciclovia',
      'Fácil acesso à Av. Brigadeiro Faria Lima e Marginal Pinheiros'
    ]
  },
  {
    name: 'Moema',
    city: 'São Paulo',
    state: 'SP',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    avgM2Price: 16900,
    appreciation12m: '+8.1%',
    description: 'Bairro nobre, plano e arborizado, perfeito para fazer tudo a pé. Vizinho ao Parque Ibirapuera, conta com shopping center de ponta, escolas bilíngues e infraestrutura médica de referência.',
    scores: {
      seguranca: 9.4,
      transporte: 9.1,
      educacao: 9.6,
      gastronomia: 9.5
    },
    highlights: [
      'A 5 minutos a pé do Parque Ibirapuera',
      'Estações Moema e Eucaliptos (Linha 5-Lilás)',
      'Bairro plano ideal para caminhadas e bicicletas',
      'Shopping Ibirapuera e alta densidade de serviços'
    ]
  },
  {
    name: 'Itaim Bibi',
    city: 'São Paulo',
    state: 'SP',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    avgM2Price: 19500,
    appreciation12m: '+11.2%',
    description: 'O epicentro financeiro e corporativo do país, concentrando sedes de multinacionais, fundos de investimento e os restaurantes mais conceituados do Brasil.',
    scores: {
      seguranca: 9.2,
      transporte: 8.9,
      educacao: 9.0,
      gastronomia: 9.9
    },
    highlights: [
      'Coração da Faria Lima e JK Iguatemi',
      'Proximidade com Parque do Povo',
      'Gastronomia internacional com estrelas Michelin',
      'Altíssima liquidez e valorização de aluguel'
    ]
  },
  {
    name: 'Copacabana',
    city: 'Rio de Janeiro',
    state: 'RJ',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80',
    avgM2Price: 13200,
    appreciation12m: '+7.5%',
    description: 'O cartão postal mais famoso do Brasil. Orla icônica, praia com calçadão movimentado e rede completa de comércio, metrô e serviços 24 horas por dia.',
    scores: {
      seguranca: 7.9,
      transporte: 9.5,
      educacao: 8.4,
      gastronomia: 9.3
    },
    highlights: [
      'Praia de Copacabana e Forte de Copacabana',
      '3 Estações de Metrô (Cardeal, Siqueira e Cantagalo)',
      'Intensa vida noturna e quiosques à beira-mar',
      'Alta demanda para aluguel de temporada'
    ]
  },
  {
    name: 'Batel',
    city: 'Curitiba',
    state: 'PR',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
    avgM2Price: 12400,
    appreciation12m: '+8.9%',
    description: 'Bairro mais sofisticado de Curitiba, com praças bem cuidadas, shoppings de luxo, edifícios imponentes e restaurantes de alta gastronomia na Praça da Espanha.',
    scores: {
      seguranca: 9.5,
      transporte: 9.0,
      educacao: 9.4,
      gastronomia: 9.7
    },
    highlights: [
      'Praça da Espanha e Praça do Japão',
      'Shopping Pátio Batel e Crystal',
      'Excelente padrão de segurança urbana',
      'Ruas arborizadas e arborização premiada'
    ]
  }
];

export default function NeighborhoodInsightsModal({
  isOpen,
  onClose,
  initialNeighborhood = 'Pinheiros',
  onSelectNeighborhood
}) {
  const [selectedNeighborhoodName, setSelectedNeighborhoodName] = useState(initialNeighborhood);

  if (!isOpen) return null;

  const currentNeighborhood = NEIGHBORHOODS_DATA.find(n => 
    n.name.toLowerCase() === selectedNeighborhoodName.toLowerCase()
  ) || NEIGHBORHOODS_DATA[0];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1400,
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
          maxWidth: '900px',
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
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin size={22} color="#38bdf8" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Guia &amp; Insights de Bairros ImóvelHUB
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Dados objetivos de segurança, mobilidade, preço do m² e valorização
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              border: 'none', 
              background: 'rgba(255,255,255,0.1)', 
              color: '#ffffff',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Neighborhood Selector Bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--bg-main)',
          borderBottom: '1px solid var(--border-color)',
          overflowX: 'auto'
        }}>
          {NEIGHBORHOODS_DATA.map((item) => (
            <button
              key={item.name}
              onClick={() => setSelectedNeighborhoodName(item.name)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: currentNeighborhood.name === item.name ? 800 : 600,
                border: currentNeighborhood.name === item.name ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                backgroundColor: currentNeighborhood.name === item.name ? 'var(--color-primary-light)' : 'var(--bg-card)',
                color: currentNeighborhood.name === item.name ? '#ffffff' : 'var(--text-main)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {item.name} ({item.city})
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Main Neighborhood Banner Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '180px' }}>
              <img
                src={currentNeighborhood.image}
                alt={currentNeighborhood.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-light)', fontSize: '0.8rem', fontWeight: 700 }}>
                  <MapPin size={14} />
                  <span>{currentNeighborhood.city} - {currentNeighborhood.state}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.2rem 0 0.5rem 0', color: 'var(--text-main)' }}>
                  Bairro {currentNeighborhood.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                  {currentNeighborhood.description}
                </p>
              </div>

              {/* Price / m² & Appreciation */}
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.85rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>PREÇO MÉDIO M²</span>
                  <strong style={{ fontSize: '1.15rem', color: 'var(--color-primary-light)', fontWeight: 800 }}>
                    R$ {currentNeighborhood.avgM2Price.toLocaleString('pt-BR')}/m²
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>VALORIZAÇÃO 12 MESES</span>
                  <strong style={{ fontSize: '1.15rem', color: '#059669', fontWeight: 800 }}>
                    {currentNeighborhood.appreciation12m}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Quality of Life Radar Scores (0 to 10) */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Índices de Qualidade de Vida &amp; Infraestrutura
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
              <div style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700 }}>
                    <ShieldCheck size={16} color="#059669" />
                    <span>Segurança</span>
                  </div>
                  <strong style={{ color: '#059669', fontSize: '1rem' }}>{currentNeighborhood.scores.seguranca} / 10</strong>
                </div>
                <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${currentNeighborhood.scores.seguranca * 10}%`, height: '100%', backgroundColor: '#059669' }} />
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700 }}>
                    <Train size={16} color="#0284c7" />
                    <span>Mobilidade &amp; Metrô</span>
                  </div>
                  <strong style={{ color: '#0284c7', fontSize: '1rem' }}>{currentNeighborhood.scores.transporte} / 10</strong>
                </div>
                <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${currentNeighborhood.scores.transporte * 10}%`, height: '100%', backgroundColor: '#0284c7' }} />
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700 }}>
                    <GraduationCap size={16} color="#8b5cf6" />
                    <span>Educação &amp; Escolas</span>
                  </div>
                  <strong style={{ color: '#8b5cf6', fontSize: '1rem' }}>{currentNeighborhood.scores.educacao} / 10</strong>
                </div>
                <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${currentNeighborhood.scores.educacao * 10}%`, height: '100%', backgroundColor: '#8b5cf6' }} />
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700 }}>
                    <Utensils size={16} color="#ec4899" />
                    <span>Gastronomia &amp; Lazer</span>
                  </div>
                  <strong style={{ color: '#ec4899', fontSize: '1rem' }}>{currentNeighborhood.scores.gastronomia} / 10</strong>
                </div>
                <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${currentNeighborhood.scores.gastronomia * 10}%`, height: '100%', backgroundColor: '#ec4899' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Checklist */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.65rem' }}>
              Diferenciais do Bairro
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem' }}>
              {currentNeighborhood.highlights.map((h, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: '#059669', fontWeight: 800 }}>✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Action to filter properties */}
          <div style={{
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-primary-light)' }}>
                Quer morar em {currentNeighborhood.name}?
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Veja todos os apartamentos, casas e coberturas disponíveis para compra e locação.
              </span>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (onSelectNeighborhood) onSelectNeighborhood(currentNeighborhood.name);
                onClose();
              }}
              style={{ fontWeight: 800, gap: '0.4rem' }}
            >
              <Search size={16} />
              <span>Ver Imóveis em {currentNeighborhood.name}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
