import React, { useState, useEffect } from 'react';
import { Send, Mail, MessageSquare, Info, Phone, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeField, setActiveField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setSubmitStatus('submitting');
      
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: 'general',
          message: ''
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }, 1500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.8
      }
    }
  };

  const contactInfoItems = [
    { 
      icon: <Mail className="text-indigo-500" size={24} />,
      title: "Email Us",
      content: "automata@visualizer.com"
    },
    { 
      icon: <Phone className="text-indigo-500" size={24} />,
      title: "Call Us",
      content: "+1 (555) 123-4567"
    },
    { 
      icon: <MapPin className="text-indigo-500" size={24} />,
      title: "Location",
      content: "Digital Campus, Algorithm Avenue"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8"
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-300 mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Have questions or feedback about our Automata Visualizer? We'd love to hear from you!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            variants={itemVariants}
            whileHover={{ translateY: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
              <p className="text-indigo-100">We'll get back to you as soon as possible.</p>
            </div>

            {submitStatus === 'success' && (
              <motion.div 
                className="m-6 p-4 bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-200 rounded-lg flex items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle className="mr-3 text-green-500" size={20} />
                <span>Thank you for your message! We'll get back to you soon.</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                className="m-6 p-4 bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg flex items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring" }}
              >
                <AlertCircle className="mr-3 text-red-500" size={20} />
                <span>Oops! Something went wrong. Please try again later.</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <motion.div 
                variants={itemVariants}
                className={`relative ${activeField === 'name' || formData.name ? 'focused' : ''}`}
              >
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  className={`block w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg outline-none transition-all duration-300 border ${
                    errors.name 
                      ? 'border-red-500 dark:border-red-500' 
                      : activeField === 'name' 
                        ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-900' 
                        : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <AlertCircle size={16} className="mr-1" /> {errors.name}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className={`relative ${activeField === 'email' || formData.email ? 'focused' : ''}`}
              >
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  className={`block w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg outline-none transition-all duration-300 border ${
                    errors.email 
                      ? 'border-red-500 dark:border-red-500' 
                      : activeField === 'email' 
                        ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-900' 
                        : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Your Email"
                />
                {errors.email && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <AlertCircle size={16} className="mr-1" /> {errors.email}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  onFocus={() => setActiveField('subject')}
                  onBlur={() => setActiveField(null)}
                  className={`block w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg outline-none transition-all duration-300 border ${
                    activeField === 'subject' 
                      ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-900' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className={`relative ${activeField === 'message' || formData.message ? 'focused' : ''}`}
              >
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  rows={5}
                  className={`block w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg outline-none transition-all duration-300 border ${
                    errors.message 
                      ? 'border-red-500 dark:border-red-500' 
                      : activeField === 'message' 
                        ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-900' 
                        : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Your Message"
                />
                {errors.message && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <AlertCircle size={16} className="mr-1" /> {errors.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                <span className="absolute right-0 top-0 h-full w-12 -ml-2 bg-white/20 transform skew-x-30 transition-transform duration-1000 group-hover:translate-x-60"></span>
                
                {submitStatus === 'submitting' ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : (
                  <Send className="mr-2" size={20} />
                )}
                
                {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          <div className="flex flex-col gap-8">
            {/* Contact Info Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={containerVariants}
            >
              {contactInfoItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 20px 30px -12px rgba(0, 0, 0, 0.2)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* FAQ Preview */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Info className="mr-2 text-indigo-500" size={20} />
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                <motion.div 
                  className="border-b border-gray-200 dark:border-gray-700 pb-4"
                  variants={itemVariants}
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">What is an Automata Visualizer?</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Our Automata Visualizer is a tool that helps you visualize and understand finite automata, pushdown automata, and context-free grammars.</p>
                </motion.div>
                
                <motion.div 
                  className="border-b border-gray-200 dark:border-gray-700 pb-4"
                  variants={itemVariants}
                >
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">How do I report a bug?</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Please use the contact form on this page and select "Technical Support" from the dropdown menu.</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.a 
                    href="/about" 
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    View all FAQs
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}