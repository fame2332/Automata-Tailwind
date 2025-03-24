import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CircleDot } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
            <CircleDot className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Automata Visualizer</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                location.pathname === '/' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                location.pathname === '/about' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/team"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                location.pathname === '/team' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Team
            </Link>
            <Link
              to="/updates"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                location.pathname === '/updates' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Updates
            </Link>
            <Link
              to="/contact"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                location.pathname === '/contact' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}