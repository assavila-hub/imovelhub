import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  TrendingDown, 
  Search, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Sparkles, 
  Trash2, 
  ArrowRight, 
  MapPin, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';

export default function OpportunityRadarModal({
  isOpen,
  onClose,
  properties = [],
  currentUser
}) {
  const [radars, setRadars] = useState([
    {
      id: 'rad-1',
      title: 'Apartamento 3 quartos no Batel / Curitiba',
      city: 'Curitiba',
      neighborhood: 'Batel',
      type: 'Apartamento',
      maxPrice: 1700000,
      minBedrooms: 3,
      channel: 'WhatsApp + E-mail',
      matchesCount: 2,
      active: true
    },
    {
      id: 'rad-2',
      title: 'Cobertura ou Duplex em Moema / SP',
      city: 'São Paulo',
      neighborhood: 'Moema',
      type: 'Apartamento',
      maxPrice: 2200000,
      minBedrooms: 3,
      channel: 'WhatsApp',
      matchesCount: 1,
      active: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCity, setNewCity] = useState('Curitiba');
  const [newNeighborhood, setNewNeighborhood] = useState('Batel');
  const [newType, setNewType] = useState('Apartamento');
  const [newMaxPrice, setNewMaxPrice] = useState('1800000');
  const [newMinBedrooms, setNewMinBedrooms] = useState('2');
  const [phone, setPhone] = useState(currentUser?.phone || '(41) 99123-8899');

  // Properties with price drop
  const priceDroppedProperties = properties.filter(p => p.priceReduced || p.oldPrice);

  const handleCreateRadar = (e) => {
    e.preventDefault();
    const newRad = {
      id: `rad-${Date.now()}`,
      title: `${newType} em ${newNeighborhood}, ${newCity} até R$ ${Number(newMaxPrice).toLocaleString('pt-BR')}`,
      city: newCity,
      neighborhood: newNeighborhood,
      type: newType,
      maxPrice: Number(newMaxPrice),
      minBedrooms: Number(newMinBedrooms),
      channel: 'WhatsApp',
      matchesCount: 1,
      active: true
    };
    setRadars([newRad, ...radars]);
    setShowAddForm(false);
    alert('Radar de Oportunidades ativado! Você receberá alertas instantâneos no WhatsApp.');
  };

  const handleDeleteRadar = (id) => {
    setRadars(radars.filter(r => r.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 1400 }} onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '960px', 
          width: '95vw', 
          maxHeight: '90vh', 
          padding: 0, 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-card)'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              padding: '0.5rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Flame size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Radar de Oportunidades & Alertas de Queda de Preço</h3>
                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '999px', fontWeight: 700 }}>
                  ALERTAS VIA WHATSAPP
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Seja notificado no mesmo minuto em que um proprietário baixar o preço ou lançar um imóvel no seu perfil
              </span>
            </div>
          </div>

          <button 
            onClick={onClose} 
            style={{ border: 'none', background: 'rgba(255, 255, 255, 0.1)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Active Radars Section */}
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Meus Radares de Busca Ativos</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>O robô do ImóbHub monitora o mercado 24h por dia</span>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
                <Bell size={14} />
                <span>{showAddForm ? 'Fechar' : '+ Criar Novo Alerta de Radar'}</span>
              </button>
            </div>

            {/* Create Radar Form */}
            {showAddForm && (
              <form onSubmit={handleCreateRadar} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.85rem' }}>Configurar Critérios do Radar</h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Cidade</label>
                    <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Bairro de Interesse</label>
                    <input type="text" value={newNeighborhood} onChange={(e) => setNewNeighborhood(e.target.value)} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Preço Máximo (R$)</label>
                    <input type="number" value={newMaxPrice} onChange={(e) => setNewMaxPrice(e.target.value)} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>WhatsApp para Alertas</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }} />
                  </div>
                </div>
                <button type="submit" className="btn btn-accent btn-sm" style={{ fontWeight: 800 }}>
                  Salvar e Ativar Notificações
                </button>
              </form>
            )}

            {/* Radars List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {radars.map(rad => (
                <div key={rad.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <strong style={{ fontSize: '0.88rem' }}>{rad.title}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                      Canal: {rad.channel} • {rad.matchesCount} imóveis compatíveis encontrados
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-quinto">Ativo</span>
                    <button onClick={() => handleDeleteRadar(rad.id)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Drops Feed */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingDown size={18} color="#ef4444" />
              <span>Oportunidades com Queda Recente de Preço</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {priceDroppedProperties.slice(0, 3).map(prop => (
                <div key={prop.id} style={{ backgroundColor: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#ef4444', color: '#fff', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 800 }}>
                    🔥 Preço Reduzido
                  </span>
                  <strong style={{ fontSize: '0.92rem', display: 'block', maxWidth: '75%' }}>{prop.title}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{prop.neighborhood}, {prop.city}</span>

                  <div style={{ marginTop: '0.65rem' }}>
                    {prop.oldPrice && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through', display: 'block' }}>
                        De R$ {prop.oldPrice.toLocaleString('pt-BR')}
                      </span>
                    )}
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>
                      Por R$ {prop.price?.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
