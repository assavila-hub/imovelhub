import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  User, 
  Building2, 
  CheckCheck, 
  Sparkles, 
  Clock, 
  Calendar, 
  DollarSign,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { fetchChatMessages, sendChatMessage } from '../services/api';

export default function ChatHubModal({
  isOpen,
  onClose,
  currentUser,
  properties = [],
  initialProperty,
  onOpenScheduler
}) {
  // Find all active chat channels from properties
  const [selectedProperty, setSelectedProperty] = useState(() => {
    return initialProperty || properties[0];
  });

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'buying', 'selling'
  const chatEndRef = useRef(null);

  const loadMessages = async () => {
    if (!selectedProperty?.id) return;
    const data = await fetchChatMessages(selectedProperty.id);
    if (data) setMessages(data);
  };

  useEffect(() => {
    if (selectedProperty) {
      loadMessages();
    }
  }, [selectedProperty?.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedProperty) return;

    const textToSend = inputText;
    setInputText('');

    const senderRole = currentUser?.role === 'owner' || currentUser?.role === 'broker' ? 'Vendedor' : 'Comprador';
    const senderName = currentUser ? `${currentUser.name.split(' ')[0]} (${senderRole})` : `Comprador`;

    const newMsg = await sendChatMessage(selectedProperty.id, textToSend, senderName);
    setMessages(prev => [...prev, newMsg]);

    setTimeout(loadMessages, 1500);
  };

  // Build property chat channels list
  const chatChannels = properties.map(prop => {
    const isSeller = currentUser && (prop.advertiser?.name === currentUser.name || currentUser.role === 'owner' || currentUser.role === 'broker');
    return {
      property: prop,
      isSeller,
      lastMessage: messages.length > 0 ? messages[messages.length - 1] : { text: "Conversa iniciada...", time: "Hoje" }
    };
  });

  return (
    <div className="modal-overlay" style={{ zIndex: 1400 }} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '980px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MessageSquare size={24} color="#38bdf8" />
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Central de Mensagens Comprador x Vendedor</h2>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Negocie propostas e tire dúvidas diretamente sobre os imóveis</span>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={22} />
          </button>
        </div>

        {/* Modal Split View Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: '520px' }}>
          {/* Left Column: Channels List */}
          <div style={{ borderRight: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
            {/* Filter Tabs */}
            <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.35rem' }}>
              <button
                onClick={() => setActiveFilter('all')}
                style={{
                  flex: 1,
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeFilter === 'all' ? 'var(--bg-card)' : 'transparent',
                  color: activeFilter === 'all' ? 'var(--color-primary-light)' : 'var(--text-muted)'
                }}
              >
                Todas
              </button>
              <button
                onClick={() => setActiveFilter('buying')}
                style={{
                  flex: 1,
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeFilter === 'buying' ? 'var(--bg-card)' : 'transparent',
                  color: activeFilter === 'buying' ? 'var(--color-primary-light)' : 'var(--text-muted)'
                }}
              >
                Comprando
              </button>
              <button
                onClick={() => setActiveFilter('selling')}
                style={{
                  flex: 1,
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: activeFilter === 'selling' ? 'var(--bg-card)' : 'transparent',
                  color: activeFilter === 'selling' ? 'var(--color-primary-light)' : 'var(--text-muted)'
                }}
              >
                Vendendo
              </button>
            </div>

            {/* Channels Scroll Area */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {chatChannels.map(({ property, isSeller, lastMessage }) => {
                const isSelected = selectedProperty?.id === property.id;
                return (
                  <div
                    key={property.id}
                    onClick={() => setSelectedProperty(property)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      borderBottom: '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                      borderLeft: isSelected ? '3px solid var(--color-primary-light)' : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <img
                      src={property.images[0]}
                      alt=""
                      style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                        <strong style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {property.neighborhood}
                        </strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{lastMessage.time}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {isSeller ? '📥 Pergunta de Comprador' : `👤 Vendedor: ${property.advertiser.name}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chat Window */}
          {selectedProperty ? (
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-card)' }}>
              {/* Active Conversation Header */}
              <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-main)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img
                    src={selectedProperty.images[0]}
                    alt=""
                    style={{ width: '52px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>{selectedProperty.title}</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Anunciante: <strong>{selectedProperty.advertiser.name}</strong> • {selectedProperty.neighborhood}, {selectedProperty.city}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {selectedProperty.transactionType === 'Venda' ? `R$ ${selectedProperty.price?.toLocaleString('pt-BR')}` : `R$ ${selectedProperty.rentPrice}/mês`}
                  </div>
                  {onOpenScheduler && (
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        onClose();
                        onOpenScheduler(selectedProperty);
                      }}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', marginTop: '0.2rem' }}
                    >
                      <Calendar size={13} />
                      <span>Agendar Visita</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div style={{
                flex: 1,
                padding: '1.25rem',
                maxHeight: '380px',
                overflowY: 'auto',
                backgroundColor: 'var(--bg-main)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {messages.map((msg, i) => {
                  const isMe = msg.sender.includes(currentUser?.name?.split(' ')[0] || 'Comprador');
                  return (
                    <div
                      key={msg.id || i}
                      style={{
                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                        maxWidth: '78%',
                        backgroundColor: isMe ? 'var(--color-primary-light)' : 'var(--bg-card)',
                        color: isMe ? '#ffffff' : 'var(--text-main)',
                        padding: '0.7rem 1rem',
                        borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                        boxShadow: 'var(--shadow-sm)',
                        fontSize: '0.88rem',
                        border: isMe ? 'none' : '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.8, marginBottom: '2px' }}>
                        {msg.sender}
                      </div>
                      <div>{msg.text}</div>
                      <div style={{ fontSize: '0.68rem', opacity: 0.7, textAlign: 'right', marginTop: '4px' }}>
                        {msg.time}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Proposal Pills */}
              <div style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: 'var(--bg-card)',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto'
              }}>
                {[
                  'Gostaria de fazer uma proposta',
                  'Qual o valor mínimo aceito à vista?',
                  'Aceita financiamento bancário?',
                  'O imóvel está disponível para visitas amanhã?'
                ].map((proposalText, i) => (
                  <button
                    key={i}
                    onClick={() => setInputText(proposalText)}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-main)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    💡 {proposalText}
                  </button>
                ))}
              </div>

              {/* Message Input Bar */}
              <form onSubmit={handleSendMessage} style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-card)' }}>
                <input
                  type="text"
                  placeholder={`Enviar mensagem sobre "${selectedProperty.title}"...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{ flex: 1, borderRadius: 'var(--radius-full)' }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ borderRadius: '50%', width: '42px', height: '42px', padding: 0 }}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Selecione uma conversa para visualizar o histórico de mensagens.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
