import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, DollarSign, Building2, CheckCircle2, Info } from 'lucide-react';

export default function ItbiCalculatorModal({
  property,
  onClose
}) {
  const initialPrice = property?.price || 850000;
  const [purchasePrice, setPurchasePrice] = useState(initialPrice);
  const [cityTaxRate, setCityTaxRate] = useState(() => {
    if (property?.city === 'São Paulo') return 3.0;
    if (property?.city === 'Rio de Janeiro') return 3.0;
    if (property?.city === 'Curitiba') return 2.7;
    return 2.5;
  });

  if (!property) return null;

  // Calculate costs
  const itbiValue = (purchasePrice * cityTaxRate) / 100;
  const notaryEscritura = Math.min(Math.max(purchasePrice * 0.007, 1200), 8500); // Tabela cartório estimativa
  const registryFee = Math.min(Math.max(purchasePrice * 0.005, 900), 6500);
  const totalExtraCosts = itbiValue + notaryEscritura + registryFee;
  const totalInvestment = purchasePrice + totalExtraCosts;

  return (
    <div className="modal-overlay" style={{ zIndex: 1350 }} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-main)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Calculator size={22} color="var(--color-primary-light)" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Simulador de ITBI e Custos de Cartório</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{property.city} - {property.state}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', maxHeight: 'calc(85vh - 80px)', overflowY: 'auto' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
              Valor da Negociação: R$ {purchasePrice.toLocaleString('pt-BR')}
            </label>
            <input
              type="range"
              min="100000"
              max="5000000"
              step="25000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary-light)' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
              Alíquota do ITBI Municipal
            </label>
            <select
              value={cityTaxRate}
              onChange={(e) => setCityTaxRate(Number(e.target.value))}
              style={{ width: '100%' }}
            >
              <option value={3.0}>São Paulo (3.0%)</option>
              <option value={3.0}>Rio de Janeiro (3.0%)</option>
              <option value={2.7}>Curitiba (2.7%)</option>
              <option value={3.0}>Belo Horizonte (3.0%)</option>
              <option value={2.5}>Outras Cidades (2.5% padrão)</option>
            </select>
          </div>

          {/* Detailed Costs Breakdown Table */}
          <div style={{
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '1.25rem',
            marginBottom: '1.25rem'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Detalhamento dos Custos de Transferência
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <span>1. Imposto ITBI ({cityTaxRate}%):</span>
              <strong>R$ {Math.round(itbiValue).toLocaleString('pt-BR')}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <span>2. Escritura Pública no Cartório:</span>
              <strong>R$ {Math.round(notaryEscritura).toLocaleString('pt-BR')}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
              <span>3. Registro da Imóvel no Cartório de R.I.:</span>
              <strong>R$ {Math.round(registryFee).toLocaleString('pt-BR')}</strong>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '0.85rem',
              borderTop: '2px solid var(--border-color)',
              fontSize: '1rem',
              fontWeight: 800,
              color: 'var(--color-primary)'
            }}>
              <span>Total de Documentação e Impostos:</span>
              <span>R$ {Math.round(totalExtraCosts).toLocaleString('pt-BR')}</span>
            </div>
          </div>

          {/* Grand Total Callout */}
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(5, 150, 105, 0.1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(5, 150, 105, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Investimento Total Necessário:</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-quinto)' }}>
                R$ {Math.round(totalInvestment).toLocaleString('pt-BR')}
              </div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={onClose}>
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
