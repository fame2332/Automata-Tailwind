import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Updates from './pages/Updates';
import Articles from './pages/Articles';
import Article from './pages/Article';
import FsmCreator from './pages/FsmCreator';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/PageTransition';

// Wrapper component to handle AnimatePresence with useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition keyValue="home">
            <Home />
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition keyValue="about">
            <About />
          </PageTransition>
        } />
        <Route path="/team" element={
          <PageTransition keyValue="team">
            <Team />
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition keyValue="contact">
            <Contact />
          </PageTransition>
        } />
        <Route path="/updates" element={
          <PageTransition keyValue="updates">
            <Updates />
          </PageTransition>
        } />
        <Route path="/articles" element={
          <PageTransition keyValue="articles">
            <Articles />
          </PageTransition>
        } />
        <Route path="/article/:id" element={
          <PageTransition keyValue="article-detail">
            <Article />
          </PageTransition>
        } />
        <Route path="/fsm-creator" element={
          <PageTransition keyValue="fsm-creator">
            <FsmCreator />
          </PageTransition>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure loading screen shows for at least 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 
                          dark:from-gray-900 dark:to-gray-800 dark:bg-cyber-pattern">
            <CustomCursor />
            <Header />
            <AnimatedRoutes />
            <Footer />
          </div>
        </Router>
      )}
    </ThemeProvider>
  );
}