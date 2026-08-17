import React, { useState } from 'react';
import { X, FileText, CheckCircle, ShieldCheck, DollarSign, Clock, User, Phone } from 'lucide-react';

export default function FormalProposalModal({
  property,
  onClose,
  currentUser,
  onSendProposalToChat
}) {
  const initialOffer = property?.price || 500000;
  const [offerPrice, setOfferPrice] = useState(initialOffer);
  const [downPayment, setDownPayment] = useState(Math.round(initialOffer * 0.2));
  const [validityHours, setValidityHours] = useState(48);
  const [buyerName, setBuyerName] = useState(currentUser ? currentUser.name : '');
  const [buyerPhone, setBuyerPhone] = useState(currentUser ? currentUser.phone : '');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!property) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!offerPrice || !buyerName || !buyerPhone) return;

    const proposalText = `📄 PROPOSTA FORMAL DE COMPRA REGISTRADA:\n` +
      `• Valor Ofertado: R$ ${Number(offerPrice).toLocaleString('pt-BR')}\n` +
      `• Entrada / Sinal: R$ ${Number(downPayment).toLocaleString('pt-BR')}\n` +
      `• Validade da Proposta: ${validityHours} horas\n` +
      `• Proponente: ${buyerName} (${buyerPhone})\n` +
      (notes ? `• Obs: ${notes}` : '');

    setIsSuccess(true);
    setTimeout(() => {
      onSendProposalToChat(property.id, proposalText);
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1350 }} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: '#0f172a',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={22} color="#38bdf8" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Emissão de Proposta Formal de Compra</h2>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{property.title}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', maxHeight: 'calc(85vh - 80px)', overflowY: 'auto' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'rgba(5, 150, 105, 0.15)',
                color: 'var(--color-quinto)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <CheckCircle size={38} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Proposta Registrada com Sucesso!</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Sua proposta formal foi enviada para a caixa de entrada do vendedor no Chat ImóvelHUB com validade de {validityHours}h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                  Valor Ofertado para Compra (R$)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 820000"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  required
                  style={{ width: '100%', fontSize: '1.1rem', fontWeight: 800 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Valor de Entrada / Sinal (R$)</label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Prazo de Validade</label>
                  <select
                    value={validityHours}
                    onChange={(e) => setValidityHours(Number(e.target.value))}
                    style={{ width: '100%' }}
                  >
                    <option value={24}>24 horas</option>
                    <option value={48}>48 horas (Recomendado)</option>
                    <option value={72}>72 horas</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Nome do Proponente</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Observações / Condições Especiais</label>
                <textarea
                  placeholder="Ex: Proposta sujeita à aprovação de financiamento bancário no Banco do Brasil..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  style={{ width: '100%' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
              >
                Gerar e Enviar Proposta Formal
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
