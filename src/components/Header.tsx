import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CircleDot, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "FSM Creator", path: "/fsm-creator" },
    { name: "Modules", path: "/about" },
    { name: "Articles", path: "/articles" },
    { name: "Team", path: "/team" },
    { name: "Updates", path: "/updates" },
    { name: "Contact", path: "/contact" },
  ];

  const headerVariants = {
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      height: '64px',
      padding: '0.5rem 0',
    },
    top: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      height: '72px',
      padding: '0.75rem 0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
  };

  const darkHeaderVariants = {
    scrolled: {
      backgroundColor: 'rgba(17, 24, 39, 0.85)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      height: '64px',
      padding: '0.5rem 0',
    },
    top: {
      backgroundColor: 'rgba(17, 24, 39, 1)',
      height: '72px',
      padding: '0.75rem 0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    },
  };

  const logoVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 260,
        damping: 20,
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 10 
      }
    }
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        type: "spring", 
        stiffness: 100,
        damping: 15 
      }
    }),
    hover: { 
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 10 
      }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        staggerChildren: 0.07,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { y: 10, opacity: 0 },
    open: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 dark:text-white w-full"
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={darkHeaderVariants}
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={logoVariants}
          >
            <Link to="/" className="flex items-center group">
              <motion.div
                className="transform origin-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <CircleDot className="h-8 w-8 text-indigo-600 dark:text-indigo-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              </motion.div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 transition-all duration-500">
                Automata Visualizer
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={navItemVariants}
              >
                <Link
                  to={link.path}
                  className={`relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 px-2 py-1 ${
                    location.pathname === link.path ? 'font-semibold' : ''
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                      layoutId="underline"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <motion.button
              className="ml-4 p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden bg-white dark:bg-gray-800 overflow-hidden shadow-lg"
          >
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={mobileNavItemVariants}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      location.pathname === link.path
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}