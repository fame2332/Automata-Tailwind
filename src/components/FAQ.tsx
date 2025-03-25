import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "What is Automata Theory?",
    answer: "Automata Theory is a branch of theoretical computer science that deals with abstract machines (automata) and their computational capabilities. It provides mathematical models for computing devices and explores what problems these devices can solve."
  },
  {
    question: "How can I use the DFA Simulator?",
    answer: "Our DFA Simulator allows you to input strings and visualize how they are processed by the automaton. Simply select the DFA visualization type, enter your test string, and click 'Validate' to see the step-by-step simulation."
  },
  {
    question: "What's the difference between DFA and NFA?",
    answer: "A DFA (Deterministic Finite Automaton) has exactly one transition for each input symbol in each state, while an NFA (Non-deterministic Finite Automaton) can have multiple transitions or none for each input symbol in a state."
  },
  {
    question: "Can I save my automata designs?",
    answer: "Currently, the system allows you to work with predefined automata examples. We're working on adding features to create, edit, and save custom automata designs in future updates."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions about our platform</p>
        </div>

        <div className="space-y-6">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => toggleItem(index)}
                className="faq-question"
                aria-expanded={openItems.includes(index)}
              >
                <span>{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="faq-answer animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}