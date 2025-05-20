import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Linkedin, Heart, Clock, Phone, MapPin, Send, Book, Code, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/automata-visualizer', label: 'GitHub' },
  { icon: Mail, href: 'mailto:contact@automata-visualizer.com', label: 'Email' },
  { icon: Linkedin, href: 'https://linkedin.com/company/automata-visualizer', label: 'LinkedIn' }
];

const BUSINESS_HOURS = [
  { days: 'Monday - Friday', hours: 'Closed' },
  { days: 'Saturday - Sunday', hours: '12:00 PM - 4:00 PM' },
];

const RESOURCES = [
  { title: 'Automata Theory Basics', link: 'https://cs.stanford.edu/people/eroberts/courses/soco/projects/2004-05/automata-theory/basics.html' },
  { title: 'Regular Languages', link: 'https://www.cl.cam.ac.uk/teaching/1011/RLFA/LectureNotes.pdf' },
  { title: 'Context-Free Grammar', link: 'https://web.stanford.edu/class/archive/cs/cs103/cs103.1164/lectures/18/Small18.pdf' },
  { title: 'Deterministic Finite Automata', link: 'https://www.cs.umd.edu/users/gasarch/COURSES/452/S21/slides/dfatalk.pdf' },
  { title: 'Pushdown Automata', link: 'https://web.stanford.edu/class/archive/cs/cs103/cs103.1132/lectures/17/Small17.pdf' }
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const footerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const socialIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }),
    hover: { 
      scale: 1.2, 
      rotate: [0, -10, 10, -10, 0],
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div 
          className="absolute top-20 left-10 w-60 h-60 rounded-full bg-indigo-700 filter blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0],
            opacity: [0.5, 0.3, 0.5]
          }} 
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-purple-700 filter blur-3xl"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 30, 0],
            opacity: [0.4, 0.2, 0.4]
          }} 
          transition={{ 
            duration: 16, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Latest News & Updates */}
          <AnimatedSection direction="up" delay={0.1}>
            <div className="space-y-4">
              <motion.h3 
                className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent pb-1 inline-block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Latest Updates
              </motion.h3>
              <motion.div 
                className="space-y-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <Link to="/updates" className="block group">
                  <motion.div variants={footerItemVariants} custom={0}>
                    <p className="text-white font-medium group-hover:text-indigo-300 transition-colors">Version 1.4.0 Released</p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Add FSM Page, Bug fixes</p>
                  </motion.div>
                  
                  <motion.div variants={footerItemVariants} custom={1}>
                    <p className="text-white font-medium group-hover:text-indigo-300 transition-colors">Version 1.3.7 </p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Add Dark theme, Add built using</p>
                  </motion.div>
                  
                  <motion.div variants={footerItemVariants} custom={2}>
                    <p className="text-white font-medium group-hover:text-indigo-300 transition-colors">Version 1.3.1</p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Revamped Validate Strings according to ma'am Wishes</p>
                  </motion.div>
                </Link>
                
                <motion.div variants={footerItemVariants} custom={3}>
                  <Link to="/updates" className="text-indigo-400 text-sm hover:text-indigo-300 inline-flex items-center group">
                    <span>View all updates</span>
                    <motion.div 
                      className="inline-block ml-1"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight size={14} />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Learning Resources */}
          <AnimatedSection direction="up" delay={0.2}>
            <div className="space-y-4">
              <motion.h3 
                className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent pb-1 inline-block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Learning Resources
              </motion.h3>
              <motion.div 
                className="space-y-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {RESOURCES.map((resource, index) => (
                  <motion.a
                    key={index}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                    variants={footerItemVariants}
                    custom={index}
                    whileHover={{ x: 3 }}
                  >
                    <motion.div 
                      className="text-indigo-400 group-hover:text-indigo-300 transition-colors"
                      whileHover={{ rotate: 20 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {index === 0 ? <Book size={16} /> : 
                      index === 1 ? <Code size={16} /> : 
                      index === 2 ? <GraduationCap size={16} /> :
                      index === 3 ? <Code size={16} /> :
                      <GraduationCap size={16} />}
                    </motion.div>
                    <span>{resource.title}</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Newsletter & Business Hours */}
          <AnimatedSection direction="up" delay={0.3}>
            <div className="space-y-6">
              <div className="space-y-4">
                <motion.h3 
                  className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent pb-1 inline-block"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Newsletter
                </motion.h3>
                <motion.form 
                  onSubmit={handleNewsletterSubmit} 
                  className="space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  <div className="flex relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 bg-gray-800 rounded-l text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-all"
                      disabled={isSubmitted}
                    />
                    <motion.button
                      type="submit"
                      className="px-3 py-2 bg-indigo-500 rounded-r transition-colors flex items-center justify-center"
                      whileHover={{ backgroundColor: 'rgb(99, 102, 241)' }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubmitted}
                    >
                      {isSubmitted ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-white"
                        >
                          ✓
                        </motion.div>
                      ) : (
                        <Send size={16} />
                      )}
                    </motion.button>

                    {isSubmitted && (
                      <motion.div 
                        className="absolute left-0 right-0 -top-8 text-center text-xs text-green-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Thanks for subscribing!
                      </motion.div>
                    )}
                  </div>
                </motion.form>
              </div>

              <div className="space-y-4">
                <motion.h3 
                  className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent pb-1 inline-block"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Business Hours
                </motion.h3>
                <motion.div 
                  className="space-y-2"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {BUSINESS_HOURS.map((schedule, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-2 group"
                      variants={footerItemVariants}
                      custom={index}
                    >
                      <motion.div 
                        className="text-gray-400 mt-1 flex-shrink-0 group-hover:text-indigo-400"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Clock size={16} />
                      </motion.div>
                      <div>
                        <p className="text-sm text-white">{schedule.days}</p>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{schedule.hours}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact & Social */}
          <AnimatedSection direction="up" delay={0.4}>
            <div className="space-y-6">
              <div className="space-y-4">
                <motion.h3 
                  className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent pb-1 inline-block"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Contact Us
                </motion.h3>
                <motion.div 
                  className="space-y-3"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div 
                    className="flex items-center space-x-3 group"
                    variants={footerItemVariants}
                    custom={0}
                  >
                    <motion.div className="text-gray-400 group-hover:text-indigo-400">
                      <Phone size={16} />
                    </motion.div>
                    <span className="text-sm group-hover:text-gray-300 transition-colors">+63-915-036-5602</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center space-x-3 group"
                    variants={footerItemVariants}
                    custom={1}
                  >
                    <motion.div className="text-gray-400 group-hover:text-indigo-400">
                      <Mail size={16} />
                    </motion.div>
                    <span className="text-sm group-hover:text-gray-300 transition-colors">CRC2023@dlsud.edu.ph</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-3 group"
                    variants={footerItemVariants}
                    custom={2}
                  >
                    <motion.div className="text-gray-400 group-hover:text-indigo-400 mt-1">
                      <MapPin size={16} />
                    </motion.div>
                    <span className="text-sm group-hover:text-gray-300 transition-colors">DBB-B, 4115 West Ave<br />Dasmariñas, Cavite</span>
                  </motion.div>
                </motion.div>
              </div>
              
              <div className="space-y-4">
                <motion.h3 
                  className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent pb-1 inline-block"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Follow Us
                </motion.h3>
                <div className="flex space-x-4">
                  {SOCIAL_LINKS.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 p-2 bg-gray-800 rounded-full"
                      aria-label={link.label}
                      variants={socialIconVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <link.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <motion.p 
              className="text-sm text-gray-400 text-center sm:text-left"
              whileHover={{ color: '#a5b4fc' }}
            >
              &copy; {new Date().getFullYear()} Automata Visualizer. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex items-center space-x-1 mt-2 sm:mt-0 text-sm text-gray-400"
              whileHover={{ scale: 1.05, originX: 0 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart size={14} className="text-red-500" />
              </motion.div>
              <span>by DLSUD Students</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
