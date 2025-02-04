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
