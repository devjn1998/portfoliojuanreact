import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome.tsx';
import Header from './components/Layouts/Header/Header.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import CreateProject from './pages/CreateProject/CreateProject.tsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.tsx';
import Login from './pages/Login/Login.tsx';
import { auth } from './services/firebase.ts';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseService } from './services/firebase.ts';
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Inicializa AOS
    if (typeof AOS !== 'undefined') {
      AOS.init();
    }

    // Gerencia mensagem temporária
    const message = document.getElementById('message');
    if (message) {
      const timer1 = setTimeout(() => {
        message.classList.add('msg-hidden');
      }, 1500);

      const timer2 = setTimeout(() => {
        message.remove();
      }, 3000);

      // Limpa os timeouts quando o componente for desmontado
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, []);

  const handleLogout = async () => {
    try {
      await firebaseService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Router>
      <div className="App min-h-screen bg-[#13131f] text-white">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/cadastrar" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CreateProject />
              </PrivateRoute>
            } 
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
