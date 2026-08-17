export const DEFAULT_USERS = [
  {
    id: "user-admin",
    name: "Administrador Geral",
    email: "admin@imovelhub.com.br",
    role: "admin", // "admin", "owner", "broker", "buyer", "support", "agency"
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    phone: "(11) 99999-0000",
    creci: null
  },
  {
    id: "user-agency",
    name: "Imobiliária Capital Prime",
    email: "contato@capitalprime.com.br",
    role: "agency",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80",
    phone: "(41) 3040-5500",
    creci: "34.890-J",
    companyName: "Capital Prime Imóveis e Consultoria Ltda",
    cnpj: "38.991.234/0001-90",
    brokers: [
      { id: "brk-1", name: "Rodrigo Mendonça", email: "rodrigo@capitalprime.com.br", creci: "41.220-F", phone: "(41) 99888-1122", commissionRate: 50, activeProperties: 8 },
      { id: "brk-2", name: "Patrícia Albuquerque", email: "patricia@capitalprime.com.br", creci: "39.810-F", phone: "(41) 99777-3344", commissionRate: 60, activeProperties: 12 },
      { id: "brk-3", name: "Bruno Silveira", email: "bruno@capitalprime.com.br", creci: "44.550-F", phone: "(41) 99666-5566", commissionRate: 50, activeProperties: 5 }
    ]
  },
  {
    id: "user-owner",
    name: "Ricardo Proprietário",
    email: "ricardo.proprietario@email.com",
    role: "owner",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    phone: "(11) 98888-1111",
    creci: null
  },
  {
    id: "user-broker",
    name: "Fernanda Corretora Prime",
    email: "fernanda.corretora@imoveis.com",
    role: "broker",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    phone: "(11) 97777-2222",
    creci: "12345-J"
  },
  {
    id: "user-buyer",
    name: "Carlos Comprador",
    email: "carlos.comprador@email.com",
    role: "buyer",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    phone: "(11) 96666-3333",
    creci: null
  },
  {
    id: "user-support",
    name: "Atendimento Suporte ImóvelHUB",
    email: "suporte@imovelhub.com.br",
    role: "support",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    phone: "0800 777 9000",
    creci: null
  }
];

export const PROMOTION_PLANS = [
  {
    id: "plan-free",
    name: "Anúncio Básico Grátis",
    price: 0,
    period: "30 dias",
    badge: "Básico",
    badgeClass: "badge-olx",
    features: [
      "1 anúncio ativo",
      "Galeria até 4 fotos",
      "Contato via formulário"
    ]
  },
  {
    id: "plan-zap-highlight",
    name: "Destaque ImóvelHUB Premium",
    price: 49.90,
    period: "30 dias",
    badge: "Destaque",
    badgeClass: "badge-viva",
    popular: true,
    features: [
      "Posição prioritária nos resultados",
      "Selo vermelho de Destaque",
      "Galeria com fotos em HD ilimitadas",
      "Botão de WhatsApp direto na busca",
      "Até 3x mais contatos de compradores"
    ]
  },
  {
    id: "plan-super-quinto",
    name: "Super Destaque ImóvelHUB VIP",
    price: 99.90,
    period: "60 dias",
    badge: "Super Destaque",
    badgeClass: "badge-quinto",
    features: [
      "Topo do Mapa Interativo",
      "Selo de Imóvel Verificado",
      "Avaliação e Gráfico de m² do Bairro",
      "Agendamento direto de visitas online",
      "Relatório mensal de visualizações e leads"
    ]
  },
  {
    id: "plan-ultra-seo",
    name: "Plano Ultra VIP + Super SEO Google & Bing",
    price: 149.90,
    period: "90 dias",
    badge: "Ultra SEO Master",
    badgeClass: "badge-viva",
    hasSeo: true,
    features: [
      "Indexação Automática Prioritária no Google e Bing",
      "Schema.org RealEstateListing Rich Snippet com Estrelas",
      "Sitemap Dinâmico XML enviado ao Google Search Console",
      "Meta Tags OpenGraph personalizadas para Redes Sociais",
      "Geração de Snippet SEO no Painel Admin",
      "Topo absoluto de todas as categorias e mapas"
    ]
  }
];
