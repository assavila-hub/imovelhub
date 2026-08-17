import React, { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, Send, User, ShieldCheck, Phone, CheckCheck } from 'lucide-react';
import { fetchChatMessages, sendChatMessage } from '../services/api';

export default function RealTimeChatModal({
  property,
  onClose,
  currentUser
}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);

  const loadChat = async () => {
    if (!property?.id) return;
    const data = await fetchChatMessages(property.id);
    if (data) setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!property?.id) return;
    loadChat();
    const interval = setInterval(loadChat, 3000); // Polling chat update
    return () => clearInterval(interval);
  }, [property?.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!property) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const senderName = currentUser ? currentUser.name.split(' ')[0] : 'Cliente';
    const textToSend = inputText;
    setInputText('');

    const newMsg = await sendChatMessage(property.id, textToSend, senderName);
    setMessages(prev => [...prev, newMsg]);

    setTimeout(loadChat, 1600); // Check for auto reply
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1350 }} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-main)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={property.advertiser.avatar}
              alt={property.advertiser.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{property.advertiser.name}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-quinto)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-quinto)', borderRadius: '50%' }} />
                Online agora • Imóvel: {property.neighborhood}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Property Context Header Bar */}
        <div style={{
          padding: '0.6rem 1.25rem',
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
            Ref: {property.title}
          </span>
          <strong style={{ color: 'var(--color-primary)' }}>
            {property.transactionType === 'Venda' ? `R$ ${property.price?.toLocaleString('pt-BR')}` : `R$ ${property.rentPrice}/mês`}
          </strong>
        </div>

        {/* Chat Messages Body */}
        <div style={{
          padding: '1.25rem',
          height: '360px',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-main)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {messages.map((msg, idx) => {
            const isMe = msg.sender !== 'Corretor' && msg.sender !== property.advertiser.name;
            return (
              <div
                key={msg.id || idx}
                style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  backgroundColor: isMe ? 'var(--color-primary-light)' : 'var(--bg-card)',
                  color: isMe ? '#ffffff' : 'var(--text-main)',
                  padding: '0.65rem 0.95rem',
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

        {/* Footer Input */}
        <form onSubmit={handleSend} style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-card)' }}>
          <input
            type="text"
            placeholder="Escreva sua mensagem..."
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
    </div>
  );
}
