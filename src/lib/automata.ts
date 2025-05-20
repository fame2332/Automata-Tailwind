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

    export const DFA_1 = {
      states: ["q1", "q2", "q3", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24", "q25", "T"],
      alphabet: ["a", "b"],
      start_state: "q1",
      end_states: ["q25"],
      transitions: {
        "q1,a": "q2",
        "q1,b": "q3",
        "q3,a": "T",
        "T,a": "T",
        "T,b": "T",
        "q2,a": "q5",
        "q2,b": "T",
        "q3,b": "q5",
        "q5,b": "q6",
        "q5,a": "q9",
        "q6,b": "q8",
        "q6,a": "q7",
        "q7,b": "q13",
        "q7,a": "q11",
        "q8,a": "q7",
        "q8,b": "q15",
        "q9,a": "q11",
        "q9,b": "q12",
        "q10,b": "q13",
        "q10,a": "q18",
        "q11,a": "q13",
        "q11,b": "q12",
        "q12,a": "q15",
        "q12,b": "q18",
        "q13,b": "q14",
        "q13,a": "q16",
        "q14,a": "q15",
        "q14,b": "q18",
        "q15,a": "q10",
        "q15,b": "q17",
        "q16,b": "q17",
        "q16,a": "q18",
        "q17,a": "q16",
        "q17,b": "q18",
        "q18,a": "q18",
        "q18,b": "q19",
        "q19,b": "q20",
        "q19,a": "q19",
        "q20,b": "q21",
        "q20,a": "q23",
        "q21,a": "q22",
        "q21,b": "q24",
        "q22,a": "q23",
        "q22,b": "q25",
        "q23,a": "q23",
        "q23,b": "q24",
        "q24,b": "q25",
        "q24,a": "q25",
        "q25,a": "q25",
        "q25,b": "q25"
      }
    };



    export const DFA_2: DFA = {
      states: [
        "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16",
        "q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24", "q25", "q26", "q27", "q28", "q29", "q30",
        "q31", "q32", "q33"
      ],
      alphabet: ["1", "0"],
      start_state: "q1",
      end_states: ["q33"],
      transitions: {
        "q1,1": "q2",
        "q1,0": "q2",
        "q2,1": "q3",
        "q2,0": "q4",
        "q3,1": "q5",
        "q3,0": "q4",
        "q4,0": "q25",
        "q4,1": "q3",
        "q5,0": "q28",
        "q5,1": "q6",
        "q6,1": "q7",
        "q6,0": "q8",
        "q7,1": "q11",
        "q7,0": "q8",
        "q8,0": "q9",
        "q8,1": "q10",
        "q9,0": "q13",
        "q9,1": "q15",
        "q10,1": "q16",
        "q10,0": "q21",
        "q11,1": "q11",
        "q11,0": "q12",
        "q12,0": "q18",
        "q12,1": "q31",
        "q13,1": "q30",
        "q13,0": "q14",
        "q14,0": "q14",
        "q14,1": "q15",
        "q15,1": "q16",
        "q15,0": "q32",
        "q16,1": "q11",
        "q16,0": "q17",
        "q17,1": "q20",
        "q17,0": "q18",
        "q18,1": "q19",
        "q18,0": "q33",
        "q19,1": "q33",
        "q19,0": "q32",
        "q20,1": "q33",
        "q20,0": "q4",
        "q21,1": "q20",
        "q21,0": "q22",
        "q22,0": "q33",
        "q22,1": "q23",
        "q23,0": "q24",
        "q23,1": "q33",
        "q24,1": "q10",
        "q24,0": "q25",
        "q25,1": "q26",
        "q25,0": "q13",
        "q26,0": "q24",
        "q26,1": "q27",
        "q27,0": "q28",
        "q27,1": "q11",
        "q28,1": "q29",
        "q28,0": "q9",
        "q29,0": "q4",
        "q29,1": "q16",
        "q30,1": "q16",
        "q30,0": "q24",
        "q31,1": "q33",
        "q31,0": "q21",
        "q32,1": "q31",
        "q32,0": "q22",
        "q33,0": "q33",
        "q33,1": "q33"
      }
    };


    export const CFG_1: CFG = {
     start_symbol: 'S',
     productions: [
  'S → X Y Z W V T U P Q',
  'X → "aa" | "bb"',
  'Y → (a + b) Y | λ',
  'Z → "aba" | "bab" | "bbb" | "aaa"',
  'W → "ab" W | "ba" W | λ',
  'V → "bb" | "aa"',
  'T → (a + b) T | λ',
  'U → A "b" A "b" A',
  'A → "a" A | λ',
  'P → "bab" | "bba" | "bbb" | "aba"',
  'Q → (a + b) Q | λ'
  ]
};

    export const CFG_2: CFG = {
     start_symbol: 'S',
     productions: [
'S → A B C D E F G H I J K',
'A → "1" | "0"',
'B → B "1" | B "0" | λ',
'C → "11" | "00"',
'D → D "11" | D "00" | λ',
'E → "1" | "0"',
'F → "0" | "1"',
'G → L M',
'L → "11" N "00" | λ',
'N → N "1" | λ',
'M → M "00" | λ',
'H → O | P',
'O → O "00" | λ',
'P → P "11" | λ',
'I → "11" | "00"',
'J → J "11" | J "00" | λ',
'K → K "1" | K "0" | λ'

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