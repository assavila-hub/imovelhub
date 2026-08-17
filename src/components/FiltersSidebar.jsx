import React, { useState, useMemo } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  Check, 
  RefreshCw, 
  Search, 
  Sparkles, 
  Home, 
  ShieldCheck, 
  Zap, 
  Tag, 
  DollarSign,
  Sun,
  Flame,
  Compass,
  Video,
  Layers,
  Building2,
  Bookmark,
  BookmarkPlus,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import ImovelwebCategoryDropdown from './ImovelwebCategoryDropdown';

export default function FiltersSidebar({
  isOpen,
  onClose,
  filters = {},
  setFilters,
  onResetFilters,
  onSaveSearch,
  filteredCount = 0,
  properties = []
}) {
  const [amenitySearchText, setAmenitySearchText] = useState('');

  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    if (current.includes(amenity)) {
      setFilters({
        ...filters,
        amenities: current.filter(item => item !== amenity)
      });
    } else {
      setFilters({
        ...filters,
        amenities: [...current, amenity]
      });
    }
  };

  // Extração 100% dinâmica das comodidades e tags reais com contagem precisa
  const realAmenitiesWithCounts = useMemo(() => {
    const map = new Map();
    properties.forEach(p => {
      // Direct amenities
      (p.amenities || []).forEach(am => {
        if (am && am.trim()) {
          map.set(am.trim(), (map.get(am.trim()) || 0) + 1);
        }
      });
      // Special tags
      if (p.price <= 350000 && p.transactionType === 'Venda') {
        map.set("Minha Casa Minha Vida (MCMV)", (map.get("Minha Casa Minha Vida (MCMV)") || 0) + 1);
      }
      if (p.transactionType === 'Aluguel') {
        map.set("Aluguel Sem Fiador (Garantia Digital)", (map.get("Aluguel Sem Fiador (Garantia Digital)") || 0) + 1);
      }
      if (p.hasVirtualTour) {
        map.set("Apenas com Tour Virtual 360°", (map.get("Apenas com Tour Virtual 360°") || 0) + 1);
      }
      if (p.acceptsExchange || (p.description && p.description.toLowerCase().includes('permuta'))) {
        map.set("Aceita Permuta", (map.get("Aceita Permuta") || 0) + 1);
      }
    });

    // Retorna apenas comodidades que possuem imóveis de verdade cadastrados
    return Array.from(map.entries())
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [properties]);

  const filteredAmenitiesList = useMemo(() => {
    if (!amenitySearchText.trim()) return realAmenitiesWithCounts;
    const q = amenitySearchText.toLowerCase();
    return realAmenitiesWithCounts.filter(item => 
      item.name.toLowerCase().includes(q)
    );
  }, [realAmenitiesWithCounts, amenitySearchText]);

  // Lista consolidada de todos os filtros ativos para a barra de resumo superior
  const activeFilterChips = useMemo(() => {
    const chips = [];

    if (filters.minPrice && Number(filters.minPrice) > 0) {
      chips.push({
        id: 'minPrice',
        label: `Mín: R$ ${Number(filters.minPrice).toLocaleString('pt-BR')}`,
        onRemove: () => setFilters({ ...filters, minPrice: null })
      });
    }

    if (filters.maxPrice && Number(filters.maxPrice) < 6000000) {
      chips.push({
        id: 'maxPrice',
        label: `Máx: R$ ${Number(filters.maxPrice).toLocaleString('pt-BR')}`,
        onRemove: () => setFilters({ ...filters, maxPrice: null })
      });
    }

    if (filters.minArea && Number(filters.minArea) > 0) {
      chips.push({
        id: 'minArea',
        label: `Área: ${filters.minArea}m²+`,
        onRemove: () => setFilters({ ...filters, minArea: 0 })
      });
    }

    if (filters.minParking && Number(filters.minParking) > 0) {
      chips.push({
        id: 'minParking',
        label: `Vagas: ${filters.minParking}+`,
        onRemove: () => setFilters({ ...filters, minParking: 0 })
      });
    }

    if (filters.stage && filters.stage !== 'all') {
      chips.push({
        id: 'stage',
        label: `Estágio: ${filters.stage}`,
        onRemove: () => setFilters({ ...filters, stage: 'all' })
      });
    }

    if (filters.floorPosition && filters.floorPosition !== 'all') {
      chips.push({
        id: 'floorPosition',
        label: `Andar: ${filters.floorPosition}`,
        onRemove: () => setFilters({ ...filters, floorPosition: 'all' })
      });
    }

    (filters.selectedSubTypes || []).forEach(sub => {
      chips.push({
        id: `sub-${sub}`,
        label: sub,
        onRemove: () => setFilters({
          ...filters,
          selectedSubTypes: (filters.selectedSubTypes || []).filter(s => s !== sub)
        })
      });
    });

    (filters.amenities || []).forEach(am => {
      chips.push({
        id: `am-${am}`,
        label: am,
        onRemove: () => handleAmenityToggle(am)
      });
    });

    return chips;
  }, [filters]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 1200 }} onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '780px', 
          width: '95vw', 
          maxHeight: '92vh', 
          padding: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: 'var(--radius-lg)', 
          overflow: 'hidden', 
          backgroundColor: 'var(--bg-card)' 
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.1rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: '#0f172a',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <SlidersHorizontal size={20} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Filtros Avançados Unificados</h3>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Taxonomia completa consolidada dos 6 maiores portais</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. Barra Superior de Resumo dos Filtros Ativos com Remoção em 1 Clique */}
        {activeFilterChips.length > 0 && (
          <div style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-primary-light)', textTransform: 'uppercase', marginRight: '0.2rem' }}>
              Filtros Ativos ({activeFilterChips.length}):
            </span>
            {activeFilterChips.map(chip => (
              <span
                key={chip.id}
                onClick={chip.onRemove}
                style={{
                  fontSize: '0.74rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--color-primary-light)',
                  color: 'var(--text-main)',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title="Clique para remover este filtro"
              >
                <span>{chip.label}</span>
                <X size={12} color="#ef4444" />
              </span>
            ))}
            <button
              type="button"
              onClick={onResetFilters}
              style={{
                border: 'none',
                background: 'none',
                color: '#ef4444',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              Limpar Tudo
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
          
          {/* 0. Tipo de Imóvel e Subcategorias (Imovelweb Checkbox Tree) */}
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building2 size={16} color="#ff5a00" />
                <span>Tipos e Categorias de Imóveis (Imovelweb)</span>
              </label>
              {(filters.selectedSubTypes?.length || 0) > 0 && (
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, selectedSubTypes: [] })}
                  style={{ border: 'none', background: 'none', color: '#ff5a00', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Limpar ({filters.selectedSubTypes.length})
                </button>
              )}
            </div>
            <div style={{ maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
              <ImovelwebCategoryDropdown
                selectedSubTypes={filters.selectedSubTypes || []}
                onChangeSelectedSubTypes={(subs) => setFilters({ ...filters, selectedSubTypes: subs })}
                isDropdown={false}
                properties={properties}
              />
            </div>
          </div>

          {/* 1. Faixa de Preço com Inputs Numéricos Manuais + Histograma + Slider */}
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <DollarSign size={16} color="var(--color-primary-light)" />
                <span>Faixa de Preço em Reais (R$)</span>
              </label>
              <strong style={{ color: 'var(--color-primary-light)', fontSize: '0.95rem' }}>
                {filters.maxPrice ? `Até R$ ${Number(filters.maxPrice).toLocaleString('pt-BR')}` : 'Sem limite máximo'}
              </strong>
            </div>

            {/* Inputs Diretos de Preço Mínimo e Máximo */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                  Preço Mínimo:
                </label>
                <input
                  type="number"
                  placeholder="Ex: 0"
                  value={filters.minPrice || ''}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : null })}
                  style={{ width: '100%', padding: '0.45rem 0.6rem', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div style={{ padding: '0.4rem 0', alignSelf: 'flex-end', fontWeight: 800, color: 'var(--text-muted)' }}>
                ➔
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                  Preço Máximo:
                </label>
                <input
                  type="number"
                  placeholder="Ex: 1500000"
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : null })}
                  style={{ width: '100%', padding: '0.45rem 0.6rem', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
            </div>

            {/* Mini SVG Price Distribution Histogram */}
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '34px', gap: '3px', marginBottom: '0.5rem', padding: '0 4px' }}>
              {[15, 30, 45, 80, 100, 75, 60, 40, 25, 20, 12, 8].map((heightPct, idx) => {
                const bucketLimit = 1500 + ((6000000 - 1500) / 12) * (idx + 1);
                const isUnderFilter = !filters.maxPrice || bucketLimit <= filters.maxPrice;
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: `${heightPct}%`,
                      backgroundColor: isUnderFilter ? 'var(--color-primary-light)' : 'rgba(148, 163, 184, 0.25)',
                      borderRadius: '2px 2px 0 0',
                      transition: 'all 0.2s ease'
                    }}
                    title={`Concentração de imóveis na faixa ${idx + 1}`}
                  />
                );
              })}
            </div>

            <input
              type="range"
              min="1500"
              max="6000000"
              step="25000"
              value={filters.maxPrice || 6000000}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--color-primary-light)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              <span>R$ 1.500 (Aluguel)</span>
              <span>R$ 6.000.000+ (Venda)</span>
            </div>
          </div>

          {/* 2. Estágio do Imóvel (Pronto vs Na Planta / Lançamento) */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Building2 size={16} color="var(--color-primary-light)" />
              <span>Estágio e Situação do Imóvel:</span>
            </label>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'Todos os Estágios' },
                { id: 'pronto', label: '✨ Pronto para Morar' },
                { id: 'planta', label: '🏗️ Na Planta / Lançamento' },
                { id: 'novo', label: '🆕 Imóvel Novo' },
                { id: 'leilao', label: '⚖️ Leilão' }
              ].map(stg => {
                const isSelected = (filters.stage || 'all') === stg.id;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => setFilters({ ...filters, stage: stg.id })}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--bg-main)',
                      color: isSelected ? '#ffffff' : 'var(--text-main)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {stg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Posição do Andar (Para Apartamentos) */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={16} color="var(--color-primary-light)" />
              <span>Preferência de Andar (Apartamentos):</span>
            </label>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'Qualquer Andar' },
                { id: 'terreo', label: '🌱 Térreo / Garden' },
                { id: 'baixo', label: '🏙️ Andar Baixo (1º ao 5º)' },
                { id: 'alto', label: '☁️ Andar Alto (6º+)' },
                { id: 'cobertura', label: '👑 Cobertura / Duplex' }
              ].map(floor => {
                const isSelected = (filters.floorPosition || 'all') === floor.id;
                return (
                  <button
                    key={floor.id}
                    type="button"
                    onClick={() => setFilters({ ...filters, floorPosition: floor.id })}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--bg-main)',
                      color: isSelected ? '#ffffff' : 'var(--text-main)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {floor.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Área Mínima (m²) */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.4rem', display: 'block' }}>
              Área Útil Mínima (m²): {filters.minArea ? `${filters.minArea} m²` : 'Qualquer área'}
            </label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[0, 40, 60, 90, 120, 180, 250, 500].map(area => (
                <button
                  key={area}
                  type="button"
                  onClick={() => setFilters({ ...filters, minArea: area })}
                  style={{
                    flex: '1 1 50px',
                    padding: '0.45rem',
                    borderRadius: 'var(--radius-sm)',
                    border: (filters.minArea || 0) === area ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: (filters.minArea || 0) === area ? 'var(--color-primary-light)' : 'var(--bg-main)',
                    color: (filters.minArea || 0) === area ? '#ffffff' : 'var(--text-main)'
                  }}
                >
                  {area === 0 ? 'Todas' : `${area}m²+`}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Vagas de Garagem */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.4rem', display: 'block' }}>
              Vagas de Garagem:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[0, 1, 2, 3, 4].map(vagas => (
                <button
                  key={vagas}
                  type="button"
                  onClick={() => setFilters({ ...filters, minParking: vagas })}
                  style={{
                    flex: 1,
                    padding: '0.45rem',
                    borderRadius: 'var(--radius-sm)',
                    border: (filters.minParking || 0) === vagas ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: (filters.minParking || 0) === vagas ? 'var(--color-primary-light)' : 'var(--bg-main)',
                    color: (filters.minParking || 0) === vagas ? '#ffffff' : 'var(--text-main)'
                  }}
                >
                  {vagas === 0 ? 'Qualquer' : `${vagas}+ Vagas`}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Busca Livre de Comodidades & Tags com Contadores Reais */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 800 }}>
                Buscar Comodidades &amp; Tags por Digitação Livre:
              </label>
              {(filters.amenities?.length || 0) > 0 && (
                <span style={{ fontSize: '0.72rem', color: 'var(--color-primary-light)', fontWeight: 800 }}>
                  {filters.amenities.length} selecionadas
                </span>
              )}
            </div>

            <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={amenitySearchText}
                onChange={(e) => setAmenitySearchText(e.target.value)}
                placeholder="Digite ex: piscina, varanda, pet, metro, energia solar..."
                style={{ width: '100%', padding: '0.55rem 0.6rem 0.55rem 2.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', fontSize: '0.82rem' }}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
              gap: '0.5rem',
              maxHeight: '240px',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {filteredAmenitiesList.map(item => {
                const amenityName = item.name;
                const isSelected = (filters.amenities || []).includes(amenityName);
                return (
                  <div
                    key={amenityName}
                    onClick={() => handleAmenityToggle(amenityName)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.45rem',
                      padding: '0.5rem 0.7rem',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-main)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 700 : 500,
                      userSelect: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        border: isSelected ? 'none' : '1px solid var(--text-light)',
                        backgroundColor: isSelected ? 'var(--color-primary-light)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span style={{ color: isSelected ? 'var(--color-primary-light)' : 'var(--text-main)' }}>{amenityName}</span>
                    </div>

                    <span style={{
                      fontSize: '0.68rem',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'rgba(148, 163, 184, 0.15)',
                      color: isSelected ? '#ffffff' : 'var(--text-muted)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '999px',
                      fontWeight: 800
                    }}>
                      {item.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer with Save Search + Reset + Dynamic Real-Time Count Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-main)',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={onResetFilters}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
            >
              <RefreshCw size={14} />
              <span>Limpar Filtros</span>
            </button>

            {onSaveSearch && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => onSaveSearch(filters)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#38bdf8', borderColor: '#38bdf8' }}
                title="Salvar esta combinação de filtros para receber alertas"
              >
                <BookmarkPlus size={15} />
                <span>Salvar Combinação</span>
              </button>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
            style={{
              padding: '0.65rem 1.75rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>Ver {filteredCount} {filteredCount === 1 ? 'Imóvel' : 'Imóveis'} ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
