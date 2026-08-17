import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  FileCheck, 
  ClipboardCheck, 
  Key, 
  ArrowRight, 
  Sparkles,
  Building2,
  Phone,
  User
} from 'lucide-react';

const TRANSACTION_STAGES = [
  {
    id: 'stage-1',
    stepNumber: 1,
    title: 'Proposta Formal de Compra / Locação',
    status: 'completed', // 'completed' | 'in_progress' | 'pending'
    date: '10/08/2026 às 14:30',
    icon: FileText,
    badge: 'Aceita pelo Proprietário',
    badgeColor: '#059669',
    description: 'Proposta pré-contratual enviada no valor de R$ 850.000 com 20% de entrada e saldo financiado Caixa.',
    actionLabel: 'Ver Proposta Formal',
    actionTarget: 'proposal'
  },
  {
    id: 'stage-2',
    stepNumber: 2,
    title: 'Análise de Crédito & Garantia Locatícia',
    status: 'completed',
    date: '12/08/2026 às 11:15',
    icon: ShieldCheck,
    badge: 'Crédito Pré-Aprovado',
    badgeColor: '#059669',
    description: 'Documentos do comprador validados pela instituição financeira sem pendências ou restrições cadastrais.',
    actionLabel: 'Ver Detalhes do Crédito',
    actionTarget: 'guarantees'
  },
  {
    id: 'stage-3',
    stepNumber: 3,
    title: 'Contrato Digital com Assinatura Eletrônica',
    status: 'in_progress',
    date: 'Em andamento (prazo 48h)',
    icon: FileCheck,
    badge: 'Aguardando Assinaturas (2/3)',
    badgeColor: '#f59e0b',
    description: 'Minuta contratual gerada com validade jurídica ICP-Brasil. Assinado pelo comprador e corretor; aguardando proprietário.',
    actionLabel: 'Acessar Contrato Digital',
    actionTarget: 'contract'
  },
  {
    id: 'stage-4',
    stepNumber: 4,
    title: 'Laudo de Vistoria de Entrada Digital',
    status: 'pending',
    date: 'Próxima Etapa',
    icon: ClipboardCheck,
    badge: 'Agendamento Liberado',
    badgeColor: '#64748b',
    description: 'Vistoria detalhada com fotos em alta resolução de pintura, elétrica, hidráulica e mobília antes da entrega das chaves.',
    actionLabel: 'Agendar Vistoria',
    actionTarget: 'inspection'
  },
  {
    id: 'stage-5',
    stepNumber: 5,
    title: 'Liberação & Entrega Oficial das Chaves',
    status: 'pending',
    date: 'Etapa Final',
    icon: Key,
    badge: 'Pós-Vistoria',
    badgeColor: '#64748b',
    description: 'Termo de entrega de chaves e liberação do acesso ao condomínio para mudança imediata.',
    actionLabel: 'Ver Checklist de Mudança',
    actionTarget: 'moving_checklist'
  }
];

export default function UnifiedTransactionTimelineModal({
  isOpen,
  onClose,
  property,
  onOpenStageAction
}) {
  const [stages, setStages] = useState(TRANSACTION_STAGES);

  if (!isOpen) return null;

  const currentProperty = property || {
    id: 'prop-demo',
    title: 'Apartamento Alto Padrão em Moema',
    address: 'Av. Ibirapuera, 1420 - Moema, São Paulo (SP)',
    price: 850000,
    advertiser: { name: 'Fernanda Corretora Prime', phone: '(11) 98765-4321', creci: '123456-F' }
  };

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
          maxWidth: '850px',
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Clock size={22} color="#38bdf8" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Timeline Unificada da Transação Imobiliária
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Acompanhamento ponta a ponta: Proposta ➔ Contrato ➔ Vistoria ➔ Chaves
              </span>
            </div>
          </div>
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

        {/* Property Overview Header Bar */}
        <div style={{
          backgroundColor: 'var(--bg-main)',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              IMÓVEL EM NEGOCIAÇÃO
            </div>
            <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{currentProperty.title}</strong>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>{currentProperty.address}</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Status Geral</div>
            <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#d97706', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800 }}>
              ● 60% Concluído (Etapa 3 de 5)
            </span>
          </div>
        </div>

        {/* Timeline Stepper Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = stage.status === 'completed';
            const isInProgress = stage.status === 'in_progress';

            return (
              <div 
                key={stage.id}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  position: 'relative'
                }}
              >
                {/* Connecting vertical line */}
                {idx < stages.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '36px',
                    left: '18px',
                    bottom: '-16px',
                    width: '3px',
                    backgroundColor: isCompleted ? '#059669' : 'var(--border-color)',
                    zIndex: 1
                  }} />
                )}

                {/* Step Circle Indicator */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? '#059669' : (isInProgress ? '#0284c7' : 'var(--bg-main)'),
                  color: isCompleted || isInProgress ? '#ffffff' : 'var(--text-muted)',
                  border: isCompleted || isInProgress ? 'none' : '2px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  zIndex: 2,
                  boxShadow: isInProgress ? '0 0 12px rgba(2, 132, 199, 0.5)' : 'none'
                }}>
                  {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={18} />}
                </div>

                {/* Stage Detail Card */}
                <div style={{
                  flex: 1,
                  backgroundColor: isInProgress ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-main)',
                  border: isInProgress ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.85rem'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', maxWidth: '520px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {stage.stepNumber}. {stage.title}
                      </strong>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        backgroundColor: 'var(--bg-card)',
                        color: stage.badgeColor,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        border: `1px solid ${stage.badgeColor}`
                      }}>
                        {stage.badge}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                      {stage.description}
                    </p>

                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      🕒 {stage.date}
                    </span>
                  </div>

                  {/* Stage Quick Action Button */}
                  <button
                    className={`btn btn-sm ${isInProgress ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => {
                      if (onOpenStageAction) onOpenStageAction(stage.actionTarget, currentProperty);
                      onClose();
                    }}
                    style={{ fontWeight: 800, gap: '0.35rem', whiteSpace: 'nowrap' }}
                  >
                    <span>{stage.actionLabel}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
