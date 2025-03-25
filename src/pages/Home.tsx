import React, { useState, useMemo } from 'react';
import { CircleDot, ArrowRight, X, Play, MousePointer } from 'lucide-react';
import { GraphvizViewer } from '../components/GraphvizViewer';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
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
  '(aba+bab)(a+b)*(bab)(a+b)*(a+b+ab+ba)(a+b+aa)*',
  '((101+111+101)+(1+0+11))(1+0+01)*(111+000+101)(1+0)*'
];

export default function Home() {
  const [activeVisualization, setActiveVisualization] = useState<VisualizationType>(null);
  const [selectedRegex, setSelectedRegex] = useState<number>(0);
  const [validationEntries, setValidationEntries] = useState<ValidationEntry[]>([
    { input: '', isValid: null, stateChecks: null },
    { input: '', isValid: null, stateChecks: null },
    { input: '', isValid: null, stateChecks: null },
    { input: '', isValid: null, stateChecks: null },
    { input: '', isValid: null, stateChecks: null },
  ]);
  const [simulatingIndex, setSimulatingIndex] = useState<number | null>(null);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(0);

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

    if (simulatingIndex !== null && validationEntries[simulatingIndex].stateChecks) {
      const stateCheck = validationEntries[simulatingIndex].stateChecks![currentStateIndex];
      const color = stateCheck.isValid ? 'lightgreen' : 'red';
      return generateDotGraph(currentAutomaton, stateCheck.state, color);
    }
    
    return generateDotGraph(currentAutomaton);
  }, [activeVisualization, currentAutomaton, simulatingIndex, currentStateIndex, validationEntries]);

  const handleValidate = (index: number) => {
    const newEntries = [...validationEntries];
    const input = newEntries[index].input;

    const validChars = selectedRegex === 0 ? /^[ab]*$/ : /^[01]*$/;
    if (!validChars.test(input)) {
      newEntries[index] = {
        ...newEntries[index],
        isValid: false,
        stateChecks: [{ state: 'Start', isValid: false }]
      };
      setValidationEntries(newEntries);
      return;
    }

    const result = validateString(currentAutomaton, input);
    newEntries[index] = {
      ...newEntries[index],
      isValid: result.isValid,
      stateChecks: result.stateChecks
    };
    setValidationEntries(newEntries);
  };

  const handleSimulate = async (index: number) => {
    if (!validationEntries[index].stateChecks) return;
    
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
    setValidationEntries([
      { input: '', isValid: null, stateChecks: null },
      { input: '', isValid: null, stateChecks: null },
      { input: '', isValid: null, stateChecks: null },
      { input: '', isValid: null, stateChecks: null },
      { input: '', isValid: null, stateChecks: null },
    ]);
  };

  const renderEmptyState = () => {
    if (activeVisualization) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center">
            <MousePointer className="h-16 w-16 text-indigo-500 animate-bounce" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Select a Visualization Type to Begin
          </h2>
          <p className="text-gray-600">
            Click on one of the visualization icons above to explore:
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <CircleDot className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-medium text-gray-700">DFA</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <ArrowRight className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm font-medium text-gray-700">CFG</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <X className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <p className="text-sm font-medium text-gray-700">PDA</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVisualization = () => {
    if (!activeVisualization) return null;

    const visualizationHeight = activeVisualization === 'PDA' ? 'h-[800px]' : 'h-[400px]';

    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">{activeVisualization} Visualization</h3>
        {activeVisualization === 'CFG' ? (
          <div className="font-mono text-left p-4 bg-gray-50 rounded">
            {(selectedRegex === 0 ? CFG_1 : CFG_2).productions.map((production, index) => (
              <div key={index} className="mb-2">{production}</div>
            ))}
          </div>
        ) : (
          <div className={`flex justify-center items-center ${visualizationHeight} bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden`}>
            {dotGraph ? (
              <GraphvizViewer dot={dotGraph} className="w-full h-full" />
            ) : (
              <p className="text-gray-500">Select a visualization type to begin</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Regular Expression Validator</h1>
          <p className="text-gray-600 mb-8">Test and validate strings against formal language patterns</p>

          <div className="mb-8">
            <div className="grid grid-cols-7 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
              <div className="col-span-4 font-semibold">Regular Expression</div>
              <div className="text-center font-semibold">DFA</div>
              <div className="text-center font-semibold">CFG</div>
              <div className="text-center font-semibold">PDA</div>
            </div>
            
            {REGULAR_EXPRESSIONS.map((regex, idx) => (
              <div key={idx} className="grid grid-cols-7 gap-4 mb-2">
                <div 
                  className={`col-span-4 p-2 rounded break-all font-mono text-sm cursor-pointer ${
                    selectedRegex === idx ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setSelectedRegex(idx);
                    setActiveVisualization(null);
                  }}
                >
                  {regex}
                </div>
                <button
                  onClick={() => handleVisualizationChange(activeVisualization === 'DFA' ? null : 'DFA')}
                  disabled={selectedRegex !== idx}
                  className={`flex justify-center items-center transition-colors ${
                    selectedRegex !== idx 
                      ? 'text-gray-300 cursor-not-allowed'
                      : activeVisualization === 'DFA'
                        ? 'text-blue-600' 
                        : 'text-gray-400 hover:text-blue-500'
                  }`}
                >
                  <CircleDot size={20} />
                </button>
                <button
                  onClick={() => handleVisualizationChange(activeVisualization === 'CFG' ? null : 'CFG')}
                  disabled={selectedRegex !== idx}
                  className={`flex justify-center items-center transition-colors ${
                    selectedRegex !== idx 
                      ? 'text-gray-300 cursor-not-allowed'
                      : activeVisualization === 'CFG'
                        ? 'text-green-600'
                        : 'text-gray-400 hover:text-green-500'
                  }`}
                >
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => handleVisualizationChange(activeVisualization === 'PDA' ? null : 'PDA')}
                  disabled={selectedRegex !== idx}
                  className={`flex justify-center items-center transition-colors ${
                    selectedRegex !== idx 
                      ? 'text-gray-300 cursor-not-allowed'
                      : activeVisualization === 'PDA'
                        ? 'text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {renderEmptyState()}
        {renderVisualization()}

        {activeVisualization === 'DFA' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Validate Strings Against DFA
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {selectedRegex === 0 
                ? "Only 'a' and 'b' characters are allowed"
                : "Only '0' and '1' characters are allowed"}
            </p>
            
            <div className="space-y-4">
              {validationEntries.map((entry, idx) => (
                <div key={idx} className="grid grid-cols-6 gap-4 items-center">
                  <input
                    type="text"
                    value={entry.input}
                    onChange={(e) => {
                      const newEntries = [...validationEntries];
                      newEntries[idx] = { input: e.target.value, isValid: null, stateChecks: null };
                      setValidationEntries(newEntries);
                    }}
                    className="col-span-3 p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
                    placeholder={`Enter string using only ${selectedRegex === 0 ? "'a' and 'b'" : "'0' and '1'"}`}
                    disabled={simulatingIndex !== null}
                  />
                  <button
                    onClick={() => handleValidate(idx)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!entry.input || simulatingIndex !== null}
                  >
                    Validate
                  </button>
                  <div className={`text-center px-4 py-2 rounded ${
                    entry.isValid === null ? 'bg-gray-100' :
                    entry.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {entry.isValid === null ? 'Pending' : entry.isValid ? 'Valid' : 'Invalid'}
                  </div>
                  <button
                    onClick={() => handleSimulate(idx)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!entry.stateChecks || simulatingIndex !== null}
                  >
                    <Play size={16} />
                    Simulate
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Testimonials />
        <FAQ />
      </div>
    </main>
  );
}