import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Phone, 
  Mail, 
  QrCode,
  ShieldCheck,
  Share2
} from 'lucide-react';

export default function PropertyPdfModal({ property, onClose }) {
  if (!property) return null;

  const effectivePrice = property.transactionType === 'Aluguel'
    ? property.rentPrice || 2500
    : property.price || 500000;

  const pricePerM2 = property.area > 0 ? Math.round(effectivePrice / property.area) : 0;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin + '/?prop=' + property.id)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1300,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '850px',
        width: '100%',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-2xl)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        {/* Modal Top Action Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Building2 size={20} color="#38bdf8" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
              Ficha Técnica do Imóvel (Pronta para PDF / Impressão)
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={handlePrint}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}
            >
              <Printer size={16} />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              style={{
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
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
        </div>

        {/* Printable Sheet Canvas */}
        <div 
          id="printable-property-sheet"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            backgroundColor: '#ffffff',
            color: '#1e293b'
          }}
        >
          {/* Header Banner on Sheet */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #0284c7',
            paddingBottom: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>Imóvel<span style={{ color: '#0284c7' }}>HUB</span></span>
                <span style={{ fontSize: '0.72rem', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                  FICHA TÉCNICA OFICIAL
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                Portal Imobiliário Unificado • Referência: #{property.id}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Data de Emissão: {new Date().toLocaleDateString('pt-BR')}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669' }}>✓ Anúncio Verificado</div>
            </div>
          </div>

          {/* Main Title & Address */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span style={{ backgroundColor: '#0284c7', color: '#ffffff', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 800 }}>
                {property.transactionType || 'Venda'}
              </span>
              <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
                {property.type} {property.subType ? `• ${property.subType}` : ''}
              </span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, margin: '0.3rem 0' }}>
              {property.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.88rem' }}>
              <MapPin size={16} color="#0284c7" />
              <span>{property.address} - {property.neighborhood}, {property.city} ({property.state})</span>
            </div>
          </div>

          {/* Photos Grid (Up to 3 photos in PDF layout) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: property.images && property.images.length > 1 ? '2fr 1fr' : '1fr',
            gap: '0.75rem',
            height: '240px',
            marginBottom: '1.5rem'
          }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', height: '100%' }}>
              <img
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                alt={property.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {property.images && property.images.length > 1 && (
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '0.75rem', height: '100%' }}>
                <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <img
                    src={property.images[1] || property.images[0]}
                    alt="Foto secundária"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <img
                    src={property.images[2] || property.images[0]}
                    alt="Foto secundária"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Key Metrics Bar */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1rem 1.25rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: 600 }}>VALOR PRINCIPAL</span>
              <strong style={{ fontSize: '1.35rem', color: '#0284c7', fontWeight: 800 }}>
                R$ {effectivePrice.toLocaleString('pt-BR')}
                {property.transactionType === 'Aluguel' && <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>/mês</span>}
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: 600 }}>VALOR DO M²</span>
              <strong style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 700 }}>
                R$ {pricePerM2.toLocaleString('pt-BR')}/m²
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: 600 }}>CONDOMÍNIO</span>
              <strong style={{ fontSize: '1rem', color: '#334155', fontWeight: 700 }}>
                {property.condoFee ? `R$ ${property.condoFee}/mês` : 'Isento / Não inf.'}
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', fontWeight: 600 }}>IPTU ESTIMADO</span>
              <strong style={{ fontSize: '1rem', color: '#334155', fontWeight: 700 }}>
                {property.iptu ? `R$ ${property.iptu}/ano` : 'Isento / Não inf.'}
              </strong>
            </div>
          </div>

          {/* Specifications Pills */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#ffffff' }}>
              <strong style={{ fontSize: '1.15rem', color: '#0f172a', display: 'block' }}>{property.area || '-'} m²</strong>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Área Útil</span>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#ffffff' }}>
              <strong style={{ fontSize: '1.15rem', color: '#0f172a', display: 'block' }}>{property.bedrooms || '-'}</strong>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Quartos ({property.suites || 0} suítes)</span>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#ffffff' }}>
              <strong style={{ fontSize: '1.15rem', color: '#0f172a', display: 'block' }}>{property.bathrooms || '-'}</strong>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Banheiros</span>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#ffffff' }}>
              <strong style={{ fontSize: '1.15rem', color: '#0f172a', display: 'block' }}>{property.parkingSpots || '-'}</strong>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Vagas de Garagem</span>
            </div>
          </div>

          {/* Description & Highlights */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.6rem' }}>
              DESCRIÇÃO DO IMÓVEL
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, whiteSpace: 'pre-line', margin: 0 }}>
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          {property.amenities && property.amenities.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.6rem' }}>
                CARACTERÍSTICAS &amp; COMODIDADES
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                {property.amenities.slice(0, 12).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#475569' }}>
                    <CheckCircle2 size={13} color="#059669" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Contact & QR Code Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #0f172a',
            paddingTop: '1rem',
            marginTop: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>ATENDIMENTO &amp; VISITAS</div>
              <strong style={{ fontSize: '1rem', color: '#0f172a', display: 'block' }}>
                {property.advertiser?.name || 'Central de Vendas ImóvelHUB'}
              </strong>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.3rem', fontSize: '0.8rem', color: '#334155' }}>
                <span>📞 {property.advertiser?.phone || '(11) 98765-4321'}</span>
                <span>✉️ {property.advertiser?.email || 'contato@imovelhub.com.br'}</span>
                <span>CRECI: {property.advertiser?.creci || '123456-F'}</span>
              </div>
            </div>

            {/* QR Code */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={qrUrl}
                alt="QR Code do Imóvel"
                style={{ width: '70px', height: '70px', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px' }}
              />
              <span style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.2rem', fontWeight: 700 }}>
                Escaneie p/ ver online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
