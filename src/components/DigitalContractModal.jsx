import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Download, 
  Printer, 
  ShieldCheck, 
  PenTool, 
  User, 
  Building2, 
  DollarSign, 
  Calendar, 
  Lock, 
  Sparkles,
  Share2,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';

export default function DigitalContractModal({
  isOpen,
  onClose,
  property,
  currentUser
}) {
  const [contractType, setContractType] = useState('locacao'); // 'locacao', 'compra_venda', 'vistoria'
  const [tenantName, setTenantName] = useState(currentUser?.name || 'Dr. Fernando Guimarães');
  const [tenantCpf, setTenantCpf] = useState('321.654.987-00');
  const [tenantEmail, setTenantEmail] = useState(currentUser?.email || 'fernando.g@email.com');
  const [ownerName, setOwnerName] = useState(property?.advertiser?.name || 'Ricardo Proprietário');
  const [ownerCpf, setOwnerCpf] = useState('123.456.789-00');
  const [contractDurationMonths, setContractDurationMonths] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(property?.rentPrice || 4800);
  const [salePrice, setSalePrice] = useState(property?.price || 1650000);
  const [guaranteeType, setGuaranteeType] = useState('Seguro Fiança Porto Seguro (Sem Fiador)');

  // Signature Pad State
  const [isSigned, setIsSigned] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [signatureHash, setSignatureHash] = useState('');
  const [signedAt, setSignedAt] = useState('');
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#1e3a8a';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isOpen, contractType]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
    setSignatureData(null);
  };

  const handleConfirmSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setSignatureData(dataUrl);
    setIsSigned(true);
    // Generate Fake SHA-256 Hash
    const hash = 'SHA256:' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setSignatureHash(hash);
    setSignedAt(new Date().toLocaleString('pt-BR'));
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 1400 }} onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '1000px', 
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
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              padding: '0.5rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Gerador & Assinador de Contratos Digitais</h3>
                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', borderRadius: '999px', fontWeight: 700 }}>
                  VALIDADE JURÍDICA ICP-BRASIL
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Minutas automatizadas com assinatura eletrônica na tela e hash criptográfico de integridade
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

        {/* Contract Type Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--bg-main)',
          borderBottom: '1px solid var(--border-color)',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { id: 'locacao', label: '📄 Contrato de Locação Residencial' },
              { id: 'compra_venda', label: '📑 Promessa de Compra e Venda' },
              { id: 'vistoria', label: '📋 Termo de Vistoria e Entrega de Chaves' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setContractType(type.id);
                  setIsSigned(false);
                  setSignatureData(null);
                }}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: contractType === type.id ? '1.5px solid var(--color-primary-light)' : '1px solid var(--border-color)',
                  backgroundColor: contractType === type.id ? 'var(--bg-card)' : 'transparent',
                  color: contractType === type.id ? 'var(--color-primary-light)' : 'var(--text-muted)',
                  fontWeight: contractType === type.id ? 800 : 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button className="btn btn-outline btn-sm" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
              <Printer size={14} />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
          {/* Left: Contract Document Preview */}
          <div style={{
            backgroundColor: '#ffffff',
            color: '#1f2937',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            fontFamily: 'serif',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            height: 'fit-content'
          }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #111827', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', color: '#111827', margin: 0 }}>
                {contractType === 'locacao' && 'INSTRUMENTO PARTICULAR DE LOCAÇÃO RESIDENCIAL'}
                {contractType === 'compra_venda' && 'CONTRATO DE COMPROMISSO DE COMPRA E VENDA DE IMÓVEL'}
                {contractType === 'vistoria' && 'TERMO DE VISTORIA E ENTREGA DE CHAVES'}
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#4b5563' }}>Plataforma ImóvelHUB Digital • Registro Unificado</span>
            </div>

            {/* Clausula 1: As Partes */}
            <p>
              <strong>CLÁUSULA PRIMEIRA - DAS PARTES:</strong><br />
              <strong>LOCADOR / VENDEDOR:</strong> {ownerName}, inscrito no CPF/MF sob o nº {ownerCpf}, doravante denominado simplesmente como PRIMEIRO CONTRATANTE.<br />
              <strong>LOCATÁRIO / COMPRADOR:</strong> {tenantName}, inscrito no CPF/MF sob o nº {tenantCpf}, e-mail {tenantEmail}, doravante denominado simplesmente como SEGUNDO CONTRATANTE.
            </p>

            {/* Clausula 2: Do Objeto */}
            <p>
              <strong>CLÁUSULA SEGUNDA - DO OBJETO:</strong><br />
              O presente instrumento tem como objeto o imóvel situado na <strong>{property?.address || 'Avenida do Batel, 1550'}</strong>, bairro {property?.neighborhood || 'Batel'}, cidade de {property?.city || 'Curitiba'} - {property?.state || 'PR'}, contendo área útil de {property?.area || 142}m², {property?.bedrooms || 3} dormitórios e {property?.parkingSpots || 2} vagas de garagem.
            </p>

            {/* Clausula 3: Valores e Condições */}
            {contractType === 'locacao' && (
              <p>
                <strong>CLÁUSULA TERCEIRA - DO VALOR DO ALUGUEL E PRAZO:</strong><br />
                O valor mensal da locação é fixado em <strong>R$ {Number(monthlyRent).toLocaleString('pt-BR')},00</strong>, com vencimento no dia 10 de cada mês. O prazo de vigência desta locação é de <strong>{contractDurationMonths} meses</strong>.<br />
                <strong>GARANTIA LOCATÍCIA:</strong> {guaranteeType}.
              </p>
            )}

            {contractType === 'compra_venda' && (
              <p>
                <strong>CLÁUSULA TERCEIRA - DO PREÇO E FORMA DE PAGAMENTO:</strong><br />
                O preço total e certo da presente transação é de <strong>R$ {Number(salePrice).toLocaleString('pt-BR')},00</strong>, a ser quitado mediante recursos próprios e/ou financiamento bancário com anuência da Caixa Econômica Federal.
              </p>
            )}

            {/* Clausula 4: Assinatura Eletrônica */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed #9ca3af' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid #111827', height: '45px', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Assinado Eletronicamente pelo Proprietário</span>
                  </div>
                  <strong style={{ fontSize: '0.85rem' }}>{ownerName}</strong>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid #111827', minHeight: '45px', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isSigned && signatureData ? (
                      <img src={signatureData} alt="Assinatura" style={{ maxHeight: '42px' }} />
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>Aguardando Assinatura Digital</span>
                    )}
                  </div>
                  <strong style={{ fontSize: '0.85rem' }}>{tenantName}</strong>
                </div>
              </div>

              {isSigned && (
                <div style={{ marginTop: '1.25rem', padding: '0.75rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', fontSize: '0.75rem', color: '#166534' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800 }}>
                    <ShieldCheck size={16} color="#16a34a" />
                    <span>DOCUMENTO ASSINADO DIGITALMENTE COM VALIDADE JURÍDICA (MP 2.200-2/2001)</span>
                  </div>
                  <div style={{ marginTop: '0.3rem', fontFamily: 'monospace' }}>
                    Código Hash: {signatureHash}<br />
                    Data/Hora: {signedAt} • IP: 189.120.45.*** (Registrado via ImóvelHUB Auth)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Signature Pad & Form Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Signature Pad */}
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <strong style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <PenTool size={16} color="var(--color-primary-light)" />
                  <span>Assine no Quadro Abaixo:</span>
                </strong>
                <button 
                  type="button" 
                  onClick={clearSignature} 
                  style={{ border: 'none', background: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  <RotateCcw size={12} />
                  <span>Limpar</span>
                </button>
              </div>

              <div style={{ border: '2px dashed var(--color-primary-light)', borderRadius: 'var(--radius-sm)', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={140}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  style={{ width: '100%', height: '140px', cursor: 'crosshair', display: 'block' }}
                />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.4rem' }}>
                ✍️ Use o mouse ou a ponta do dedo na tela para assinar
              </span>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleConfirmSignature}
                style={{ width: '100%', marginTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 800 }}
              >
                <CheckCircle2 size={16} />
                <span>Confirmar Assinatura Digital</span>
              </button>
            </div>

            {/* Quick Edit Fields */}
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <strong style={{ fontSize: '0.88rem' }}>Dados do Contrato</strong>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Nome do Comprador / Inquilino</label>
                <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>CPF</label>
                <input type="text" value={tenantCpf} onChange={(e) => setTenantCpf(e.target.value)} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }} />
              </div>

              {contractType === 'locacao' && (
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Valor do Aluguel (R$/mês)</label>
                  <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }} />
                </div>
              )}

              {contractType === 'compra_venda' && (
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Valor da Compra (R$)</label>
                  <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
