import React, { useState, useMemo, useEffect } from 'react';
import { CircleDot, ArrowRight, X, Play, MousePointer } from 'lucide-react';
import { GraphvizViewer } from '../components/GraphvizViewer';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import BuiltUsing from '../components/BuiltUsing';
import { 
  DFA_1, DFA_2, CFG_1, CFG_2, PDA_1, PDA_2,
  generateDotGraph, validateString, validatePDA, validateCFG,
  StateCheck 
} from '../lib/automata';

type VisualizationType = 'DFA' | 'CFG' | 'PDA' | null;

interface ValidationEntry {
  input: string;
  isValid: boolean | null;
  stateChecks: StateCheck[] | null;
}

const REGULAR_EXPRESSIONS = [
  '(aa+bb)(a+b)*(aba+bab+bbb+aaa)(ab+ba)*(bb+aa)(a+b)*(a*ba*ba*)(bab+bba+bbb+aba)(a+b)*',
  '(1+0)(1+0)*(11+00)(11+00)*(1+0)(0+1)(11*00*)((00)*+(11)*)(11+00)(11+00)*(1+0)*'
];

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeVisualization, setActiveVisualization] = useState<VisualizationType>(null);
  const [selectedRegex, setSelectedRegex] = useState<number>(0);
  const [validationEntries, setValidationEntries] = useState<ValidationEntry[]>([]);
  const [simulatingIndex, setSimulatingIndex] = useState<number | null>(null);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(0);
  const [hasValidated, setHasValidated] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const currentAutomaton = useMemo(() => {
    switch (activeVisualization) {
      case 'DFA':
        return selectedRegex === 0 ? DFA_1 : DFA_2;
      case 'CFG':
        return selectedRegex === 0 ? CFG_1 : CFG_2;
      case 'PDA':
        return selectedRegex === 0 ? PDA_1 : PDA_2;
      default:
        return null;
    }
  }, [activeVisualization, selectedRegex]);

  const dotGraph = useMemo(() => {
    if (!currentAutomaton || activeVisualization === 'CFG') return null;

    if (simulatingIndex !== null && validationEntries[simulatingIndex]?.stateChecks) {
      const stateCheck = validationEntries[simulatingIndex].stateChecks![currentStateIndex];
      const color = stateCheck.isValid ? 'lightgreen' : 'red';
      return generateDotGraph(currentAutomaton, stateCheck.state, color);
    }

    return generateDotGraph(currentAutomaton);
  }, [activeVisualization, currentAutomaton, simulatingIndex, currentStateIndex, validationEntries]);

  const validateSingleString = (input: string): { isValid: boolean; stateChecks: StateCheck[] | null } => {
    if (!currentAutomaton) return { isValid: false, stateChecks: null };

    if (!input.trim()) {
      return { isValid: false, stateChecks: null };
    }

    const validChars = selectedRegex === 0 ? /^[ab]*$/ : /^[01]*$/;
    if (!validChars.test(input)) {
      return { isValid: false, stateChecks: [{ state: 'Start', isValid: false }] };
    }

    return validateString(currentAutomaton, input);
  };

  const handleValidateAll = () => {
    if (!currentAutomaton) return;

    const lines = textareaValue.split('\n').filter(line => line.trim());
    const newEntries = lines.map(input => {
      const result = validateSingleString(input);
      return {
        input,
        isValid: result.isValid,
        stateChecks: result.stateChecks
      };
    });

    setValidationEntries(newEntries);
    setHasValidated(true);
  };

  const handleSimulate = async (index: number) => {
    if (!validationEntries[index]?.stateChecks) return;

    setSimulatingIndex(index);
    setCurrentStateIndex(0);

    for (let i = 0; i < validationEntries[index].stateChecks!.length; i++) {
      setCurrentStateIndex(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setTimeout(() => {
      setSimulatingIndex(null);
      setCurrentStateIndex(0);
    }, 1000);
  };

  const handleVisualizationChange = (type: VisualizationType) => {
    setActiveVisualization(type);
    setValidationEntries([]);
    setTextareaValue('');
    setHasValidated(false);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTextareaValue(newValue);
    setHasValidated(false);
  };

  const renderVisualization = () => {
    if (!activeVisualization) return null;

    const visualizationHeight = activeVisualization === 'PDA' ? 'h-[800px]' : 'h-[400px]';

    return (
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{activeVisualization} Visualization</h3>
        {activeVisualization === 'CFG' ? (
          <div className="font-mono text-left p-4 bg-gray-50 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200">
            {(selectedRegex === 0 ? CFG_1 : CFG_2).productions.map((production, index) => (
              <div key={index} className="mb-2">{production}</div>
            ))}
          </div>
        ) : (
          <div className={`flex justify-center items-center ${visualizationHeight} bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden`}>
            {dotGraph ? (
              <GraphvizViewer dot={dotGraph} className="w-full h-full" />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Select a visualization type to begin</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderValidationSection = () => {
    if (activeVisualization === 'DFA') {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
            Validate Strings Against DFA
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {selectedRegex === 0
              ? "Only 'a' and 'b' characters are allowed"
              : "Only '0' and '1' characters are allowed"}
          </p>

          <div className="flex gap-6">
            <div className="w-2/3">
              <textarea
                value={textareaValue}
                onChange={handleTextareaChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const cursorPosition = e.currentTarget.selectionStart;
                    const currentValue = e.currentTarget.value;
                    const newValue =
                      currentValue.slice(0, cursorPosition) + '\n' +
                      currentValue.slice(cursorPosition);
                    setTextareaValue(newValue);
                  }
                }}
                className="w-full h-40 p-4 font-mono bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-gray-800 dark:text-gray-200"
                placeholder={`Enter strings to validate (one per line)\nExample using ${selectedRegex === 0 ? "a,b" : "0,1"}`}
                disabled={simulatingIndex !== null}
              />

              <button
                onClick={handleValidateAll}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={simulatingIndex !== null || !textareaValue.trim()}
              >
                Validate All
              </button>
            </div>

            <div className="w-1/3 flex flex-col space-y-1">
              {hasValidated && validationEntries.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-gray-800 dark:text-gray-200">{entry.input}</span>
                    {entry.isValid !== null && (
                      <span className={`font-bold ${entry.isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {entry.isValid ? '✓' : '✗'}
                      </span>
                    )}
                  </div>
                  {entry.stateChecks && (
                    <button
                      onClick={() => handleSimulate(idx)}
                      className="px-2 py-1 bg-gray-800 dark:bg-gray-600 text-white text-xs rounded hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={simulatingIndex !== null}
                    >
                      Simulate
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Regular Expression Validator</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Test and validate strings against formal language patterns</p>

          <div className="mb-8">
            <div className="grid grid-cols-12 gap-4 mb-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="col-span-8 font-semibold text-gray-800 dark:text-white">Regular Expression</div>
              <div className="col-span-4 grid grid-cols-3 gap-4">
                <div className="text-center font-semibold text-gray-800 dark:text-white">DFA</div>
                <div className="text-center font-semibold text-gray-800 dark:text-white">CFG</div>
                <div className="text-center font-semibold text-gray-800 dark:text-white">PDA</div>
              </div>
            </div>
            
            {REGULAR_EXPRESSIONS.map((regex, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-4 mb-2">
                <div 
                  className={`col-span-8 p-2 rounded font-mono text-sm cursor-pointer ${
                    selectedRegex === idx 
                      ? 'bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700' 
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  } text-gray-800 dark:text-gray-200`}
                  onClick={() => {
                    setSelectedRegex(idx);
                    setActiveVisualization(null);
                  }}
                >
                  <div className="whitespace-normal break-words">{regex}</div>
                </div>
                <div className="col-span-4 grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleVisualizationChange(activeVisualization === 'DFA' ? null : 'DFA')}
                    disabled={selectedRegex !== idx}
                    className={`flex justify-center items-center transition-colors ${
                      selectedRegex !== idx 
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : activeVisualization === 'DFA'
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400'
                    }`}
                  >
                    <CircleDot size={20} />
                  </button>
                  <button
                    onClick={() => handleVisualizationChange(activeVisualization === 'CFG' ? null : 'CFG')}
                    disabled={selectedRegex !== idx}
                    className={`flex justify-center items-center transition-colors ${
                      selectedRegex !== idx 
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : activeVisualization === 'CFG'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400'
                    }`}
                  >
                    <ArrowRight size={20} />
                  </button>
                  <button
                    onClick={() => handleVisualizationChange(activeVisualization === 'PDA' ? null : 'PDA')}
                    disabled={selectedRegex !== idx}
                    className={`flex justify-center items-center transition-colors ${
                      selectedRegex !== idx 
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : activeVisualization === 'PDA'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!activeVisualization && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex justify-center">
                <MousePointer className="h-16 w-16 text-indigo-500 dark:text-indigo-400 animate-bounce" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Select a Visualization Type to Begin
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Click on one of the visualization icons above to explore:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-lg mx-auto">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                  <CircleDot className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">DFA</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                  <ArrowRight className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">CFG</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                  <X className="h-8 w-8 mx-auto mb-2 text-red-500" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">PDA</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {renderVisualization()}
        {renderValidationSection()}
        <Testimonials />
        <BuiltUsing />
        <FAQ />
      </div>
    </main>
  );
}

export default Home;