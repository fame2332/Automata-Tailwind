import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Amiel Jonathan Bermillo",
    role: "Computer Science Student",
    image: "/src/image/amiel1.jpg",
    content: "This tool has completely transformed how I understand and work with automata theory. The visualizations are incredibly helpful!",
    rating: 3
  },
  {
    name: "Ram Nathaniel Gaerlan",
    role: "Computer Science Student",
    image: "/src/image/ram1.jpg",
    content: "The interactive examples and clear explanations made complex concepts much easier to grasp. Highly recommended!",
    rating: 2
  },
  {
    name: "Gab Monte Obregon",
    role: "Computer Science Student",
    image: "/src/image/gab1.jpg",
    content: "An invaluable resource for both teaching and learning. The step-by-step visualizations are particularly helpful.",
    rating: 1
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600">Trusted by students of De La Salle University - Dasmariñas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}