import React, { useRef } from 'react';
import { X, ArrowLeftRight, Trash2, CheckCircle2, Building2, Download, Trophy, Sparkles, DollarSign, Award } from 'lucide-react';

export default function PropertyCompareModal({
  comparedProperties = [],
  onClose,
  onRemoveFromCompare,
  onSelectProperty
}) {
  const tableRef = useRef(null);

  if (!comparedProperties || comparedProperties.length === 0) {
    return (
      <div className="modal-overlay" style={{ zIndex: 1300 }} onClick={onClose}>
        <div className="modal-content" style={{ maxWidth: '500px', padding: '2rem', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
          <ArrowLeftRight size={48} color="var(--color-loft)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Nenhum Imóvel no Comparador</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Clique no ícone de comparação nos cards dos imóveis para comparar suas características e valores lado a lado.
          </p>
          <button className="btn btn-primary" onClick={onClose}>Voltar aos Imóveis</button>
        </div>
      </div>
    );
  }

  // Calculate Best Cost-Benefit Highlights
  let minM2Id = null;
  let minM2Val = Infinity;
  let maxAreaId = null;
  let maxAreaVal = -Infinity;
  let minCondoId = null;
  let minCondoVal = Infinity;

  comparedProperties.forEach(p => {
    const area = p.area || 1;
    const price = p.transactionType === 'Venda' ? (p.price || 0) : (p.rentPrice || p.price || 0);
    const m2 = Math.round(price / area);
    if (m2 < minM2Val && m2 > 0) {
      minM2Val = m2;
      minM2Id = p.id;
    }
    if (p.area > maxAreaVal) {
      maxAreaVal = p.area;
      maxAreaId = p.id;
    }
    const condo = p.condoFee || 0;
    if (condo < minCondoVal && condo > 0) {
      minCondoVal = condo;
      minCondoId = p.id;
    }
  });

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1300 }} onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '1120px', 
          width: '95vw',
          padding: 0,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: '#0f172a',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'rgba(255, 71, 87, 0.15)', color: 'var(--color-loft)' }}>
              <ArrowLeftRight size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Comparador Side-by-Side ImóvelHUB</h2>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Análise comparativa detalhada de {comparedProperties.length} {comparedProperties.length === 1 ? 'imóvel' : 'imóveis'} com inteligência de custo-benefício
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleExportPdf}
              style={{
                borderColor: '#38bdf8',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 700
              }}
              title="Salvar ou Imprimir Relatório Comparativo em PDF"
            >
              <Download size={15} />
              <span>Exportar PDF</span>
            </button>

            <button onClick={onClose} style={{ border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div style={{ padding: '1.5rem', overflowX: 'auto', maxHeight: '75vh' }} ref={tableRef}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '650px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem', width: '200px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  Atributo / Métrica
                </th>
                {comparedProperties.map((prop) => (
                  <th key={prop.id} style={{ textAlign: 'center', padding: '1rem', borderBottom: '2px solid var(--border-color)', minWidth: '240px' }}>
                    <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                      <img
                        src={prop.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'}
                        alt=""
                        style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                      />
                      <button
                        onClick={() => onRemoveFromCompare(prop.id)}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: 'rgba(239, 68, 68, 0.9)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                        }}
                        title="Remover do comparador"
                      >
                        <Trash2 size={14} />
                      </button>

                      {/* Best price/m2 highlight tag */}
                      {prop.id === minM2Id && comparedProperties.length > 1 && (
                        <div style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '8px',
                          backgroundColor: '#10b981',
                          color: '#fff',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                        }}>
                          <Trophy size={11} />
                          <span>Melhor R$/m²</span>
                        </div>
                      )}
                    </div>
                    <strong style={{ fontSize: '0.92rem', display: 'block', height: '2.4em', overflow: 'hidden', lineHeight: 1.25 }}>
                      {prop.title}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cód: #{prop.id}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Row: Preço */}
              <tr>
                <td style={{ padding: '0.9rem 1rem', fontWeight: 800, borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
                  Preço do Imóvel
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} style={{ padding: '0.9rem 1rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.15rem' }}>
                    {prop.transactionType === 'Venda' ? `R$ ${(prop.price || 0).toLocaleString('pt-BR')}` : `R$ ${(prop.rentPrice || prop.price || 0).toLocaleString('pt-BR')}/mês`}
                  </td>
                ))}
              </tr>

              {/* Row: Valor por m² com Destaque Inteligente */}
              <tr>
                <td style={{ padding: '0.9rem 1rem', fontWeight: 800, borderBottom: '1px solid var(--border-color)' }}>
                  Preço por m²
                </td>
                {comparedProperties.map((prop) => {
                  const safeArea = prop.area || 1;
                  const safeVal = prop.transactionType === 'Venda' ? (prop.price || 0) : (prop.rentPrice || prop.price || 0);
                  const m2Val = Math.round(safeVal / safeArea);
                  const isBestM2 = prop.id === minM2Id && comparedProperties.length > 1;

                  return (
                    <td key={prop.id} style={{ padding: '0.9rem 1rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', backgroundColor: isBestM2 ? 'rgba(16, 185, 129, 0.08)' : 'transparent' }}>
                      <div style={{ fontWeight: 800, color: isBestM2 ? '#10b981' : 'var(--text-main)', fontSize: '0.95rem' }}>
                        R$ {m2Val.toLocaleString('pt-BR')}/m²
                      </div>
                      {isBestM2 && (
                        <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 800 }}>
                          🏆 Menor Custo por m²
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Row: Área com Destaque */}
              <tr>
                <td style={{ padding: '0.9rem 1rem', fontWeight: 800, borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
                  Área Útil
                </td>
                {comparedProperties.map((prop) => {
                  const isMaxArea = prop.id === maxAreaId && comparedProperties.length > 1;
                  return (
                    <td key={prop.id} style={{ padding: '0.9rem 1rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', backgroundColor: isMaxArea ? 'rgba(59, 130, 246, 0.08)' : 'transparent' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isMaxArea ? 'var(--color-primary-light)' : 'var(--text-main)' }}>
                        {prop.area} m²
                      </div>
                      {isMaxArea && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-primary-light)', fontWeight: 800 }}>
                          ✨ Maior Espaço
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Row: Quartos & Vagas */}
              <tr>
                <td style={{ padding: '0.9rem 1rem', fontWeight: 800, borderBottom: '1px solid var(--border-color)' }}>
                  Quartos / Vagas
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} style={{ padding: '0.9rem 1rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>{prop.bedrooms || 0}</strong> {prop.bedrooms === 1 ? 'quarto' : 'quartos'} • <strong>{prop.parkingSpots || 0}</strong> {prop.parkingSpots === 1 ? 'vaga' : 'vagas'}
                  </td>
                ))}
              </tr>

              {/* Row: Condomínio & IPTU com Destaque de Economia */}
              <tr>
                <td style={{ padding: '0.9rem 1rem', fontWeight: 800, borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
                  Condomínio + IPTU
                </td>
                {comparedProperties.map((prop) => {
                  const isBestCondo = prop.id === minCondoId && comparedProperties.length > 1;
                  return (
                    <td key={prop.id} style={{ padding: '0.9rem 1rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', backgroundColor: isBestCondo ? 'rgba(16, 185, 129, 0.08)' : 'transparent' }}>
                      <div style={{ fontWeight: 700 }}>
                        R$ {(prop.condoFee || 0).toLocaleString('pt-BR')} <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>(cond)</span> + R$ {(prop.iptu || 0).toLocaleString('pt-BR')} <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>(iptu)</span>
                      </div>
                      {isBestCondo && (
                        <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 800 }}>
                          💰 Mais Econômico
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Row: Localização */}
              <tr>
                <td style={{ padding: '0.9rem 1rem', fontWeight: 800, borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
                  Bairro &amp; Cidade
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} style={{ padding: '0.9rem 1rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>{prop.neighborhood}</strong>, {prop.city} - {prop.state}
                  </td>
                ))}
              </tr>

              {/* Row: Diferenciais & Comodidades */}
              <tr>
                <td style={{ padding: '0.9rem 1rem', fontWeight: 800, borderBottom: '1px solid var(--border-color)' }}>
                  Principais Diferenciais
                </td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} style={{ padding: '0.9rem 1rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', justifyContent: 'center' }}>
                      {(prop.amenities || []).slice(0, 3).map((am, i) => (
                        <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                          {am}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row: Action Button */}
              <tr>
                <td style={{ padding: '1.25rem 1rem', backgroundColor: 'var(--bg-main)' }}></td>
                {comparedProperties.map((prop) => (
                  <td key={prop.id} style={{ padding: '1.25rem 1rem', textAlign: 'center', backgroundColor: 'var(--bg-main)' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      style={{ width: '100%', fontWeight: 800 }}
                    >
                      Ver Detalhes do Imóvel ➔
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
