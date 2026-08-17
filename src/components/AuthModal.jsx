import React, { useState } from 'react';
import { X, User, Lock, Mail, ShieldCheck, Sparkles, LogIn, UserPlus, Headphones, BadgeCheck, Home } from 'lucide-react';
import { DEFAULT_USERS } from '../mockData/users';

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [role, setRole] = useState('buyer'); // 'admin', 'owner', 'broker', 'buyer', 'support'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [creci, setCreci] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = DEFAULT_USERS.find(u => u.role === role);
    if (existing && mode === 'login') {
      onLoginSuccess(existing);
    } else {
      const newUser = {
        id: `user-${Date.now()}`,
        name: name || email.split('@')[0] || 'Usuário ImóvelHUB',
        email: email || `${role}@email.com`,
        role: role,
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        phone: '(11) 98888-7777',
        creci: role === 'broker' ? creci : null
      };
      onLoginSuccess(newUser);
    }
    onClose();
  };

  const handleQuickLogin = (roleType) => {
    const found = DEFAULT_USERS.find(u => u.role === roleType);
    if (found) {
      onLoginSuccess(found);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1400 }} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '540px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-main)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <LogIn size={20} color="var(--color-primary-light)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              {mode === 'login' ? 'Acessar Conta ImóvelHUB' : 'Criar Nova Conta'}
            </h2>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem' }}>
          {/* Quick Demo Login 1-Click Pills for all 5 Roles */}
          <div style={{
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={14} />
              <span>Acesso Rápido para Testes por Perfil:</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.4rem' }}>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleQuickLogin('admin')}
                style={{ fontSize: '0.75rem', borderColor: 'var(--color-primary)' }}
              >
                🔒 Admin
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleQuickLogin('agency')}
                style={{ fontSize: '0.75rem', borderColor: '#0284c7', color: '#0284c7' }}
              >
                🏢 Imobiliária
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleQuickLogin('owner')}
                style={{ fontSize: '0.75rem' }}
              >
                🏡 Proprietário
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleQuickLogin('broker')}
                style={{ fontSize: '0.75rem' }}
              >
                📜 Corretor
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleQuickLogin('buyer')}
                style={{ fontSize: '0.75rem' }}
              >
                🔍 Comprador
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleQuickLogin('support')}
                style={{ fontSize: '0.75rem' }}
              >
                🎧 Suporte
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                Selecione seu Perfil
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="agency">🏢 Imobiliária (Agência com Equipe)</option>
                <option value="buyer">🔍 Comprador / Inquilino</option>
                <option value="owner">🏡 Proprietário de Imóvel</option>
                <option value="broker">📜 Corretor Autônomo</option>
                <option value="support">🎧 Atendente de Suporte</option>
                <option value="admin">🔒 Administrador Master</option>
              </select>
            </div>

            {mode === 'register' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Nome Completo</label>
                <input
                  type="text"
                  placeholder="Seu Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>
            )}

            {mode === 'register' && role === 'broker' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Registro CRECI</label>
                <input
                  type="text"
                  placeholder="Ex: 12345-J"
                  value={creci}
                  onChange={(e) => setCreci(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>E-mail</label>
              <input
                type="email"
                placeholder="seu.email@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem' }}
            >
              {mode === 'login' ? 'Entrar na Conta' : 'Finalizar Cadastro'}
            </button>
          </form>

          {/* Toggle Login vs Register */}
          <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {mode === 'login' ? (
              <span>
                Não tem uma conta ainda?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  style={{ border: 'none', background: 'none', color: 'var(--color-primary-light)', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cadastre-se grátis
                </button>
              </span>
            ) : (
              <span>
                Já possui conta?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  style={{ border: 'none', background: 'none', color: 'var(--color-primary-light)', fontWeight: 700, cursor: 'pointer' }}
                >
                  Faça login aqui
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
