import React from 'react';
import { Github } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM_MEMBERS.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{member.role}</p>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={24} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}