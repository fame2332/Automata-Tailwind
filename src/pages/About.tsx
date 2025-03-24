import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { GraphvizViewer } from '../components/GraphvizViewer';

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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

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
        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {expandedSections[title] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      {expandedSections[title] && (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Section title="What is Automata Theory?">
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Automata Theory is a fundamental branch of theoretical computer science that deals with abstract machines (automata) and their computational capabilities. It provides mathematical models for computing devices and explores what problems these devices can solve.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Why Study Automata Theory?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Understand fundamental capabilities and limitations of computers</li>
              <li>Design and analyze algorithms efficiently</li>
              <li>Develop compiler design and programming languages</li>
              <li>Solve complex pattern matching problems</li>
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Real-Life Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="font-medium text-indigo-600 mb-2">Text Processing</h4>
                <p className="text-sm text-gray-600">Used in search engines, text editors, and natural language processing</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="font-medium text-indigo-600 mb-2">Circuit Design</h4>
                <p className="text-sm text-gray-600">Digital circuit design and verification in hardware engineering</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="font-medium text-indigo-600 mb-2">Protocol Analysis</h4>
                <p className="text-sm text-gray-600">Verification of communication protocols and security systems</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Regular Expressions">
        <div className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              A regular expression (regex) is a sequence of characters that defines a search pattern. It represents a formal way to specify a set of strings and is one of the most effective ways to represent any formal language.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fundamental Properties</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">1</div>
                <div>
                  <span className="font-medium">Concatenation:</span>
                  <p className="text-gray-600">Joining two patterns sequentially</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">2</div>
                <div>
                  <span className="font-medium">Alternation:</span>
                  <p className="text-gray-600">Choice between different patterns</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">3</div>
                <div>
                  <span className="font-medium">Kleene Star:</span>
                  <p className="text-gray-600">Zero or more repetitions of a pattern</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Regular Expression Symbols</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {REGEX_SYMBOLS.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Regular Expressions and Their Sets</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expression</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Set</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {REGEX_EXAMPLES_SET.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.expression}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.set}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800">Operations on Regular Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-md font-semibold text-gray-800 mb-3">Union (∪)</h4>
                <p className="text-gray-600 mb-2">L ∪ M = {'{s | s ∈ L or s ∈ M}'}</p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Combines all strings from both languages</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-md font-semibold text-gray-800 mb-3">Intersection (∩)</h4>
                <p className="text-gray-600 mb-2">L ∩ M = {'{s | s ∈ L and s ∈ M}'}</p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Contains strings present in both languages</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-md font-semibold text-gray-800 mb-3">Kleene Closure (*)</h4>
              <p className="text-gray-600 mb-2">L* = Zero or more occurrences of language L</p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Example: If L = {'{a, b}'}, then L* = {'{ε, a, b, aa, ab, ba, bb, aaa, ...}'}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Finite Automata">
        <div className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Finite Automata (FA) is the simplest abstract machine to recognize patterns with input taken from the
              given alphabet. The job of an FA is to accept or reject an input depending on whether the pattern
              defined by the FA occurs in the input.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Components of Finite Automata</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">1</div>
                <div>
                  <span className="font-medium">States</span>
                  <p className="text-gray-600">A finite set of states, including an initial state (start state) and designated final states</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">2</div>
                <div>
                  <span className="font-medium">Alphabet (Σ)</span>
                  <p className="text-gray-600">Set of input symbols that can be read by the automaton</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">3</div>
                <div>
                  <span className="font-medium">Transitions</span>
                  <p className="text-gray-600">Rules that determine the next state based on current state and input symbol</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Deterministic Finite Automata (DFA)</h3>
              <p className="text-gray-700 mb-4">
                In a DFA, for a particular input character, the machine goes to one state only. A transition function
                is defined on every state for every input symbol. Also in DFA null (or Λ) move is not allowed, i.e.,
                DFA cannot change state without any input character.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg h-[300px]">
                <GraphvizViewer dot={DFA_EXAMPLE} className="w-full h-full" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: There can be many possible DF
                As for a pattern. A DFA with minimum number of states is generally preferred.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Non-deterministic Finite Automata (NFA)</h3>
              <p className="text-gray-700 mb-4">
                NFA is similar to DFA but with additional features:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Null (or Λ) move is allowed i.e., it can move forward without reading symbols</li>
                <li>Ability to transmit to any number of states for a particular input</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg h-[300px]">
                <GraphvizViewer dot={NFA_EXAMPLE} className="w-full h-full" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: While NFAs have additional features, they are equivalent in power to DFAs. Any NFA can be converted to a DFA.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Context-Free Grammar (CFG)">
        <div className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              A Context-Free Grammar (CFG) is a formal grammar that describes a language by specifying rules for generating all possible strings in that language. CFGs are more powerful than regular expressions and can describe nested structures.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Components of CFG</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Basic Elements</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Variables (Non-terminals)</li>
                  <li>• Terminals (Actual symbols)</li>
                  <li>• Production rules</li>
                  <li>• Start symbol</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Production Rules</h4>
                <div className="font-mono text-sm bg-white p-3 rounded border">
                  <p>S → aSb | ab</p>
                  <p>A → aA | a</p>
                  <p>B → bB | b</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Example Grammar</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium mb-2">Grammar for balanced parentheses:</p>
                <div className="font-mono text-sm">
                  <p>S → (S) | SS | ε</p>
                  <p className="text-gray-500 text-xs mt-1">// Generates strings like: (), (()), ()(), (()())</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium mb-2">Grammar for arithmetic expressions:</p>
                <div className="font-mono text-sm">
                  <p>E → E + T | T</p>
                  <p>T → T * F | F</p>
                  <p>F → (E) | id</p>
                  <p className="text-gray-500 text-xs mt-1">// Generates expressions like: id + id * id</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg h-[300px]">
            <GraphvizViewer dot={CFG_EXAMPLE} className="w-full h-full" />
          </div>
        </div>
      </Section>

      <Section title="Pushdown Automaton (PDA)">
        <div className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              A Pushdown Automaton (PDA) is a finite automaton that can use a stack to store data. This additional memory makes PDAs more powerful than finite automata, allowing them to recognize context-free languages.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Components of PDA</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">1</div>
                <div>
                  <span className="font-medium">Input Tape</span>
                  <p className="text-gray-600">Contains the input string to be processed</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">2</div>
                <div>
                  <span className="font-medium">Stack</span>
                  <p className="text-gray-600">Last-In-First-Out (LIFO) memory structure for storing symbols</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">3</div>
                <div>
                  <span className="font-medium">Control Unit</span>
                  <p className="text-gray-600">Finite state control that determines transitions based on current state, input symbol, and top of stack</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Stack Operations</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Push: Add symbol to top of stack</li>
                  <li>• Pop: Remove symbol from top of stack</li>
                  <li>• Read: Check top symbol without removing</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Transition Function</h4>
                <ul className="space-y-2 text-gray-600">
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Example PDA</h3>
            <p className="text-gray-700 mb-4">
              This PDA recognizes the language {'{a^n b^n | n ≥ 1}'} (equal number of a's followed by b's):
            </p>
            <div className="bg-gray-50 p-4 rounded-lg h-[300px]">
              <GraphvizViewer dot={PDA_EXAMPLE} className="w-full h-full" />
            </div>
            <div className="mt-4 bg-blue-50 p-4 rounded">
              <h4 className="font-medium text-blue-800 mb-2">How it works:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>1. Pushes a $ marker onto empty stack</li>
                <li>2. For each 'a', pushes an 'a' onto stack</li>
                <li>3. For each 'b', pops an 'a' from stack</li>
                <li>4. Accepts if stack contains only $ at end</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}