import React, { useState } from 'react';
import { 
  X, 
  ClipboardCheck, 
  CheckCircle2, 
  Camera, 
  AlertTriangle, 
  ShieldCheck, 
  Key, 
  Check, 
  Download, 
  Printer,
  Sparkles,
  Home,
  CheckSquare,
  Square
} from 'lucide-react';

export default function DigitalInspectionModal({
  isOpen,
  onClose,
  property,
  currentUser
}) {
  const [inspectionType, setInspectionType] = useState('entrada'); // 'entrada', 'saida'
  const [inspectorName, setInspectorName] = useState('Mariana Vistoriadora (CRECI 45.100)');
  const [tenantName, setTenantName] = useState(currentUser?.name || 'Dr. Fernando Guimarães');
  const [date, setDate] = useState('14/08/2026');
  const [meterWater, setMeterWater] = useState('1.450 m³');
  const [meterLight, setMeterLight] = useState('8.920 kWh');
  const [keysHandedCount, setKeysHandedCount] = useState('3 cópias chaves + 2 tags magnéticas + 1 controle portão');

  // Rooms Checklist State
  const [rooms, setRooms] = useState([
    {
      id: 'room-sala',
      name: '🛋️ Sala de Estar & Jantar',
      items: [
        { id: 'item-1', label: 'Pintura das Paredes e Teto', status: 'Excelente', notes: 'Pintura nova sem manchas ou furos.' },
        { id: 'item-2', label: 'Piso Porcelanato & Rodapés', status: 'Excelente', notes: 'Sem trincas ou peças soltas.' },
        { id: 'item-3', label: 'Tomadas, Interruptores e Iluminação', status: 'Bom', notes: 'Todas as lâmpadas LED funcionando.' },
        { id: 'item-4', label: 'Porta de Entrada & Fechadura Biométrica', status: 'Excelente', notes: 'Testada e configurada.' }
      ]
    },
    {
      id: 'room-cozinha',
      name: '🍳 Cozinha & Área de Serviço',
      items: [
        { id: 'item-5', label: 'Bancada em Granito & Cuba Inox', status: 'Excelente', notes: 'Sem riscos ou vazamentos na torneira.' },
        { id: 'item-6', label: 'Armários Planejados & Gavetas', status: 'Bom', notes: 'Corrediças telescópicas operando suavemente.' },
        { id: 'item-7', label: 'Ponto de Gás & Aquecedor de Passagem', status: 'Excelente', notes: 'Aquecedor digital Rinnai testado.' }
      ]
    },
    {
      id: 'room-dorm',
      name: '🛏️ Dormitórios & Suíte Master',
      items: [
        { id: 'item-8', label: 'Piso Vinílico & Janelas com Persiana Integrada', status: 'Excelente', notes: 'Persianas elétricas operando com controle.' },
        { id: 'item-9', label: 'Ar Condicionado Split Inverter', status: 'Excelente', notes: 'Gela perfeitamente, controle remoto incluso.' }
      ]
    },
    {
      id: 'room-banheiros',
      name: '🚿 Banheiros Social e Suíte',
      items: [
        { id: 'item-10', label: 'Box de Vidro Temperado & Espelhos', status: 'Excelente', notes: 'Sem lascas ou folgas no trilho.' },
        { id: 'item-11', label: 'Duchas, Louças e Vasos Sanitários', status: 'Excelente', notes: 'Descarga dual flush sem vazamentos.' }
      ]
    },
    {
      id: 'room-varanda',
      name: '🥩 Varanda Gourmet',
      items: [
        { id: 'item-12', label: 'Churrasqueira a Carvão & Exaustor', status: 'Excelente', notes: 'Grelha nova em inox e duto limpo.' },
        { id: 'item-13', label: 'Fechamento de Vidro Retrátil (Reiki)', status: 'Excelente', notes: 'Deslizamento suave em todas as folhas.' }
      ]
    }
  ]);

  const [isFinalized, setIsFinalized] = useState(false);

  const handleUpdateItemStatus = (roomId, itemId, newStatus) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          items: r.items.map(it => it.id === itemId ? { ...it, status: newStatus } : it)
        };
      }
      return r;
    }));
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
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              padding: '0.5rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ClipboardCheck size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Laudo de Vistoria Digital de Imóvel</h3>
                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', borderRadius: '999px', fontWeight: 700 }}>
                  CHECKLIST POR AMBIENTE
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Registro fotográfico de entrada e saída com termo de entrega e devolução de chaves
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

        {/* Top Type Selector & Actions */}
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
            <button
              onClick={() => setInspectionType('entrada')}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                border: inspectionType === 'entrada' ? '1.5px solid #8b5cf6' : '1px solid var(--border-color)',
                backgroundColor: inspectionType === 'entrada' ? 'var(--bg-card)' : 'transparent',
                color: inspectionType === 'entrada' ? '#8b5cf6' : 'var(--text-muted)',
                fontWeight: inspectionType === 'entrada' ? 800 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              🔑 Vistoria de Entrada (Entrega de Chaves)
            </button>
            <button
              onClick={() => setInspectionType('saida')}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                border: inspectionType === 'saida' ? '1.5px solid #8b5cf6' : '1px solid var(--border-color)',
                backgroundColor: inspectionType === 'saida' ? 'var(--bg-card)' : 'transparent',
                color: inspectionType === 'saida' ? '#8b5cf6' : 'var(--text-muted)',
                fontWeight: inspectionType === 'saida' ? 800 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              🚪 Vistoria de Saída (Devolução do Imóvel)
            </button>
          </div>

          <button className="btn btn-outline btn-sm" onClick={() => window.print()} style={{ fontSize: '0.78rem' }}>
            <Printer size={14} />
            <span>Imprimir Laudo</span>
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header Data Card */}
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>IMÓVEL VISTORIADO</span>
              <strong style={{ fontSize: '0.88rem', display: 'block' }}>{property?.title || 'High Line Batel Curitiba'}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{property?.address || 'Avenida do Batel, 1550'}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>VISTORIADOR RESPONSÁVEL</span>
              <input type="text" value={inspectorName} onChange={(e) => setInspectorName(e.target.value)} style={{ width: '100%', padding: '0.35rem', fontSize: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>INQUILINO / COMPRADOR</span>
              <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} style={{ width: '100%', padding: '0.35rem', fontSize: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>LEITURA DOS RELÓGIOS</span>
              <span style={{ fontSize: '0.75rem', display: 'block' }}>💧 Água: {meterWater} • ⚡ Luz: {meterLight}</span>
            </div>
          </div>

          {/* Rooms Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Checklist de Itens por Ambiente</h4>

            {rooms.map(room => (
              <div key={room.id} style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <div style={{ padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', fontWeight: 800, fontSize: '0.92rem' }}>
                  {room.name}
                </div>

                <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {room.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
                      <div style={{ flex: 1, minWidth: '220px' }}>
                        <strong style={{ fontSize: '0.85rem', display: 'block' }}>{item.label}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.notes}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateItemStatus(room.id, item.id, e.target.value)}
                          style={{
                            padding: '0.35rem 0.6rem',
                            fontSize: '0.78rem',
                            borderRadius: '4px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: item.status === 'Excelente' ? '#f0fdf4' : item.status === 'Bom' ? '#eff6ff' : '#fffbeb',
                            color: item.status === 'Excelente' ? '#166534' : item.status === 'Bom' ? '#1e40af' : '#92400e',
                            fontWeight: 700
                          }}
                        >
                          <option value="Excelente">✓ Excelente (Novo)</option>
                          <option value="Bom">Bom Estado</option>
                          <option value="Marcas de Uso">Marcas Leves de Uso</option>
                          <option value="Reparo">Necessita Reparo</option>
                        </select>

                        <button className="btn btn-outline btn-sm" onClick={() => alert('Foto anexada com sucesso!')} style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}>
                          <Camera size={13} />
                          <span>Foto</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Keys Term & Finalize */}
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Key size={16} color="#f59e0b" />
              <span>Termo de Entrega de Chaves & Acessórios</span>
            </h4>
            <input
              type="text"
              value={keysHandedCount}
              onChange={(e) => setKeysHandedCount(e.target.value)}
              style={{ width: '100%', padding: '0.55rem', fontSize: '0.82rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', marginBottom: '1rem' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Ao finalizar, o laudo digital é carimbado e anexado ao contrato de locação.
              </span>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsFinalized(true);
                  alert('Laudo de Vistoria Digital assinado e finalizado com sucesso!');
                }}
                style={{ fontWeight: 800 }}
              >
                <CheckCircle2 size={16} />
                <span>{isFinalized ? 'Laudo Finalizado ✓' : 'Aprovar & Finalizar Laudo'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
