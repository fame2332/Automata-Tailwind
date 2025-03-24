import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Linkedin, Heart, Clock, Phone, MapPin, Send } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/automata-visualizer', label: 'GitHub' },
  { icon: Mail, href: 'mailto:contact@automata-visualizer.com', label: 'Email' },
  { icon: Linkedin, href: 'https://linkedin.com/company/automata-visualizer', label: 'LinkedIn' }
];

const BUSINESS_HOURS = [
  { days: 'Monday - Friday', hours: 'Closed' },
  { days: 'Saturday - Sunday', hours: '12:00 PM - 4:00 PM' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Latest News & Updates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-400">Latest Updates</h3>
            <div className="space-y-3">
              <Link to="/updates" className="block">
                <p className="text-white font-medium">Version 1.1.2 Released</p>
                <p className="text-sm text-gray-400">New UI improvements and bug fixes</p>
              </Link>
              <Link to="/updates" className="text-indigo-400 text-sm hover:text-indigo-300">
                View all updates →
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-400">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/updates" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Updates
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Team
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter & Business Hours */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-400">Newsletter</h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 rounded-l text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-indigo-500 rounded-r hover:bg-indigo-600 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-400">Business Hours</h3>
              <div className="space-y-2">
                {BUSINESS_HOURS.map((schedule, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Clock size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white">{schedule.days}</p>
                      <p className="text-sm text-gray-400">{schedule.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-400">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm">+63 9150-3656-02</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm">contact@automata-visualizer.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-gray-400 mt-1" />
                  <span className="text-sm">DBB-B, 4115 West Ave<br />Dasmariñas, Cavite</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-400">Follow Us</h3>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              &copy; {new Date().getFullYear()} Automata Visualizer. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 mt-2 sm:mt-0 text-sm text-gray-400">
              <span>Made with</span>
              <Heart size={14} className="text-red-500" />
              <span>by DLSUD Students</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}