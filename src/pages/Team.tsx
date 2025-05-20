import React, { useEffect } from 'react';
import { Github, GraduationCap, MapPin } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Richmond Constante',
    role: 'Team Lead & Fullstack Dev',
    image: '/images/Rich.png',
    github: 'https://github.com/fame2332'
  },
  {
    name: 'Aaron Lazaro',
    role: 'DFA Designer',
    image: '/images/AaronL.jpg',
    github: 'https://github.com/'
  },
  {
    name: 'Helvin Tañada',
    role: 'Hindi pa bayad sa ambag',
    image: '/images/Jepoy.png',
    github: 'https://github.com/'
  },
  {
    name: ' Kaizz Laga',
    role: 'Sponsor',
    image: '/images/Kaizz.png',
    github: 'https://github.com/'
  }
];

export default function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h1>
        <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 py-3 px-6 rounded-lg shadow-md inline-flex">
          <div className="flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            <span>BCS33 - Computer Science</span>
          </div>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <span>De La Salle University - Dasmariñas</span>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {TEAM_MEMBERS.map((member, index) => (
          <div key={index} className="group">
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <div className="w-full h-[250px] rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{member.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{member.role}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Info */}
      <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">About BCS33</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            BCS33 is a dynamic group of Computer Science students at De La Salle University -
            Dasmariñas, specializing in intelligent systems, particularly Artificial
            Intelligence and its related fields. Our team combines technical expertise
            with creative problem-solving to develop innovative AI-driven solutions that push
            the boundaries of technology.
          </p>
        </div>
      </div>
    </div>
  );
}