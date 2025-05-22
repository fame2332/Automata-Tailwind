/// <reference types="node" />

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CircleDot, ArrowRight, X, Play, MousePointer, CheckCircle2, Pin, Pause, SkipBack, SkipForward, PlayCircle, ChevronLeft, ChevronRight, XCircle, Maximize, Minimize } from 'lucide-react';
import { GraphvizViewer } from '../components/GraphvizViewer';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import BuiltUsing from '../components/BuiltUsing';
import { ErrorModal } from '../components/ErrorModal';
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
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const simulationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const visualizationRef = useRef<HTMLDivElement>(null);
  
  // Error modal state
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    if (!currentAutomaton || activeVisualization === 'CFG' || activeVisualization === 'PDA') return null;

    if (simulatingIndex !== null && validationEntries[simulatingIndex]?.stateChecks) {
      // Make sure currentStateIndex is within bounds
      const stateChecks = validationEntries[simulatingIndex].stateChecks!;
      const safeIndex = Math.min(currentStateIndex, stateChecks.length - 1);
      
      // Now safely access the stateCheck
      const stateCheck = stateChecks[safeIndex];
      
      // Add a null check before accessing properties
      if (stateCheck) {
        const color = stateCheck.isValid ? 'lightgreen' : 'red';
        
        if (activeVisualization === 'DFA') {
          return generateDotGraph(currentAutomaton as any, stateCheck.state, color);
        }
      }
      return null;
    }

    if (activeVisualization === 'DFA') {
      return generateDotGraph(currentAutomaton as any);
    }
    return null;
  }, [activeVisualization, currentAutomaton, simulatingIndex, currentStateIndex, validationEntries]);

  const validateSingleString = (input: string): { isValid: boolean; stateChecks: StateCheck[] | null } => {
    if (!currentAutomaton) return { isValid: false, stateChecks: null };

    if (!input.trim()) {
      return { isValid: false, stateChecks: null };
    }

    // Check if input contains valid characters for the selected regex
    const validChars = selectedRegex === 0 ? /^[ab]*$/ : /^[01]*$/;
    if (!validChars.test(input)) {
      return { isValid: false, stateChecks: [{ state: 'Start', isValid: false }] };
    }

    return validateString(currentAutomaton as any, input);
  };

  const handleValidateAll = () => {
    if (!currentAutomaton) return;

    const lines = textareaValue.split('\n').filter(line => line.trim());
    
    // Check if any line contains invalid characters
    const validChars = selectedRegex === 0 ? /^[ab]*$/ : /^[01]*$/;
    const invalidLine = lines.find(line => !validChars.test(line));
    
    if (invalidLine) {
      // Show error modal for invalid characters
      const allowedChars = selectedRegex === 0 ? "'a' and 'b'" : "'0' and '1'";
      setErrorMessage(`Invalid characters detected in input: "${invalidLine}". Only ${allowedChars} are allowed for the selected pattern.`);
      setErrorModalOpen(true);
      return;
    }
    
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

  useEffect(() => {
    if (simulatingIndex !== null && isAutoPlaying && !isPaused) {
      // Start the simulation immediately when autoplay is enabled
      stepThroughSimulation(simulatingIndex);
    }
    
    // If we're at the final step, make sure we're paused
    if (simulatingIndex !== null && validationEntries[simulatingIndex]?.stateChecks) {
      const stateChecks = validationEntries[simulatingIndex].stateChecks!;
      if (currentStateIndex >= stateChecks.length - 1) {
        setIsAutoPlaying(false);
        setIsPaused(true);
      }
    }
  }, [simulatingIndex, isAutoPlaying, isPaused, currentStateIndex, validationEntries]);

  const handleSimulate = (index: number) => {
    // First reset any existing simulation
    if (simulatingIndex !== null) {
      if (simulationTimeoutRef.current) {
        clearTimeout(simulationTimeoutRef.current);
        simulationTimeoutRef.current = null;
      }
      // Force the autoplay to stop for the previous simulation
      setIsAutoPlaying(false);
      setIsPaused(true);
    }
    
    if (!validationEntries[index]?.stateChecks) return;

    // Set up the simulation but start paused
    setCurrentStateIndex(0);
    setIsPaused(true);
    setIsAutoPlaying(false);
    setSimulatingIndex(index);
  };

  const handleTogglePlayPause = () => {
    if (simulatingIndex === null) return;
    
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);
    
    if (!newPausedState) {
      setIsAutoPlaying(true);
      stepThroughSimulation(simulatingIndex);
    } else {
      setIsAutoPlaying(false);
      if (simulationTimeoutRef.current) {
        clearTimeout(simulationTimeoutRef.current);
        simulationTimeoutRef.current = null;
      }
    }
  };

  const handleResetSimulation = () => {
    if (simulationTimeoutRef.current) {
      clearTimeout(simulationTimeoutRef.current);
      simulationTimeoutRef.current = null;
    }
    setSimulatingIndex(null);
    setCurrentStateIndex(0);
    setIsPaused(true);
    setIsAutoPlaying(false);
  };

  const stepThroughSimulation = async (index: number) => {
    if (!validationEntries[index]?.stateChecks || isPaused || !isAutoPlaying) return;
    
    const stateChecks = validationEntries[index].stateChecks!;
    const maxIndex = stateChecks.length - 1;
    
    if (currentStateIndex >= maxIndex) {
      // Stop the autoplay and pause when we reach the final state
      setIsAutoPlaying(false);
      setIsPaused(true);
      
      // Ensure we're at the last state index
      setCurrentStateIndex(maxIndex);
      
      // The UI will show the completion message and enable the textarea
      // based on these values
      return;
    }
    
    // Clear any existing timeout to prevent multiple timeouts
    if (simulationTimeoutRef.current) {
      clearTimeout(simulationTimeoutRef.current);
      simulationTimeoutRef.current = null;
    }
    
    // Use the functional update form to ensure we're using the latest state
    setCurrentStateIndex(prevIndex => {
      const nextIndex = Math.min(prevIndex + 1, maxIndex); // Ensure we don't exceed maxIndex
      
      // Set up the next step after the state has been updated
      simulationTimeoutRef.current = setTimeout(() => {
        if (nextIndex >= maxIndex) {
          // We're about to reach the final state in the next step
          // Make sure we pause
          setIsAutoPlaying(false);
          setIsPaused(true);
        } else if (!isPaused && isAutoPlaying && simulatingIndex === index) {
          stepThroughSimulation(index);
        }
      }, 1500); // Changed from 1000 to 1500 milliseconds (1.5 seconds)
      
      return nextIndex;
    });
  };

  const handleStepForward = () => {
    if (simulatingIndex === null || !validationEntries[simulatingIndex]?.stateChecks || currentStateIndex >= (validationEntries[simulatingIndex]?.stateChecks?.length || 0) - 1) return;
    
    const stateChecks = validationEntries[simulatingIndex].stateChecks!;
    
    if (currentStateIndex < stateChecks.length - 1) {
      setCurrentStateIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleStepBackward = () => {
    if (simulatingIndex === null) return;
    
    if (currentStateIndex > 0) {
      setCurrentStateIndex(prevIndex => prevIndex - 1);
    }
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

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (visualizationRef.current?.requestFullscreen) {
        visualizationRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const renderVisualization = () => {
    if (!activeVisualization) return null;

    const visualizationHeight = activeVisualization === 'PDA' ? 'h-[800px]' : 'h-[400px]';

    return (
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{activeVisualization} Visualization</h3>
          <button 
            onClick={toggleFullScreen}
            className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors"
            title={isFullScreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
        {activeVisualization === 'CFG' ? (
          <div className="font-mono text-left p-4 bg-gray-50 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200">
            {(selectedRegex === 0 ? CFG_1 : CFG_2).productions.map((production, index) => (
              <div key={index} className="mb-2">{production}</div>
            ))}
          </div>
        ) : activeVisualization === 'PDA' ? (
          <div 
            ref={visualizationRef}
            className={`flex justify-center items-center ${visualizationHeight} bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden`}
          >
            {selectedRegex === 1 ? (
              // PDA_2 - Use the provided image
              <img 
                src="/images/PDA2_page-0001.png" 
                alt="PDA visualization for (1+0)(1+0)*(11+00)(11+00)*(1+0)(0+1)(11*00*)((00)*+(11)*)(11+00)(11+00)*(1+0)*"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              // PDA_1 - Using pda.png image
              <img 
                src="/images/pda.png" 
                alt="PDA visualization for (aa+bb)*(ab+ba)(aa+bb)*"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        ) : (
          <div 
            ref={visualizationRef}
            className={`flex justify-center items-center ${visualizationHeight} bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden`}
          >
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Validate Strings Against DFA
            </h2>
            
            <div className="flex space-x-3 items-center">
              <button
                onClick={handleStepBackward}
                disabled={simulatingIndex === null || currentStateIndex <= 0}
                className="p-1.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Step backward"
              >
                <SkipBack size={16} />
              </button>
              
              <button
                onClick={handleTogglePlayPause}
                disabled={simulatingIndex === null}
                className="p-1.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
              
              <button
                onClick={handleStepForward}
                disabled={simulatingIndex === null || !validationEntries[simulatingIndex]?.stateChecks || currentStateIndex >= (validationEntries[simulatingIndex]?.stateChecks?.length || 0) - 1}
                className="p-1.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Step forward"
              >
                <SkipForward size={16} />
              </button>
              
              {simulatingIndex !== null && (
                <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                  Step {currentStateIndex + 1} of {validationEntries[simulatingIndex]?.stateChecks?.length || 0}
                </span>
              )}
            </div>
          </div>
          
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
              />

              {simulatingIndex !== null && validationEntries[simulatingIndex]?.stateChecks && 
                currentStateIndex >= (validationEntries[simulatingIndex]?.stateChecks?.length || 0) - 1 && (
                <div className="mt-3 p-2 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md">
                  <p className="text-sm text-green-800 dark:text-green-200 flex items-center">
                    <CheckCircle2 size={16} className="mr-2" />
                    Simulation complete! You can now input a new string or validate again.
                  </p>
                </div>
              )}

              <button
                onClick={handleValidateAll}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!textareaValue.trim()}
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
                    >
                      Simulate
                    </button>
                  )}
                </div>
              ))}
              {hasValidated && validationEntries.length === 0 && (
                <div className="text-gray-500 text-sm italic text-center py-8">
                  No validation results yet
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ErrorModal 
        isOpen={errorModalOpen}
        message={errorMessage}
        onClose={() => setErrorModalOpen(false)}
      />
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
                    <CircleDot size={20} />
                  </button>
                  <button
                    onClick={() => handleVisualizationChange(activeVisualization === 'PDA' ? null : 'PDA')}
                    disabled={selectedRegex !== idx}
                    className={`flex justify-center items-center transition-colors ${
                      selectedRegex !== idx 
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : activeVisualization === 'PDA'
                          ? 'text-purple-600 dark:text-purple-400'
                          : 'text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400'
                    }`}
                  >
                    <CircleDot size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {renderVisualization()}
        {renderValidationSection()}
        
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
        
        <Testimonials />
        <BuiltUsing />
        <FAQ />
      </div>
    </main>
  );
}

export default Home;