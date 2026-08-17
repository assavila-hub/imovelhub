import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  User, 
  Calendar,
  Send,
  Award
} from 'lucide-react';

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Marcos Vinicius & Helena',
    role: 'Comprador Verificado',
    date: '10/08/2026',
    rating: 5,
    criteria: { atendimento: 5, pontualidade: 5, negociacao: 5, transparencia: 5 },
    comment: 'Excelente profissional! Nos auxiliou em toda a análise jurídica da matrícula e intermediação da proposta com o proprietário. Fechamos o imóvel dos sonhos em Pinheiros com total segurança.',
    verified: true,
    likes: 12
  },
  {
    id: 'rev-2',
    author: 'Renata Camargo',
    role: 'Locatária Verificada',
    date: '02/08/2026',
    rating: 5,
    criteria: { atendimento: 5, pontualidade: 4, negociacao: 5, transparencia: 5 },
    comment: 'Agilidade impressionante. Em menos de 24 horas fez o agendamento da visita, esclareceu as dúvidas sobre o pacote de condomínio e conduziu a assinatura digital com garantia sem fiador.',
    verified: true,
    likes: 8
  },
  {
    id: 'rev-3',
    author: 'Guilherme Siqueira',
    role: 'Investidor Imobiliário',
    date: '25/07/2026',
    rating: 5,
    criteria: { atendimento: 5, pontualidade: 5, negociacao: 5, transparencia: 5 },
    comment: 'Muito conhecedor da valorização do m² da região de Moema e Itaim. Me apresentou uma oportunidade de studio com yield acima de 7,5% a.a. Recomendo de olhos fechados.',
    verified: true,
    likes: 15
  }
];

export default function BrokerReviewsModal({
  isOpen,
  onClose,
  broker,
  onAddReview
}) {
  const [reviewsList, setReviewsList] = useState(DEFAULT_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    role: 'Comprador Verificado',
    rating: 5,
    comment: ''
  });

  if (!isOpen) return null;

  const averageRating = (reviewsList.reduce((acc, r) => acc + r.rating, 0) / (reviewsList.length || 1)).toFixed(1);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.author || !formData.comment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: formData.author,
      role: formData.role,
      date: new Date().toLocaleDateString('pt-BR'),
      rating: formData.rating,
      criteria: { atendimento: 5, pontualidade: 5, negociacao: 5, transparencia: 5 },
      comment: formData.comment,
      verified: true,
      likes: 1
    };

    setReviewsList([newRev, ...reviewsList]);
    if (onAddReview) onAddReview(newRev);
    setFormData({ author: '', role: 'Comprador Verificado', rating: 5, comment: '' });
    setShowForm(false);
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
          maxWidth: '750px',
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
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Award size={22} color="#f59e0b" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Avaliações &amp; Reputação Profissional
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {broker?.name || 'Corretor Credenciado'} • CRECI: {broker?.creci || '123456-F'}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              border: 'none', 
              background: 'rgba(255,255,255,0.1)', 
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

        {/* Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Top Score Summary Banner */}
          <div style={{
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: '#f59e0b',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{averageRating}</div>
                <div style={{ display: 'flex', gap: '2px', marginTop: '0.25rem' }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={12} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={18} color="#059669" />
                  <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Corretor Super Recomendado</strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                  100% de avaliações positivas baseadas em {reviewsList.length} atendimentos concluídos
                </p>
              </div>
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowForm(!showForm)}
              style={{ fontWeight: 800 }}
            >
              {showForm ? 'Cancelar Avaliação' : '⭐ Escrever Avaliação'}
            </button>
          </div>

          {/* Form to submit review */}
          {showForm && (
            <form 
              onSubmit={handleSubmitReview}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1.5px solid var(--color-primary-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>Deixar sua Avaliação Verificada</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Fernando Souza"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Perfil</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  >
                    <option value="Comprador Verificado">Comprador de Imóvel</option>
                    <option value="Locatário Verificado">Inquilino / Locatário</option>
                    <option value="Proprietário Vendedor">Proprietário Vendedor</option>
                    <option value="Investidor Imobiliário">Investidor Imobiliário</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Nota Geral (Estrelas)</label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.2rem'
                      }}
                    >
                      <Star
                        size={22}
                        fill={star <= formData.rating ? '#f59e0b' : 'none'}
                        color={star <= formData.rating ? '#f59e0b' : 'var(--text-muted)'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Seu Depoimento / Comentário *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Conte como foi o atendimento, a clareza nas negociações e a agilidade do corretor..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowForm(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 800 }}>Publicar Avaliação</button>
              </div>
            </form>
          )}

          {/* List of Verified Reviews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>Depoimentos de Clientes Reais ({reviewsList.length})</h4>
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{rev.author}</strong>
                      {rev.verified && (
                        <span style={{ fontSize: '0.68rem', backgroundColor: '#dcfce7', color: '#166534', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 800 }}>
                          ✓ Verificado
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {rev.role} • {rev.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={14} fill={s <= rev.rating ? '#f59e0b' : 'none'} color={s <= rev.rating ? '#f59e0b' : 'var(--text-muted)'} />
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  "{rev.comment}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <ThumbsUp size={13} color="var(--color-primary-light)" />
                  <span>{rev.likes} pessoas acharam esta avaliação útil</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
