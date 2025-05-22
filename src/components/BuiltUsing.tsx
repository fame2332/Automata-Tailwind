import React from 'react';

interface Technology {
  name: string;
  logo: string;
  color: string;
  description: string;
}

const TECHNOLOGIES: Technology[] = [
  {
    name: 'Vite',
    logo: 'https://i.ibb.co/b5chyPPN/Vite.png',
    color: '#646CFF',
    description: 'Next Generation Frontend Tooling'
  },
  {
    name: 'React',
    logo: 'https://i.ibb.co/JW1wzkgQ/React.png',
    color: '#61DAFB',
    description: 'A JavaScript library for building user interfaces'
  },
  {
    name: 'JavaScript',
    logo: '/images/JavaScript-logo.png',
    color: '#F7DF1E',
    description: 'The programming language of the web'
  },
  {
    name: 'Tailwind',
    logo: 'https://i.ibb.co/TqmB1qRs/Tailwindlogo.png',
    color: '#38BDF8',
    description: 'A utility-first CSS framework'
  },
  {
    name: 'Graphviz',
    logo: 'https://i.ibb.co/KcWHhv4H/Graphviz.png',
    color: '#E10098',
    description: 'Graph Visualization Software'
  },
  {
    name: 'Noam/Viz',
    logo: '/images/Noam.png',
    color: '#2563EB',
    description: 'Libraries for Finite State Machine creation and visualization'
  }
];

export default function BuiltUsing() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Built Using</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Powered by modern technologies for optimal performance</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side text */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technology Stack</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our FSM Creator is built with a modern technology stack that enables powerful finite 
                state machine creation and visualization. The combination of these tools provides 
                an intuitive interface with robust functionality.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We leverage JavaScript and specialized libraries like Noam for the theoretical foundations 
                of automata, and Viz.js for rendering beautiful diagrams of your state machines.
              </p>
              <div className="mt-8">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                                  transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          
          {/* Right side technology boxes */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TECHNOLOGIES.map((tech) => (
                <div
                  key={tech.name}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform 
                           transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="p-6">
                    {/* Logo container with floating animation */}
                    <div className="relative mb-4">
                      <div 
                        className="w-16 h-16 mx-auto mb-4 p-3 rounded-xl bg-white dark:bg-gray-700 shadow-md 
                                 transform transition-all duration-500 group-hover:scale-110 
                                 animate-float"
                        style={{ 
                          borderColor: tech.color,
                          borderWidth: '2px',
                          animation: 'float 3s ease-in-out infinite'
                        }}
                      >
                        <img 
                          src={tech.logo} 
                          alt={tech.name} 
                          className="w-full h-full object-contain filter drop-shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Text content with slide-up animation */}
                    <div className="text-center transform transition-all duration-500 group-hover:translate-y-[-4px]">
                      <h3 
                        className="text-lg font-bold mb-2"
                        style={{ color: tech.color }}
                      >
                        {tech.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}