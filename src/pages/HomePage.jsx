import React from 'react';
import HeroSearch from '../components/HeroSearch';
import PropertyCard from '../components/PropertyCard';
import RealLeafletMap from '../components/RealLeafletMap';
import StatsCounterWidget from '../components/StatsCounterWidget';
import TestimonialsWidget from '../components/TestimonialsWidget';
import SellerCtaBanner from '../components/SellerCtaBanner';
import FloatingCompareBar from '../components/FloatingCompareBar';
import NeighborhoodsWidget from '../components/NeighborhoodsWidget';
import ThreeStepsWidget from '../components/ThreeStepsWidget';
import QuickConsultationWidget from '../components/QuickConsultationWidget';
import PropertyCardSkeleton from '../components/skeletons/PropertyCardSkeleton';

import { useFilterStore } from '../stores/useFilterStore';
import { useFavoriteStore } from '../stores/useFavoriteStore';
import { useModalStore } from '../stores/useModalStore';

import { Building2, ArrowUpDown, CheckCircle2, Sparkles, Grid, Map as MapIcon, SlidersHorizontal, Heart, X } from 'lucide-react';

export default function HomePage({ properties = [], isLoading }) {
  const filterStore = useFilterStore();
  const favoriteStore = useFavoriteStore();
  const modalStore = useModalStore();

  // Filter properties logic
  const filteredProperties = (properties || []).filter((prop) => {
    // Tab filter
    const purpose = prop.purpose || prop.transactionType || 'Venda';
    if (filterStore.activeTab === 'Comprar' && purpose !== 'Venda' && purpose !== 'Ambos') return false;
    if (filterStore.activeTab === 'Alugar' && purpose !== 'Aluguel' && purpose !== 'Ambos') return false;
    if (filterStore.activeTab === 'Lançamentos' && !prop.isRelease && !prop.isLaunch) return false;

    // Favorites only filter
    if (filterStore.showOnlyFavorites && !favoriteStore.favorites.includes(prop.id)) return false;

    // Search query
    if (filterStore.searchQuery) {
      const q = filterStore.searchQuery.toLowerCase();
      const matchLoc = prop.location?.address?.toLowerCase().includes(q) || prop.location?.neighborhood?.toLowerCase().includes(q) || prop.location?.city?.toLowerCase().includes(q);
      const matchTitle = prop.title?.toLowerCase().includes(q);
      if (!matchLoc && !matchTitle) return false;
    }

    // Type
    if (filterStore.selectedType !== 'Todos' && prop.type !== filterStore.selectedType) return false;

    // Bedrooms
    if (filterStore.minBedrooms !== '0' && prop.specs?.bedrooms < parseInt(filterStore.minBedrooms, 10)) return false;

    // Price
    if (filterStore.filters.maxPrice && prop.price > filterStore.filters.maxPrice) return false;

    // Area
    if (filterStore.filters.minArea > 0 && prop.specs?.area < filterStore.filters.minArea) return false;

    // Parking
    if (filterStore.filters.minParking > 0 && prop.specs?.parking < filterStore.filters.minParking) return false;

    // Amenities
    if (filterStore.filters.amenities?.length > 0) {
      const hasAll = filterStore.filters.amenities.every((a) => prop.amenities?.includes(a));
      if (!hasAll) return false;
    }

    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filterStore.sortBy === 'preco-asc') return a.price - b.price;
    if (filterStore.sortBy === 'preco-desc') return b.price - a.price;
    if (filterStore.sortBy === 'area-desc') return (b.specs?.area || 0) - (a.specs?.area || 0);
    return 0; // relevancia
  });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <HeroSearch />

      {/* Stats Counter Widget */}
      <StatsCounterWidget />

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="imoveis">
        {/* Results Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              Imóveis Encontrados
              <span className="text-sm font-semibold px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full">
                {isLoading ? '...' : sortedProperties.length}
              </span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore as melhores opções selecionadas para você em todo o Brasil
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Toggle Button */}
            <button
              onClick={filterStore.openFilters}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Filtros Avançados
            </button>

            {/* Favorite Filter Toggle */}
            <button
              onClick={() => filterStore.setShowOnlyFavorites(!filterStore.showOnlyFavorites)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                filterStore.showOnlyFavorites
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${filterStore.showOnlyFavorites ? 'fill-current text-white' : 'text-rose-500'}`} />
              Favoritos ({favoriteStore.favorites.length})
            </button>

            {/* Sort Dropdown */}
            <div className="relative inline-flex items-center">
              <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                value={filterStore.sortBy}
                onChange={(e) => filterStore.setSortBy(e.target.value)}
                className="pl-9 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="relevancia">Ordenar por: Relevância</option>
                <option value="preco-asc">Menor Preço</option>
                <option value="preco-desc">Maior Preço</option>
                <option value="area-desc">Maior Área (m²)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => filterStore.setViewMode('grid')}
                className={`p-2 rounded-lg text-sm font-medium transition ${
                  filterStore.viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Visualização em Grade"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => filterStore.setViewMode('map')}
                className={`p-2 rounded-lg text-sm font-medium transition ${
                  filterStore.viewMode === 'map'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Visualização em Mapa"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content View: Grid or Map */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </div>
        ) : filterStore.viewMode === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[650px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="lg:col-span-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-slate-900">
              {sortedProperties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500">Nenhum imóvel encontrado no mapa.</p>
                </div>
              ) : (
                sortedProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    isFavorite={favoriteStore.favorites.includes(prop.id)}
                    isCompared={favoriteStore.comparedIds.includes(prop.id)}
                    onToggleFavorite={() => favoriteStore.toggleFavorite(prop.id)}
                    onToggleCompare={() => favoriteStore.toggleCompare(prop.id)}
                    onSelect={() => modalStore.setSelectedProperty(prop)}
                    compact
                  />
                ))
              )}
            </div>
            <div className="lg:col-span-2 h-full">
              <RealLeafletMap
                properties={sortedProperties}
                onSelectProperty={(prop) => modalStore.setSelectedProperty(prop)}
              />
            </div>
          </div>
        ) : sortedProperties.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm max-w-lg mx-auto">
            <Sparkles className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nenhum imóvel encontrado</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Tente ajustar seus filtros ou remover a busca por palavra-chave para ver mais opções.
            </p>
            <button
              onClick={filterStore.resetFilters}
              className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavorite={favoriteStore.favorites.includes(prop.id)}
                isCompared={favoriteStore.comparedIds.includes(prop.id)}
                onToggleFavorite={() => favoriteStore.toggleFavorite(prop.id)}
                onToggleCompare={() => favoriteStore.toggleCompare(prop.id)}
                onSelect={() => modalStore.setSelectedProperty(prop)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Widgets & Promotional Banners */}
      <NeighborhoodsWidget />
      <ThreeStepsWidget />
      <QuickConsultationWidget />
      <SellerCtaBanner onPostClick={modalStore.openPostProperty} />
      <TestimonialsWidget />

      {/* Floating Compare Bar */}
      {favoriteStore.comparedIds.length > 0 && (
        <FloatingCompareBar
          count={favoriteStore.comparedIds.length}
          onOpenCompare={modalStore.openCompare}
          onClear={favoriteStore.clearCompare}
        />
      )}
    </main>
  );
}
