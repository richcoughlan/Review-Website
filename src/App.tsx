import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthLayout } from './components/auth/AuthLayout';
import { AuthGuard } from './components/auth/AuthGuard';
import { AuthForm } from './components/auth/AuthForm';
import { Dashboard } from './pages/Dashboard';
import { initializeAuth } from './lib/auth';
import { useAuthStore } from './store/authStore';

function App() {
  const { user, loading } = useAuthStore();
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={
          <AuthGuard requireAuth={false}>
            <AuthLayout 
              title="ReviewBoost Pro" 
              subtitle={authMode === 'signin' 
                ? 'Sign in to your account'
                : 'Create your business account'}
            >
              <AuthForm 
                mode={authMode}
                onToggleMode={() => setAuthMode(mode => 
                  mode === 'signin' ? 'signup' : 'signin'
                )}
              />
            </AuthLayout>
          </AuthGuard>
        } />
        <Route path="/dashboard" element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        } />
      </Routes>
    </Router>
  );
}

export default App;