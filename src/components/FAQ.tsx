import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "What is Automata Theory?",
    answer: "Automata Theory is a branch of theoretical computer science that deals with abstract machines (automata) and their computational capabilities. It provides mathematical models for computing devices and explores what problems these devices can solve."
  },
  {
    question: "What are the different types of automata?",
    answer: "The main types of automata include Finite Automata (DFA/NFA), Pushdown Automata (PDA), and Turing Machines. Each type has different computational capabilities and is suited for different types of language recognition."
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
    question: "What are regular expressions used for?",
    answer: "Regular expressions are used for pattern matching and text processing. They help define search patterns for strings and are widely used in text editors, search engines, and data validation."
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
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Find answers to common questions about our platform</p>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-expanded={openItems.includes(index)}
              >
                <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 animate-fade-in">
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