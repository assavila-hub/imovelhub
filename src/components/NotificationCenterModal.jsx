import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Check, 
  Trash2, 
  Calendar, 
  FileText, 
  DollarSign, 
  MessageSquare, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function NotificationCenterModal({
  isOpen,
  onClose,
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onOpenNotificationTarget
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'proposals', 'visits', 'alerts'

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'proposals') return n.type === 'proposal';
    if (activeFilter === 'visits') return n.type === 'visit';
    if (activeFilter === 'alerts') return n.type === 'price_drop' || n.type === 'saved_search';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'proposal':
        return <FileText size={16} color="#8b5cf6" />;
      case 'visit':
        return <Calendar size={16} color="#0284c7" />;
      case 'price_drop':
        return <DollarSign size={16} color="#10b981" />;
      case 'saved_search':
        return <Sparkles size={16} color="#f59e0b" />;
      case 'chat':
        return <MessageSquare size={16} color="#ec4899" />;
      default:
        return <Bell size={16} color="#38bdf8" />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1400,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }} onClick={onClose}>
      <div 
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-2xl)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
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
            <div style={{ position: 'relative' }}>
              <Bell size={22} color="#38bdf8" />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Central de Notificações</h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {unreadCount > 0 ? `${unreadCount} novas notificações não lidas` : 'Todas as notificações estão em dia'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="btn btn-ghost btn-sm"
                style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.6rem' }}
                title="Marcar todas como lidas"
              >
                <Check size={14} style={{ marginRight: '0.2rem' }} />
                Marcar lidas
              </button>
            )}
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
        </div>

        {/* Filter Pills Bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--bg-main)',
          borderBottom: '1px solid var(--border-color)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'all', label: 'Todas' },
            { id: 'proposals', label: 'Propostas' },
            { id: 'visits', label: 'Visitas' },
            { id: 'alerts', label: 'Alertas & Preço' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: activeFilter === tab.id ? 800 : 600,
                border: activeFilter === tab.id ? '1px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                backgroundColor: activeFilter === tab.id ? 'var(--color-primary-light)' : 'var(--bg-card)',
                color: activeFilter === tab.id ? '#ffffff' : 'var(--text-main)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Bell size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.3rem 0' }}>Nenhuma notificação encontrada</h4>
              <p style={{ fontSize: '0.8rem', margin: 0 }}>Você receberá avisos quando houver propostas, visitas ou novidades de imóveis.</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  onMarkAsRead && onMarkAsRead(notif.id);
                  if (onOpenNotificationTarget) onOpenNotificationTarget(notif);
                }}
                style={{
                  backgroundColor: notif.read ? 'var(--bg-main)' : 'rgba(59, 130, 246, 0.08)',
                  border: notif.read ? '1px solid var(--border-color)' : '1.5px solid var(--color-primary-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getTypeIcon(notif.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      {notif.title}
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {notif.time || 'Agora'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
                    {notif.message}
                  </p>
                  {notif.propertyTitle && (
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span>🏠 {notif.propertyTitle}</span>
                    </div>
                  )}
                </div>

                {!notif.read && (
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-light)',
                    marginTop: '0.4rem'
                  }} />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {notifications.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.85rem 1.5rem',
            backgroundColor: 'var(--bg-main)',
            borderTop: '1px solid var(--border-color)'
          }}>
            <button
              onClick={onClearAll}
              style={{
                border: 'none',
                background: 'none',
                color: '#ef4444',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Trash2 size={14} />
              <span>Limpar histórico</span>
            </button>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Total: {notifications.length} notificações registradas
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
