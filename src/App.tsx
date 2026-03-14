import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from './supabase';
import { Home, Search, PlusSquare, MessageCircle, User, LogOut, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Login from './pages/Login';
import HomePage from './pages/Home';
import Explore from './pages/Explore';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

const Navigation = () => {
  const location = useLocation();
  const tabs = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, path: '/explore', label: 'Explore' },
    { icon: PlusSquare, path: '/create', label: 'Create' },
    { icon: MessageCircle, path: '/chat', label: 'Chat' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:left-0 md:bottom-0 md:w-20 lg:w-64 md:border-r md:border-white/10 glass-dark md:bg-black/40">
      <div className="flex md:flex-col items-center justify-around md:justify-start h-16 md:h-full md:py-8 md:gap-8">
        <div className="hidden md:flex items-center justify-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent lg:block hidden">Nexio</h1>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center lg:hidden">
            <span className="font-bold text-xl">N</span>
          </div>
        </div>
        
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <Link 
              key={tab.path} 
              to={tab.path}
              className={`flex items-center gap-4 p-3 rounded-2xl transition-all relative group ${
                isActive ? 'text-blue-400 bg-blue-500/10' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={24} />
              <span className={`hidden lg:block font-medium ${isActive ? 'text-white' : ''}`}>{tab.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute -bottom-1 md:bottom-auto md:-left-1 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-1/2 md:-translate-y-1/2 w-1 h-1 md:w-1 md:h-6 bg-blue-500 rounded-full"
                />
              )}
            </Link>
          );
        })}

        <div className="hidden md:flex mt-auto flex-col gap-4 items-center lg:items-start lg:px-4 w-full">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-3 rounded-2xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={24} />
            <span className="hidden lg:block font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Supabase errors might look different, but we'll keep a general boundary
      setHasError(true);
      setErrorInfo(event.message);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#050510]">
        <div className="glass p-8 rounded-3xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Application Error</h2>
          <p className="text-white/70 mb-6">Something went wrong. Please try refreshing the page.</p>
          <pre className="text-xs text-left bg-black/30 p-4 rounded-xl overflow-auto max-h-40 mb-6 text-red-300/80">
            {errorInfo}
          </pre>
          <button onClick={() => window.location.reload()} className="btn-primary w-full">Reload App</button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050510]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
        />
      </div>
    );
  }

  const user = session?.user;

  return (
    <ErrorBoundary>
      <Router>
        <div className="flex min-h-screen">
          {user && <Navigation />}
          <main className={`flex-1 ${user ? 'pb-20 md:pb-0 md:pl-20 lg:pl-64' : ''}`}>
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/explore" element={user ? <Explore /> : <Navigate to="/login" />} />
              <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
