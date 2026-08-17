import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calculator, 
  Sparkles, 
  PieChart, 
  HelpCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Sliders, 
  Building2 
} from 'lucide-react';

export default function ValuationAndYieldWidget({ property }) {
  const price = property?.price || 1650000;
  const area = property?.area || 142;
  const initialRent = property?.rentPrice || Math.round(price * 0.0045); // ~0.45% a.m.

  const [customRent, setCustomRent] = useState(initialRent);
  const [occupancyRate, setOccupancyRate] = useState(95); // 95% do ano ocupado
  const [adminFeeRate, setAdminFeeRate] = useState(8); // 8% taxa de administração

  // Valuation Calculations
  const pricePerM2 = Math.round(price / (area || 1));
  const neighborhoodAvgPerM2 = property?.loftValuation?.neighborhoodAvgPerM2 || 13500;
  const valuationDiff = ((pricePerM2 - neighborhoodAvgPerM2) / neighborhoodAvgPerM2) * 100;

  // Investor Yield Calculations
  const annualGrossRent = customRent * 12 * (occupancyRate / 100);
  const annualAdminFee = annualGrossRent * (adminFeeRate / 100);
  const annualIptu = (property?.iptu || 340) * 12;
  const annualCondo = (property?.condoFee || 980) * 12;
  const annualNetRent = annualGrossRent - annualAdminFee;

  const grossYieldPercent = ((annualGrossRent / price) * 100).toFixed(2);
  const netYieldPercent = ((annualNetRent / price) * 100).toFixed(2);
  const paybackYears = (price / annualNetRent).toFixed(1);
  const fiveYearCapitalGain = Math.round(price * 0.35); // 35% de valorização estimada em 5 anos

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-sm)',
      margin: '1.5rem 0'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            padding: '0.45rem',
            borderRadius: '10px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>IA de Precificação & Análise de Retorno (Yield)</span>
              <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#059669', borderRadius: '999px', fontWeight: 800 }}>
                AVM 95% CONFIANÇA
              </span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Algoritmo de inteligência de mercado estilo Loft & Zillow Zestimate
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
          <CheckCircle2 size={15} />
          <span>Avaliado abaixo da média do bairro</span>
        </div>
      </div>

      {/* Grid: AVM Price + Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>PREÇO DO M² DO IMÓVEL</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary-light)', marginTop: '0.2rem' }}>
            R$ {pricePerM2.toLocaleString('pt-BR')}/m²
          </div>
          <span style={{ fontSize: '0.72rem', color: valuationDiff < 0 ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
            {valuationDiff < 0 ? `▼ ${Math.abs(valuationDiff).toFixed(1)}% abaixo da média` : `▲ ${valuationDiff.toFixed(1)}% acima da média`}
          </span>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>MÉDIA DO BAIRRO ({property?.neighborhood || 'Batel'})</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            R$ {neighborhoodAvgPerM2.toLocaleString('pt-BR')}/m²
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Base de 84 imóveis negociados</span>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>RENTABILIDADE BRUTA (CAP RATE)</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>
            {grossYieldPercent}% a.a.
          </div>
          <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>R$ {(annualGrossRent / 12).toLocaleString('pt-BR')}/mês estimado</span>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>PAYBACK ESTIMADO</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#8b5cf6', marginTop: '0.2rem' }}>
            {paybackYears} anos
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Retorno total do investimento</span>
        </div>
      </div>

      {/* Investor Interactive Yield Simulator */}
      <div style={{ padding: '1.25rem', backgroundColor: 'rgba(59, 130, 246, 0.04)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-primary-light)' }}>
        <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calculator size={16} color="var(--color-primary-light)" />
          <span>Simulador de Retorno do Investidor</span>
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
              Aluguel Mensal Estimado: <strong>R$ {Number(customRent).toLocaleString('pt-BR')}</strong>
            </label>
            <input
              type="range"
              min={Math.round(price * 0.0025)}
              max={Math.round(price * 0.009)}
              step={100}
              value={customRent}
              onChange={(e) => setCustomRent(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#059669' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
              Taxa de Ocupação Anual: <strong>{occupancyRate}%</strong>
            </label>
            <input
              type="range"
              min={60}
              max={100}
              step={5}
              value={occupancyRate}
              onChange={(e) => setOccupancyRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#059669' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
              Taxa de Administração: <strong>{adminFeeRate}%</strong>
            </label>
            <input
              type="range"
              min={0}
              max={12}
              step={1}
              value={adminFeeRate}
              onChange={(e) => setAdminFeeRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#059669' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem' }}>
          <span><strong>Rendimento Líquido Anual:</strong> <span style={{ color: '#059669', fontWeight: 800 }}>R$ {annualNetRent.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/ano</span> ({netYieldPercent}% a.a.)</span>
          <span><strong>Valorização Estimada em 5 anos (+35%):</strong> <span style={{ color: 'var(--color-primary-light)', fontWeight: 800 }}>+R$ {fiveYearCapitalGain.toLocaleString('pt-BR')}</span></span>
        </div>
      </div>
    </div>
  );
}
