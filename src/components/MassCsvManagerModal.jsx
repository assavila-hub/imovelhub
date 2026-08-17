import React, { useState } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  FileText,
  Building2,
  Table
} from 'lucide-react';

const CSV_SAMPLE_TEMPLATE = `Titulo;Tipo;Modalidade;Preco;Aluguel;Area;Quartos;Banheiros;Vagas;Bairro;Cidade;Estado;Descricao
"Apartamento Vista Panorâmica";Apartamento;Venda;650000;;78;2;2;1;"Pinheiros";"São Paulo";SP;"Lindo apartamento com varanda gourmet e sol da manhã."
"Studio Mobiliado e Decorado";Apartamento;Aluguel;;3200;36;1;1;0;"Moema";"São Paulo";SP;"Studio pronto para morar com ar condicionado e fechadura digital."
"Casa Alto Padrão em Condomínio";Casa;Venda;1850000;;280;4;4;3;"Alphaville";"Barueri";SP;"Excelente casa com piscina aquecida e espaço gourmet completo."
"Terreno Plano em Condomínio Fechado";Terreno;Venda;420000;;450;0;0;0;"Gramado";"Cotia";SP;"Lote 100% plano com documentação perfeita e escritura pública."`;

export default function MassCsvManagerModal({
  isOpen,
  onClose,
  properties = [],
  onImportProperties
}) {
  const [parsedRows, setParsedRows] = useState([]);
  const [importStatus, setImportStatus] = useState(null); // { success: true, count: 5 } | null
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    const blob = new Blob(['\uFEFF' + CSV_SAMPLE_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `modelo_importacao_imoveis_imovelhub.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setImportStatus(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result || '';
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');

        if (lines.length <= 1) {
          setErrorMessage("O arquivo CSV está vazio ou contém apenas o cabeçalho.");
          return;
        }

        // Parse lines
        const delimiter = lines[0].includes(';') ? ';' : ',';
        const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
        
        const rows = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(delimiter).map(c => c.trim().replace(/^"|"$/g, ''));
          if (cols.length >= 4) {
            rows.push({
              title: cols[0] || 'Imóvel Importado CSV',
              type: cols[1] || 'Apartamento',
              transactionType: cols[2] || 'Venda',
              price: cols[3] ? Number(cols[3].replace(/\D/g, '')) : null,
              rentPrice: cols[4] ? Number(cols[4].replace(/\D/g, '')) : null,
              area: cols[5] ? Number(cols[5]) : 60,
              bedrooms: cols[6] ? Number(cols[6]) : null,
              bathrooms: cols[7] ? Number(cols[7]) : null,
              parkingSpots: cols[8] ? Number(cols[8]) : null,
              neighborhood: cols[9] || 'Bairro Central',
              city: cols[10] || 'São Paulo',
              state: cols[11] || 'SP',
              description: cols[12] || 'Imóvel cadastrado via importação em lote CSV.'
            });
          }
        }

        setParsedRows(rows);
      } catch (err) {
        setErrorMessage("Erro ao processar o arquivo CSV. Verifique o formato e a codificação UTF-8.");
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (parsedRows.length === 0) return;

    const formattedNewProps = parsedRows.map((r, idx) => ({
      id: `prop-csv-${Date.now()}-${idx}`,
      title: r.title,
      type: r.type,
      subType: 'Padrão',
      transactionType: r.transactionType,
      price: r.price || 500000,
      rentPrice: r.rentPrice || 2500,
      condoFee: 500,
      iptu: 150,
      area: r.area || 65,
      bedrooms: r.bedrooms,
      bathrooms: r.bathrooms,
      parkingSpots: r.parkingSpots,
      city: r.city,
      state: r.state,
      neighborhood: r.neighborhood,
      address: `${r.neighborhood}, ${r.city} (${r.state})`,
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
      ],
      description: r.description,
      isVerifiedHub: true,
      advertiser: {
        name: 'Carga Massiva CSV ImóvelHUB',
        phone: '(11) 98765-4321',
        email: 'contato@imovelhub.com.br',
        type: 'Imobiliária'
      }
    }));

    if (onImportProperties) onImportProperties(formattedNewProps);

    setImportStatus({ success: true, count: formattedNewProps.length });
    setParsedRows([]);
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
          maxWidth: '900px',
          width: '100%',
          maxHeight: '92vh',
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileSpreadsheet size={22} color="#10b981" />
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Importador &amp; Exportador Massivo CSV / Excel
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Importe dezenas de imóveis de uma só vez utilizando uma planilha padrão
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              border: 'none', 
              background: 'rgba(255, 255, 255, 0.1)', 
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

        {/* Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Top Actions: Download Template & Upload CSV */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {/* Download Template Box */}
            <div style={{
              backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block', marginBottom: '0.3rem' }}>
                  1. Baixar Planilha Modelo (.csv)
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>
                  Baixe o modelo com colunas prontas (Título, Tipo, Preço, Quartos, Bairro, etc.) para preencher seus imóveis.
                </p>
              </div>
              <button
                className="btn btn-outline"
                onClick={handleDownloadTemplate}
                style={{ width: '100%', justifyContent: 'center', fontWeight: 800, gap: '0.4rem' }}
              >
                <Download size={16} />
                <span>Baixar Modelo CSV</span>
              </button>
            </div>

            {/* Upload Box */}
            <div style={{
              backgroundColor: 'var(--bg-main)',
              border: '1.5px dashed var(--color-primary-light)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block', marginBottom: '0.3rem' }}>
                  2. Carregar Planilha Preenchida
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>
                  Selecione o arquivo `.csv` salvo para validação e pré-visualização na tela.
                </p>
              </div>
              <div>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  id="csv-file-upload-input"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => document.getElementById('csv-file-upload-input')?.click()}
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 800, gap: '0.4rem' }}
                >
                  <Upload size={16} />
                  <span>Selecionar Arquivo CSV...</span>
                </button>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {importStatus?.success && (
            <div style={{
              backgroundColor: '#dcfce7',
              border: '1px solid #86efac',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#166534'
            }}>
              <CheckCircle2 size={20} color="#166534" />
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>Carga Massiva Concluída com Sucesso!</strong>
                <span style={{ fontSize: '0.8rem' }}>{importStatus.count} novos imóveis foram cadastrados e publicados no portal.</span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#991b1b'
            }}>
              <AlertTriangle size={20} color="#991b1b" />
              <span style={{ fontSize: '0.85rem' }}>{errorMessage}</span>
            </div>
          )}

          {/* Parsed Rows Preview Table */}
          {parsedRows.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>
                  Pré-visualização da Importação ({parsedRows.length} imóveis detectados)
                </h4>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmImport}
                  style={{ fontWeight: 800, gap: '0.4rem' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Confirmar &amp; Salvar Todos ({parsedRows.length})</span>
                </button>
              </div>

              <div style={{ backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflowX: 'auto', maxHeight: '250px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-card)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Título</th>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Tipo</th>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Modalidade</th>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Preço</th>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Área</th>
                      <th style={{ padding: '0.6rem 0.8rem' }}>Localização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedRows.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 700 }}>{row.title}</td>
                        <td style={{ padding: '0.6rem 0.8rem' }}>{row.type}</td>
                        <td style={{ padding: '0.6rem 0.8rem' }}>{row.transactionType}</td>
                        <td style={{ padding: '0.6rem 0.8rem', fontWeight: 800, color: '#059669' }}>
                          {row.transactionType === 'Aluguel' ? `R$ ${row.rentPrice}/mês` : `R$ ${row.price?.toLocaleString('pt-BR')}`}
                        </td>
                        <td style={{ padding: '0.6rem 0.8rem' }}>{row.area} m²</td>
                        <td style={{ padding: '0.6rem 0.8rem' }}>{row.neighborhood}, {row.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
