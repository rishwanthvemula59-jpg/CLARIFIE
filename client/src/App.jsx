import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import PlasmaBackground from './components/MeshDriftBackground';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { NewCase } from './pages/NewCase';
import { CaseResult } from './pages/CaseResult';
import { ReportView } from './pages/ReportView';
import { Guardian } from './pages/Guardian';
import { ScamPatterns } from './pages/ScamPatterns';
import { DashboardLayout } from './pages/dashboard/DashboardLayout';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center font-mono text-sm text-slate-400">
        Verifying Security Token...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col glass-page-bg text-white relative">
          {/* Animated WebGL Plasma Pattern Shader Background */}
          <PlasmaBackground />

          <Navbar />
          <main className="flex-1 relative z-10">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/guardian" element={<Guardian />} />
              <Route path="/patterns" element={<ScamPatterns />} />

              {/* Protected Workspace Routes */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cases/new"
                element={
                  <ProtectedRoute>
                    <NewCase />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cases/:id"
                element={
                  <ProtectedRoute>
                    <CaseResult />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cases/:id/report"
                element={
                  <ProtectedRoute>
                    <ReportView />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
