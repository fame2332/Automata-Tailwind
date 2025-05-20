import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Maximize, Zap, RefreshCw, Play } from 'lucide-react';

declare global {
  interface Window {
    noam: any;
    drawGraph: () => void;
    validateRegex: (regex: string) => boolean;
    colorize: () => void;
    resetAutomaton: () => void;
    generateAutomaton: (fsmType: string) => boolean;
    processNextInput: () => boolean | undefined;
  }
}

export default function FsmCreator() {
  const [regex, setRegex] = useState('(a+b)*');
  const [input, setInput] = useState('');
  const [fsmType, setFsmType] = useState('NFA');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  const [isFsmGenerated, setIsFsmGenerated] = useState(false);
  const graphContainerRef = useRef<HTMLDivElement>(null);
  
  // Store elements created in refs so we can safely remove them in cleanup
  const createdElementsRef = useRef<HTMLElement[]>([]);

  // Safe element creation and tracking
  const createAndTrackElement = (id: string, type: string, parent: HTMLElement, className?: string) => {
    // First check if it already exists
    let element = document.getElementById(id) as HTMLElement;
    
    if (!element) {
      if (type === 'div') {
        element = document.createElement('div');
      } else if (type === 'input') {
        element = document.createElement('input');
        (element as HTMLInputElement).type = 'text';
      } else {
        element = document.createElement(type);
      }
      
      element.id = id;
      if (className) {
        element.className = className;
      }
      
      // Keep track of this element for cleanup
      createdElementsRef.current.push(element);
      
      // Append to parent
      parent.appendChild(element);
    }
    
    return element;
  };

  // Initialize noam library and setup
  useEffect(() => {
    // Create elements only if they don't exist
    if (graphContainerRef.current) {
      createAndTrackElement(
        'fsm', 
        'div', 
        graphContainerRef.current, 
        'w-full h-full flex items-center justify-center'
      );
    }

    // Create hidden input elements in the body
    createAndTrackElement('regex', 'input', document.body);
    createAndTrackElement('input', 'input', document.body);
    createAndTrackElement('input-display', 'div', document.body);

    // Cleanup function to safely remove elements
    return () => {
      try {
        // Safely remove created elements
        createdElementsRef.current.forEach(element => {
          try {
            if (element && element.parentNode) {
              element.parentNode.removeChild(element);
            }
          } catch (e) {
            console.warn('Error removing element:', e);
          }
        });
        
        // Clear the tracking array
        createdElementsRef.current = [];
      } catch (e) {
        console.error('Error during cleanup:', e);
      }
    };
  }, []);

  // Validate regex when it changes
  useEffect(() => {
    try {
      if (typeof window.validateRegex === 'function') {
        const valid = window.validateRegex(regex);
        setIsValid(valid);
        setError(valid ? '' : 'Invalid regex pattern');
      }
    } catch (e) {
      setIsValid(false);
      setError('Invalid regex pattern: ' + e);
    }
  }, [regex]);

  // Handle input simulation
  useEffect(() => {
    const inputField = document.getElementById('input') as HTMLInputElement;
    if (inputField && isFsmGenerated) {
      inputField.value = input;
      
      try {
        if (typeof window.resetAutomaton === 'function' && 
            typeof window.colorize === 'function') {
          window.resetAutomaton();
          window.colorize();
          setIsAccepted(null);
          setCurrentStep(0);
        }
      } catch (e) {
        console.error('Error during input simulation:', e);
      }
    }
  }, [input, isFsmGenerated]);

  const handleRegexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegex(e.target.value);
    setIsFsmGenerated(false);
    
    // Safely clear the FSM container
    try {
      const fsmContainer = document.getElementById('fsm');
      if (fsmContainer) {
        fsmContainer.innerHTML = '';
      }
    } catch (e) {
      console.error('Error clearing FSM container:', e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setCurrentStep(0);
    setIsAccepted(null);
  };

  const handleFsmTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFsmType(e.target.value);
    setIsFsmGenerated(false);
    
    // Safely clear the FSM container
    try {
      const fsmContainer = document.getElementById('fsm');
      if (fsmContainer) {
        fsmContainer.innerHTML = '';
      }
    } catch (e) {
      console.error('Error clearing FSM container:', e);
    }
  };

  const handleCreateAutomaton = () => {
    if (!isValid) {
      return;
    }
    
    try {
      // Ensure FSM container exists and is connected to the DOM
      let fsmContainer = document.getElementById('fsm');
      if (!fsmContainer && graphContainerRef.current) {
        fsmContainer = createAndTrackElement(
          'fsm', 
          'div', 
          graphContainerRef.current, 
          'w-full h-full flex items-center justify-center'
        );
      }

      // Set the regex in the hidden input
      const regexInput = document.getElementById('regex') as HTMLInputElement;
      if (regexInput) {
        regexInput.value = regex;
      }
      
      if (typeof window.generateAutomaton === 'function') {
        const success = window.generateAutomaton(fsmType);
        setIsFsmGenerated(success);
        if (!success) {
          setError(`Failed to generate ${fsmType} from the given regex`);
        }
      } else {
        console.error('generateAutomaton function not found');
        setError('FSM generation function not available');
      }
    } catch (e: any) {
      console.error('Error generating automaton:', e);
      setError(e.message || 'Error generating automaton');
      setIsFsmGenerated(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < input.length && isFsmGenerated) {
      try {
        if (typeof window.processNextInput === 'function') {
          const result = window.processNextInput();
          setCurrentStep(prev => prev + 1);
          
          // If we've processed all input, determine acceptance
          if (currentStep === input.length - 1) {
            setIsAccepted(result === true);
          }
        }
      } catch (e) {
        console.error('Error processing next input step:', e);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0 && isFsmGenerated) {
      try {
        // Reset and reprocess until previous step
        if (typeof window.resetAutomaton === 'function' && 
            typeof window.processNextInput === 'function') {
          window.resetAutomaton();
          for (let i = 0; i < currentStep - 1; i++) {
            window.processNextInput();
          }
          setCurrentStep(prev => prev - 1);
          setIsAccepted(null);
        }
      } catch (e) {
        console.error('Error processing previous step:', e);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAccepted(null);
    if (isFsmGenerated) {
      try {
        if (typeof window.resetAutomaton === 'function' && 
            typeof window.colorize === 'function') {
          window.resetAutomaton();
          window.colorize();
        }
      } catch (e) {
        console.error('Error resetting automaton:', e);
      }
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
          <span className="text-indigo-600 dark:text-indigo-400">FSM</span> Creator
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          Create and simulate Finite State Machines from regular expressions
        </p>
      </motion.div>

      {/* Hidden inputs for the noam library */}
      <div style={{ display: 'none' }}>
        <input id="regex" type="text" />
        <input id="input" type="text" />
        <div id="input-display"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-center mb-4">
          <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Regular Expression & Input</h2>
        </div>
          
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <label htmlFor="regex-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter a regular expression:
              </label>
              <input
                id="regex-input"
                type="text"
                value={regex}
                onChange={handleRegexChange}
                className={`block w-full px-4 py-2 border ${
                  isValid ? 'border-gray-300 dark:border-gray-600' : 'border-red-500'
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white`}
                placeholder="e.g. (a+b)*"
              />
              {!isValid && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                A valid regex consists of alphanumeric characters (a, B, 9), the $ character for empty string, 
                the choice operator +, the Kleene operator *, and parentheses ( and ).
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="fsm-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                FSM Type:
              </label>
              <select
                id="fsm-type"
                value={fsmType}
                onChange={handleFsmTypeChange}
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="DFA">DFA (Deterministic Finite Automaton)</option>
                <option value="NFA">NFA (Nondeterministic Finite Automaton)</option>
                <option value="eNFA">eNFA (Epsilon-NFA)</option>
              </select>
            </div>

            <div className="mb-6">
              <button
                onClick={handleCreateAutomaton}
                disabled={!isValid}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Play className="w-5 h-5 mr-2" />
                Create Automaton
              </button>
              {error && !isValid && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <label htmlFor="input-string" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Input String:
              </label>
              <div className="relative">
                <input
                  id="input-string"
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  disabled={!isFsmGenerated}
                  className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  placeholder={isFsmGenerated ? "Enter string to simulate" : "Create automaton first"}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white/75 dark:bg-gray-800/75 text-indigo-600 dark:text-indigo-400 font-semibold text-lg rounded-md">
                  Coming soon
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevStep}
                  disabled={true}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-100 dark:bg-indigo-900 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    if (isFsmGenerated && input.length > 0) {
                      try {
                        if (typeof window.resetAutomaton === 'function' && 
                            typeof window.processNextInput === 'function') {
                          handleReset();
                          // Process the entire input at once and check if it's valid
                          window.resetAutomaton();
                          let isValid = true;
                          for (let i = 0; i < input.length; i++) {
                            const result = window.processNextInput();
                            if (result === false && i === input.length - 1) {
                              isValid = false;
                            }
                          }
                          setCurrentStep(input.length);
                          setIsAccepted(isValid);
                        }
                      } catch (e) {
                        console.error('Error processing input:', e);
                      }
                    }
                  }}
                  disabled={true}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-100 dark:bg-indigo-900 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={true}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-100 dark:bg-indigo-900 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <button
                onClick={handleReset}
                disabled={true}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </button>
            </div>

            {/* Acceptance message hidden for now while feature is coming soon */}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Automaton Visualization</h2>
          </div>
          <button
            onClick={() => {
              try {
                if (graphContainerRef.current) {
                  if (document.fullscreenElement) {
                    document.exitFullscreen().catch(e => {
                      console.error('Error exiting fullscreen:', e);
                    });
                  } else {
                    graphContainerRef.current.requestFullscreen().catch(e => {
                      console.error('Error entering fullscreen:', e);
                    });
                  }
                }
              } catch (e) {
                console.error('Error toggling fullscreen:', e);
              }
            }}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Toggle fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
          
        <div 
          ref={graphContainerRef}
          id="automaton-container" 
          className="w-full h-[48rem] border border-gray-200 dark:border-gray-700 rounded-md overflow-auto bg-gray-50 dark:bg-gray-900 p-4"
        >
          {/* The FSM container will be created here dynamically */}
          <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-center">
            {!isFsmGenerated && (
              <p>Enter a regex and click "Create Automaton" to visualize</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Information section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Finite State Machines</h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
            Finite State Machines (FSMs) are mathematical models of computation used to design algorithms and 
            represent different types of systems. They are widely used in compiler design, network protocols, 
            and natural language processing.
          </p>
          <p>
            <strong>DFA (Deterministic Finite Automaton):</strong> Each state has exactly one transition for each possible input symbol.
          </p>
          <p>
            <strong>NFA (Nondeterministic Finite Automaton):</strong> Each state can have zero, one, or multiple transitions for each input symbol.
          </p>
          <p>
            <strong>eNFA (Epsilon-NFA):</strong> Similar to NFA, but also allows transitions without consuming any input symbol (epsilon transitions).
          </p>
        </div>
      </motion.div>
    </div>
  );
} 