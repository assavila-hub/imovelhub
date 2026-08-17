import React, { useState } from 'react';
import { PhoneCall, CheckCircle, ShieldCheck, Sparkles, Send } from 'lucide-react';

export default function QuickConsultationWidget({ showToast }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitted(true);
    if (showToast) showToast('Solicitação de Ligação Recebida! Um corretor ligará em 5 minutos.');
    setTimeout(() => {
      setName('');
      setPhone('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#ffffff',
      borderRadius: 'var(--radius-xl)',
      padding: '2.5rem 2rem',
      margin: '3.5rem 0',
      boxShadow: 'var(--shadow-xl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '2rem'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          color: '#38bdf8',
          padding: '0.35rem 0.85rem',
          borderRadius: '999px',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          <PhoneCall size={14} />
          <span>Atendimento Imediato (Quarter)</span>
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem' }}>
          Receba uma Ligação de um Corretor Credenciado
        </h2>

        <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6 }}>
          Digite seu nome e telefone para que um especialista de atendimento ligue para tirar todas as suas dúvidas sobre imóveis e financiamento em até 5 minutos.
        </p>
      </div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        minWidth: '300px',
        flex: '1 1 300px',
        maxWidth: '420px'
      }}>
        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <CheckCircle size={36} color="#34d399" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Solicitação Enviada!</h4>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Um especialista ligará em breve para {phone}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '0.85rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>Seu Nome</label>
              <input
                type="text"
                placeholder="Ex: Carlos Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>Telefone / WhatsApp</label>
              <input
                type="tel"
                placeholder="(11) 99999-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-accent"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.92rem', fontWeight: 800 }}
            >
              <Send size={16} />
              <span>Solicitar Ligação Grátis</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
