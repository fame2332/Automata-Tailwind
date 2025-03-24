import React, { useState } from 'react';
import { Play, Info, AlertCircle } from 'lucide-react';

const REGEX_EXAMPLES = [
  {
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    description: 'Email validation',
    testString: 'example@email.com'
  },
  {
    pattern: '^\\+?[1-9]\\d{1,14}$',
    description: 'Phone number (E.164 format)',
    testString: '+1234567890'
  },
  {
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
    description: 'Password (min 8 chars, at least one letter and number)',
    testString: 'Password123'
  }
];

export default function About() {
  const [testInputs, setTestInputs] = useState(REGEX_EXAMPLES.map(ex => ex.testString));

  const testRegex = (pattern: string, input: string) => {
    try {
      const regex = new RegExp(pattern);
      return regex.test(input);
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Automata Theory Section */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Automata Theory</h1>
        
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deterministic Finite Automata (DFA)</h2>
            <p className="text-gray-600 mb-4">
              A DFA is a finite state machine that accepts or rejects strings of symbols by parsing them through a sequence of states. For each state and symbol, there is exactly one transition to another state.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Key Components:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>States (including start and accept states)</li>
                <li>Input alphabet</li>
                <li>Transition function</li>
                <li>Deterministic behavior (one transition per input)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Context-Free Grammar (CFG)</h2>
            <p className="text-gray-600 mb-4">
              A CFG is a formal grammar that describes a language by specifying rules for generating all possible strings in that language. Each rule replaces a single nonterminal symbol with a sequence of terminal and/or nonterminal symbols.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Components:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Terminal symbols (actual characters in strings)</li>
                <li>Non-terminal symbols (variables representing patterns)</li>
                <li>Production rules</li>
                <li>Start symbol</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pushdown Automata (PDA)</h2>
            <p className="text-gray-600 mb-4">
              A PDA is a finite state machine with an additional stack memory. This stack allows the PDA to recognize context-free languages, making it more powerful than a DFA but less powerful than a Turing machine.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Input tape (like DFA)</li>
                <li>Stack memory</li>
                <li>Push and pop operations</li>
                <li>State transitions based on both input and stack</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Regular Expressions Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Regular Expressions</h2>
        
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Syntax and Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium">Character Classes</p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li><code className="bg-gray-100 px-1">[abc]</code> - Match any character in the set</li>
                  <li><code className="bg-gray-100 px-1">[^abc]</code> - Match any character not in the set</li>
                  <li><code className="bg-gray-100 px-1">[a-z]</code> - Match any character in the range</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Quantifiers</p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li><code className="bg-gray-100 px-1">*</code> - Match 0 or more times</li>
                  <li><code className="bg-gray-100 px-1">+</code> - Match 1 or more times</li>
                  <li><code className="bg-gray-100 px-1">?</code> - Match 0 or 1 time</li>
                  <li><code className="bg-gray-100 px-1">{'{n}'}</code> - Match exactly n times</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Examples</h3>
            <div className="space-y-6">
              {REGEX_EXAMPLES.map((example, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Info size={16} className="text-blue-500" />
                    <h4 className="font-medium">{example.description}</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm font-mono mb-2">Pattern: {example.pattern}</p>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={testInputs[index]}
                        onChange={(e) => {
                          const newInputs = [...testInputs];
                          newInputs[index] = e.target.value;
                          setTestInputs(newInputs);
                        }}
                        className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Test the pattern..."
                      />
                      <div className="flex items-center">
                        {testRegex(example.pattern, testInputs[index]) ? (
                          <span className="text-green-500 flex items-center">
                            <Play size={16} className="mr-1" /> Valid
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center">
                            <AlertCircle size={16} className="mr-1" /> Invalid
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Best Practices & Performance</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Best Practices</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Use specific character classes instead of dot (.)</li>
                  <li>Avoid excessive backtracking with proper quantifiers</li>
                  <li>Use non-capturing groups (?:) when capture isn't needed</li>
                  <li>Test patterns with various inputs including edge cases</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Performance Considerations</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Avoid nested quantifiers that can cause catastrophic backtracking</li>
                  <li>Use anchors (^ $) to limit matching scope</li>
                  <li>Consider using lookahead/lookbehind for complex patterns</li>
                  <li>Cache compiled regex patterns for repeated use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}