import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, User, Phone, ShieldCheck } from 'lucide-react';

export default function VisitSchedulerModal({
  property,
  onClose,
  onConfirmSchedule
}) {
  const [selectedDate, setSelectedDate] = useState('Amanhã (Sexta-feira)');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!property) return null;

  const dates = [
    'Hoje (Quinta)',
    'Amanhã (Sexta)',
    'Sábado (15/08)',
    'Domingo (16/08)',
    'Segunda (17/08)'
  ];

  const times = ['09:00', '10:30', '11:45', '14:00', '15:30', '17:00'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone) return;

    setIsSuccess(true);
    setTimeout(() => {
      onConfirmSchedule({
        propertyId: property.id,
        propertyTitle: property.title,
        date: selectedDate,
        time: selectedTime,
        visitorName,
        visitorPhone
      });
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1300 }} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '540px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
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
            <Calendar size={22} color="var(--color-quinto)" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Agendamento de Visita Presencial</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Escolha o melhor dia e horário</span>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
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
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Visita Agendada com Sucesso!
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Confirmado para <strong>{selectedDate} às {selectedTime}</strong>.<br />
                Enviamos a confirmação por SMS para {visitorPhone}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Property Summary Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.85rem',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem'
              }}>
                <img
                  src={property.images[0]}
                  alt=""
                  style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>{property.title}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{property.neighborhood}, {property.city}</div>
                </div>
              </div>

              {/* 1. Date Selector Pills */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>
                  1. Selecione o Dia
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.3rem' }}>
                  {dates.map((dateStr) => (
                    <button
                      type="button"
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      style={{
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: selectedDate === dateStr ? '1px solid var(--color-quinto)' : '1px solid var(--border-color)',
                        backgroundColor: selectedDate === dateStr ? 'rgba(5, 150, 105, 0.12)' : 'var(--bg-card)',
                        color: selectedDate === dateStr ? 'var(--color-quinto)' : 'var(--text-main)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {dateStr}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Time Slot Pills */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>
                  2. Selecione o Horário
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {times.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      style={{
                        padding: '0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        border: selectedTime === t ? '1px solid var(--color-quinto)' : '1px solid var(--border-color)',
                        backgroundColor: selectedTime === t ? 'var(--color-quinto)' : 'var(--bg-card)',
                        color: selectedTime === t ? '#ffffff' : 'var(--text-main)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Contact Info */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>
                  3. Seus Dados de Contato
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input
                    type="text"
                    placeholder="Seu Nome Completo"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Telefone / WhatsApp ex: (11) 98888-7777"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--color-quinto)',
                  color: '#ffffff',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                Confirmar Agendamento Sem Custo
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
