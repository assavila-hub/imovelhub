import React, { useState, useEffect } from 'react';
import { 
  X, 
  Users, 
  Plus, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  DollarSign,
  Building2,
  CheckCircle2
} from 'lucide-react';

const INITIAL_STAGES = [
  { id: 'novo', title: '1. Novo Lead', color: '#3b82f6', badge: 'Entrada' },
  { id: 'visita', title: '2. Visita Agendada', color: '#f59e0b', badge: 'Em campo' },
  { id: 'proposta', title: '3. Proposta Enviada', color: '#8b5cf6', badge: 'Negociação' },
  { id: 'documentos', title: '4. Documentação / Financiamento', color: '#ec4899', badge: 'Análise' },
  { id: 'fechado', title: '5. Negócio Fechado 🎉', color: '#10b981', badge: 'Sucesso' }
];

const DEFAULT_LEADS = [
  {
    id: 'lead-1',
    name: 'Carlos Alberto Ferreira',
    phone: '(11) 98765-4321',
    email: 'carlos.ferreira@email.com',
    propertyTitle: 'Apartamento Alto Padrão em Moema',
    stage: 'visita',
    value: 1250000,
    date: '2026-08-16',
    notes: 'Interesse em fechar com financiamento Caixa 80%.'
  },
  {
    id: 'lead-2',
    name: 'Juliana Mendes Rocha',
    phone: '(11) 97123-8899',
    email: 'juliana.mendes@email.com',
    propertyTitle: 'Studio Mobiliado Pinheiros',
    stage: 'proposta',
    value: 540000,
    date: '2026-08-15',
    notes: 'Enviou proposta formal de R$ 510.000 à vista.'
  },
  {
    id: 'lead-3',
    name: 'Rodrigo Santoro & Família',
    phone: '(11) 99887-1122',
    email: 'rodrigo.santoro@email.com',
    propertyTitle: 'Casa em Condomínio Fechado Alphaville',
    stage: 'novo',
    value: 2850000,
    date: '2026-08-16',
    notes: 'Deixou mensagem no chat pedindo agendamento para sábado.'
  },
  {
    id: 'lead-4',
    name: 'Dra. Vanessa Lima',
    phone: '(11) 96455-3344',
    email: 'vanessa.lima@clinica.com.br',
    propertyTitle: 'Conjunto Comercial Itaim Bibi',
    stage: 'documentos',
    value: 920000,
    date: '2026-08-14',
    notes: 'Contrato enviado para assinatura digital D4Sign.'
  },
  {
    id: 'lead-5',
    name: 'Eduardo Martins',
    phone: '(11) 95544-2211',
    email: 'eduardo.martins@email.com',
    propertyTitle: 'Cobertura Duplex Jardins',
    stage: 'fechado',
    value: 3900000,
    date: '2026-08-10',
    notes: 'Escritura pública lavrada e comissão faturada!'
  }
];

export default function LeadCrmKanbanModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('imovelhub_crm_leads');
    return saved ? JSON.parse(saved) : DEFAULT_LEADS;
  });

  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyTitle: '',
    value: '',
    stage: 'novo',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('imovelhub_crm_leads', JSON.stringify(leads));
  }, [leads]);

  if (!isOpen) return null;

  const moveStage = (leadId, direction) => {
    const stageIds = INITIAL_STAGES.map(s => s.id);
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const currentIndex = stageIds.indexOf(lead.stage);
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < stageIds.length) {
          return { ...lead, stage: stageIds[newIndex] };
        }
      }
      return lead;
    }));
  };

  const deleteLead = (leadId) => {
    if (confirm("Deseja realmente remover este lead?")) {
      setLeads(prev => prev.filter(l => l.id !== leadId));
    }
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadData.name) return;

    const newLead = {
      id: `lead-${Date.now()}`,
      name: newLeadData.name,
      phone: newLeadData.phone || '(11) 90000-0000',
      email: newLeadData.email || '',
      propertyTitle: newLeadData.propertyTitle || 'Imóvel em Destaque',
      value: Number(newLeadData.value || 500000),
      stage: newLeadData.stage || 'novo',
      date: new Date().toISOString().split('T')[0],
      notes: newLeadData.notes || ''
    };

    setLeads([newLead, ...leads]);
    setNewLeadData({ name: '', phone: '', email: '', propertyTitle: '', value: '', stage: 'novo', notes: '' });
    setShowNewLeadModal(false);
  };

  const totalPipelineValue = leads.reduce((acc, l) => acc + (l.value || 0), 0);

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
      padding: '1rem'
    }} onClick={onClose}>
      <div 
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '1200px',
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
          padding: '1.25rem 1.75rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.5rem', borderRadius: '8px' }}>
              <Users size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                CRM de Leads &amp; Funil de Vendas Imobiliário
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Pipeline Total: <strong>R$ {totalPipelineValue.toLocaleString('pt-BR')}</strong> em negociações ativas
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setShowNewLeadModal(true)}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800 }}
            >
              <Plus size={16} />
              <span>Novo Lead</span>
            </button>
            <button 
              onClick={onClose} 
              style={{ 
                border: 'none', 
                background: 'rgba(255,255,255,0.1)', 
                cursor: 'pointer', 
                color: '#ffffff',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Kanban Board Canvas */}
        <div style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          padding: '1.5rem',
          backgroundColor: 'var(--bg-main)',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(220px, 1fr))',
          gap: '1rem',
          alignItems: 'start'
        }}>
          {INITIAL_STAGES.map((stage) => {
            const stageLeads = leads.filter(l => l.stage === stage.id);
            const stageValue = stageLeads.reduce((acc, l) => acc + (l.value || 0), 0);

            return (
              <div 
                key={stage.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: 'calc(92vh - 150px)'
                }}
              >
                {/* Column Header */}
                <div style={{
                  padding: '0.85rem 1rem',
                  borderBottom: '1px solid var(--border-color)',
                  borderTop: `4px solid ${stage.color}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-main)'
                }}>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0 }}>{stage.title}</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      R$ {stageValue.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: stage.color,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '12px'
                  }}>
                    {stageLeads.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div style={{ padding: '0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                  {stageLeads.map((lead) => (
                    <div 
                      key={lead.id}
                      style={{
                        backgroundColor: 'var(--bg-main)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.85rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{lead.name}</strong>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0.6 }}
                          title="Excluir Lead"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-light)', fontWeight: 600 }}>
                        🏠 {lead.propertyTitle}
                      </span>

                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669' }}>
                        R$ {lead.value.toLocaleString('pt-BR')}
                      </div>

                      {lead.notes && (
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic', backgroundColor: 'var(--bg-card)', padding: '0.4rem', borderRadius: '4px' }}>
                          "{lead.notes}"
                        </p>
                      )}

                      {/* Contact & WhatsApp Action */}
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                        <a
                          href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=Olá ${lead.name}, tudo bem? Sou da equipe ImóvelHUB referente ao imóvel ${lead.propertyTitle}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            flex: 1,
                            backgroundColor: '#25d366',
                            color: '#ffffff',
                            padding: '0.35rem',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      {/* Move Stage Buttons */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                        <button
                          onClick={() => moveStage(lead.id, -1)}
                          disabled={stage.id === 'novo'}
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: stage.id === 'novo' ? 'not-allowed' : 'pointer',
                            color: stage.id === 'novo' ? '#cbd5e1' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 700
                          }}
                        >
                          <ChevronLeft size={14} /> Voltar
                        </button>
                        <button
                          onClick={() => moveStage(lead.id, 1)}
                          disabled={stage.id === 'fechado'}
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: stage.id === 'fechado' ? 'not-allowed' : 'pointer',
                            color: stage.id === 'fechado' ? '#cbd5e1' : 'var(--color-primary-light)',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 800
                          }}
                        >
                          Avançar <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      Nenhum lead nesta etapa
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SUB-MODAL: NOVO LEAD */}
      {showNewLeadModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1400, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', maxWidth: '480px', width: '100%', border: '1px solid var(--border-color)', padding: '1.5rem', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Adicionar Novo Lead ao CRM</h3>
              <button onClick={() => setShowNewLeadModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Nome Completo do Cliente *</label>
                <input type="text" required placeholder="Ex: Roberto Carlos" value={newLeadData.name} onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Telefone / WhatsApp</label>
                  <input type="text" placeholder="(11) 98765-4321" value={newLeadData.phone} onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Valor da Negociação (R$)</label>
                  <input type="number" placeholder="600000" value={newLeadData.value} onChange={(e) => setNewLeadData({ ...newLeadData, value: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Imóvel de Interesse</label>
                <input type="text" placeholder="Ex: Apartamento 3 dorms em Moema" value={newLeadData.propertyTitle} onChange={(e) => setNewLeadData({ ...newLeadData, propertyTitle: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Etapa Inicial</label>
                <select value={newLeadData.stage} onChange={(e) => setNewLeadData({ ...newLeadData, stage: e.target.value })} style={{ width: '100%', padding: '0.5rem' }}>
                  {INITIAL_STAGES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Observações</label>
                <textarea rows={2} placeholder="Ex: Tem FGTS e carro para permuta..." value={newLeadData.notes} onChange={(e) => setNewLeadData({ ...newLeadData, notes: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowNewLeadModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 800 }}>Salvar Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
