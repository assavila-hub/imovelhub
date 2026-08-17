import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  QrCode, 
  Barcode, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Lock, 
  Copy, 
  Check 
} from 'lucide-react';
import { PROMOTION_PLANS } from '../mockData/users';

export default function CheckoutModal({
  property,
  onClose,
  onPaymentSuccess
}) {
  const [selectedPlan, setSelectedPlan] = useState(PROMOTION_PLANS[1]); // Default to ZAP Destaque R$ 49.90
  const [paymentMethod, setPaymentMethod] = useState('pix'); // 'pix', 'card', 'boleto'
  
  // Card test inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!property) return null;

  const mockPixCode = "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000520400005303986540549.905802BR5925IMOVELHUB CLASSIFICADOS6009SAO PAULO62070503***6304E2CA";

  const handleFillTestCard = () => {
    setCardNumber('4000 0000 0000 0000');
    setCardHolder('TESTE APROVADO');
    setCardExpiry('12/30');
    setCardCvv('123');
  };

  const handleSimulatePayment = (e) => {
    e?.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        onPaymentSuccess({
          propertyId: property.id,
          plan: selectedPlan,
          method: paymentMethod
        });
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(mockPixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1400 }} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '780px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
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
            <CreditCard size={22} color="var(--color-primary-light)" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Checkout e Promoção de Anúncio</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ambiente Seguro com Modo de Teste Sandbox</span>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', maxHeight: 'calc(85vh - 80px)', overflowY: 'auto' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{
                width: '72px',
                height: '72px',
                backgroundColor: 'rgba(5, 150, 105, 0.15)',
                color: 'var(--color-quinto)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <CheckCircle size={44} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Pagamento Aprovado! (Modo Teste)</h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                O plano <strong>{selectedPlan.name}</strong> foi ativado com sucesso para o imóvel:<br />
                <strong style={{ color: 'var(--text-main)' }}>"{property.title}"</strong>
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* Left Column: Plan Selection */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  1. Escolha o Plano de Destaque
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {PROMOTION_PLANS.map((plan) => {
                    const isSelected = selectedPlan.id === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan)}
                        style={{
                          padding: '1rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.06)' : 'var(--bg-card)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                          <span className={`badge ${plan.badgeClass}`}>{plan.badge}</span>
                          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                            {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>{plan.name}</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          {plan.features.map((feat, i) => (
                            <li key={i}>✓ {feat}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Payment Method Sandbox */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  <Sparkles size={14} />
                  <span>MODO DE TESTES (SANDBOX) ATIVO</span>
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  2. Método de Pagamento
                </h3>

                {/* Payment Tabs (PIX | Cartão | Boleto) */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: paymentMethod === 'pix' ? '1px solid var(--color-quinto)' : '1px solid var(--border-color)',
                      backgroundColor: paymentMethod === 'pix' ? 'rgba(5, 150, 105, 0.12)' : 'var(--bg-card)',
                      color: paymentMethod === 'pix' ? 'var(--color-quinto)' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <QrCode size={16} />
                    <span>PIX Teste</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: paymentMethod === 'card' ? '1px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                      backgroundColor: paymentMethod === 'card' ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-card)',
                      color: paymentMethod === 'card' ? 'var(--color-primary-light)' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <CreditCard size={16} />
                    <span>Cartão Teste</span>
                  </button>
                </div>

                {/* Tab Content: PIX */}
                {paymentMethod === 'pix' && (
                  <div style={{ textAlign: 'center', backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '140px', height: '140px', backgroundColor: '#fff', padding: '10px', margin: '0 auto 1rem auto', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                      {/* Simulated QR Code SVG */}
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <rect x="10" y="10" width="30" height="30" fill="#0f172a" />
                        <rect x="60" y="10" width="30" height="30" fill="#0f172a" />
                        <rect x="10" y="60" width="30" height="30" fill="#0f172a" />
                        <rect x="50" y="50" width="20" height="20" fill="#0f172a" />
                        <rect x="75" y="75" width="15" height="15" fill="#0f172a" />
                      </svg>
                    </div>

                    <button
                      className="btn btn-outline btn-sm"
                      onClick={handleCopyPix}
                      style={{ marginBottom: '1rem', width: '100%', fontSize: '0.8rem' }}
                    >
                      {copiedPix ? <Check size={14} color="var(--color-quinto)" /> : <Copy size={14} />}
                      <span>{copiedPix ? 'Chave PIX Copiada!' : 'Copiar Chave PIX de Teste'}</span>
                    </button>

                    <button
                      className="btn"
                      onClick={handleSimulatePayment}
                      disabled={isProcessing}
                      style={{
                        width: '100%',
                        backgroundColor: 'var(--color-quinto)',
                        color: '#ffffff',
                        padding: '0.85rem',
                        fontWeight: 700,
                        fontSize: '0.95rem'
                      }}
                    >
                      {isProcessing ? 'Aprovando Pagamento...' : 'Simular Pagamento PIX Aprovado'}
                    </button>
                  </div>
                )}

                {/* Tab Content: Credit Card */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handleSimulatePayment} style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cartão de Crédito Sandbox</span>
                      <button
                        type="button"
                        onClick={handleFillTestCard}
                        style={{ border: 'none', background: 'none', color: 'var(--color-primary-light)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Preencher Dados de Teste
                      </button>
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <input
                        type="text"
                        placeholder="Número do Cartão (ex: 4000 0000 0000 0000)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <input
                        type="text"
                        placeholder="Nome Impresso no Cartão"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        required
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Validade (12/30)"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVV (123)"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isProcessing}
                      style={{ width: '100%', padding: '0.85rem', fontWeight: 700 }}
                    >
                      {isProcessing ? 'Processando Pagamento...' : `Pagar R$ ${selectedPlan.price.toFixed(2)} com Cartão Teste`}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
