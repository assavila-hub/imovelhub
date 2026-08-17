export const PROPERTY_TAXONOMY = [
  {
    id: 'Apartamento',
    category: 'Apartamento',
    icon: '🏢',
    subcategories: [
      'Padrão',
      'Kitnet/Studio',
      'Cobertura',
      'Flat',
      'Garden',
      'Loft',
      'Duplex'
    ]
  },
  {
    id: 'Casa',
    category: 'Casa',
    icon: '🏡',
    subcategories: [
      'Padrão',
      'Casa em condomínio',
      'Sobrado',
      'Casa de Vila'
    ]
  },
  {
    id: 'Terreno',
    category: 'Terreno',
    icon: '📐',
    subcategories: [
      'Loteamento/Condomínio'
    ]
  },
  {
    id: 'Comercial',
    category: 'Comercial',
    icon: '🏬',
    subcategories: [
      'Conjunto Comercial/sala',
      'Ponto Comercial',
      'Loja/Salão',
      'Box/Garagem',
      'Casa Comercial',
      'Galpão/Depósito/Barracão',
      'Pousada/Chalé',
      'Prédio Inteiro'
    ]
  },
  {
    id: 'Rural',
    category: 'Rural',
    icon: '🌾',
    subcategories: [
      'Chácara',
      'Fazenda'
    ]
  }
];

export const getAllSubcategories = () => {
  return PROPERTY_TAXONOMY.flatMap(cat => cat.subcategories);
};
