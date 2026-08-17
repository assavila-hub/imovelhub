import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MessageSquare, 
  Calendar, 
  FileCheck, 
  DollarSign, 
  BarChart3,
  Sparkles
} from 'lucide-react';

const VIEWS_DATA = [
  { day: '01/08', views: 420, leads: 18, proposals: 2 },
  { day: '04/08', views: 580, leads: 26, proposals: 4 },
  { day: '07/08', views: 640, leads: 32, proposals: 5 },
  { day: '10/08', views: 820, leads: 44, proposals: 7 },
  { day: '13/08', views: 950, leads: 52, proposals: 9 },
  { day: '16/08', views: 1240, leads: 68, proposals: 12 }
];

const FUNNEL_STAGES = [
  { name: '1. Impressões de Busca', count: 48500, percent: 100, color: '#38bdf8' },
  { name: '2. Visualizações de Imóveis', count: 12450, percent: 25.6, color: '#0284c7' },
  { name: '3. Visitas Agendadas', count: 980, percent: 7.8, color: '#f59e0b' },
  { name: '4. Propostas Enviadas', count: 215, percent: 2.2, color: '#8b5cf6' },
  { name: '5. Negócios Concluídos', count: 64, percent: 0.65, color: '#10b981' }
];

export default function AdminAnalyticsCharts({ properties = [], totalRevenue = 14500 }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Math for SVG Line Chart (0 to 1300 views)
  const chartHeight = 160;
  const chartWidth = 520;
  const maxVal = 1400;

  const points = VIEWS_DATA.map((d, idx) => {
    const x = (idx / (VIEWS_DATA.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - (d.views / maxVal) * (chartHeight - 30) - 15;
    return { ...d, x, y };
  });

  const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  // Property distribution by type
  const typeCounts = properties.reduce((acc, p) => {
    const t = p.type || 'Apartamento';
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const totalProps = properties.length || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top 4 KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>VISUALIZAÇÕES (30D)</span>
            <Eye size={18} color="var(--color-primary-light)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>12.450</div>
          <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>▲ +18.4% vs mês anterior</span>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LEADS &amp; CONTATOS</span>
            <MessageSquare size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>980</div>
          <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>▲ +24.1% conversão</span>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PROPOSTAS FORMAIS</span>
            <FileCheck size={18} color="#8b5cf6" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>215</div>
          <span style={{ fontSize: '0.72rem', color: '#8b5cf6', fontWeight: 700 }}>● 64 fechamentos</span>
        </div>

        <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>RECEITA DE ANÚNCIOS</span>
            <DollarSign size={18} color="#059669" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#059669' }}>R$ {totalRevenue.toLocaleString('pt-BR')}</div>
          <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>▲ +32.0% lucro</span>
        </div>
      </div>

      {/* Grid: Interactive Line Chart + Funnel Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* Real Dynamic Line Chart (Visualizações & Tráfego) */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>Evolução de Visualizações &amp; Tráfego</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Acessos únicos por período</span>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.72rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--color-primary-light)' }}>● Visualizações</span>
              <span style={{ color: '#059669' }}>● Leads</span>
            </div>
          </div>

          {/* SVG Canvas Line Chart */}
          <div style={{ position: 'relative', width: '100%', height: '180px' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary-light)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--color-primary-light)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[30, 70, 110, 150].map((gl, i) => (
                <line key={i} x1="20" y1={gl} x2={chartWidth - 20} y2={gl} stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3 3" />
              ))}

              {/* Area Fill */}
              <path d={areaD} fill="url(#chartGradient)" />

              {/* Line Curve */}
              <path d={pathD} fill="none" stroke="var(--color-primary-light)" strokeWidth="3.5" strokeLinecap="round" />

              {/* Data Points */}
              {points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint?.day === p.day ? 6 : 4.5}
                  fill="var(--bg-card)"
                  stroke="var(--color-primary-light)"
                  strokeWidth="3"
                  style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                  onMouseEnter={() => setHoveredPoint(p)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}
            </svg>

            {/* Tooltip on Point Hover */}
            {hoveredPoint && (
              <div style={{
                position: 'absolute',
                top: `${(hoveredPoint.y / chartHeight) * 100 - 35}%`,
                left: `${(hoveredPoint.x / chartWidth) * 100}%`,
                transform: 'translateX(-50%)',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 20
              }}>
                <div>Data: {hoveredPoint.day}</div>
                <div>{hoveredPoint.views} visualizações • {hoveredPoint.leads} leads</div>
              </div>
            )}
          </div>

          {/* X Axis Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem', padding: '0 0.5rem' }}>
            {VIEWS_DATA.map((d, i) => (
              <span key={i}>{d.day}</span>
            ))}
          </div>
        </div>

        {/* Funnel Conversion Chart */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 0.2rem 0' }}>Funil de Conversão Comercial</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Eficiência da jornada de compra e locação</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '1rem 0' }}>
            {FUNNEL_STAGES.map((stg, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{stg.name}</span>
                  <strong style={{ color: stg.color }}>
                    {stg.count.toLocaleString('pt-BR')} ({stg.percent}%)
                  </strong>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, Math.max(10, stg.percent * 1.5))}%`, height: '100%', backgroundColor: stg.color, borderRadius: '4px', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
            💡 Taxa de fechamento final: <strong>0.65% sobre o topo do funil</strong> (acima da média de mercado de 0.4%).
          </div>
        </div>
      </div>

      {/* Distribution by Property Type Bar */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem'
      }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.85rem' }}>
          Distribuição do Catálogo por Tipo de Imóvel ({properties.length} imóveis ativos)
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
          {Object.entries(typeCounts).map(([type, count]) => {
            const pct = ((count / totalProps) * 100).toFixed(0);
            return (
              <div key={type} style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{type}</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--text-main)', display: 'block' }}>{count} un.</strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-primary-light)', fontWeight: 800 }}>{pct}% do catálogo</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
