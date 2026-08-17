import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  Search, 
  Trash2, 
  Play, 
  Plus, 
  Bell, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Tag
} from 'lucide-react';

const DEFAULT_SAVED_SEARCHES = [
  {
    id: 'search-1',
    name: 'Apto 2Q Pinheiros até 800k',
    query: 'Pinheiros',
    type: 'Apartamento',
    transactionType: 'Venda',
    minBedrooms: '2',
    minParkingSpots: '1',
    maxPrice: 800000,
    createdDate: '12/08/2026',
    matchingCount: 4,
    hasNew: true
  },
  {
    id: 'search-2',
    name: 'Aluguel Studio Moema com Vaga',
    query: 'Moema',
    type: 'Apartamento',
    transactionType: 'Aluguel',
    minBedrooms: '1',
    minParkingSpots: '1',
    maxPrice: 4500,
    createdDate: '05/08/2026',
    matchingCount: 6,
    hasNew: false
  },
  {
    id: 'search-3',
    name: 'Casa em Condomínio Alphaville',
    query: 'Alphaville',
    type: 'Casa',
    transactionType: 'Venda',
    minBedrooms: '3',
    minParkingSpots: '2',
    maxPrice: 3500000,
    createdDate: '01/08/2026',
    matchingCount: 3,
    hasNew: true
  }
];

export default function SavedSearchesModal({
  isOpen,
  onClose,
  savedSearches = [],
  onApplySavedSearch,
  onDeleteSavedSearch,
  onSaveCurrentSearch,
  currentSearchParams
}) {
  const [searchesList, setSearchesList] = useState(() => {
    const saved = localStorage.getItem('imovelhub_saved_searches');
    return saved ? JSON.parse(saved) : (savedSearches.length > 0 ? savedSearches : DEFAULT_SAVED_SEARCHES);
  });

  const [showSaveForm, setShowSaveForm] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');

  useEffect(() => {
    localStorage.setItem('imovelhub_saved_searches', JSON.stringify(searchesList));
  }, [searchesList]);

  if (!isOpen) return null;

  const handleCreateNewSaved = (e) => {
    e.preventDefault();
    if (!newSearchName.trim()) return;

    const newSearch = {
      id: `search-${Date.now()}`,
      name: newSearchName.trim(),
      query: currentSearchParams?.searchQuery || '',
      type: currentSearchParams?.selectedType || 'Todos',
      transactionType: currentSearchParams?.activeTab || 'Comprar',
      minBedrooms: currentSearchParams?.minBedrooms || '0',
      minParkingSpots: currentSearchParams?.minParkingSpots || '0',
      maxPrice: currentSearchParams?.maxPrice || null,
      createdDate: new Date().toLocaleDateString('pt-BR'),
      matchingCount: currentSearchParams?.matchingCount || 5,
      hasNew: false
    };

    const updated = [newSearch, ...searchesList];
    setSearchesList(updated);
    if (onSaveCurrentSearch) onSaveCurrentSearch(newSearch);
    setNewSearchName('');
    setShowSaveForm(false);
  };

  const handleDelete = (id) => {
    const updated = searchesList.filter(s => s.id !== id);
    setSearchesList(updated);
    if (onDeleteSavedSearch) onDeleteSavedSearch(id);
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
          maxWidth: '720px',
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
            <Bookmark size={22} color="#38bdf8" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Minhas Buscas Salvas &amp; Alertas
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Gerencie combinações de filtros e receba avisos quando novos imóveis compatíveis entrarem
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setShowSaveForm(!showSaveForm)}
              className="btn btn-primary btn-sm"
              style={{ fontWeight: 800, gap: '0.3rem' }}
            >
              <Plus size={15} />
              <span>Salvar Busca Atual</span>
            </button>
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

        {/* Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Quick Save Current Search Form */}
          {showSaveForm && (
            <form 
              onSubmit={handleCreateNewSaved}
              style={{
                backgroundColor: 'var(--bg-main)',
                border: '1.5px solid var(--color-primary-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0 }}>
                Dar um Nome para os Filtros Atuais
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  required
                  placeholder="Ex: Apto 3 dorms Jardins até 1.5M"
                  value={newSearchName}
                  onChange={(e) => setNewSearchName(e.target.value)}
                  style={{ flex: 1, padding: '0.55rem' }}
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 800 }}>
                  Salvar
                </button>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowSaveForm(false)}>
                  Cancelar
                </button>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                * Os filtros aplicados no momento (bairro, preço, quartos, vagas) serão armazenados nesta busca.
              </span>
            </form>
          )}

          {/* List of Saved Searches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {searchesList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <Bookmark size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.3rem 0' }}>Você ainda não possui buscas salvas</h4>
                <p style={{ fontSize: '0.8rem', margin: 0 }}>Aplique filtros no buscador e clique em "Salvar Busca Atual" para acompanhar novas oportunidades.</p>
              </div>
            ) : (
              searchesList.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
                        {item.name}
                      </strong>
                      {item.hasNew && (
                        <span style={{ fontSize: '0.68rem', backgroundColor: '#ef4444', color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Sparkles size={11} />
                          <span>Novos imóveis</span>
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.query && (
                        <span style={{ backgroundColor: 'var(--bg-card)', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          📍 {item.query}
                        </span>
                      )}
                      {item.type && item.type !== 'Todos' && (
                        <span style={{ backgroundColor: 'var(--bg-card)', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          🏢 {item.type}
                        </span>
                      )}
                      {Number(item.minBedrooms) > 0 && (
                        <span style={{ backgroundColor: 'var(--bg-card)', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          🛏️ {item.minBedrooms}+ qtos
                        </span>
                      )}
                      {Number(item.minParkingSpots) > 0 && (
                        <span style={{ backgroundColor: 'var(--bg-card)', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          🚗 {item.minParkingSpots}+ vagas
                        </span>
                      )}
                      {item.maxPrice && (
                        <span style={{ backgroundColor: 'var(--bg-card)', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid var(--border-color)', color: '#059669', fontWeight: 700 }}>
                          💰 Até R$ {Number(item.maxPrice).toLocaleString('pt-BR')}
                        </span>
                      )}
                    </div>

                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Salva em {item.createdDate} • <strong>{item.matchingCount || 0} imóveis disponíveis</strong>
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        if (onApplySavedSearch) onApplySavedSearch(item);
                        onClose();
                      }}
                      style={{ fontWeight: 800, gap: '0.35rem' }}
                    >
                      <Play size={14} />
                      <span>Ver Imóveis</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        border: 'none',
                        background: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '0.4rem',
                        borderRadius: '4px'
                      }}
                      title="Excluir busca salva"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
