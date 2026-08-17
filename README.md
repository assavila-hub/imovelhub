# 🏢 ImóvelHUB — Portal Imobiliário Enterprise de Alto Padrão

<p align="center">
  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="ImóvelHUB Banner" width="100%" style="border-radius: 12px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <strong>Plataforma imobiliária completa de última geração, inspirada nas melhores funcionalidades do ZAP Imóveis, Viva Real, Imovelweb, QuintoAndar e Loft.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" />
  <img src="https://img.shields.io/badge/Status-Produção_Pronta-success?style=for-the-badge" alt="Status" />
</p>

---

## 📖 Visão Geral

O **ImóvelHUB** é uma plataforma imobiliária *Full-Stack* moderna, responsiva e de alta performance. O sistema foi desenvolvido para conectar compradores, locatários, proprietários, corretores e administradores com total transparência, dados 100% verídicos e ferramentas de ponta para negociação, cálculo financeiro e análise de mercado.

---

## 🌟 Principais Funcionalidades

### 1. 🔍 Buscador Cascata Bidirecional 100% Reativo e Verídico
- **Filtragem Inteligente em Qualquer Ordem**: O usuário pode começar escolhendo pela *Categoria*, pela *Localização*, pelos *Quartos* ou pelas *Vagas*. O catálogo recalcula instantaneamente as opções verdadeiras, eliminando resultados vazios ou opções fantasmas.
- **Normalização e Tokenização Avançada**: Busca tolerante a acentuação, maiúsculas/minúsculas e pontuação (ex: digitar *"Moema, São Paulo"*, *"Arujá"*, *"Bosque Maia"* ou buscar diretamente por código `#prop-1`, `prop-45`).
- **Pílulas de Filtros Rápidos com Contadores**: Exibição de tags (`🐾 Pet Friendly`, `🏊 Piscina`, `🥩 Varanda Gourmet`, `🛡️ Sem Fiador`, `☀️ Sol da Manhã`, `⚡ Energia Solar`) com contagem real de imóveis em tempo real.
- **Histórico de Buscas Recentes**: Salvo localmente para acesso rápido em 1 clique.

### 2. 🏙️ Catálogo com 60 Imóveis Cadastrados
- Cobertura de cidades e bairros reais:
  - **São Paulo (SP)**: Moema, Pinheiros, Jardins, Itaim Bibi, Vila Madalena, Vila Mariana;
  - **Arujá (SP)**: Arujá 5, Real Park, Arujazinho;
  - **Santa Isabel (SP)**: Monte Serrat, Jardim Eldorado, Represa de Igaratá;
  - **Guarulhos (SP)**: Bosque Maia, Jardim Flor da Montanha, Vila Augusta, Cumbica;
  - **Jacareí (SP)**: Villa Branca, Jardim Flórida, Centro;
  - **Pindamonhangaba (SP)**: Cidade Nova, Ribeirão Grande, Centro;
  - **Rio de Janeiro (RJ)**: Copacabana, Ipanema, Leblon;
  - **Curitiba (PR)**: Batel, Água Verde;
  - **Belo Horizonte (MG)**: Savassi, Lourdes.

### 3. 🗺️ Modos de Visualização & Mapa Interativo
- **Visualização em Grade (Grid)**: Cards com carrossel de fotos, badges de verificação (QuintoAndar/Loft), cálculo de R$/m² e botão de tour rápido.
- **Modo Dividir Tela (Split-View)**: Lista lateral de imóveis sincronizada com mapa interativo contínuo.
- **Mapa em Tela Cheia (Leaflet & OpenStreetMap)**: Marcadores geográficos dinâmicos com agrupamento e popup detalhado.
- **Busca por Raio Geográfico (GPS e Pontos de Referência)**: Filtro com cálculo de distância por fórmula de *Haversine* (1km a 50km).

### 4. 🎛️ Filtros Avançados Unificados
- **Barra de Resumo de Filtros Ativos**: Visualização no topo com botões `✕` para remoção rápida.
- **Inputs Numéricos Diretos de Preço (R$)**: Digitação livre de valor mínimo e máximo + Histograma vetorial SVG de densidade de preços.
- **Filtro de Estágio do Imóvel**: *Pronto para Morar*, *Na Planta / Lançamento*, *Imóvel Novo*, *Leilão*, *Temporada*.
- **Filtro por Preferência de Andar**: *Térreo/Garden*, *Andar Baixo*, *Andar Alto*, *Cobertura/Duplex*.
- **Salvar Combinações de Busca**: Permite salvar filtros favoritos para receber alertas na Central de Notificações.

### 5. ⚖️ Comparador de Imóveis Side-by-Side
- Comparação lado a lado de até 4 imóveis simultâneos.
- Destaques inteligentes automáticos: `🏆 Menor R$/m²`, `✨ Maior Espaço Útil`, `💰 Mais Econômico`.
- **Exportação do Comparativo em PDF**: Geração de relatório formatado para impressão ou envio a clientes.

### 6. 💬 Central de Atendimento & Negociação em Tempo Real
- **Chat Direto por Imóvel**: Canal de conversa em tempo real entre comprador e anunciante.
- **Canal de Suporte ImóvelHUB**: Atendimento integrado com assistente de suporte.
- **Agendamento de Visitas Online**: Escolha de dia e horário com confirmação instantânea.
- **Proposta Formal de Compra**: Formulário digital para envio de oferta com valor de entrada e prazo de validade.

### 7. 📑 Suíte Financeira e Jurídica Integrada
- **Simulador de Financiamento Habitacional**: Comparação entre sistemas SAC e PRICE com taxas reais dos principais bancos brasileiros (Caixa, Itaú, Bradesco, Santander, Banco do Brasil).
- **Calculadora de ITBI e Custos Cartorários**: Estimativa precisa de imposto municipal (ITBI), escritura pública e registro de imóveis.
- **Calculadora de Rentabilidade e ROI / Yield**: Projeção de retorno anual para locação tradicional vs. temporada/Airbnb.
- **Gerador de Ficha Técnica em PDF**: Exportação profissional do imóvel com fotos, mapa, comodidades e contatos.
- **Plantas Baixas Interativas e Tour Virtual 360°**.

### 8. 🛡️ Painel Administrativo & Gestão de Usuários (RBAC)
- Suporte a múltiplos perfis de acesso: **Administrador**, **Corretor / Imobiliária**, **Proprietário**, **Comprador** e **Suporte**.
- Gestão completa de anúncios (CRUD), moderação, destaque de planos e relatórios analíticos de visualizações e leads.
- Backup completo do banco de dados em **JSON** e exportação de dados em **CSV**.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React 19** — Biblioteca declarativa e reativa para interfaces de usuário.
- **Vite 8** — Ferramenta de build ultrarrápida com Hot Module Replacement (HMR).
- **Leaflet & React-Leaflet** — Mapas interativos e georreferenciamento vetorial.
- **Lucide React** — Conjunto moderno de ícones vetoriais.
- **CSS3 Puro (Design System Próprio)** — Sem frameworks pesados, arquitetura de tokens HSL, suporte a dark mode nativo, glassmorphism e micro-animações.

### **Backend & Persistência**
- **Node.js & Express 5** — API REST para gerenciamento de imóveis, usuários e mensagens de chat.
- **JSON Database Engine (`server/data.json`)** — Motor de persistência leve e síncrono.
- **CORS** — Middleware de segurança para requisições cross-origin.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18.0 ou superior)
- **npm** (versão 9.0 ou superior) ou **yarn** / **pnpm**
- **Git** instalado no computador

### Passo a Passo

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/SEU-USUARIO/imobhub.git
   cd imobhub
   ```

2. **Instalar as Dependências**:
   ```bash
   npm install
   ```

3. **Iniciar a Aplicação (Frontend + Backend)**:
   ```bash
   npm run start:all
   ```
   > Esse comando inicializa simultaneamente a **API Express** na porta `3001` e o **Vite Dev Server** na porta `5173`.

4. **Acessar no Navegador**:
   - Abra [http://localhost:5173](http://localhost:5173) no seu navegador.
   - A API Backend estará respondendo em [http://localhost:3001/api/properties](http://localhost:3001/api/properties).

---

## 📜 Scripts Disponíveis no `package.json`

| Comando | Descrição |
|---|---|
| `npm run start:all` | Inicia o servidor backend Express e o frontend Vite em paralelo. |
| `npm run dev` | Inicia somente o servidor de desenvolvimento do frontend Vite. |
| `npm run server` | Inicia somente a API backend Express (`server/index.js`). |
| `npm run build` | Compila e minifica a aplicação para produção na pasta `dist/`. |
| `npm run preview` | Executa uma prévia local do build de produção. |
| `npm run lint` | Executa o linter de alta performance (Oxlint) para validação do código. |

---

## 📂 Estrutura de Pastas do Projeto

```
imobhub/
├── public/                 # Arquivos públicos e favicons
├── server/                 # Backend Node.js / Express
│   ├── data.json           # Banco de dados persistente em JSON
│   ├── db.js               # Camada de acesso aos dados (DAO)
│   └── index.js            # Rotas da API REST Express (Porta 3001)
├── src/
│   ├── components/         # Componentes React modulares
│   │   ├── AdminDashboardModal.jsx      # Painel de controle do Administrador
│   │   ├── AuthModal.jsx                # Autenticação e troca de perfil
│   │   ├── FiltersSidebar.jsx           # Modal de filtros avançados unificados
│   │   ├── HeroSearch.jsx               # Seção Hero com busca cascata e abas
│   │   ├── ImovelwebCategoryDropdown.js # Seletor de categorias em árvore
│   │   ├── PropertyCard.jsx             # Card individual de imóvel
│   │   ├── PropertyCompareModal.jsx     # Comparador lado a lado com PDF
│   │   ├── PropertyDetailModal.jsx      # Ficha completa do imóvel
│   │   ├── RealLeafletMap.jsx           # Mapa interativo com pins
│   │   ├── SplitScreenView.jsx          # Modo dividir tela (Lista + Mapa)
│   │   └── ...                          # Modais de calculadora, chat, propostas, etc.
│   ├── mockData/           # Dados mockados e taxonomias imobiliárias
│   │   ├── categories.js   # Estrutura completa de tipos e subtipos
│   │   ├── properties.js   # 60 imóveis completos com coordenadas e fotos
│   │   └── users.js        # Usuários e planos de anúncio
│   ├── pages/              # Páginas completas da aplicação
│   │   ├── BrokerProfilePage.jsx        # Perfil público da imobiliária/corretor
│   │   └── PropertyDetailPage.jsx       # Página dedicada do imóvel
│   ├── services/           # Comunicação com a API backend (`api.js`)
│   ├── App.jsx             # Componente raiz, orquestrador de estado e rotas
│   ├── index.css           # Design system completo e estilos globais
│   └── main.jsx            # Ponto de entrada do React 19
├── package.json            # Dependências e scripts
├── vite.config.js          # Configuração do Vite e plugins
└── README.md               # Apresentação e documentação do projeto
```

---

## 👥 Perfis de Acesso de Teste (RBAC)

Você pode alternar entre os perfis a qualquer momento clicando no botão **"Entrar / Painel"** no topo da página:

| Perfil | Nome de Exemplo | Acesso Principal |
|---|---|---|
| 👑 **Administrador** | Carlos Administrador | Painel Admin Geral, Aprovação de Anúncios, Gestão de Usuários, Backup |
| 💼 **Corretor / Imobiliária** | Ricardo Corretor (CRECI 123.456-F) | Gestão dos seus imóveis, recebimento de propostas e chat com leads |
| 🏡 **Proprietário** | Marina Proprietária | Anúncio de imóveis particulares, contratação de destaques e métricas |
| 🔍 **Comprador / Locatário** | Juliana Compradora | Busca avançada, favoritos, comparador, agendamento e propostas |
| 🎧 **Suporte** | Suporte ImóvelHUB | Atendimento ao cliente via Central de Ajuda |

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para obter mais informações.

---

<p align="center">
  Desenvolvido com excelência para revolucionar a experiência de compra, venda e locação de imóveis no Brasil. 🇧🇷✨
</p>
