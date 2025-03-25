import React from 'react';
import { Github, GraduationCap, MapPin } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Richmond Constante',
    role: 'Team Lead & Fullstack Dev',
    image: 'https://i.ibb.co/fWC8GYX/Rich.png',
    github: 'https://github.com/fame2332'
  },
  {
    name: 'Aaron Lazaro',
    role: 'DFA Designer',
    image: 'https://i.ibb.co/DHhRbPXK/AaronL.jpg',
    github: 'https://github.com/'
  },
  {
    name: 'Helvin Tanada',
    role: 'DFA Designer',
    image: 'https://i.ibb.co/QFxtJRzw/Jepoy.png',
    github: 'https://github.com/'
  },
  {
    name: 'Kaizz Laga',
    role: 'Sponsor',
    image: 'https://i.ibb.co/zV3xKW62/Kaizz.png',
    github: 'https://github.com/'
  }
];

export default function Team() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
        <div className="flex items-center justify-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            <span>BCS33 - Computer Science</span>
          </div>
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
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Info */}
      <div className="mt-20 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About BCS33</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            BCS33 is a dynamic section of Computer Science students at De La Salle University - Dasmariñas. 
            We specialize in theoretical computer science, particularly in the study of automata theory and formal languages. 
            Our team combines technical expertise with creative problem-solving to develop innovative solutions.
          </p>
        </div>
      </div>
    </div>
  );
}