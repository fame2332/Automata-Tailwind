import { graphviz } from 'd3-graphviz';

export interface DFA {
  states: string[];
  alphabet: string[];
  start_state: string;
  end_states: string[];
  transitions: Record<string, string>;
}

export interface StateCheck {
  state: string;
  isValid: boolean;
}

export interface CFG {
  productions: string[];
  start_symbol: string;
}

export interface PDA {
  states: string[];
  alphabet: string[];
  start_state: string;
  push_states: (string | null)[];
  pop_states: (string | null)[];
  accept_states: string[];
  transitions: Record<string, string>;
}

export const DFA_1: DFA = {
  states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "T"],
  alphabet: ["a", "b"],
  start_state: "q1",
  end_states: ["q10", "q11"],
  transitions: {
    "q1,a": "q2",
    "q2,b": "q3",
    "q3,a": "q6",
    "q1,b": "q4",
    "q4,a": "q5",
    "q5,b": "q6",
    "q2,a": "T",
    "q3,b": "T",
    "q4,b": "T",
    "q5,a": "T",
    "T,a": "T",
    "T,b": "T",
    "q6,a": "q6",
    "q6,b": "q7",
    "q7,b": "q7",
    "q7,a": "q8",
    "q8,a": "q6",
    "q8,b": "q9",
    "q9,a": "q10",
    "q9,b": "q11",
    "q10,a": "q10",
    "q11,b": "q11",
    "q10,b": "q11",
    "q11,a": "q10",
  }
};

export const DFA_2: DFA = {
  states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
  alphabet: ["1", "0"],
  start_state: "q1",
  end_states: ["q8"],
  transitions: {
    "q1,0": "q2",
    "q1,1": "q2",
    "q2,1": "q3",
    "q2,0": "q4",
    "q3,0": "q5",
    "q3,1": "q6",
    "q4,1": "q3",
    "q4,0": "q7",
    "q5,1": "q8",
    "q5,0": "q7",
    "q6,0": "q5",
    "q6,1": "q8",
    "q7,1": "q3",
    "q7,0": "q8",
    "q8,0": "q8",
    "q8,1": "q8",
  }
};

export const CFG_1: CFG = {
  start_symbol: 'S',
  productions: [
    'S -> WXbabXYZ',
    'W -> aba | bab',
    'X -> aX | bX | ε',
    'Y -> a | b | ab | ba',
    'Z -> aZ | bZ | aaZ | ε'
  ]
};

export const CFG_2: CFG = {
  start_symbol: 'S',
  productions: [
    'S -> WXYZ',
    'W -> 101 | 111 | 1 | 0 | 11',
    'X -> 1X | 0X | 01X | ε',
    'Y -> 111 | 000 | 101',
    'Z -> 1Z | 0Z | ε'
  ]
};

export const PDA_1: PDA = {
  states: ["Start", "Read1", "Read2", "Read3", "Read4", "Read5", "Read6", "Read7", 
           "Read8", "Read9", "Read10", "Read11", "Read12", "Read13", "Accept1", "Accept2"],
  alphabet: ["a", "b"],
  start_state: "Start",
  push_states: [null],
  pop_states: [null],
  accept_states: ["Accept1", "Accept2"],
  transitions: {
    "Start,": "Read1",
    "Read1,a": "Read2",
    "Read1,b": "Read3",
    "Read2,b": "Read4",
    "Read3,a": "Read5",
    "Read4,a": "Read6",
    "Read5,b": "Read6",
    "Read6,b": "Read7",
    "Read7,a": "Read8",
    "Read8,b": "Read9",
    "Read9,a": "Read10",
    "Read9,b": "Read11",
    "Read10,b": "Read12",
    "Read11,a": "Read13",
    "Read10,": "Accept1",
    "Read11,": "Accept1",
    "Read12,a,b,": "Accept2",
    "Read13,a,b,": "Accept2",
    "Read6,a": "Read6",
    "Read7,b": "Read7",
    "Read8,a": "Read6",
    "Read10,a": "Read10",
    "Read11,b": "Read11",
  }
};

export const PDA_2: PDA = {
  states: ["Start", "Read1", "Read2", "Read3", "Read4", "Read5", "Read6", "Read7", "Read8", "Accept"],
  alphabet: ["1", "0"],
  start_state: "Start",
  push_states: [null],
  pop_states: [null],
  accept_states: ["Accept"],
  transitions: {
    "Start,": "Read1",
    "Read1,0,1": "Read2",
    "Read2,0": "Read3",
    "Read2,1": "Read4",
    "Read3,0": "Read5",
    "Read3,1": "Read4",
    "Read4,0": "Read7",
    "Read4,1": "Read6",
    "Read6,0": "Read7",
    "Read5,0": "Read8",
    "Read5,1": "Read4",
    "Read6,1": "Read8",
    "Read7,1": "Read8",
    "Read7,0": "Read3",
    "Read8,0,1": "Read8",
    "Read8,": "Accept",
  }
};

export function generateDotGraph(automaton: DFA | PDA, highlightedState?: string, color: string = 'yellow'): string {
  let dot = 'digraph G {\n';
  
  // Set layout direction based on automaton type
  if ('push_states' in automaton) {
    // For PDA, set top-to-bottom layout
    dot += '  rankdir=TB;\n';
    dot += '  node [shape=diamond];\n'; // Default shape for PDA states
  } else {
    // For DFA, keep left-to-right layout
    dot += '  rankdir=LR;\n';
    dot += '  node [shape=circle];\n';
  }
  
  // Add nodes
  const states = 'states' in automaton ? automaton.states : [];
  const endStates = 'end_states' in automaton ? automaton.end_states : 
                    'accept_states' in automaton ? automaton.accept_states : [];
  
  // Create invisible edge from a special node to start state for consistent positioning
  if ('push_states' in automaton) {
    dot += '  start [shape=none, label=""];\n';
    dot += `  start -> ${automaton.start_state} [label="start"];\n`;
    
    // Set specific shapes for PDA states
    states.forEach(state => {
      let shape = 'diamond'; // Default shape
      let attributes = [];
      
      if (state === automaton.start_state || automaton.accept_states.includes(state)) {
        shape = 'ellipse';
      } else if (automaton.push_states.includes(state)) {
        shape = 'rectangle';
      }
      
      if (state === highlightedState) {
        attributes.push(`style=filled`, `fillcolor="${color}"`);
      }
      
      if (automaton.accept_states.includes(state)) {
        attributes.push('peripheries=2');
      }
      
      attributes.push(`shape=${shape}`);
      dot += `  ${state} [${attributes.join(', ')}];\n`;
    });
  } else {
    // DFA styling
    states.forEach(state => {
      let nodeAttributes = [];
      if (endStates.includes(state)) {
        nodeAttributes.push('shape=doublecircle');
      }
      if (state === highlightedState) {
        nodeAttributes.push(`style=filled`, `fillcolor="${color}"`);
      }
      dot += `  ${state} [${nodeAttributes.join(', ')}];\n`;
    });
  }

  // Add transitions
  if ('transitions' in automaton) {
    Object.entries(automaton.transitions).forEach(([key, value]) => {
      const [source, symbol] = key.split(',');
      const label = symbol || 'ε';
      dot += `  ${source} -> ${value} [label="${label}"];\n`;
    });
  }

  dot += '}';
  return dot;
}

export function generateCFGGraph(cfg: CFG): string {
  let dot = 'digraph G {\n';
  dot += '  node [shape=rectangle];\n';
  
  // Create nodes for each production
  cfg.productions.forEach((prod, i) => {
    const [lhs, rhs] = prod.split('->').map(s => s.trim());
    dot += `  "${prod}" [label="${prod}"];\n`;
    
    // Connect related productions
    if (i > 0) {
      const prevProd = cfg.productions[i - 1];
      dot += `  "${prevProd}" -> "${prod}" [style=invis];\n`;
    }
  });

  dot += '}';
  return dot;
}

export function validateString(dfa: DFA, input: string): { isValid: boolean; stateChecks: StateCheck[] } {
  const stateChecks: StateCheck[] = [];
  let currentState = dfa.start_state;
  stateChecks.push({ state: currentState, isValid: true });

  for (const char of input) {
    const transition = `${currentState},${char}`;
    if (!dfa.transitions[transition]) {
      stateChecks.push({ state: currentState, isValid: false });
      return { isValid: false, stateChecks };
    }
    currentState = dfa.transitions[transition];
    stateChecks.push({ state: currentState, isValid: true });
  }

  const isValid = dfa.end_states.includes(currentState);
  stateChecks[stateChecks.length - 1].isValid = isValid;

  return { isValid, stateChecks };
}

export function validatePDA(pda: PDA, input: string): { isValid: boolean; stateChecks: StateCheck[] } {
  const stateChecks: StateCheck[] = [];
  let currentState = pda.start_state;
  stateChecks.push({ state: currentState, isValid: true });

  for (const char of input) {
    const transition = `${currentState},${char}`;
    if (!pda.transitions[transition]) {
      const epsilonTransition = `${currentState},`;
      if (!pda.transitions[epsilonTransition]) {
        stateChecks.push({ state: currentState, isValid: false });
        return { isValid: false, stateChecks };
      }
      currentState = pda.transitions[epsilonTransition];
    } else {
      currentState = pda.transitions[transition];
    }
    stateChecks.push({ state: currentState, isValid: true });
  }

  // Check for epsilon transitions at the end
  const epsilonTransition = `${currentState},`;
  if (pda.transitions[epsilonTransition]) {
    currentState = pda.transitions[epsilonTransition];
    stateChecks.push({ state: currentState, isValid: true });
  }

  const isValid = pda.accept_states.includes(currentState);
  stateChecks[stateChecks.length - 1].isValid = isValid;

  return { isValid, stateChecks };
}

export function validateCFG(cfg: CFG, input: string): boolean {
  // This is a simplified validation that checks if the input matches the basic pattern
  // A full CFG validation would require a more complex parsing algorithm
  const firstProd = cfg.productions[0];
  if (firstProd.includes('101') || firstProd.includes('111')) {
    return /^[01]+$/.test(input);
  } else {
    return /^[ab]+$/.test(input);
  }
}