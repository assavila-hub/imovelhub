import React from 'react';
import { 
  Gavel, 
  Calendar, 
  Percent, 
  FileText, 
  ExternalLink, 
  Share2, 
  MapPin, 
  Heart, 
  CheckCircle2, 
  Building2, 
  DollarSign,
  Flame,
  ArrowRight
} from 'lucide-react';

export default function AuctionPropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty
}) {
  const valuation = property?.oldPrice || (property?.price ? Math.round(property.price * 1.6) : 2400000);
  const minBid = property?.price || 1200000;
  const discountPercent = Math.round(((valuation - minBid) / valuation) * 100);

  const firstAuctionDate = '28/08/2026 às 14:00';
  const secondAuctionDate = '05/09/2026 às 14:00 (50% do valor)';

  const whatsappMessage = `Olá! Gostaria de informações sobre o Leilão do imóvel ${encodeURIComponent(property.title)} (Lance Mínimo R$ ${minBid.toLocaleString('pt-BR')}) anunciado no ImóvelHUB.`;

  return (
    <div 
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        border: '2px solid #f59e0b',
        backgroundColor: 'var(--bg-card)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer'
      }}
      onClick={() => onSelectProperty && onSelectProperty(property)}
    >
      {/* Top Banner */}
      <div style={{
        backgroundColor: '#f59e0b',
        color: '#ffffff',
        padding: '0.4rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        fontWeight: 800,
        letterSpacing: '0.02em'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Gavel size={15} />
          <span>OPORTUNIDADE DE LEILÃO IMOBILIÁRIO</span>
        </div>
        <span style={{ backgroundColor: '#78350f', padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem' }}>
          {discountPercent}% DE DESCONTO
        </span>
      </div>

      {/* Image Container */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(property.id);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isFavorite ? '#ff4757' : '#ffffff'
          }}
        >
          <Heart size={18} fill={isFavorite ? '#ff4757' : 'none'} />
        </button>

        {/* Evaluation Discount Badge */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          backgroundColor: '#ef4444',
          color: '#ffffff',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <Flame size={14} />
          <span>Avaliação: R$ {valuation.toLocaleString('pt-BR')}</span>
        </div>
      </div>

      {/* Content Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.3rem' }}>
            <MapPin size={13} color="var(--color-primary-light)" />
            <span>{property.neighborhood}, {property.city} - {property.state}</span>
          </span>

          <h3 style={{ fontSize: '1rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            {property.title}
          </h3>

          {/* Pricing Box */}
          <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.25)', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
              Lance Inicial Mínimo (2º Leilão):
            </span>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#b45309' }}>
              R$ {minBid.toLocaleString('pt-BR')}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
              Economia estimada de R$ {(valuation - minBid).toLocaleString('pt-BR')}
            </span>
          </div>

          {/* Auction Dates */}
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={13} color="#f59e0b" />
              <span><strong>1º Leilão:</strong> {firstAuctionDate}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={13} color="#ef4444" />
              <span><strong>2º Leilão:</strong> {secondAuctionDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Edital do Leilão oficial aberto para ${property.title}. Baixando PDF regulatório.`);
            }}
            style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
          >
            <FileText size={14} />
            <span>Ver Edital</span>
          </button>

          <a
            href={`https://wa.me/5511999990000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-sm"
            style={{
              backgroundColor: '#25D366',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              textDecoration: 'none'
            }}
          >
            <span>WhatsApp</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
