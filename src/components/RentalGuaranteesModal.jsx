import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  DollarSign, 
  FileCheck, 
  AlertCircle, 
  Sparkles, 
  Lock, 
  Award, 
  ArrowRight,
  Calculator,
  UserCheck
} from 'lucide-react';

export default function RentalGuaranteesModal({
  isOpen,
  onClose,
  property,
  currentUser
}) {
  const rent = property?.rentPrice || 4800;
  const condo = property?.condoFee || 980;
  const iptu = property?.iptu || 340;
  const totalPackage = rent + condo + iptu;

  const [selectedGuarantee, setSelectedGuarantee] = useState('seguro_fianca');
  const [familyIncome, setFamilyIncome] = useState(16000);
  const [cpf, setCpf] = useState('321.654.987-00');
  const [name, setName] = useState(currentUser?.name || 'Dr. Fernando Guimarães');
  const [scoreResult, setScoreResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Guarantee Costs
  const seguroFiancaMonthly = (rent * 0.085).toFixed(2);
  const tituloCapitalizacaoTotal = (rent * 4).toFixed(2);
  const cartaoCreditoMonthly = (rent * 0.09).toFixed(2);

  const requiredIncome = totalPackage * 3; // Renda recomendada 3x o pacote
  const incomeCommitment = ((totalPackage / (familyIncome || 1)) * 100).toFixed(1);

  const handleSimulateCredit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (familyIncome >= requiredIncome * 0.85) {
        setScoreResult({
          status: 'approved',
          score: 840,
          maxRentAllowed: Math.round(familyIncome * 0.35),
          badge: 'Crédito Pré-Aprovado',
          message: 'Parabéns! Sua renda familiar é compatível e sua garantia foi pré-aprovada sem necessidade de fiador.'
        });
      } else {
        setScoreResult({
          status: 'review',
          score: 620,
          maxRentAllowed: Math.round(familyIncome * 0.35),
          badge: 'Análise Complementar Requerida',
          message: 'A renda informada está ligeiramente abaixo de 3x o pacote. Recomendamos compor renda com cônjuge ou optar pelo Título de Capitalização.'
        });
      }
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 1400 }} onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '920px', 
          width: '95vw', 
          maxHeight: '90vh', 
          padding: 0, 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-card)'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #059669, #10b981)',
              padding: '0.5rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Garantias Locatícias & Análise de Crédito Instantânea</h3>
                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '999px', fontWeight: 700 }}>
                  ALUGUE SEM FIADOR
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Simulação de Seguro Fiança Porto Seguro, Título de Capitalização e Cartão com aprovação em 1 minuto
              </span>
            </div>
          </div>

          <button 
            onClick={onClose} 
            style={{ border: 'none', background: 'rgba(255, 255, 255, 0.1)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Package Summary Bar */}
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>{property?.title || 'Imóvel em Destaque'}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Aluguel R$ {rent.toLocaleString('pt-BR')} + Cond. R$ {condo} + IPTU R$ {iptu}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>PACOTE TOTAL DE LOCAÇÃO</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                R$ {totalPackage.toLocaleString('pt-BR')}/mês
              </div>
            </div>
          </div>

          {/* 3 Guarantees Options Cards */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.85rem' }}>Escolha a Modalidade de Garantia:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {/* Option 1: Seguro Fiança */}
              <div
                onClick={() => setSelectedGuarantee('seguro_fianca')}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: selectedGuarantee === 'seguro_fianca' ? '2px solid #059669' : '1px solid var(--border-color)',
                  backgroundColor: selectedGuarantee === 'seguro_fianca' ? 'rgba(5, 150, 105, 0.05)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {selectedGuarantee === 'seguro_fianca' && (
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#059669', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</span>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <ShieldCheck size={18} color="#059669" />
                  <strong style={{ fontSize: '0.92rem' }}>Seguro Fiança Porto Seguro</strong>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669', margin: '0.4rem 0' }}>
                  R$ {seguroFiancaMonthly}/mês
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, display: 'block' }}>
                  Sem fiador, sem caução inicial. Cobre inadimplência, condomínio, IPTU e danos ao imóvel.
                </span>
              </div>

              {/* Option 2: Cartão de Crédito */}
              <div
                onClick={() => setSelectedGuarantee('cartao')}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: selectedGuarantee === 'cartao' ? '2px solid #0284c7' : '1px solid var(--border-color)',
                  backgroundColor: selectedGuarantee === 'cartao' ? 'rgba(2, 132, 199, 0.05)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {selectedGuarantee === 'cartao' && (
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#0284c7', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</span>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <CreditCard size={18} color="#0284c7" />
                  <strong style={{ fontSize: '0.92rem' }}>Caução no Cartão de Crédito</strong>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7', margin: '0.4rem 0' }}>
                  R$ {cartaoCreditoMonthly}/mês
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, display: 'block' }}>
                  Parcelamento em até 12x no cartão de crédito sem comprometer o limite total do aluguel.
                </span>
              </div>

              {/* Option 3: Titulo de Capitalizacao */}
              <div
                onClick={() => setSelectedGuarantee('titulo')}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: selectedGuarantee === 'titulo' ? '2px solid #8b5cf6' : '1px solid var(--border-color)',
                  backgroundColor: selectedGuarantee === 'titulo' ? 'rgba(139, 92, 246, 0.05)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {selectedGuarantee === 'titulo' && (
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#8b5cf6', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</span>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <Award size={18} color="#8b5cf6" />
                  <strong style={{ fontSize: '0.92rem' }}>Título de Capitalização</strong>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#8b5cf6', margin: '0.4rem 0' }}>
                  R$ {Number(tituloCapitalizacaoTotal).toLocaleString('pt-BR')} (Único)
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, display: 'block' }}>
                  Depósito caução de 4x o aluguel 100% resgatável com correção TR ao final do contrato.
                </span>
              </div>
            </div>
          </div>

          {/* Instant Credit Score Simulation Form */}
          <form onSubmit={handleSimulateCredit} style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <UserCheck size={18} color="var(--color-primary-light)" />
              <span>Análise Instantânea de Renda e Aprovação de Crédito</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Nome Completo</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>CPF do Titular</label>
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Renda Bruta Mensal Familiar: <strong>R$ {Number(familyIncome).toLocaleString('pt-BR')}</strong>
                </label>
                <input type="number" value={familyIncome} onChange={(e) => setFamilyIncome(Number(e.target.value))} step={500} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', fontSize: '0.85rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Renda mínima sugerida: <strong>R$ {requiredIncome.toLocaleString('pt-BR')}</strong> ({incomeCommitment}% de comprometimento)
              </span>

              <button type="submit" disabled={isAnalyzing} className="btn btn-primary btn-sm" style={{ fontWeight: 800 }}>
                {isAnalyzing ? 'Consultando Birôs de Crédito...' : 'Simular Aprovação Instantânea'}
              </button>
            </div>

            {/* Score Result Card */}
            {scoreResult && (
              <div style={{
                marginTop: '1.25rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: scoreResult.status === 'approved' ? '#f0fdf4' : '#fffbeb',
                border: scoreResult.status === 'approved' ? '1px solid #bbf7d0' : '1px solid #fde68a',
                color: scoreResult.status === 'approved' ? '#166534' : '#92400e'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.95rem' }}>
                  <CheckCircle2 size={20} color={scoreResult.status === 'approved' ? '#16a34a' : '#d97706'} />
                  <span>{scoreResult.badge} • Score Serasa Experian: {scoreResult.score}/1000</span>
                </div>
                <p style={{ fontSize: '0.82rem', margin: '0.4rem 0 0 0', lineHeight: 1.5 }}>
                  {scoreResult.message}
                </p>
                <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', fontWeight: 700 }}>
                  Limite Máximo de Aluguel Aprovado: R$ {scoreResult.maxRentAllowed.toLocaleString('pt-BR')}/mês
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
