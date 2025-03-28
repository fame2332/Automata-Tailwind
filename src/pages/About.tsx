import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { GraphvizViewer } from '../components/GraphvizViewer';
import FAQ from '../components/FAQ';

const REGEX_SYMBOLS = [
  { symbol: 'Σ', name: 'Alphabet', description: 'Set of all possible characters in the language' },
  { symbol: 'Λ', name: 'Empty String', description: 'String with zero characters (epsilon)' },
  { symbol: '*', name: 'Kleene Star', description: 'Zero or more occurrences' },
  { symbol: '+', name: 'Plus', description: 'One or more occurrences' },
  { symbol: '|', name: 'Union', description: 'Alternative (OR) operation' },
  { symbol: '∅', name: 'Empty Set', description: 'Set containing no elements' }
];

const REGEX_EXAMPLES_SET = [
  {
    expression: 'a*',
    set: '{ε, a, aa, aaa, ...}',
    description: 'Set of all strings with zero or more a\'s'
  },
  {
    expression: '(a|b)*',
    set: '{ε, a, b, aa, ab, ba, bb, ...}',
    description: 'Set of all strings over {a,b}'
  },
  {
    expression: 'a+b',
    set: '{ab}',
    description: 'Single string containing a followed by b'
  },
  {
    expression: '(ab|cd)*',
    set: '{ε, ab, cd, abab, abcd, cdab, cdcd, ...}',
    description: 'Strings formed by concatenating ab or cd'
  }
];

const DFA_EXAMPLE = `
  digraph {
    rankdir=LR;
    node [shape=circle];
    
    start [shape=none, label=""];
    q0 [label="q0"];
    q1 [label="q1", shape=doublecircle];
    
    start -> q0;
    q0 -> q1 [label="a,b"];
    q1 -> q1 [label="a,b"];
  }
`;

const NFA_EXAMPLE = `
  digraph {
    rankdir=LR;
    node [shape=circle];
    
    start [shape=none, label=""];
    q0 [label="q0"];
    q1 [label="q1"];
    q2 [label="q2", shape=doublecircle];
    
    start -> q0;
    q0 -> q1 [label="a"];
    q0 -> q2 [label="b"];
    q1 -> q1 [label="a"];
    q1 -> q2 [label="b"];
    q1 -> q2 [label="ε"];
  }
`;

const PDA_EXAMPLE = `
  digraph {
    rankdir=LR;
    node [shape=circle];
    
    start [shape=none, label=""];
    q0 [label="q0"];
    q1 [label="q1"];
    q2 [label="q2", shape=doublecircle];
    
    start -> q0;
    q0 -> q1 [label="a, ε → $"];
    q1 -> q1 [label="a, ε → a"];
    q1 -> q2 [label="b, a → ε"];
    q2 -> q2 [label="b, a → ε"];
  }
`;

const CFG_EXAMPLE = `
  digraph {
    node [shape=rectangle];
    
    S [label="S"];
    A [label="A"];
    B [label="B"];
    a [label="a"];
    b [label="b"];
    
    S -> A;
    S -> B;
    A -> { "aA" "a" };
    B -> { "bB" "b" };
  }
`;

interface Section {
  title: string;
  content: React.ReactNode;
}

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'What is Automata Theory?': false,
    'Regular Expressions': false,
    'Finite Automata': false,
    'Context-Free Grammar (CFG)': false,
    'Pushdown Automaton (PDA)': false,
    'Frequently Asked Questions': false
  });

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
      <button
        onClick={() => toggleSection(title)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
        {expandedSections[title] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      {expandedSections[title] && (
        <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Modules
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore comprehensive modules covering fundamental concepts in automata theory, 
            formal languages, and computational models. Each section provides detailed 
            explanations, visual examples, and practical applications to help you master 
            these essential computer science concepts.
          </p>
        </div>

        <Section title="What is Automata Theory?">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Automata Theory is a fundamental branch of theoretical computer science that deals with abstract machines (automata) and their computational capabilities. It provides mathematical models for computing devices and explores what problems these devices can solve.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Why Study Automata Theory?</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Understand fundamental capabilities and limitations of computers</li>
                <li>Design and analyze algorithms efficiently</li>
                <li>Develop compiler design and programming languages</li>
                <li>Solve complex pattern matching problems</li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Real-Life Applications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h4 className="font-medium text-indigo-600 dark:text-indigo-400 mb-2">Text Processing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Used in search engines, text editors, and natural language processing</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h4 className="font-medium text-indigo-600 dark:text-indigo-400 mb-2">Circuit Design</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Digital circuit design and verification in hardware engineering</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h4 className="font-medium text-indigo-600 dark:text-indigo-400 mb-2">Protocol Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Verification of communication protocols and security systems</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Regular Expressions">
          <div className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A regular expression (regex) is a sequence of characters that defines a search pattern. It represents a formal way to specify a set of strings and is one of the most effective ways to represent any formal language.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Fundamental Properties</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">1</div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Concatenation:</span>
                    <p className="text-gray-600 dark:text-gray-400">Joining two patterns sequentially</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">2</div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Alternation:</span>
                    <p className="text-gray-600 dark:text-gray-400">Choice between different patterns</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">3</div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Kleene Star:</span>
                    <p className="text-gray-600 dark:text-gray-400">Zero or more repetitions of a pattern</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Regular Expression Symbols</h3>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {REGEX_SYMBOLS.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto mt-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Regular Expressions and Their Sets</h3>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expression</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Set</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {REGEX_EXAMPLES_SET.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.expression}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.set}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section title="Finite Automata">
          <div className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Finite Automata (FA) is the simplest abstract machine to recognize patterns. The job of an FA is to accept
                or reject an input depending on whether the pattern defined by the FA occurs in the input.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Components of Finite Automata</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">1</div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">States</span>
                    <p className="text-gray-600 dark:text-gray-400">A finite set of states, including an initial state and final states</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">2</div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Alphabet (Σ)</span>
                    <p className="text-gray-600 dark:text-gray-400">Set of input symbols that can be read by the automaton</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">3</div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Transitions</span>
                    <p className="text-gray-600 dark:text-gray-400">Rules that determine the next state based on current state and input symbol</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Deterministic Finite Automata (DFA)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  In a DFA, for a particular input character, the machine goes to one state only. A transition function
                  is defined on every state for every input symbol.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-[300px]">
                  <GraphvizViewer dot={DFA_EXAMPLE} className="w-full h-full" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Non-deterministic Finite Automata (NFA)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  NFA is similar to DFA but with additional features:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Null (or Λ) move is allowed i.e., it can move forward without reading symbols</li>
                  <li>Ability to transmit to any number of states for a particular input</li>
                </ul>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-[300px]">
                  <GraphvizViewer dot={NFA_EXAMPLE} className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Context-Free Grammar (CFG)">
          <div className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A Context-Free Grammar (CFG) is a formal grammar that describes a language by specifying rules for generating all possible strings in that language. CFGs are more powerful than regular expressions and can describe nested structures.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Components of CFG</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 dark:text-white">Basic Elements</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Variables (Non-terminals)</li>
                    <li>• Terminals (Actual symbols)</li>
                    <li>• Production rules</li>
                    <li>• Start symbol</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 dark:text-white">Production Rules</h4>
                  <div className="font-mono text-sm bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600">
                    <p className="text-gray-700 dark:text-gray-300">S → aSb | ab</p>
                    <p className="text-gray-700 dark:text-gray-300">A → aA | a</p>
                    <p className="text-gray-700 dark:text-gray-300">B → bB | b</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Example Grammar</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                  <p className="font-medium text-gray-800 dark:text-white mb-2">Grammar for balanced parentheses:</p>
                  <div className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    <p>S → (S) | SS | ε</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">// Generates strings like: (), (()), ()(), (()())</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                  <p className="font-medium text-gray-800 dark:text-white mb-2">Grammar for arithmetic expressions:</p>
                  <div className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    <p>E → E + T | T</p>
                    <p>T → T * F | F</p>
                    <p>F → (E) | id</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">// Generates expressions like: id + id * id</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-[300px]">
              <GraphvizViewer dot={CFG_EXAMPLE} className="w-full h-full" />
            </div>
          </div>
        </Section>

        <Section title="Pushdown Automaton (PDA)">
          <div className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A Pushdown Automaton (PDA) is a finite automaton that can use a stack to store data. This additional memory makes PDAs more powerful than finite automata, allowing them to recognize context-free languages.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Components of PDA</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">1</div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Input Tape</span>
                    <p className="text-gray-600 dark:text-gray-400">Contains the input string to be processed</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">2</div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Stack</span>
                    <p className="text-gray-600 dark:text-gray-400">Last-In-First-Out (LIFO) memory structure for storing symbols</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">3</div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Control Unit</span>
                    <p className="text-gray-600 dark:text-gray-400">Finite state control that determines transitions based on current state, input symbol, and top of stack</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 dark:text-white">Stack Operations</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Push: Add symbol to top of stack</li>
                    <li>• Pop: Remove symbol from top of stack</li>
                    <li>• Read: Check top symbol without removing</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800 dark:text-white">Transition Function</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Current state</li>
                    <li>• Input symbol (or ε)</li>
                    <li>• Top of stack symbol</li>
                    <li>• New state</li>
                    <li>• String to push</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Example PDA</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This PDA recognizes the language {'{a^n b^n | n ≥ 1}'} (equal number of a's followed by b's):
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-[300px]">
                <GraphvizViewer dot={PDA_EXAMPLE} className="w-full h-full" />
              </div>
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/50 p-4 rounded">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">How it works:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>1. Pushes a $ marker onto empty stack</li>
                  <li>2. For each 'a', pushes an 'a' onto stack</li>
                  <li>3. For each 'b', pops an 'a' from stack</li>
                  <li>4. Accepts if stack contains only $ at end</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Frequently Asked Questions">
          <FAQ />
        </Section>
      </div>
    </div>
  );
}