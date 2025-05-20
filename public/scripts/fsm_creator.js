/**
 * FSM Creator JavaScript
 * This script handles the FSM (Finite State Machine) visualization and simulation
 * using the noam library.
 */

// Reference to current FSM
let fsm = null;
let currentStates = [];
let alphabet = [];
let inputString = [];
let inputIndex = 0;
let regexStr = '';
let viz = null;

// Safe DOM node removal helper
function safeRemoveChildNodes(container) {
  if (!container) return;
  
  // Use a safer approach than direct child removal
  container.innerHTML = '';
}

// Initialize visualization when the page loads or when the FSM Creator page mounts
function initializeViz() {
  if (!viz) {
    try {
      // Initialize viz.js renderer
      viz = new Viz();
    } catch (e) {
      console.error('Error initializing Viz:', e);
    }
  }
  return viz;
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
  // This will run when the page loads
  initializeFsmCreator();
});

// Also make sure to check for the container periodically after page load
// This helps when the component mounts after the initial page load
let checkInterval = setInterval(function() {
  if (document.getElementById('fsm') || document.getElementById('automaton-container')) {
    initializeFsmCreator();
    clearInterval(checkInterval);
  }
}, 500); // Check every 500ms

function initializeFsmCreator() {
  console.log('FSM Creator initialized');
  
  // Initialize viz.js renderer
  initializeViz();
  
  // Set up event listeners for the hidden form fields that React will populate
  const regexInput = document.getElementById('regex');
  const inputStringField = document.getElementById('input');
  
  if (regexInput) {
    regexInput.addEventListener('change', function() {
      regexStr = regexInput.value;
      validateRegex(regexStr);
    });
  }
  
  if (inputStringField) {
    inputStringField.addEventListener('change', function() {
      resetAutomaton();
      inputString = inputStringField.value.split('');
      colorize();
    });
  }
}

/**
 * Validates a regex string
 * @param {string} regex - The regex string to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateRegex(regex) {
  try {
    if (!regex || regex.trim() === '') {
      return false;
    }
    
    // Check if noam is available first
    if (typeof noam === 'undefined') {
      console.error('Noam library is not loaded');
      return false;
    }
    
    // Try to parse the regex using noam
    const parsedRegex = noam.re.string.toTree(regex);
    return true;
  } catch (e) {
    console.error('Invalid regex:', e);
    return false;
  }
}

/**
 * Formats a state set for display
 * @param {Array|string} state - The state or state set to format
 * @returns {string} - Formatted state string
 */
function formatState(state) {
  if (Array.isArray(state)) {
    return state.sort((a, b) => a - b).join(',');
  }
  return state.toString();
}

/**
 * Generates an automaton based on the regex and type
 * @param {string} fsmType - The type of FSM to generate: "DFA", "NFA", or "eNFA"
 */
function generateAutomaton(fsmType) {
  try {
    // Check if noam is available
    if (typeof noam === 'undefined') {
      console.error('Noam library is not loaded. Make sure it is properly included in the page.');
      
      // Get the container to show error
      const container = document.getElementById('fsm') || 
                       (document.getElementById('automaton-container')?.querySelector('#fsm'));
      
      if (container) {
        container.innerHTML = '<div class="text-red-500 p-4">Error: Noam library is not loaded. Please reload the page.</div>';
      }
      return false;
    }
    
    const regexInput = document.getElementById('regex');
    if (!regexInput || !regexInput.value) {
      console.error('No regex provided');
      return false;
    }
    
    regexStr = regexInput.value;
    
    try {
      // Parse the regex
      const parsedRegex = noam.re.string.toTree(regexStr);
      
      // First convert to basic automaton
      let automaton = noam.re.tree.toAutomaton(parsedRegex);
      alphabet = automaton.alphabet;
      
      // Convert based on the desired FSM type
      if (fsmType === "DFA") {
        const currentType = noam.fsm.determineType(automaton);
        if (currentType === noam.fsm.enfaType) {
          automaton = noam.fsm.convertEnfaToNfa(automaton);
          automaton = noam.fsm.convertNfaToDfa(automaton);
        } else if (currentType === noam.fsm.nfaType) {
          automaton = noam.fsm.convertNfaToDfa(automaton);
        }
        // Minimize DFA for best results
        automaton = noam.fsm.minimize(automaton);
        // Relabel DFA states to 0, 1, 2, ...
        const stateNames = automaton.states;
        const stateMap = {};
        stateNames.forEach((s, i) => { stateMap[s] = i.toString(); });
        automaton.states = stateNames.map(s => stateMap[s]);
        automaton.initialState = stateMap[automaton.initialState];
        automaton.acceptingStates = automaton.acceptingStates.map(s => stateMap[s]);
        automaton.transitions = automaton.transitions.map(t => ({
          fromState: stateMap[t.fromState],
          symbol: t.symbol,
          toStates: t.toStates.map(ts => stateMap[ts])
        }));
      } else if (fsmType === "NFA") {
        if (noam.fsm.determineType(automaton) === noam.fsm.enfaType) {
          automaton = noam.fsm.convertEnfaToNfa(automaton);
        }
      }
      // If fsmType is "eNFA", keep the automaton as is
      
      // Store the FSM for later use
      fsm = automaton;
      
    } catch (e) {
      console.error('Error parsing regex or generating automaton:', e);
      
      // Get the container to show error
      const container = document.getElementById('fsm') || 
                       (document.getElementById('automaton-container')?.querySelector('#fsm'));
      
      if (container) {
        container.innerHTML = `<div class="text-red-500 p-4">Error generating automaton: ${e.message}</div>`;
      }
      return false;
    }
    
    // Make sure FSM container exists
    let container = document.getElementById('fsm');
    if (!container) {
      // Try finding it inside automaton-container
      const automatonContainer = document.getElementById('automaton-container');
      if (automatonContainer) {
        container = automatonContainer.querySelector('#fsm');
        // If it still doesn't exist, create it
        if (!container) {
          container = document.createElement('div');
          container.id = 'fsm';
          container.className = 'w-full h-full flex items-center justify-center';
          automatonContainer.appendChild(container);
        }
      } else {
        console.error('Could not find automaton container');
        return false;
      }
    }
    
    // Reset simulation state
    resetAutomaton();
    
    // Draw the graph
    return drawGraph();
  } catch (e) {
    console.error('Error in generateAutomaton:', e);
    
    // Try to get FSM container
    try {
      const container = document.getElementById('fsm') || 
                       (document.getElementById('automaton-container')?.querySelector('#fsm'));
      
      if (container && container.isConnected) {
        container.innerHTML = `<div class="text-red-500 p-4">Error generating automaton: ${e.message}</div>`;
      }
    } catch (domError) {
      console.error('Error updating DOM with error message:', domError);
    }
    
    return false;
  }
}

/**
 * Draws the FSM graph using GraphViz
 * @returns {boolean} - True if successful, false otherwise
 */
function drawGraph() {
  if (!fsm) {
    console.error('No FSM to draw');
    return false;
  }
  
  try {
    // Ensure viz is initialized
    if (!viz) {
      viz = initializeViz();
    }
    
    // Make sure noam is loaded
    if (typeof noam === 'undefined') {
      console.error('Noam library not loaded');
      return false;
    }
    
    // Convert the FSM to dot format (GraphViz)
    let dotStr = noam.fsm.printDotFormat(fsm);
    
    // Modify the dot string to handle state IDs
    dotStr = dotStr.replace(/node(\{[^}]+\})/g, function(match, states) {
      return `node${states.replace(/,/g, '_')}`;
    });
    
    // Extract the graph definition (between the first { and the last })
    let graphDefStart = dotStr.indexOf('{') + 1;
    let graphDefEnd = dotStr.lastIndexOf('}');
    let graphDef = dotStr.substring(graphDefStart, graphDefEnd);

    // Modify the accepting states to have double circles
    if (fsm && fsm.acceptingStates && fsm.acceptingStates.length > 0) {
      let modifiedGraphDef = graphDef;
      fsm.acceptingStates.forEach(state => {
        const stateId = state.toString().replace(/,/g, '_');
        const statePattern = new RegExp(`\\s*${stateId}\\s*\\[([^\\]]*)\\]`, 'g');
        
        modifiedGraphDef = modifiedGraphDef.replace(statePattern, (match, attrs) => {
          // If peripheries=2 is not already in the attributes, add it
          if (!attrs.includes('peripheries=2')) {
            const newAttrs = attrs.trim() === '' ? 'peripheries=2' : `${attrs}, peripheries=2`;
            return ` ${stateId} [${newAttrs}]`;
          }
          return match;
        });
      });

      // Rebuild the dot string with the modified graph definition
      dotStr = dotStr.substring(0, graphDefStart) + modifiedGraphDef + dotStr.substring(graphDefEnd);
    }
    
    // Get the container
    const container = document.getElementById('fsm');
    if (!container) {
      console.error('FSM container not found');
      return false;
    }
    
    // Safely clear any existing content
    safeRemoveChildNodes(container);
    
    // Show loading state
    container.innerHTML = '<div class="flex justify-center items-center h-full"><p>Rendering graph...</p></div>';
    
    return viz.renderSVGElement(dotStr)
      .then(function(element) {
        // Safely clear container again before adding new element
        safeRemoveChildNodes(container);
        
        // If container still exists in the document, add the new element
        if (container.isConnected) {
          container.appendChild(element);
          
          // Add event listeners to make states clickable
          const states = container.querySelectorAll('.node');
          states.forEach(function(state) {
            state.style.cursor = 'pointer';
            state.addEventListener('click', function() {
              // Optional: add interaction when clicking states
            });
          });
          
          // Colorize current states
          colorize();
          return true;
        } else {
          console.warn('FSM container was removed from the document');
          return false;
        }
      })
      .catch(function(error) {
        console.error('Error rendering graph:', error);
        
        // Recreate Viz instance on error
        viz = new Viz();
        
        // Try to get the container again
        const container = document.getElementById('fsm');
        if (container && container.isConnected) {
          // Safely clear container and show error
          safeRemoveChildNodes(container);
          container.innerHTML = '<div class="text-red-500 p-4">Error rendering graph. Please try again.</div>';
        }
        return false;
      });
  } catch (e) {
    console.error('Error drawing graph:', e);
    const container = document.getElementById('fsm');
    if (container && container.isConnected) {
      safeRemoveChildNodes(container);
      container.innerHTML = '<div class="text-red-500 p-4">Error drawing graph: ' + e.message + '</div>';
    }
    return false;
  }
}

/**
 * Colors the states in the visualization based on current simulation state
 */
function colorize() {
  if (!fsm) {
    return;
  }
  
  try {
    // Get the FSM container - try both possible IDs since React might mount components differently
    let container = document.getElementById('fsm');
    if (!container) {
      const automaton = document.getElementById('automaton-container');
      if (automaton) {
        container = automaton.querySelector('#fsm');
      }
      if (!container) {
        return;
      }
    }
    
    // Make sure the container is still connected to the DOM
    if (!container.isConnected) {
      return;
    }
    
    // Reset all states to default color
    const allStates = container.querySelectorAll('.node ellipse');
    allStates.forEach(function(stateEl) {
      try {
        stateEl.setAttribute('fill', '#FFFFFF');
        stateEl.setAttribute('stroke', '#000000');
      } catch (e) {
        console.warn('Error resetting state style:', e);
      }
    });
    
    // Color current states
    currentStates.forEach(function(state) {
      try {
        const stateId = `node${formatState(state).replace(/,/g, '_')}`;
        const stateEl = container.querySelector(`#${stateId} ellipse`);
        if (stateEl) {
          stateEl.setAttribute('fill', '#90EE90'); // Light green
          stateEl.setAttribute('stroke', '#006400'); // Dark green
        }
      } catch (e) {
        console.warn('Error coloring current state:', e);
      }
    });
    
    // Color accepting states
    if (fsm.acceptingStates) {
      fsm.acceptingStates.forEach(function(state) {
        try {
          const stateId = `node${formatState(state).replace(/,/g, '_')}`;
          const stateEl = container.querySelector(`#${stateId} ellipse:last-child`);
          if (stateEl && !currentStates.includes(state)) {
            // Only color if not already colored as current
            stateEl.setAttribute('stroke', '#0000FF'); // Blue for accepting states
            stateEl.setAttribute('stroke-width', '2');
          }
        } catch (e) {
          console.warn('Error coloring accepting state:', e);
        }
      });
    }
    
    // Highlight processed input
    const inputField = document.getElementById('input-display');
    if (inputField && inputField.isConnected && inputString.length > 0) {
      let html = '';
      for (let i = 0; i < inputString.length; i++) {
        if (i < inputIndex) {
          html += `<span class="text-gray-400">${inputString[i]}</span>`;
        } else if (i === inputIndex) {
          html += `<span class="text-green-600 font-bold">${inputString[i]}</span>`;
        } else {
          html += `<span>${inputString[i]}</span>`;
        }
      }
      inputField.innerHTML = html;
    }
  } catch (e) {
    console.error('Error in colorize function:', e);
  }
}

/**
 * Resets the automaton to its initial state
 */
function resetAutomaton() {
  if (!fsm) {
    return;
  }
  
  // Reset to initial state
  currentStates = [fsm.initialState];
  inputIndex = 0;
  
  // Update visualization
  colorize();
}

/**
 * Processes the next input symbol in the input string
 */
function processNextInput() {
  if (!fsm || inputIndex >= inputString.length) {
    return false;
  }
  
  try {
    const symbol = inputString[inputIndex];
    
    // Make sure symbol is in alphabet
    if (!fsm.alphabet.includes(symbol)) {
      console.error(`Symbol "${symbol}" not in alphabet:`, fsm.alphabet);
      return false;
    }
    
    // Process the input symbol
    const nextStates = [];
    for (let i = 0; i < currentStates.length; i++) {
      const state = currentStates[i];
      
      // Find transitions for this state and symbol
      for (let j = 0; j < fsm.transitions.length; j++) {
        const transition = fsm.transitions[j];
        if (transition.fromState === state && transition.symbol === symbol) {
          // Add target states to next states
          for (let k = 0; k < transition.toStates.length; k++) {
            if (!nextStates.includes(transition.toStates[k])) {
              nextStates.push(transition.toStates[k]);
            }
          }
        }
      }
    }
    
    // Update current states and input index
    currentStates = nextStates;
    inputIndex++;
    
    // Update visualization
    colorize();
    
    // Return acceptance state
    return isInAcceptingState();
  } catch (e) {
    console.error('Error processing input:', e);
    return false;
  }
}

/**
 * Checks if current states include any accepting states
 * @returns {boolean} - True if in accepting state, false otherwise
 */
function isInAcceptingState() {
  if (!fsm) {
    return false;
  }
  
  for (let i = 0; i < currentStates.length; i++) {
    if (fsm.acceptingStates.includes(currentStates[i])) {
      return true;
    }
  }
  
  return false;
}

// Export functions to global scope for React to access
window.validateRegex = validateRegex;
window.generateAutomaton = generateAutomaton;
window.drawGraph = drawGraph;
window.colorize = colorize;
window.resetAutomaton = resetAutomaton;
window.processNextInput = processNextInput; 