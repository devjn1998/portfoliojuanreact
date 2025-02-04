import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseService } from '../../services/firebase.ts';
import Botao from '../../components/comum/Botao/Botao.tsx';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await firebaseService.login(email, password);
      const user = userCredential.user;
      console.log('Usuário logado:', user.email);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro no login:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/user-disabled':
          setError('Usuário desabilitado');
          break;
        case 'auth/user-not-found':
          setError('Usuário não encontrado');
          break;
        case 'auth/wrong-password':
          setError('Senha incorreta');
          break;
        default:
          setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#202024] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-[#13131f] border border-[#408bec]"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#13131f] border border-[#408bec]"
              required
              disabled={loading}
            />
          </div>
          <Botao 
            type="submit" 
            className={`w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Botao>
        </form>
      </div>
    </div>
  );
};

export default Login;